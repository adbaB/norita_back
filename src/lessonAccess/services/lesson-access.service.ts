import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Transactional } from 'typeorm-transactional';
import { LessonsService } from '../../lessons/services/lessons.service';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';
import { LessonAccess } from '../entity/lesson-access.entity';
import { TypeUnlockEnum } from '../enums/type-unlock.enum';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Injectable()
export class LessonAccessService {
  constructor(
    @InjectRepository(LessonAccess)
    private readonly lessonAccessRepo: Repository<LessonAccess>,
    @Inject(forwardRef(() => LessonsService)) private readonly lessonsService: LessonsService,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
  ) {}

  async createInitialAccess(user: User, lesson: Lesson): Promise<void> {
    const lessonAccess = this.lessonAccessRepo.create({
      user,
      lesson,
      unlockedAt: new Date(),
      isUnlocked: true,
    });
    await this.lessonAccessRepo.save(lessonAccess);
  }

  async createNextLessonAccess(
    userUUID: string,
    lesson: Lesson,
    unlockedAt: Date,
  ): Promise<LessonAccess> {
    const lessonAccess = this.lessonAccessRepo.create({
      user: { uuid: userUUID },
      lesson,
      unlockedAt,
      isUnlocked: false,
    });
    return this.lessonAccessRepo.save(lessonAccess);
  }

  async isLessonUnlocked(userUUID: string, lessonUUID: string): Promise<boolean> {
    // Premium users always have access
    const user = await this.usersService.findByUUID(userUUID);
    if (user?.isPremium) {
      return true;
    }

    const access = await this.lessonAccessRepo.findOne({
      where: { user: { uuid: userUUID }, lesson: { uuid: lessonUUID } },
    });
    return access?.isUnlocked ?? false;
  }

  async findAccess(userUUID: string, lessonUUID: string): Promise<LessonAccess | null> {
    return this.lessonAccessRepo.findOne({
      where: { user: { uuid: userUUID }, lesson: { uuid: lessonUUID } },
    });
  }

  @Transactional()
  async unlockLesson(
    userUUID: string,
    lessonUUID: string,
    unlockType: TypeUnlockEnum,
  ): Promise<LessonAccess> {
    const lesson = await this.lessonsService.findByUUID(lessonUUID);
    if (!lesson) {
      throw new NotFoundException('No lesson found');
    }

    const user = await this.usersService.findByUUID(userUUID);
    if (!user) {
      throw new NotFoundException('No user found');
    }

    const existingAccess = await this.lessonAccessRepo.findOne({
      where: { user: { uuid: userUUID }, lesson: { uuid: lessonUUID } },
    });

    let coinsToDecrease = 0;
    let accessToSave: LessonAccess | null = null;

    switch (unlockType) {
      case TypeUnlockEnum.BASIC:
        if (!existingAccess) {
          throw new ConflictException('Cannot unlock a lesson that is not started');
        }
        if (!existingAccess.canUnlock()) {
          throw new ConflictException('Lesson cannot be unlocked yet');
        }
        coinsToDecrease = lesson.coinsNeededUnlockWithRequirements;
        existingAccess.typeUnlock = TypeUnlockEnum.BASIC;
        existingAccess.isUnlocked = true;
        accessToSave = existingAccess;
        break;
      case TypeUnlockEnum.GEMS:
        if (!existingAccess) {
          accessToSave = this.lessonAccessRepo.create({
            user,
            lesson,
            unlockedAt: new Date(),
            typeUnlock: TypeUnlockEnum.GEMS,
            isUnlocked: true,
          });
        } else {
          accessToSave = existingAccess;
        }
        coinsToDecrease = lesson.coinsNeededUnlockWithoutRequirements;
        accessToSave.typeUnlock = TypeUnlockEnum.GEMS;
        accessToSave.isUnlocked = true;
        break;
      case TypeUnlockEnum.PREMIUM:
        if (!user.isPremium) {
          throw new ConflictException('User is not premium');
        }
        if (!existingAccess) {
          accessToSave = this.lessonAccessRepo.create({
            user,
            lesson,
            unlockedAt: new Date(),
            typeUnlock: TypeUnlockEnum.PREMIUM,
            isUnlocked: true,
          });
        } else {
          accessToSave = existingAccess;
        }
        coinsToDecrease = 0;
        accessToSave.typeUnlock = TypeUnlockEnum.PREMIUM;
        accessToSave.isUnlocked = true;
        break;
    }

    if (coinsToDecrease > 0) {
      if (user.coin < coinsToDecrease) {
        throw new ConflictException('Insufficient coins to unlock lesson');
      }
      await this.usersService.decreaseCoins(userUUID, coinsToDecrease);
    }

    return this.lessonAccessRepo.save(accessToSave);
  }
}
