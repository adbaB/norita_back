import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalsService } from './services/goals.service';
import { GoalsController } from './controllers/goals.controller';
import { Goal } from './entities/goal.entity';
import { UserGoal } from './entities/user-goal.entity';
import { SectionSubscriber } from './subscribers/section.subscriber';
import { LessonProgressModule } from '../lessonProgress/lessonProgress.module';
import { LessonsModule } from '../lessons/lessons.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Goal, UserGoal]),
    LessonProgressModule,
    LessonsModule,
    UsersModule,
  ],
  controllers: [GoalsController],
  providers: [GoalsService, SectionSubscriber],
  exports: [GoalsService],
})
export class GoalsModule {}
