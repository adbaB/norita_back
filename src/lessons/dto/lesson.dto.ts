import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { ContentDTO, UpdateContentDTO } from '../../contentLessons/dtos/content.dto';
import { TypeLessonEnum } from '../enums/typeLesson.enum';

export class LessonDTO {
  @ApiProperty({
    description: 'Type of the lesson',
    enum: TypeLessonEnum,
    nullable: false,
    required: true,
  })
  @IsEnum(TypeLessonEnum, { message: 'type must be a valid TypeLessonEnum value' })
  @IsNotEmpty({ message: 'type should not be empty' })
  type: TypeLessonEnum;

  @ApiProperty({
    description: 'Reward of the lesson',
    nullable: false,
    required: true,
    type: Number,
    minimum: 0,
  })
  @IsNotEmpty({ message: 'reward should not be empty' })
  @Min(0, { message: 'reward must be a non-negative number' })
  reward: number;

  @ApiProperty({
    description: 'Icon of the lesson',
    nullable: false,
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString({ message: 'icon must be a string' })
  icon: string;

  @ApiProperty({
    description: 'Background of the lesson',
    nullable: false,
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString({ message: 'background must be a string' })
  background: string;

  @ApiProperty({
    description: 'Number of the lesson',
    nullable: false,
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'number should not be empty' })
  @IsString({ message: 'number must be a string' })
  number: string;

  @ApiProperty({
    description: 'Name of the lesson',
    nullable: false,
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'name should not be empty' })
  @IsString({ message: 'name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Content of the lesson',
    nullable: false,
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'content should not be empty' })
  @IsString({ message: 'content must be a string' })
  content: string;

  @ApiProperty({
    description: 'Description of the lesson',
    nullable: true,
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description: string;

  @ApiProperty({
    description: 'Time of the lesson',
    nullable: true,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsString({ message: 'requirements must be a string' })
  time: number;

  @ApiProperty({
    description: 'Coins needed to unlock the lesson',
    nullable: false,
    required: true,
    type: Number,
    minimum: 0,
  })
  @IsNotEmpty({ message: 'coins_needed_unlock_with_requirements should not be empty' })
  @Min(0, { message: 'coins_needed_unlock_with_requirements must be a non-negative number' })
  coins_needed_unlock_with_requirements: number;

  @ApiProperty({
    description: 'Coins needed to unlock the lesson without requirements',
    nullable: false,
    required: true,
    type: Number,
    minimum: 0,
  })
  @IsNotEmpty({ message: 'coins_needed_unlock_without_requirements should not be empty' })
  @Min(0, { message: 'coins_needed_unlock_without_requirements must be a non-negative number' })
  coins_needed_unlock_without_requirements: number;

  @ApiProperty({
    description: 'Section UUID of the lesson',
    nullable: false,
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'sectionUuid should not be empty' })
  @IsUUID(4, { message: 'sectionUuid must be a string' })
  sectionUuid: string;

  @ApiProperty({
    description: 'Content lesson of the lesson',
    nullable: false,
    required: true,
    type: ContentDTO,
  })
  @IsNotEmpty({ message: 'contentLesson should not be empty' })
  @ValidateNested()
  @Type(() => ContentDTO)
  contentLesson: ContentDTO;

  @ApiProperty({
    description: 'UUID of the next lesson',
    nullable: true,
    required: false,
    type: String,
  })
  @IsOptional()
  @IsUUID(4, { message: 'nextLessonUuid must be a string' })
  nextLessonUuid?: string;
}

export class UpdateLessonDTO {
  @ApiProperty({
    description: 'Type of the lesson',
    enum: TypeLessonEnum,
    nullable: false,
    required: false,
  })
  @IsEnum(TypeLessonEnum, { message: 'type must be a valid TypeLessonEnum value' })
  @IsNotEmpty({ message: 'type should not be empty' })
  type: TypeLessonEnum;

  @ApiProperty({
    description: 'Reward of the lesson',
    nullable: false,
    required: false,
    type: Number,
    minimum: 0,
  })
  @IsNotEmpty({ message: 'reward should not be empty' })
  @Min(0, { message: 'reward must be a non-negative number' })
  reward: number;

  @ApiProperty({
    description: 'Icon of the lesson',
    nullable: false,
    required: false,
    type: String,
  })
  @IsNotEmpty()
  @IsString({ message: 'icon must be a string' })
  icon: string;

  @ApiProperty({
    description: 'Background of the lesson',
    nullable: false,
    required: false,
    type: String,
  })
  @IsNotEmpty()
  @IsString({ message: 'background must be a string' })
  background: string;

  @ApiProperty({
    description: 'Number of the lesson',
    nullable: false,
    required: false,
    type: String,
  })
  @IsNotEmpty({ message: 'number should not be empty' })
  @IsString({ message: 'number must be a string' })
  number: string;

  @ApiProperty({
    description: 'Name of the lesson',
    nullable: false,
    required: false,
    type: String,
  })
  @IsNotEmpty({ message: 'name should not be empty' })
  @IsString({ message: 'name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Content of the lesson',
    nullable: false,
    required: false,
    type: String,
  })
  @IsNotEmpty({ message: 'content should not be empty' })
  @IsString({ message: 'content must be a string' })
  content: string;

  @ApiProperty({
    description: 'Description of the lesson',
    nullable: false,
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description: string;

  @ApiProperty({
    description: 'Time of the lesson',
    nullable: false,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsString({ message: 'requirements must be a string' })
  time: number;

  @ApiProperty({
    description: 'Coins needed to unlock the lesson',
    nullable: false,
    required: false,
    type: Number,
    minimum: 0,
  })
  @IsNotEmpty({ message: 'coins_needed_unlock_with_requirements should not be empty' })
  @Min(0, { message: 'coins_needed_unlock_with_requirements must be a non-negative number' })
  coins_needed_unlock_with_requirements: number;

  @ApiProperty({
    description: 'Coins needed to unlock the lesson without requirements',
    nullable: false,
    required: false,
    type: Number,
    minimum: 0,
  })
  @IsNotEmpty({ message: 'coins_needed_unlock_without_requirements should not be empty' })
  @Min(0, { message: 'coins_needed_unlock_without_requirements must be a non-negative number' })
  coins_needed_unlock_without_requirements: number;

  @ApiProperty({
    description: 'Section UUID of the lesson',
    nullable: false,
    required: false,
    type: String,
  })
  @IsNotEmpty({ message: 'sectionUuid should not be empty' })
  @IsUUID(4, { message: 'sectionUuid must be a string' })
  sectionUuid: string;

  @ApiProperty({
    description: 'Content lesson of the lesson',
    nullable: false,
    required: false,
    type: UpdateContentDTO,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateContentDTO)
  contentLesson: UpdateContentDTO;

  @ApiProperty({
    description: 'UUID of the next lesson',
    nullable: true,
    required: false,
    type: String,
  })
  @IsOptional()
  @IsUUID(4, { message: 'nextLessonUuid must be a string' })
  nextLessonUuid?: string;
}
