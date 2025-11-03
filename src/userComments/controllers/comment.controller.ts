import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { User } from '../../users/decorators/user.decorator';
import { FormatResponse } from '../../utils/responses';
import { CreateCommentDto } from '../dto/comments.dto';
import { Comments } from '../entities/comments.entity';
import { CommentsService } from '../services/comment.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('/')
  async create(@User('uuid') userUuid: string, @Body() dto: CreateCommentDto): Promise<Comments> {
    return this.commentsService.create(dto, userUuid);
  }

  @Get('/:uuid')
  async find(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
    @Param('uuid') uuid: string,
  ): Promise<FormatResponse<Comments>> {
    return this.commentsService.findAll({ lessonUuid: uuid, limit, page });
  }

  @Delete('/:uuid')
  async delete(@User('uuid') userUuid: string, @Param('uuid') uuid: string): Promise<void> {
    return this.commentsService.delete(uuid, userUuid);
  }
}
