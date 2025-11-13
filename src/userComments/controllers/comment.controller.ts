import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../../users/decorators/user.decorator';
import { FormatResponse, PaginatedResponse } from '../../utils/responses';
import { CreateCommentDto } from '../dto/comments.dto';
import { Comments } from '../entities/comments.entity';
import { StatsResponse } from '../interfaces/stats.reponse';
import { CommentsService } from '../services/comment.service';

@ApiBearerAuth()
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('/')
  async create(@User('uuid') userUuid: string, @Body() dto: CreateCommentDto): Promise<Comments> {
    return this.commentsService.create(dto, userUuid);
  }

  @Get('/stats/:uuid')
  async findStats(@Param('uuid') uuid: string): Promise<StatsResponse> {
    return this.commentsService.findStats(uuid);
  }

  @Get('/:uuid')
  async find(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
    @Param('uuid') uuid: string,
  ): Promise<FormatResponse<Comments>> {
    const comments = await this.commentsService.findAll({ lessonUuid: uuid, limit, page });
    return new PaginatedResponse(
      true,
      'Comments fetched successfully',
      comments.data,
      comments.info,
    );
  }

  @Delete('/:uuid')
  async delete(@User('uuid') userUuid: string, @Param('uuid') uuid: string): Promise<void> {
    return this.commentsService.delete(uuid, userUuid);
  }
}
