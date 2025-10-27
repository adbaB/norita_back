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
  @IsEnum(TypeLessonEnum, { message: 'type must be a valid TypeLessonEnum value' })
  @IsNotEmpty({ message: 'type should not be empty' })
  type: TypeLessonEnum;

  @IsNotEmpty({ message: 'reward should not be empty' })
  @Min(0, { message: 'reward must be a non-negative number' })
  reward: number;

  @IsNotEmpty()
  @IsString({ message: 'icon must be a string' })
  icon: string;

  @IsNotEmpty()
  @IsString({ message: 'background must be a string' })
  background: string;

  @IsNotEmpty({ message: 'number should not be empty' })
  @IsString({ message: 'number must be a string' })
  number: string;

  @IsNotEmpty({ message: 'name should not be empty' })
  @IsString({ message: 'name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'content should not be empty' })
  @IsString({ message: 'content must be a string' })
  content: string;

  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description: string;

  @IsOptional()
  @IsString({ message: 'requirements must be a string' })
  time: number;

  @IsNotEmpty({ message: 'coins_needed_unlock_with_requirements should not be empty' })
  @Min(0, { message: 'coins_needed_unlock_with_requirements must be a non-negative number' })
  coins_needed_unlock_with_requirements: number;

  @IsNotEmpty({ message: 'coins_needed_unlock_without_requirements should not be empty' })
  @Min(0, { message: 'coins_needed_unlock_without_requirements must be a non-negative number' })
  coins_needed_unlock_without_requirements: number;

  @IsNotEmpty({ message: 'sectionUuid should not be empty' })
  @IsUUID(4, { message: 'sectionUuid must be a string' })
  sectionUuid: string;

  @IsNotEmpty({ message: 'contentLesson should not be empty' })
  @ValidateNested()
  @Type(() => ContentDTO)
  contentLesson: ContentDTO;
}

export class UpdateLessonDTO {
  @IsEnum(TypeLessonEnum, { message: 'type must be a valid TypeLessonEnum value' })
  @IsOptional()
  type: TypeLessonEnum;

  @IsOptional()
  @Min(0, { message: 'reward must be a non-negative number' })
  reward: number;

  @IsOptional()
  @IsString({ message: 'icon must be a string' })
  icon: string;

  @IsOptional()
  @IsString({ message: 'background must be a string' })
  background: string;

  @IsOptional()
  @IsString({ message: 'number must be a string' })
  number: string;

  @IsOptional()
  @IsString({ message: 'name must be a string' })
  name: string;

  @IsOptional()
  @IsString({ message: 'content must be a string' })
  content: string;

  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description: string;

  @IsOptional()
  @IsString({ message: 'requirements must be a string' })
  time: number;

  @IsOptional()
  @Min(0, { message: 'coins_needed_unlock_with_requirements must be a non-negative number' })
  coins_needed_unlock_with_requirements: number;

  @IsOptional()
  @Min(0, { message: 'coins_needed_unlock_without_requirements must be a non-negative number' })
  coins_needed_unlock_without_requirements: number;

  @IsOptional()
  @IsUUID(4, { message: 'sectionUuid must be a string' })
  sectionUuid: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateContentDTO)
  contentLesson: UpdateContentDTO;
}
