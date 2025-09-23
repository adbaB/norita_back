import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { IsPublic } from '../../auth/decorators/isPublic.decorator';
import { Section } from '../entities/section.entity';
import { SectionService } from '../services/section.service';

@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @ApiResponse({ status: 200, type: [Section], description: 'Success' })
  @ApiResponse({ status: '5XX', description: 'Internal error' })
  @IsPublic()
  @Get()
  async findAll(): Promise<Section[]> {
    return this.sectionService.findAll();
  }
}
