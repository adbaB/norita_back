import { ApiProperty } from '@nestjs/swagger';
import { Goal } from '../entities/goal.entity';

export class GoalProgressResponseDto extends Goal {
  @ApiProperty({ description: 'Progress percentage of the goal', type: Number })
  progress: number;

  @ApiProperty({ description: 'Indicates if the goal is completed', type: Boolean })
  completed: boolean;

  @ApiProperty({ description: 'Indicates if the goal has been claimed', type: Boolean })
  isClaimed: boolean;
}
