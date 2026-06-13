/* eslint-disable @stylistic/ts/quotes */
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationService } from '../../firebase/service/notification.service';
import { Schedule } from '../entities/schedule.entity';
import { ScheduleTypeEnum } from '../enums/schedule-type.enum';
import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);
  private isRunning = false;
  constructor(
    @InjectRepository(Schedule) private readonly scheduleRepo: Repository<Schedule>,
    private readonly notificationService: NotificationService,
    private readonly userService: UsersService,
  ) {}

  async createOrUpdateSchedule(
    userId: string,
    createScheduleDto: CreateScheduleDto,
  ): Promise<Schedule> {
    const { dayOfWeek, hour, timezone, isActive } = createScheduleDto;

    const user = await this.userService.findByUUID(userId);
    if (!user.notificationToken) {
      throw new BadRequestException('user does not have a notification token');
    }

    let schedule = await this.scheduleRepo.findOne({
      where: {
        user: { uuid: userId },
        dayOfWeek,
        type: ScheduleTypeEnum.SCHEDULED,
      },
    });

    if (schedule) {
      schedule.hour = hour;
      if (timezone) schedule.timezone = timezone;
      if (isActive != undefined) schedule.isActive = isActive;
    } else {
      schedule = this.scheduleRepo.create({
        user: { uuid: userId },
        dayOfWeek,
        hour,
        timezone,
        type: ScheduleTypeEnum.SCHEDULED,
        isActive,
      });
    }

    return this.scheduleRepo.save(schedule);
  }

  async getScheduledSchedules(userId: string): Promise<Schedule[]> {
    return this.scheduleRepo.find({
      where: {
        user: { uuid: userId },
        type: ScheduleTypeEnum.SCHEDULED,
      },
      order: {
        dayOfWeek: 'ASC',
      },
    });
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron(): Promise<void> {
    if (this.isRunning) {
      this.logger.warn('Previous cron still running, skipping tick');
      return;
    }
    this.isRunning = true;
    try {
      await this.handleScheduledNotifications();
      await this.handleLessonNotifications();
    } catch (error) {
      this.logger.error(`Error in cron job: ${error.message}`, error.stack);
    } finally {
      this.isRunning = false;
    }
  }

  private async handleScheduledNotifications(): Promise<void> {
    const schedulesToSend = await this.scheduleRepo
      .createQueryBuilder('schedule')
      .leftJoinAndSelect('schedule.user', 'usr')
      .where('schedule.type = :type', { type: ScheduleTypeEnum.SCHEDULED })

      .andWhere(
        "EXTRACT(ISODOW FROM (NOW() AT TIME ZONE COALESCE(schedule.timezone, 'UTC'))) = schedule.dayOfWeek",
      )

      .andWhere(
        "TO_CHAR(NOW() AT TIME ZONE COALESCE(schedule.timezone, 'UTC'), 'HH24:MI') = TO_CHAR(schedule.hour, 'HH24:MI')",
      )

      .andWhere(
        "(schedule.lastSend IS NULL OR schedule.lastSend < (DATE_TRUNC('day', NOW() AT TIME ZONE COALESCE(schedule.timezone, 'UTC')) AT TIME ZONE COALESCE(schedule.timezone, 'UTC')))",
      )
      .andWhere('schedule.isActive = true')
      .andWhere('usr.notificationToken IS NOT NULL')
      .getMany();
    if (schedulesToSend.length > 0) {
      this.logger.debug('Checking SCHEDULED notifications');
      this.logger.log(`Found ${schedulesToSend.length} SCHEDULED notifications to send`);
    }

    await this.sendNotifications(
      schedulesToSend,
      '¡Hora de estudiar!',
      'Es momento de practicar tu lección programada',
    );
  }

  private async handleLessonNotifications(): Promise<void> {
    const now = new Date();

    // Buscar schedules LESSON que deben enviarse ahora
    const schedulesToSend = await this.scheduleRepo
      .createQueryBuilder('schedule')
      .leftJoinAndSelect('schedule.user', 'usr')
      .where('schedule.type = :type', { type: ScheduleTypeEnum.LESSON })
      .andWhere('schedule.scheduledFor <= :now', { now })
      .andWhere('schedule.isActive = true')
      .andWhere('usr.notificationToken IS NOT NULL')
      .andWhere('schedule.lastSend IS NULL')
      .getMany();

    if (schedulesToSend.length > 0) {
      this.logger.debug('Checking LESSON notifications');
      this.logger.log(`Found ${schedulesToSend.length} LESSON notifications to send`);
    }

    await this.sendNotifications(
      schedulesToSend,
      '¡Tu siguiente lección está lista!',
      'Ya puedes continuar con tu aprendizaje',
    );
  }

  private async sendNotifications(
    schedules: Schedule[],
    title: string,
    body: string,
  ): Promise<void> {
    const now = new Date();
    const clearedUsers = new Set<string>();
    for (const schedule of schedules) {
      try {
        if (schedule.user?.uuid && clearedUsers.has(schedule.user.uuid)) {
          continue;
        }
        if (!schedule.user?.notificationToken) {
          this.logger.warn(`User ${schedule.user?.uuid} has no notification token`);
          continue;
        }

        // Enviar notificación
        await this.notificationService.sendPushToToken(
          schedule.user.notificationToken,
          title,
          body,
          { scheduleId: schedule.uuid, type: schedule.type },
        );

        // Actualizar lastSend
        schedule.lastSend = now;
        await this.scheduleRepo.save(schedule);

        this.logger.log(
          `Notification sent to user ${schedule.user.uuid} for schedule ${schedule.uuid} (${schedule.type})`,
        );
      } catch (error) {
        const err = error as Record<string, unknown>;
        const errMessage = String(err.message || '');
        const errStack = String(err.stack || '');
        const errCode = String(err.code || '');

        this.logger.error(
          `Error sending notification for schedule ${schedule.uuid}: ${errMessage}`,
          errStack,
        );

        // Check if the error is due to an invalid/unregistered FCM token
        const isInvalidToken =
          errCode === 'messaging/registration-token-not-registered' ||
          errCode === 'messaging/invalid-registration-token' ||
          errMessage.includes('Requested entity was not found');

        if (isInvalidToken && schedule.user?.uuid) {
          try {
            this.logger.warn(
              `FCM token for user ${schedule.user.uuid} is invalid or not registered. Clearing token to avoid repeated failures.`,
            );
            await this.userService.clearNotificationToken(schedule.user.uuid);
            clearedUsers.add(schedule.user.uuid);
            schedule.user.notificationToken = null;
          } catch (dbError) {
            const dbErr = dbError as Record<string, unknown>;
            const dbErrMessage = String(dbErr.message || '');
            const dbErrStack = String(dbErr.stack || '');
            this.logger.error(
              `Failed to clear FCM token for user ${schedule.user.uuid}: ${dbErrMessage}`,
              dbErrStack,
            );
          }
        }
      }
    }
  }
}
