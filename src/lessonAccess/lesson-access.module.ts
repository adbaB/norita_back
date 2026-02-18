import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsModule } from '../lessons/lessons.module';
import { UsersModule } from '../users/users.module';
import { LessonAccessController } from './controllers/lesson-access.controller';
import { LessonAccess } from './entity/lesson-access.entity';
import { LessonAccessGuard } from './guards/lesson-access.guard';
import { LessonAccessService } from './services/lesson-access.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LessonAccess]),
    forwardRef(() => LessonsModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [LessonAccessController],
  providers: [LessonAccessService, LessonAccessGuard],
  exports: [LessonAccessService, LessonAccessGuard],
})
export class LessonAccessModule {}
