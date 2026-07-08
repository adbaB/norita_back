import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Activity } from '../contentLessons/entities/activity.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { User } from '../users/entities/user.entity';

import { UserProgress } from './entities/user-progress.entity';
import { ExerciseStat } from './entities/exercise-stat.entity';
import { UserLessonStat } from './entities/user-lesson-stat.entity';

import { LearningController } from './learning.controller';
import { LearningService } from './learning.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity, Lesson, User, UserProgress, ExerciseStat, UserLessonStat]),
  ],
  controllers: [LearningController],
  providers: [LearningService],
  exports: [LearningService],
})
export class LearningModule {}
