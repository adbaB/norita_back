import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GlossaryDTO {
  @ApiProperty({
    description: 'Kanji of the glossary',
    nullable: false,
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'kanji should not be empty' })
  @IsString({ message: 'kanji must be a string' })
  kanji: string;

  @ApiProperty({
    description: 'Kana of the glossary',
    nullable: false,
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'kana should not be empty' })
  @IsString({ message: 'kana must be a string' })
  kana: string;

  @ApiProperty({
    description: 'Romaji of the glossary',
    nullable: false,
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'romaji should not be empty' })
  @IsString({ message: 'romaji must be a string' })
  romaji: string;

  @ApiProperty({
    description: 'Description of the glossary',
    nullable: true,
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description: string;

  @ApiProperty({
    description: 'Audio of the glossary',
    nullable: true,
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'audio must be a string' })
  audio: string;

  @ApiProperty({
    description: 'Order of the glossary',
    nullable: false,
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'order must be a number' },
  )
  order: number;
}
