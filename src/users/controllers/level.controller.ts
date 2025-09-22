import { Controller, Get } from '@nestjs/common';
import { IsPublic } from '../../auth/decorators/isPublic.decorator';
import { Level } from '../entities/level.entity';
import { LevelService } from '../services/level.service';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @IsPublic()
  @Get()
  async findAll(): Promise<Level[]> {
    return this.levelService.findAll();
  }
}
