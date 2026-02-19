import { Controller, Post, Param, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { GoalsService } from '../services/goals.service';

import { UserGoal } from '../entities/user-goal.entity';
import { Goal } from '../entities/goal.entity';
import { User } from 'src/users/decorators/user.decorator';

@ApiTags('Goals')
@Controller('goals')
@ApiBearerAuth()
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post('claim/:uuid')
  @ApiOperation({ summary: 'Claim a goal' })
  @ApiOkResponse({ type: UserGoal })
  async claimGoal(@Param('uuid') uuid: string, @User() userUUID: string): Promise<UserGoal> {
    return this.goalsService.claimGoal(userUUID, uuid);
  }

  @Get()
  @ApiOperation({ summary: 'List all goals' })
  @ApiOkResponse({ type: [Goal] })
  async findAll(): Promise<Goal[]> {
    return this.goalsService.findAll();
  }
}
