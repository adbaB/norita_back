import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { IsPublic } from '../../auth/decorators/isPublic.decorator';
import { LessonDTO } from '../dto/lesson.dto';
import { Lesson } from '../entities/lesson.entity';
import { LessonsService } from '../services/lessons.service';
import { CreatedResponse } from '../../utils/responses';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiResponse({ status: 200, type: Lesson, description: 'Success' })
  @IsPublic()
  @Get('/:uuid')
  async findByUUID(@Param('uuid') uuid: string): Promise<Lesson> {
    return this.lessonsService.findByUUID(uuid);
  }

  @ApiResponse({ status: 201, type: Lesson, description: 'Created' })
  @IsPublic()
  @Post()
  async create(@Body() lesson: LessonDTO): Promise<CreatedResponse<Lesson>> {
    return this.lessonsService.create(lesson);
  }
}
