import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsModule } from '../lessons/lessons.module';
import { UsersModule } from '../users/users.module';
import { LessonAccessModule } from '../lessonAccess/lesson-access.module';
import { LessonProgressController } from './controllers/lessonProgress.controller';
import { LessonProgress } from './entity/lessonProgress.entity';
import { LessonProgressService } from './services/lessonProgress.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LessonProgress]),
    forwardRef(() => LessonsModule),
    forwardRef(() => UsersModule),
    forwardRef(() => LessonAccessModule),
  ],
  controllers: [LessonProgressController],
  providers: [LessonProgressService],
  exports: [LessonProgressService],
})
export class LessonProgressModule {}
