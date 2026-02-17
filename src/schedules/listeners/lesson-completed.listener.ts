import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../entities/schedule.entity';
import { ScheduleTypeEnum } from '../enums/schedule-type.enum';
import { LessonCompletedEvent } from '../events/lesson-completed.event';

@Injectable()
export class LessonCompletedListener {
  private readonly logger = new Logger(LessonCompletedListener.name);

  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>,
  ) {}

  @OnEvent('lesson.completed')
  async handleLessonCompleted(event: LessonCompletedEvent): Promise<void> {
    try {
      this.logger.log(
        `Creating lesson notification for user ${event.userUuid}, unlock time: ${event.nextLessonUnlockTime}`,
      );

      const schedule = this.scheduleRepo.create({
        type: ScheduleTypeEnum.LESSON,
        user: { uuid: event.userUuid },
        scheduledFor: event.nextLessonUnlockTime,
        dayOfWeek: null,
        hour: null,
        timezone: null,
        lastSend: null,
      });

      await this.scheduleRepo.save(schedule);

      this.logger.log(`Lesson notification created successfully for user ${event.userUuid}`);
    } catch (error) {
      this.logger.error(
        `Error creating lesson notification for user ${event.userUuid}: ${error.message}`,
        error.stack,
      );
    }
  }
}
