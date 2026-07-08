import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetExercisesDto {
  @ApiProperty({ description: 'UUID of the lesson', type: String })
  @IsUUID('4', { message: 'lessonId must be a valid UUID' })
  lessonId: string;

  @ApiProperty({
    description: 'Number of exercises to retrieve (1-50)',
    type: Number,
    default: 10,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'count must be an integer' })
  @Min(1, { message: 'count must be at least 1' })
  @Max(50, { message: 'count must be at most 50' })
  count: number = 10;
}
