import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AdjectiveBase } from '../interfaces/adjectives/adjective.interface';
import { ConjugationPair } from '../interfaces/adjectives/common/conjugationPair.interface';
import { FormValue } from '../interfaces/adjectives/common/formValue.interface';
import { Conditionals } from '../interfaces/adjectives/conditionals.interface';
import { Conjugations } from '../interfaces/adjectives/conjugations.interface';
import { Termination } from '../interfaces/adjectives/termination.interface';
import { Word } from '../interfaces/commons/word.interface';
import { WordHiragana } from '../interfaces/commons/wordHiragana.interface';
import { WordRomaji } from '../interfaces/commons/wordRomaji.interface';
import { AudioDTO } from './commons/audio.dto';
import { ExampleDTO } from './commons/example.dto';
import { NoteDTO } from './commons/note.dto';
import { TraductionSpanishDTO } from './commons/traductionSpanish.dto';
import { WordDTO } from './commons/word.dto';
import { WordHiraganaDTO } from './commons/wordHiragana.dto';
import { WordRomajiDTO } from './commons/wordRomaji.dto';

export class FormValueDTO implements FormValue {
  @ApiProperty()
  @IsString({ message: 'hiragana must be a string' })
  @IsNotEmpty()
  hiragana: string;

  @ApiProperty()
  @IsString({ message: 'romaji must be a string' })
  @IsNotEmpty()
  romaji: string;
}

export class ConjugationPairDTO implements ConjugationPair {
  @ApiProperty({ type: () => FormValueDTO })
  @Type(() => FormValueDTO)
  @ValidateNested()
  positive: FormValueDTO;

  @ApiProperty({ type: () => FormValueDTO })
  @Type(() => FormValueDTO)
  @ValidateNested()
  negative: FormValueDTO;
}

export class ConditionalsDTO implements Conditionals {
  @ApiProperty({ type: () => ConjugationPairDTO })
  @Type(() => ConjugationPairDTO)
  @ValidateNested()
  ba: ConjugationPairDTO;

  @ApiProperty({ type: () => ConjugationPairDTO })
  @Type(() => ConjugationPairDTO)
  @ValidateNested()
  tara: ConjugationPairDTO;

  @ApiProperty({ type: () => ConjugationPairDTO })
  @Type(() => ConjugationPairDTO)
  @ValidateNested()
  to: ConjugationPairDTO;
}

export class ConjugationsDTO implements Conjugations {
  @ApiProperty({ type: () => ConjugationPairDTO })
  @Type(() => ConjugationPairDTO)
  @ValidateNested()
  @IsNotEmpty()
  pastDictionary: ConjugationPairDTO;

  @ApiProperty({ type: () => ConjugationPairDTO })
  @Type(() => ConjugationPairDTO)
  @ValidateNested()
  @IsNotEmpty()
  pastFormal: ConjugationPairDTO;

  @ApiProperty({ type: () => ConjugationPairDTO })
  @Type(() => ConjugationPairDTO)
  @ValidateNested()
  @IsNotEmpty()
  presentFutureDictionary: ConjugationPairDTO;

  @ApiProperty({ type: () => ConjugationPairDTO })
  @Type(() => ConjugationPairDTO)
  @ValidateNested()
  @IsNotEmpty()
  presentFutureFormal: ConjugationPairDTO;

  @ApiProperty({ type: () => FormValueDTO })
  @Type(() => FormValueDTO)
  @ValidateNested()
  @IsNotEmpty()
  teForm: FormValueDTO;
}

export class TerminationDTO implements Termination {
  @ApiProperty()
  @IsString({ message: 'hiragana must be a string' })
  @IsNotEmpty()
  hiragana: string;

  @ApiProperty()
  @IsString({ message: 'romaji must be a string' })
  @IsNotEmpty()
  romaji: string;
}

export class AdjectiveBaseDTO implements AdjectiveBase {
  @ApiProperty()
  @IsString({ message: 'baseHiragana must be a string' })
  @IsNotEmpty()
  baseHiragana: string;

  @ApiPropertyOptional()
  @IsString({ message: 'baseKanji must be a string' })
  @IsOptional()
  baseKanji?: string;

  @ApiProperty()
  @IsString({ message: 'baseRomaji must be a string' })
  @IsNotEmpty()
  baseRomaji: string;

  @ApiProperty({ type: () => [WordDTO] })
  @Type(() => WordDTO)
  @ValidateNested()
  @IsNotEmpty()
  word: Word[];

  @ApiProperty({ type: () => [WordHiraganaDTO] })
  @Type(() => WordHiraganaDTO)
  @ValidateNested()
  @IsNotEmpty()
  wordHiragana: WordHiragana[];

  @ApiProperty({ type: () => [WordRomajiDTO] })
  @Type(() => WordRomajiDTO)
  @ValidateNested()
  @IsNotEmpty()
  wordRomaji: WordRomaji[];
}

export class AdjectivesDTO {
  @ApiPropertyOptional({ type: () => AdjectiveBaseDTO })
  @Type(() => AdjectiveBaseDTO)
  @ValidateNested()
  @IsNotEmpty()
  adjective: AdjectiveBaseDTO;

  @ApiPropertyOptional()
  @IsString({ message: 'adjectiveType must be a string' })
  @IsNotEmpty()
  adjectiveType: string;

  @ApiPropertyOptional({ type: () => AudioDTO })
  @Type(() => AudioDTO)
  @ValidateNested()
  @IsOptional()
  audio: AudioDTO;

  @ApiPropertyOptional({ type: () => ConditionalsDTO })
  @Type(() => ConditionalsDTO)
  @ValidateNested()
  @IsNotEmpty()
  conditionals: ConditionalsDTO;

  @ApiPropertyOptional({ type: () => ConjugationsDTO })
  @Type(() => ConjugationsDTO)
  @ValidateNested()
  @IsNotEmpty()
  conjugations: ConjugationsDTO;

  @ApiPropertyOptional({ type: () => ExampleDTO, isArray: true })
  @Type(() => ExampleDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'example must be an array' })
  example: ExampleDTO[];

  @ApiPropertyOptional()
  @IsString({ message: 'jltp must be a string' })
  @IsNotEmpty()
  jltp: string;

  @ApiPropertyOptional({ type: () => NoteDTO, isArray: true })
  @Type(() => NoteDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'note must be a array' })
  note: NoteDTO[];

  @ApiPropertyOptional({ type: () => TerminationDTO })
  @Type(() => TerminationDTO)
  @ValidateNested()
  @IsNotEmpty()
  termination: TerminationDTO;

  @ApiPropertyOptional({ type: () => TraductionSpanishDTO, isArray: true })
  @Type(() => TraductionSpanishDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'traductionSpanish must be an array' })
  traductionSpanish: TraductionSpanishDTO[];
}
