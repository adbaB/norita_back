import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { IsPublic } from '../../auth/decorators/isPublic.decorator';
import { Lesson } from '../entities/lesson.entity';
import { LessonsService } from '../services/lessons.service';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiResponse({ status: 200, type: Lesson, description: 'Success' })
  @IsPublic()
  @Get('/:uuid')
  async findByUUID(@Param('uuid') uuid: string): Promise<Lesson> {
    return this.lessonsService.findByUUID(uuid);
  }
}
