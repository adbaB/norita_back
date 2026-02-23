import { Controller, Param, Get, Patch, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiOkResponse, ApiBody } from '@nestjs/swagger';
import { GoalsService } from '../services/goals.service';

import { UserGoal } from '../entities/user-goal.entity';
import { Goal } from '../entities/goal.entity';
import { User } from 'src/users/decorators/user.decorator';
import { UpdateGoalDto } from '../dto/update-goal.dto';
import { RoleEnum } from 'src/users/enum/role.enum';
import { Roles } from 'src/auth/decorators/role.decorator';

@ApiTags('Goals')
@Controller('goals')
@ApiBearerAuth()
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Patch('claim/:uuid')
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

  @Put(':uuid')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Update a goal (title, description, reward)' })
  @ApiBody({ type: UpdateGoalDto })
  @ApiOkResponse({ type: Goal })
  async update(@Param('uuid') uuid: string, @Body() updateGoalDto: UpdateGoalDto): Promise<Goal> {
    return this.goalsService.update(uuid, updateGoalDto);
  }
}
