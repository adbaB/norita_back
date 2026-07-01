import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/role.decorator';
import { RoleEnum } from '../../users/enum/role.enum';
import { ApiResponse as ClassApiResponse, DeleteResponse } from '../../utils/responses';
import { DifficultyEnum } from '../../lessons/enums/difficulty.enum';
import { UpdateActivityDTO } from '../dtos/activity.dto';
import { Activity } from '../entities/activity.entity';
import { ActivityService } from '../services/activity.service';

@ApiTags('Activities')
@ApiBearerAuth()
@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  // ── READ ─────────────────────────────────────────────────────────────────────

  @ApiResponse({
    status: 200,
    type: [Activity],
    description: 'Activities of a lesson filtered by difficulty',
  })
  @ApiResponse({ status: 400, description: 'Invalid difficulty value or UUID' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({
    summary: 'Get activities of a lesson filtered by difficulty',
    description:
      'Returns all activities of the given lesson matching the difficulty level. ' +
      'Accepted difficulty values: 1 (easy), 2 (intermediate), 3 (hard)',
  })
  @Get('/lesson/:lessonUuid/difficulty/:level')
  async findByDifficulty(
    @Param('lessonUuid', ParseUUIDPipe) lessonUuid: string,
    @Param('level', new ParseEnumPipe(DifficultyEnum)) level: DifficultyEnum,
  ): Promise<Activity[]> {
    return this.activityService.findByDifficulty(lessonUuid, level);
  }

  @ApiResponse({ status: 200, type: [Activity], description: 'List of activities for a content' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({ summary: 'Get all activities for a given lesson content UUID' })
  @Get('by-content/:contentUuid')
  async findByContent(
    @Param('contentUuid', ParseUUIDPipe) contentUuid: string,
  ): Promise<Activity[]> {
    return this.activityService.findByContent(contentUuid);
  }

  @ApiResponse({ status: 200, type: Activity, description: 'Activity found' })
  @ApiResponse({ status: 404, description: 'Activity not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({ summary: 'Get a single activity by UUID (includes options)' })
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
