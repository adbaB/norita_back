import { IsBoolean, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { ContentJSON } from '../entities/dialog.entity';
import { StoryStructureEnum } from '../enums/story-structure.enum';
import { TypeStructureEnum } from '../enums/type-structure.enum';

export class DialogDTO {
  @IsOptional({ message: 'lottieAnimation is optional' })
  @IsString({ message: 'lottieAnimation must be a string' })
  lottieAnimation: string;

  @IsNotEmpty({ message: 'storyStructure should not be empty' })
  @IsEnum(StoryStructureEnum, {
    message: 'storyStructure must be a valid StoryStructureEnum value',
  })
  storyStructure: StoryStructureEnum;

  @IsNotEmpty({ message: 'typeStructure should not be empty' })
  @IsEnum(TypeStructureEnum, { message: 'typeStructure must be a valid TypeStructureEnum value' })
  typeStructure: TypeStructureEnum;

  @IsOptional()
  @IsBoolean({ message: 'focused must be a boolean' })
  focused: boolean;

  @IsOptional()
  @IsString({ message: 'audio must be a string' })
  audio: string;

  @IsNotEmpty({ message: 'content should not be empty' })
  @IsObject({ message: 'content must be a valid JSON object' })
  content: ContentJSON;
}
