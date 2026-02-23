import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateGoalDto {
  @ApiPropertyOptional({ description: 'Title of the goal', type: String })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: 'Description of the goal', type: String })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Reward for completing the goal', type: Number })
  @IsInt()
  @Min(0)
  @IsOptional()
  reward?: number;
}
