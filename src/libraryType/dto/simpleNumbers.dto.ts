import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AudioDTO } from './commons/audio.dto';

export class SimpleNumbersDTO {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'Roman number',
  })
  @IsString()
  @IsNotEmpty()
  roman: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'Kanji number',
  })
  @IsString()
  @IsNotEmpty()
  kanji: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'Hiragana number',
  })
  @IsString()
  @IsNotEmpty()
  hiragana: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'Romaji number',
  })
  @IsString()
  @IsNotEmpty()
  romaji: string;

  @ApiProperty({ type: () => AudioDTO, required: false, nullable: true })
  @Type(() => AudioDTO)
  @ValidateNested()
  @IsOptional()
  audio: AudioDTO;
}
