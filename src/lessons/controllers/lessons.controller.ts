import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { IsPublic } from '../../auth/decorators/isPublic.decorator';
import { Roles } from '../../auth/decorators/role.decorator';
import { User } from '../../users/decorators/user.decorator';
import { RoleEnum } from '../../users/enum/role.enum';
import { CreatedResponse, DeleteResponse, UpdateResponse } from '../../utils/responses';
import { LessonDTO, UpdateLessonDTO } from '../dto/lesson.dto';
import { Lesson } from '../entities/lesson.entity';
import { LessonsService } from '../services/lessons.service';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiResponse({ status: 200, type: Lesson, description: 'Success' })
  @Get('/:uuid')
  @IsPublic()
  async findByUUID(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @User() user: string,
  ): Promise<Lesson> {
    return this.lessonsService.findByUUID(uuid, user);
  }

  @ApiResponse({ status: 201, type: CreatedResponse<Lesson>, description: 'Created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Roles(RoleEnum.ADMIN)
  @Post()
  async create(@Body() lesson: LessonDTO): Promise<CreatedResponse<Lesson>> {
    return this.lessonsService.create(lesson);
  }

  @ApiResponse({ status: 200, type: UpdateResponse, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Roles(RoleEnum.ADMIN)
  @Put('/:uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() lesson: UpdateLessonDTO,
  ): Promise<UpdateResponse> {
    return this.lessonsService.update(uuid, lesson);
  }

  @ApiResponse({ status: 200, type: DeleteResponse, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Roles(RoleEnum.ADMIN)
  @Delete('/:uuid')
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<DeleteResponse> {
    return this.lessonsService.delete(uuid);
  }
}
