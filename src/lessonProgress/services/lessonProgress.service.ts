import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
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
import { TypeUnlockEnum } from '../enums/type-unlock.enum';

@Injectable()
export class LessonProgressService {
  constructor(
    @InjectRepository(LessonProgress)
    private readonly lessonProgressRepo: Repository<LessonProgress>,
    @Inject(forwardRef(() => LessonsService)) private readonly lessonsService: LessonsService,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
  ) {}

  async addInitialProgress(user: User): Promise<void> {
    const lesson = await this.lessonsService.getFirstLesson();

    if (!lesson) {
      throw new UnprocessableEntityException('No lessons found');
    }
    const lessonProgress = this.lessonProgressRepo.create({
      user,
      lesson,
      completed: false,
      dateCompleted: null,
      lastLineSeen: 0,
      unlockedAt: new Date(),
      isUnlocked: true,
    });

    await this.lessonProgressRepo.save(lessonProgress);
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
    if (!lessonProgress.isUnlocked) {
      throw new ConflictException('Lesson is not unlocked');
    }

    lessonProgress.lastLineSeen = dto.lastLineSeen;

    if (dto.rewardClaimed && !lessonProgress.rewardClaimed) {
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

    if (!lessonProgress.isUnlocked) {
      throw new ConflictException('cannot complete a locked lesson');
    }

    lessonProgress.completed = true;
    lessonProgress.dateCompleted = new Date();

    await this.addNextLesson(userUUID, lessonUUID);
    await this.lessonProgressRepo.save(lessonProgress);
    return {
      affected: 1,
      status: 200,
    };
  }

  private async addNextLesson(userUUID: string, lessonUUID: string): Promise<void> {
    const nextLesson = await this.lessonsService.getNextLesson(lessonUUID);
    if (!nextLesson) {
      throw new NotFoundException('No next lesson found');
    }
    const lessonProgress = await this.lessonProgressRepo.findOne({
      where: { user: { uuid: userUUID }, lesson: { uuid: nextLesson.uuid } },
    });
    if (lessonProgress) {
      throw new ConflictException('Next lesson already unlocked');
    }

    const user = await this.usersService.findByUUID(userUUID);
    if (!user) {
      throw new NotFoundException('No user found');
    }
    const unlockedAt = moment().add(nextLesson.timeToUnlock, 'hour').toDate();

    const newLessonProgress = this.lessonProgressRepo.create({
      user: { uuid: userUUID },
      lesson: nextLesson,
      completed: false,
      dateCompleted: null,
      lastLineSeen: 0,
      unlockedAt,
    });
    await this.lessonProgressRepo.save(newLessonProgress);
  }

  @Transactional()
  async unlockLesson(
    userUUID: string,
    lessonUUID: string,
    unlockType: TypeUnlockEnum,
  ): Promise<LessonProgress> {
    const lesson = await this.lessonsService.findByUUID(lessonUUID);
    if (!lesson) {
      throw new NotFoundException('No lesson found');
    }

    const user = await this.usersService.findByUUID(userUUID);
    if (!user) {
      throw new NotFoundException('No user found');
    }

    const existingProgress = await this.lessonProgressRepo.findOne({
      where: { user: { uuid: userUUID }, lesson: { uuid: lessonUUID } },
    });

    let coinsToDecrease = 0;
    let newLessonProgress: LessonProgress | null = null;

    switch (unlockType) {
      case TypeUnlockEnum.BASIC:
        if (!existingProgress) {
          throw new ConflictException('cannot unlock a lesson that is not started');
        }
        if (!existingProgress.canUnlock()) {
          throw new ConflictException('Lesson is already locked');
        }
        coinsToDecrease = lesson.coinsNeededUnlockWithRequirements;
        existingProgress.typeUnlock = TypeUnlockEnum.BASIC;
        existingProgress.isUnlocked = true;
        break;
      case TypeUnlockEnum.GEMS:
        if (existingProgress) {
          newLessonProgress = existingProgress;
        }
        coinsToDecrease = lesson.coinsNeededUnlockWithoutRequirements;
        newLessonProgress.typeUnlock = TypeUnlockEnum.GEMS;
        newLessonProgress.unlockedAt = new Date();
        newLessonProgress.isUnlocked = true;
        break;
      case TypeUnlockEnum.PREMIUM:
        if (!user.isPremiun) {
          throw new ConflictException('User is not premium');
        }
        if (existingProgress) {
          newLessonProgress = existingProgress;
        }
        coinsToDecrease = 0;
        newLessonProgress.typeUnlock = TypeUnlockEnum.PREMIUM;
        newLessonProgress.unlockedAt = new Date();
        newLessonProgress.isUnlocked = true;
        break;
    }

    await this.usersService.decreaseCoins(userUUID, coinsToDecrease);

    if (unlockType === TypeUnlockEnum.BASIC) {
      return this.lessonProgressRepo.save(existingProgress);
    }
    if (unlockType === TypeUnlockEnum.PREMIUM || unlockType === TypeUnlockEnum.GEMS) {
      if (!newLessonProgress) {
        newLessonProgress = this.lessonProgressRepo.create({
          user,
          lesson,
          completed: false,
          dateCompleted: null,
          lastLineSeen: 0,
          unlockedAt: new Date(),
          typeUnlock: unlockType,
          isUnlocked: true,
        });
      }
      return this.lessonProgressRepo.save(newLessonProgress);
    }
  }
}
