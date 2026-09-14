import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { Roles } from '../../auth/decorators/role.decorator';
import { User } from '../../users/decorators/user.decorator';
import { RoleEnum } from '../../users/enum/role.enum';
import {
  ApiResponse as ClassApiResponse,
  DeleteResponse,
  PaginatedResponse,
} from '../../utils/responses';
import { Paginate } from '../../utils/models/paginate-request';
import { CreateActivityDTO, GetRandomExercisesDto, UpdateActivityDTO } from '../dtos/activity.dto';
import { Activity } from '../entities/activity.entity';
import { ActivityService } from '../services/activity.service';

class AttachToLessonDto {
  @IsInt()
  @Min(0)
  order: number;
}

@ApiTags('Activities')
@ApiBearerAuth()
@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  // ── CREATE ───────────────────────────────────────────────────────────────────

  @ApiResponse({ status: 201, type: Activity, description: 'Activity created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({
    summary: 'Create a standalone activity (admin only)',
    description:
      'Creates an activity without associating it to any lesson. Use the attach endpoint to link it to lessons.',
  })
  @Roles(RoleEnum.ADMIN)
  @Post()
  async createStandalone(@Body() dto: CreateActivityDTO): Promise<Activity> {
    return this.activityService.createStandalone(dto);
  }

  // ── LINK / UNLINK ─────────────────────────────────────────────────────────────

  @ApiResponse({ status: 204, description: 'Activity linked to lesson' })
  @ApiResponse({ status: 400, description: 'Already linked' })
  @ApiResponse({ status: 404, description: 'Activity or lesson not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Link an activity to a lesson (admin only)' })
  @ApiBody({ schema: { properties: { order: { type: 'number', example: 1 } } } })
  @Roles(RoleEnum.ADMIN)
  @Post(':uuid/lessons/:lessonUuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async attachToLesson(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Param('lessonUuid', ParseUUIDPipe) lessonUuid: string,
    @Body() body: AttachToLessonDto,
  ): Promise<void> {
    return this.activityService.attachToLesson(uuid, lessonUuid, body.order ?? 0);
  }

  @ApiResponse({ status: 204, description: 'Activity unlinked from lesson' })
  @ApiResponse({ status: 404, description: 'Activity or link not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Unlink an activity from a lesson (admin only)' })
  @Roles(RoleEnum.ADMIN)
  @Delete(':uuid/lessons/:lessonUuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async detachFromLesson(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Param('lessonUuid', ParseUUIDPipe) lessonUuid: string,
  ): Promise<void> {
    return this.activityService.detachFromLesson(uuid, lessonUuid);
  }

  // ── READ ─────────────────────────────────────────────────────────────────────

  @ApiResponse({ status: 200, description: 'Paginated list of all activities' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Get all activities with pagination (admin only)' })
  @Roles(RoleEnum.ADMIN)
  @Get()
  async findAll(@Query() paginate: Paginate): Promise<PaginatedResponse<Activity[]>> {
    const result = await this.activityService.findAll(paginate.limit, paginate.page);
    return new PaginatedResponse<Activity[]>(
      true,
      'Activities fetched successfully',
      result.data,
      result.info,
    );
  }

  @ApiResponse({
    status: 200,
    type: [Activity],
    description: 'Activities for a lesson (filtered by lesson typeCounts if configured)',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({
    summary: 'Get activities linked to a lesson (respects lesson typeCounts unless all=true)',
  })
  @ApiQuery({
    name: 'all',
    required: false,
    type: Boolean,
    description:
      'If true, returns all activities linked to the lesson without filtering by lesson typeCounts',
  })
  @Get('lesson/:lessonUuid')
  async findByLesson(
    @Param('lessonUuid', ParseUUIDPipe) lessonUuid: string,
    @Query('all') all?: string,
  ): Promise<Activity[]> {
    const isAll = all === 'true' || all === '1';
    return this.activityService.findByLesson(lessonUuid, isAll);
  }

  @ApiResponse({
    status: 200,
    description: 'Random exercises of a given difficulty and preview of the next one',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({
    summary: 'Get random activities of a specific difficulty, plus preview from the next level',
  })
  @Get('lesson/:lessonUuid/random')
  async getRandomExercises(
    @Param('lessonUuid', ParseUUIDPipe) lessonUuid: string,
    @Query() dto: GetRandomExercisesDto,
    @User() userId?: string,
  ): Promise<{ requested: Activity[]; preview: Activity[] }> {
    return this.activityService.findRandomByDifficulty(
      lessonUuid,
      dto.difficulty,
      dto.count,
      dto.previewCount,
      userId,
      dto.typeCounts,
    );
  }

  @ApiResponse({ status: 200, type: Activity, description: 'Activity found' })
  @ApiResponse({ status: 404, description: 'Activity not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({ summary: 'Get a single activity by UUID (includes options and lessons)' })
  @Get(':uuid')
  async findOne(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<Activity> {
    return this.activityService.findOne(uuid);
  }

  // ── WRITE (admin only) ────────────────────────────────────────────────────────

  @ApiResponse({ status: 200, type: ClassApiResponse, description: 'Activity updated' })
  @ApiResponse({ status: 404, description: 'Activity not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({
    summary: 'Partially update an activity and replace its options (admin only)',
    description:
      'If "options" is included in the body, all existing options are deleted and replaced with the new ones. Omit "options" to keep existing options unchanged.',
  })
  @Roles(RoleEnum.ADMIN)
  @Patch(':uuid')
  async updateOne(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: UpdateActivityDTO,
  ): Promise<Activity> {
    return this.activityService.updateOne(uuid, dto);
  }

  @ApiResponse({ status: 200, type: ClassApiResponse, description: 'Activity deleted' })
  @ApiResponse({ status: 404, description: 'Activity not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Delete an activity and all its options (admin only)' })
  @Roles(RoleEnum.ADMIN)
  @Delete(':uuid')
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<DeleteResponse> {
    return this.activityService.delete(uuid);
  }

  @ApiResponse({ status: 200, type: ClassApiResponse, description: 'Option deleted' })
  @ApiResponse({ status: 404, description: 'Option not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Delete a single activity option (admin only)' })
  @Roles(RoleEnum.ADMIN)
  @Delete('options/:uuid')
  async deleteOption(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<DeleteResponse> {
    return this.activityService.deleteOption(uuid);
  }
}
