import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsModule } from '../lessons/lessons.module';
import { LessonProgress } from './entity/lessonProgress.entity';
import { LessonProgressService } from './services/lessonProgress.service';

@Module({
  imports: [TypeOrmModule.forFeature([LessonProgress]), forwardRef(() => LessonsModule)],
  providers: [LessonProgressService],
  exports: [LessonProgressService],
})
export class LessonProgressModule {}
