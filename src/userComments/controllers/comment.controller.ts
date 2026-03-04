import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { User } from '../../users/decorators/user.decorator';
import { FormatResponse, PaginatedResponse, UpdateResponse } from '../../utils/responses';
import { CreateCommentDto, UpdateCommentDto } from '../dto/comments.dto';
import { LikesDto } from '../dto/likes.dto';
import { Comments } from '../entities/comments.entity';
import { StatsResponse } from '../interfaces/stats.reponse';
import { CommentsService } from '../services/comment.service';
import { UserLikesService } from '../services/userLikes.service';

@ApiBearerAuth()
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly userLikesService: UserLikesService,
  ) {}

  @ApiOperation({ summary: 'Create a new comment on a lesson' })
  @Post('/')
  async create(@User('uuid') userUuid: string, @Body() dto: CreateCommentDto): Promise<Comments> {
    return this.commentsService.create(dto, userUuid);
  }

  @ApiOperation({ summary: 'Get statistics (e.g., total comments, likes) for a specific lesson' })
  @Get('/stats/:uuid')
  async findStats(@Param('uuid') uuid: string): Promise<StatsResponse> {
    return this.commentsService.findStats(uuid);
  }

  @ApiOperation({ summary: 'Retrieve paginated comments for a specific lesson' })
  @Get('/:uuid')
  async find(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
    @Param('uuid') uuid: string,
    @User() user: string,
  ): Promise<FormatResponse<Comments>> {
    const comments = await this.commentsService.findAll({ lessonUuid: uuid, limit, page }, user);
    return new PaginatedResponse(
      true,
      'Comments fetched successfully',
      comments.data,
      comments.info,
    );
  }

  @ApiResponse({ status: 200, type: UpdateResponse })
  @ApiBody({ type: [LikesDto] })
  @ApiOperation({ summary: 'Update the user likes or dislikes for specific comments' })
  @Put('/like')
  async updateLikes(
    @User('uuid') userUuid: string,
    @Body() userLikes: LikesDto[],
  ): Promise<UpdateResponse> {
    return this.userLikesService.updateLikes(userUuid, userLikes);
  }

  @ApiOperation({ summary: 'Edit and update the content of an existing comment' })
  @Put('/:uuid')
  async update(
    @User('uuid') userUuid: string,
    @Param('uuid') uuid: string,
    @Body() dto: UpdateCommentDto,
  ): Promise<Comments> {
    return this.commentsService.update(uuid, userUuid, dto);
  }

  @ApiOperation({ summary: 'Delete a specific comment by its unique identifier' })
  @Delete('/:uuid')
  async delete(@User('uuid') userUuid: string, @Param('uuid') uuid: string): Promise<void> {
    return this.commentsService.delete(uuid, userUuid);
  }
}
