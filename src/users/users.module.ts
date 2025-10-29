import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LevelController } from './controllers/level.controller';
import { UsersController } from './controllers/users.controller';

import { Level } from './entities/level.entity';
import { User } from './entities/user.entity';

import { LessonProgressModule } from '../lessonProgress/lessonProgress.module';
import { LevelService } from './services/level.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Level]), LessonProgressModule],
  controllers: [UsersController, LevelController],
  providers: [UsersService, LevelService],
  exports: [UsersService],
})
export class UsersModule {}
