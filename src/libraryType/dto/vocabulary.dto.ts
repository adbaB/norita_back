import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { WordType } from '../../library/interfaces/wordType.interface';
import {
  LoanHiragana,
  LoanRomaji,
  SearchKanji,
  StructureWord,
} from '../interfaces/commons/structureWord.interface';
import { AudioDTO } from './commons/audio.dto';
import { CategoryDTO } from './commons/category.dto';
import { ExampleDTO } from './commons/example.dto';
import { NoteDTO } from './commons/note.dto';
import { TraductionSpanishDTO } from './commons/traductionSpanish.dto';
import { WordDTO } from './commons/word.dto';
import { WordHiraganaDTO } from './commons/wordHiragana.dto';
import { WordRomajiDTO } from './commons/wordRomaji.dto';

export class LoanHiraganaDTO implements LoanHiragana {
  @ApiProperty({ type: String, required: true, nullable: false, description: 'word' })
  @IsString({ message: 'word must be a string' })
  @IsNotEmpty()
  word: string;
}

export class LoanRomajiDTO implements LoanRomaji {
  @ApiProperty({ type: String, required: true, nullable: false, description: 'word' })
  @IsString({ message: 'word must be a string' })
  @IsNotEmpty()
  word: string;
}

export class SearchKanjiDTO implements SearchKanji {
  @ApiProperty({ type: String, required: true, nullable: false, description: 'kanji' })
  @IsString({ message: 'kanji must be a string' })
  @IsNotEmpty()
  kanji: string;
}

export class StructureWordDTO implements StructureWord {
  @ApiProperty({ type: () => [LoanHiraganaDTO], isArray: true, required: false, nullable: true })
  @Type(() => LoanHiraganaDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'loan_hiragana must be an array' })
  loanHiragana?: LoanHiraganaDTO[];

  @ApiProperty({ type: () => [LoanRomajiDTO], isArray: true, required: false, nullable: true })
  @Type(() => LoanRomajiDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'loan_romaji must be an array' })
  loanRomaji?: LoanRomajiDTO[];

  @ApiProperty({ type: () => [SearchKanjiDTO], isArray: true, required: false, nullable: true })
  @Type(() => SearchKanjiDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'search_kanji must be an array' })
  searchKanji?: SearchKanjiDTO[];

  @ApiProperty({ type: () => [WordDTO], isArray: true, required: true, nullable: false })
  @Type(() => WordDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'word must be an array' })
  word: WordDTO[];

  @ApiProperty({ type: () => [WordHiraganaDTO], isArray: true, required: true, nullable: false })
  @Type(() => WordHiraganaDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'word_hiragana must be an array' })
  wordHiragana: WordHiraganaDTO[];

  @ApiProperty({ type: () => [WordRomajiDTO], isArray: true, required: true, nullable: false })
  @Type(() => WordRomajiDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'word_romaji must be an array' })
  wordRomaji: WordRomajiDTO[];
}

export class WordTypeDTO implements WordType {
  @ApiProperty({ type: String, required: true, nullable: false, description: 'type' })
  @IsString({ message: 'type must be a string' })
  @IsNotEmpty()
  type: string;

  @ApiProperty({ type: Number, required: true, nullable: false, description: 'order' })
  @IsNotEmpty()
  order: number;
}

export class VocabularyDTO {
  @ApiProperty({ type: () => AudioDTO, required: false, nullable: true })
  @Type(() => AudioDTO)
  @ValidateNested()
  @IsOptional()
  audio: AudioDTO;

  @ApiProperty({ type: () => [CategoryDTO], isArray: true, required: true, nullable: false })
  @Type(() => CategoryDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'category must be an array' })
  category: CategoryDTO[];

  @ApiProperty({ type: () => [ExampleDTO], isArray: true, required: false, nullable: true })
  @Type(() => ExampleDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'example must be an array' })
  example: ExampleDTO[];

  @ApiProperty({ type: String, required: true, nullable: false, description: 'frequency' })
  @IsString({ message: 'frequency must be a string' })
  @IsNotEmpty()
  frequency: string;

  @ApiProperty({ type: String, required: true, nullable: false, description: 'jltp' })
  @IsString({ message: 'jltp must be a string' })
  @IsNotEmpty()
  jltp: string;

  @ApiProperty({ type: () => [NoteDTO], isArray: true, required: false, nullable: true })
  @Type(() => NoteDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'note must be an array' })
  note: NoteDTO[];

  @ApiProperty({ type: () => StructureWordDTO, required: true, nullable: false })
  @Type(() => StructureWordDTO)
  @ValidateNested()
  @IsNotEmpty()
  structureWord: StructureWordDTO;

  @ApiProperty({
    type: () => [TraductionSpanishDTO],
    isArray: true,
    required: true,
    nullable: false,
  })
  @Type(() => TraductionSpanishDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'traductionSpanish must be an array' })
  traductionSpanish: TraductionSpanishDTO[];
}
