import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsInt,
  Min,
  IsUUID,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { DifficultyEnum } from '../../lessons/enums/difficulty.enum';

class InitialSessionExerciseDto {
  @ApiProperty({ description: 'UUID of the exercise (Activity)' })
  @IsUUID()
  @IsNotEmpty()
  exerciseId: string;

  @ApiProperty({ description: 'Difficulty of this specific exercise', enum: DifficultyEnum })
  @IsEnum(DifficultyEnum)
  difficulty: DifficultyEnum;
}

export class CreateSessionDto {
  @ApiProperty({ description: 'UUID of the lesson' })
  @IsUUID()
  @IsNotEmpty()
  lessonId: string;

  @ApiProperty({ description: 'Main difficulty level of the session', enum: DifficultyEnum })
  @IsEnum(DifficultyEnum)
  difficulty: DifficultyEnum;

  @ApiProperty({ description: 'Total number of questions planned for this session' })
  @IsInt()
  @Min(1)
  totalQuestions: number;

  @ApiProperty({
    description: 'List of initial exercises planned for the session',
    type: [InitialSessionExerciseDto],
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => InitialSessionExerciseDto)
  exercises?: InitialSessionExerciseDto[];
}
