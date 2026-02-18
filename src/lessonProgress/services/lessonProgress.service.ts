import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as moment from 'moment';

import { Transactional } from 'typeorm-transactional';
import { LessonsService } from '../../lessons/services/lessons.service';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';
import { UpdateResponse } from '../../utils/responses';
import { updateLessonProgressDTO } from '../dto/updateLessonProgress.dto';
import { LessonProgress } from '../entity/lessonProgress.entity';
import { LessonCompletedEvent } from '../../schedules/events/lesson-completed.event';
import { LessonAccessService } from '../../lessonAccess/services/lesson-access.service';

@Injectable()
export class LessonProgressService {
  constructor(
    @InjectRepository(LessonProgress)
    private readonly lessonProgressRepo: Repository<LessonProgress>,
    @Inject(forwardRef(() => LessonsService)) private readonly lessonsService: LessonsService,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
    private readonly eventEmitter: EventEmitter2,
    @Inject(forwardRef(() => LessonAccessService))
    private readonly lessonAccessService: LessonAccessService,
  ) {}

  async addInitialProgress(user: User): Promise<void> {
    const lesson = await this.lessonsService.getFirstLesson();

    if (!lesson) {
      throw new NotFoundException('No lessons found');
    }
    const lessonProgress = this.lessonProgressRepo.create({
      user,
      lesson,
      completed: false,
      dateCompleted: null,
      lastLineSeen: 0,
    });

    await this.lessonProgressRepo.save(lessonProgress);

    // Only create access record for non-premium users
    if (!user.isPremium) {
      await this.lessonAccessService.createInitialAccess(user, lesson);
    }
  }

  async updateLessonProgress(
    userUUID: string,
    lessonUUID: string,
    dto: updateLessonProgressDTO,
  ): Promise<UpdateResponse> {
    const lessonProgress = await this.lessonProgressRepo.findOne({
      where: { user: { uuid: userUUID }, lesson: { uuid: lessonUUID } },
      relations: {
        lesson: true,
      },
    });
    if (!lessonProgress) {
      throw new NotFoundException('No lesson progress found');
    }

    lessonProgress.lastLineSeen = dto.lastLineSeen;

    if (dto.hasSeenAlertShip !== undefined) {
      lessonProgress.hasSeenAlertShip = dto.hasSeenAlertShip;
    }

    if (dto.rewardClaimed && !lessonProgress.rewardClaimed) {
      if (lessonProgress.hasSeenAlertShip) {
        throw new ConflictException('Cannot claim reward if the user has seen the alert ship');
      }
      lessonProgress.rewardClaimed = true;
      lessonProgress.dateRewardClaimed = new Date();
      await this.usersService.increaseCoins(userUUID, lessonProgress?.lesson?.reward);
    }

    await this.lessonProgressRepo.save(lessonProgress);

    return {
      affected: 1,
      status: 200,
    };
  }

  @Transactional()
  async completeLesson(userUUID: string, lessonUUID: string): Promise<UpdateResponse> {
    const lessonProgress = await this.lessonProgressRepo.findOne({
      where: { user: { uuid: userUUID }, lesson: { uuid: lessonUUID } },
    });
    if (!lessonProgress) {
      throw new NotFoundException('No lesson progress found');
    }

    const lesson = await this.lessonsService.findByUUID(lessonUUID);
    if (!lesson) {
      throw new NotFoundException('No lesson found');
    }

    if (lessonProgress.completed) {
      throw new ConflictException('Lesson already completed');
    }

    lessonProgress.completed = true;
    lessonProgress.dateCompleted = new Date();

    const nextLessonAccess = await this.addNextLesson(userUUID, lessonUUID);
    await this.lessonProgressRepo.save(lessonProgress);

    // Emitir evento para crear notificación de la siguiente lección
    if (nextLessonAccess) {
      this.eventEmitter.emit(
        'lesson.completed',
        new LessonCompletedEvent(userUUID, lessonUUID, nextLessonAccess.unlockedAt),
      );
    }

    return {
      affected: 1,
      status: 200,
    };
  }

  private async addNextLesson(
    userUUID: string,
    lessonUUID: string,
  ): Promise<{ unlockedAt: Date } | null> {
    const nextLesson = await this.lessonsService.getNextLesson(lessonUUID);
    if (!nextLesson) {
      return null;
    }

    // Check if progress already exists
    const existingProgress = await this.lessonProgressRepo.findOne({
      where: { user: { uuid: userUUID }, lesson: { uuid: nextLesson.uuid } },
    });
    if (existingProgress) {
      throw new ConflictException('Next lesson already exists');
    }

    const user = await this.usersService.findByUUID(userUUID);
    if (!user) {
      throw new NotFoundException('No user found');
    }

    const unlockedAt = moment().add(nextLesson.timeToUnlock, 'hour').toDate();

    // Create progress record (always exists)
    const newLessonProgress = this.lessonProgressRepo.create({
      user: { uuid: userUUID },
      lesson: nextLesson,
      completed: false,
      dateCompleted: null,
      lastLineSeen: 0,
    });
    await this.lessonProgressRepo.save(newLessonProgress);

    // Only create access record for non-premium users
    if (!user.isPremium) {
      const nextAccess = await this.lessonAccessService.createNextLessonAccess(
        userUUID,
        nextLesson,
        unlockedAt,
      );
      return { unlockedAt: nextAccess.unlockedAt };
    }

    return { unlockedAt };
  }
}
