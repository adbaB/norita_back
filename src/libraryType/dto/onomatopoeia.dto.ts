import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AudioDTO } from './commons/audio.dto';
import { ExampleDTO } from './commons/example.dto';
import { NoteDTO } from './commons/note.dto';
import { TraductionSpanishDTO } from './commons/traductionSpanish.dto';
import { WordDTO } from './commons/word.dto';
import { WordKatakanaDTO } from './commons/wordKatakana.dto';
import { WordRomajiDTO } from './commons/wordRomaji.dto';

export class OnomatopoeiaDTO {
  @ApiPropertyOptional({ type: () => AudioDTO })
  @Type(() => AudioDTO)
  @ValidateNested()
  @IsNotEmpty()
  audio: AudioDTO;

  @ApiPropertyOptional({ type: () => ExampleDTO, isArray: true })
  @Type(() => ExampleDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'example must be an array' })
  example: ExampleDTO[];

  @ApiPropertyOptional()
  @IsString({ message: 'frequency must be a string' })
  @IsOptional()
  frequency: string;

  @ApiPropertyOptional({ type: () => NoteDTO, isArray: true })
  @Type(() => NoteDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'note must be an array' })
  note: NoteDTO[];

  @ApiPropertyOptional()
  @IsString({ message: 'onomatopoeiaType must be a string' })
  @IsNotEmpty()
  onomatopoeiaType: string;

  @ApiPropertyOptional({ type: () => TraductionSpanishDTO, isArray: true })
  @Type(() => TraductionSpanishDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'traductionSpanish must be an array' })
  traductionSpanish: TraductionSpanishDTO[];

  @ApiPropertyOptional({ type: () => WordDTO, isArray: true })
  @Type(() => WordDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'word must be an array' })
  word: WordDTO[];

  @ApiPropertyOptional({ type: () => WordKatakanaDTO, isArray: true })
  @Type(() => WordKatakanaDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'wordKatakana must be an array' })
  wordKatakana: WordKatakanaDTO[];

  @ApiPropertyOptional({ type: () => WordRomajiDTO, isArray: true })
  @Type(() => WordRomajiDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'wordRomaji must be an array' })
  wordRomaji: WordRomajiDTO[];
}
