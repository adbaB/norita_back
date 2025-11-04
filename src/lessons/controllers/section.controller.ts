import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { IsPublic } from '../../auth/decorators/isPublic.decorator';
import { User } from '../../users/decorators/user.decorator';
import { Section } from '../entities/section.entity';
import { SectionService } from '../services/section.service';

@ApiBearerAuth()
@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @ApiResponse({ status: 200, type: [Section], description: 'Success' })
  @ApiResponse({ status: '5XX', description: 'Internal error' })
  @IsPublic()
  @Get()
  async findAll(@User() userUUID: string): Promise<Section[]> {
    console.log('userUUID', userUUID);
    return this.sectionService.findAll(userUUID);
  }
}
