import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsModule } from '../lessons/lessons.module';
import { CommentsController } from './controllers/comment.controller';
import { Comments } from './entities/comments.entity';
import { CommentsService } from './services/comment.service';
import { UserLikesService } from './services/userLikes.service';
import { UserLikes } from './entities/userLikes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comments, UserLikes]), LessonsModule],
  controllers: [CommentsController],
  providers: [CommentsService, UserLikesService],
  exports: [CommentsService],
})
export class UserCommentsModule {}
