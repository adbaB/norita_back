import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonSessionsService } from './lesson-sessions.service';
import { LessonSessionsController } from './lesson-sessions.controller';
import { LessonSession } from './entities/lesson-session.entity';
import { SessionExercise } from './entities/session-exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LessonSession, SessionExercise])],
  controllers: [LessonSessionsController],
  providers: [LessonSessionsService],
  exports: [LessonSessionsService],
})
export class LessonSessionsModule {}
