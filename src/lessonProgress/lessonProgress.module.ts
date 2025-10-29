import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsModule } from '../lessons/lessons.module';
import { UsersModule } from '../users/users.module';
import { LessonProgressController } from './controllers/lessonProgress.controller';
import { LessonProgress } from './entity/lessonProgress.entity';
import { LessonProgressService } from './services/lessonProgress.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LessonProgress]),
    forwardRef(() => LessonsModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [LessonProgressController],
  providers: [LessonProgressService],
  exports: [LessonProgressService],
})
export class LessonProgressModule {}
