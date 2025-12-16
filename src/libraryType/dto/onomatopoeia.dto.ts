import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AudioDTO } from './commons/audio.dto';
import { ExampleDTO } from './commons/example.dto';
import { NoteDTO } from './commons/note.dto';
import { TraductionSpanishDTO } from './commons/traductionSpanish.dto';

export class OnomatopoeiaDTO {
  @ApiProperty({ type: () => AudioDTO, required: true, nullable: false })
  @Type(() => AudioDTO)
  @ValidateNested()
  @IsNotEmpty()
  audio: AudioDTO;

  @ApiProperty({ type: () => ExampleDTO, isArray: true, required: false, nullable: true })
  @Type(() => ExampleDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'example must be an array' })
  example: ExampleDTO[];

  @ApiProperty({ type: String, required: false, nullable: true, description: 'frequency' })
  @IsString({ message: 'frequency must be a string' })
  @IsOptional()
  frequency: string;

  @ApiProperty({ type: () => NoteDTO, isArray: true, required: false, nullable: true })
  @Type(() => NoteDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'note must be an array' })
  note: NoteDTO[];

  @ApiProperty({ type: String, required: true, nullable: false, description: 'onomatopoeiaType' })
  @IsString({ message: 'onomatopoeiaType must be a string' })
  @IsNotEmpty()
  onomatopoeiaType: string;

  @ApiProperty({ type: () => TraductionSpanishDTO, isArray: true, required: true, nullable: false })
  @Type(() => TraductionSpanishDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'traductionSpanish must be an array' })
  traductionSpanish: TraductionSpanishDTO[];

  @ApiProperty({ type: String, required: true, nullable: false, description: 'word' })
  @IsString({ message: 'word must be a string' })
  @IsNotEmpty()
  word: string;

  @ApiProperty({ type: String, required: false, nullable: true, description: 'wordKatakana' })
  @IsString({ message: 'wordKatakana must be a string' })
  @IsOptional()
  wordKatakana: string;

  @ApiProperty({ type: String, required: false, nullable: true, description: 'wordRomaji' })
  @IsString({ message: 'wordRomaji must be a string' })
  @IsOptional()
  wordRomaji: string;
}
