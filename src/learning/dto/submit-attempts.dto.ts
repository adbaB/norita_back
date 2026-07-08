import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AttemptDto {
  @ApiProperty({ description: 'UUID of the exercise (activity)', type: String })
  @IsUUID('4', { message: 'exerciseId must be a valid UUID' })
  exerciseId: string;

  @ApiProperty({ description: 'Whether the user answered correctly', type: Boolean })
  @IsBoolean({ message: 'correct must be a boolean' })
  correct: boolean;

  @ApiProperty({ description: 'Response time in milliseconds', type: Number, minimum: 0 })
  @IsInt({ message: 'responseTimeMs must be an integer' })
  @Min(0, { message: 'responseTimeMs must be >= 0' })
  responseTimeMs: number;
}

export class SubmitAttemptsDto {
  @ApiProperty({
    description: 'UUID of the lesson this session belongs to (used to update lesson-scoped ELO)',
    type: String,
  })
  @IsUUID('4', { message: 'lessonId must be a valid UUID' })
  lessonId: string;

  @ApiProperty({ description: 'List of attempts to submit in batch', type: [AttemptDto] })
  @IsArray({ message: 'attempts must be an array' })
  @ArrayMaxSize(100, { message: 'Cannot process more than 100 attempts in a single batch' })
  @ValidateNested({ each: true })
  @Type(() => AttemptDto)
  attempts: AttemptDto[];
}
