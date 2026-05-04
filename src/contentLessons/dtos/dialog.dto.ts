import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ContentJSON } from '../entities/dialog.entity';
import { StoryStructureEnum } from '../enums/story-structure.enum';

export class DialogDTO {
  @ApiProperty({
    description: 'Lottie animation',
    type: String,
    nullable: true,
    required: false,
  })
  @IsOptional({ message: 'lottieAnimation is optional' })
  @IsString({ message: 'lottieAnimation must be a string' })
  lottieAnimation: string;

  @ApiProperty({
    description: 'Story structure',
    enum: StoryStructureEnum,
    nullable: false,
    required: true,
  })
  @IsNotEmpty({ message: 'storyStructure should not be empty' })
  @IsEnum(StoryStructureEnum, {
    message: 'storyStructure must be a valid StoryStructureEnum value',
  })
  storyStructure: StoryStructureEnum;

  @ApiProperty({
    description: 'ID of the type structure (FK to type_structure table)',
    type: Number,
    nullable: false,
    required: true,
  })
  @IsNotEmpty({ message: 'typeStructureId should not be empty' })
  @IsInt({ message: 'typeStructureId must be an integer' })
  @IsPositive({ message: 'typeStructureId must be a positive number' })
  typeStructureId: number;

  @ApiProperty({
    description: 'Focused',
    type: Boolean,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'focused must be a boolean' })
  focused: boolean;

  @ApiProperty({
    description: 'Audio',
    type: String,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'audio must be a string' })
  audio: string;

  @ApiProperty({
    description: 'Final Lottie animation',
    type: String,
    nullable: true,
    required: false,
  })
  @IsOptional({ message: 'lottieAnimationFinal is optional' })
  @IsString({ message: 'lottieAnimationFinal must be a string' })
  lottieAnimationFinal: string;

  @ApiProperty({
    description: 'Content',
    type: Object,
    nullable: false,
    required: true,
  })
  @IsNotEmpty({ message: 'content should not be empty' })
  @IsObject({ message: 'content must be a valid JSON object' })
  content: ContentJSON;

  @ApiProperty({
    description: 'Order',
    type: Number,
    nullable: false,
    required: true,
  })
  @IsNotEmpty({ message: 'order should not be empty' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'order must be a number' },
  )
  order: number;
}
