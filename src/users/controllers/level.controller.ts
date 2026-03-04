import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IsPublic } from '../../auth/decorators/isPublic.decorator';
import { Level } from '../entities/level.entity';
import { LevelService } from '../services/level.service';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @ApiResponse({ status: 200, type: [Level], description: 'Success' })
  @ApiResponse({ status: '5XX', description: 'Internal error' })
  @IsPublic()
  @ApiOperation({ summary: 'Retrieve all experience levels and their thresholds' })
  @Get()
  async findAll(): Promise<Level[]> {
    return this.levelService.findAll();
  }
}
