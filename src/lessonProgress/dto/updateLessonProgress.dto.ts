import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class updateLessonProgressDTO {
  @ApiProperty({
    description: 'Last line seen',
    nullable: true,
    required: false,
    type: Number,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  lastLineSeen: number;

  @ApiProperty({
    description: 'Reward claimed',
    nullable: true,
    required: false,
    type: Boolean,
  })
  @IsOptional()
  rewardClaimed: boolean;
}
