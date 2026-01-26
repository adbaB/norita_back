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
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
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
  @Put('/like')
  async updateLikes(
    @User('uuid') userUuid: string,
    @Body() userLikes: LikesDto[],
  ): Promise<UpdateResponse> {
    return this.userLikesService.updateLikes(userUuid, userLikes);
  }

  @Put('/:uuid')
  async update(
    @User('uuid') userUuid: string,
    @Param('uuid') uuid: string,
    @Body() dto: UpdateCommentDto,
  ): Promise<Comments> {
    return this.commentsService.update(uuid, userUuid, dto);
  }

  @Delete('/:uuid')
  async delete(@User('uuid') userUuid: string, @Param('uuid') uuid: string): Promise<void> {
    return this.commentsService.delete(uuid, userUuid);
  }
}
