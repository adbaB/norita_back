import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min, Matches } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty({ description: 'Day of the week (1-7, where 1 is Monday)', example: 1 })
  @IsInt()
  @Min(1)
  @Max(7)
  @IsNotEmpty()
  dayOfWeek: number;

  @ApiProperty({ description: 'Hour of the notification (HH:mm)', example: '08:00' })
  @IsString()
  @Matches(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Hour must be in HH:mm format' })
  @IsNotEmpty()
  hour: string;

  @ApiProperty({
    description: 'Timezone of the user',
    example: 'America/New_York',
    required: false,
  })
  @IsString()
  @IsOptional()
  timezone?: string;
}
