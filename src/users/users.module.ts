import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LevelController } from './controllers/level.controller';
import { UserImagesController } from './controllers/userImages.controller';
import { UsersController } from './controllers/users.controller';

import { Level } from './entities/level.entity';
import { User } from './entities/user.entity';
import { UserImages } from './entities/userImages.entity';

import { LessonProgressModule } from '../lessonProgress/lessonProgress.module';
import { LevelService } from './services/level.service';
import { UserImagesService } from './services/userImages.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Level, UserImages]), LessonProgressModule],
  controllers: [UsersController, LevelController, UserImagesController],
  providers: [UsersService, LevelService, UserImagesService],
  exports: [UsersService],
})
export class UsersModule {}
