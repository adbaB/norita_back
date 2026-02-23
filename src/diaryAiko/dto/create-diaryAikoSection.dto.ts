import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDiaryAikoSectionDto {
  @ApiProperty({
    description: 'The title of the diary section (e.g., Personajes, Lugares, Eventos)',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiProperty({ description: 'The description of the diary section' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    description: 'URL or identifier of the image associated with the section',
  })
  @IsString()
  @IsOptional()
  image?: string;
}
