import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { SessionStatusEnum } from '../enums/session-status.enum';

export class CompletedSessionExerciseDto {
  @ApiProperty({ description: 'UUID of the exercise (Activity)' })
  @IsUUID()
  exerciseId: string;

  @ApiProperty({ description: 'Whether the user answered correctly' })
  @IsBoolean()
  correct: boolean;

  @ApiProperty({ description: 'Time taken to answer in milliseconds', required: false })
  @IsNumber()
  @IsOptional()
  responseTimeMs?: number;
}

export class CompleteSessionDto {
  @ApiProperty({ description: 'Status of the completed session', enum: SessionStatusEnum })
  @IsEnum(SessionStatusEnum)
  status: SessionStatusEnum;

  @ApiProperty({ description: 'Total time spent on the session in milliseconds', required: false })
  @IsNumber()
  @IsOptional()
  totalTimeMs?: number;

  @ApiProperty({ description: 'List of completed exercises', type: [CompletedSessionExerciseDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CompletedSessionExerciseDto)
  exercises: CompletedSessionExerciseDto[];
}
