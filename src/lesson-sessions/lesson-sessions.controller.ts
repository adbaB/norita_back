import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/decorators/user.decorator';
import { LessonSessionsService } from './lesson-sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { CompleteSessionDto } from './dto/complete-session.dto';
import { LessonSession } from './entities/lesson-session.entity';
import { FormatResponse, PaginatedResponse } from '../utils/responses';

@ApiTags('Lesson Sessions')
@ApiBearerAuth()
@Controller('lesson-sessions')
export class LessonSessionsController {
  constructor(private readonly sessionsService: LessonSessionsService) {}

  @ApiOperation({ summary: 'Start a new lesson session' })
  @ApiResponse({ status: 201, description: 'Session created' })
  @Post()
  async createSession(
    @User() userId: string,
    @Body() dto: CreateSessionDto,
  ): Promise<{ sessionId: string; startedAt: Date }> {
    return this.sessionsService.createSession(userId, dto);
  }

  @ApiOperation({ summary: 'Complete an existing lesson session' })
  @ApiResponse({ status: 200, description: 'Session completed and updated' })
  @Patch(':uuid/complete')
  async completeSession(
    @User() userId: string,
    @Param('uuid', ParseUUIDPipe) sessionId: string,
    @Body() dto: CompleteSessionDto,
  ): Promise<LessonSession> {
    return this.sessionsService.completeSession(userId, sessionId, dto);
  }

  @ApiOperation({ summary: 'Get history of sessions for a specific lesson' })
  @ApiResponse({ status: 200, type: [LessonSession] })
  @Get()
  async getUserSessionsByLesson(
    @User() userId: string,
    @Query('lessonId', ParseUUIDPipe) lessonId: string,
    @Query('limit', ParseIntPipe) limit: number = 20,
    @Query('page', ParseIntPipe) page: number = 1,
  ): Promise<FormatResponse<LessonSession>> {
    const sessions = await this.sessionsService.getUserSessionsByLesson(
      userId,
      lessonId,
      limit,
      page,
    );
    return new PaginatedResponse(
      true,
      'Sessions fetched successfully',
      sessions.data,
      sessions.info,
    ) as unknown as FormatResponse<LessonSession>;
  }

  @ApiOperation({ summary: 'Get details of a specific session' })
  @ApiResponse({ status: 200, type: LessonSession })
  @Get(':uuid')
  async getSessionDetails(
    @User() userId: string,
    @Param('uuid', ParseUUIDPipe) sessionId: string,
  ): Promise<LessonSession> {
    return this.sessionsService.getSessionDetails(userId, sessionId);
  }
}
