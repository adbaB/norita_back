import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ActivityTypeEnum } from '../enums/activity-type.enum';
import { DifficultyEnum } from '../../lessons/enums/difficulty.enum';
import { ActivityConfig } from '../interfaces/activity-config.interface';
import { ActivityOptionDTO } from './activity-option.dto';

export class CreateActivityDTO {
  @ApiProperty({ description: 'Type of activity', enum: ActivityTypeEnum })
  @IsNotEmpty({ message: 'type should not be empty' })
  @IsEnum(ActivityTypeEnum, { message: 'type must be a valid ActivityTypeEnum value' })
  type: ActivityTypeEnum;

  @ApiProperty({
    description: 'Difficulty level of the activity',
    enum: DifficultyEnum,
    default: DifficultyEnum.EASY,
    required: false,
  })
  @IsOptional()
  @IsEnum(DifficultyEnum, { message: 'difficulty must be a valid DifficultyEnum value' })
  difficulty?: DifficultyEnum = DifficultyEnum.EASY;

  @ApiProperty({ description: 'Order of this activity within the lesson content', type: Number })
  @IsNotEmpty({ message: 'order should not be empty' })
  @IsInt({ message: 'order must be an integer' })
  @IsPositive({ message: 'order must be a positive number' })
  order: number;

  @ApiProperty({ description: 'Instruction text shown to the user', type: String })
  @IsNotEmpty({ message: 'instruction should not be empty' })
  @IsString({ message: 'instruction must be a string' })
  instruction: string;

  @ApiProperty({
    description: 'URL of the audio instruction',
    type: String,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'audioInstruction must be a string' })
  audioInstruction?: string;

  @ApiProperty({
    description:
      'Type-specific configuration object (DragDropImageConfig | DragDropTextConfig | WordSelectionConfig | ...)',
    type: Object,
    required: true,
  })
  @IsNotEmpty({ message: 'config should not be empty' })
  config: ActivityConfig;

  @ApiProperty({
    description: 'Feedback message shown when the user answers correctly',
    type: String,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'feedbackCorrect must be a string' })
  feedbackCorrect?: string;

  @ApiProperty({
    description: 'Feedback message shown when the user answers incorrectly',
    type: String,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'feedbackIncorrect must be a string' })
  feedbackIncorrect?: string;

  @ApiProperty({
    description: 'URL of the audio played on correct answer',
    type: String,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'audioCorrect must be a string' })
  audioCorrect?: string;

  @ApiProperty({
    description: 'URL of the audio played on incorrect answer',
    type: String,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'audioIncorrect must be a string' })
  audioIncorrect?: string;

  @ApiProperty({
    description: 'Points awarded for completing this activity',
    type: Number,
    default: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'points must be a number' },
  )
  points?: number = 10;

  @ApiProperty({
    description: 'Options/items belonging to this activity',
    type: () => [ActivityOptionDTO],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'options must be an array' })
  @ValidateNested({ each: true })
  @Type(() => ActivityOptionDTO)
  options?: ActivityOptionDTO[] = [];
}

export class UpdateActivityDTO extends PartialType(CreateActivityDTO) {}
