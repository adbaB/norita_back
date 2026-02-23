import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateDiaryAikoItemDto {
  @ApiProperty({ description: 'The UUID of the section this item belongs to' })
  @IsUUID()
  @IsNotEmpty()
  sectionUuid: string;

  @ApiProperty({ description: 'The name of the item in Romaji (e.g., character name)' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nameRomaji: string;

  @ApiPropertyOptional({ description: 'The Kanji name of the item' })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  nameKanji?: string;

  @ApiPropertyOptional({ description: 'The URL or identifier of the locked image' })
  @IsString()
  @IsOptional()
  imageLocked?: string;

  @ApiPropertyOptional({ description: 'The URL or identifier of the biography image' })
  @IsString()
  @IsOptional()
  imageBiography?: string;

  @ApiPropertyOptional({ description: 'The URL or identifier of the unlocked image' })
  @IsString()
  @IsOptional()
  imageUnlocked?: string;

  @ApiPropertyOptional({
    description:
      'Dynamic attributes in JSON format (e.g., {"Edad": "24 años", "Comida": "Gyosas"})',
  })
  @IsObject()
  @IsOptional()
  attributes?: Record<string, unknown>;

  @ApiPropertyOptional({ description: 'Biography or long textual description' })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({ description: 'The UUID of the lesson that unlocks this item' })
  @IsUUID()
  @IsNotEmpty()
  lessonUuid: string;
}
