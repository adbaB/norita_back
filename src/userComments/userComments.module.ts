import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsModule } from '../lessons/lessons.module';
import { CommentsController } from './controllers/comment.controller';
import { Comments } from './entities/comments.entity';
import { CommentsService } from './services/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comments]), LessonsModule],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class UserCommentsModule {}
