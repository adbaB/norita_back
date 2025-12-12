import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'hiragana',
  })
  @IsString({ message: 'hiragana must be a string' })
  @IsNotEmpty()
  hiragana: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'romaji',
  })
  @IsString({ message: 'romaji must be a string' })
  @IsNotEmpty()
  romaji: string;
}

export class ConjugationPairDTO implements ConjugationPair {
  @ApiProperty({ type: () => FormValueDTO, required: true, nullable: false })
  @Type(() => FormValueDTO)
  @ValidateNested()
  positive: FormValueDTO;

  @ApiProperty({ type: () => FormValueDTO, required: true, nullable: false })
  @Type(() => FormValueDTO)
  @ValidateNested()
  negative: FormValueDTO;
}

export class ConditionalsDTO implements Conditionals {
  @ApiProperty({ type: () => ConjugationPairDTO, required: true, nullable: false })
  @Type(() => ConjugationPairDTO)
  @ValidateNested()
  ba: ConjugationPairDTO;

  @ApiProperty({ type: () => ConjugationPairDTO, required: true, nullable: false })
  @Type(() => ConjugationPairDTO)
  @ValidateNested()
  tara: ConjugationPairDTO;

  @ApiProperty({ type: () => ConjugationPairDTO, required: true, nullable: false })
  @Type(() => ConjugationPairDTO)
  @ValidateNested()
  to: ConjugationPairDTO;
}

export class ConjugationsDTO implements Conjugations {
  @ApiProperty({ type: () => ConjugationPairDTO, required: true, nullable: false })
  @Type(() => ConjugationPairDTO)
  @ValidateNested()
  @IsNotEmpty()
  pastDictionary: ConjugationPairDTO;

  @ApiProperty({ type: () => ConjugationPairDTO, required: true, nullable: false })
  @Type(() => ConjugationPairDTO)
  @ValidateNested()
  @IsNotEmpty()
  pastFormal: ConjugationPairDTO;

  @ApiProperty({ type: () => ConjugationPairDTO, required: true, nullable: false })
  @Type(() => ConjugationPairDTO)
  @ValidateNested()
  @IsNotEmpty()
  presentFutureDictionary: ConjugationPairDTO;

  @ApiProperty({ type: () => ConjugationPairDTO, required: true, nullable: false })
  @Type(() => ConjugationPairDTO)
  @ValidateNested()
  @IsNotEmpty()
  presentFutureFormal: ConjugationPairDTO;

  @ApiProperty({ type: () => FormValueDTO, required: true, nullable: false })
  @Type(() => FormValueDTO)
  @ValidateNested()
  @IsNotEmpty()
  teForm: FormValueDTO;
}

export class TerminationDTO implements Termination {
  @ApiProperty({ type: String, required: true, nullable: false, description: 'hiragana' })
  @IsString({ message: 'hiragana must be a string' })
  @IsNotEmpty()
  hiragana: string;

  @ApiProperty({ type: String, required: true, nullable: false, description: 'romaji' })
  @IsString({ message: 'romaji must be a string' })
  @IsNotEmpty()
  romaji: string;
}

export class AdjectiveBaseDTO implements AdjectiveBase {
  @ApiProperty({ type: String, required: true, nullable: false, description: 'baseHiragana' })
  @IsString({ message: 'baseHiragana must be a string' })
  @IsNotEmpty()
  baseHiragana: string;

  @ApiProperty({ type: String, required: false, nullable: true, description: 'baseKanji' })
  @IsString({ message: 'baseKanji must be a string' })
  @IsOptional()
  baseKanji?: string;

  @ApiProperty({ type: String, required: true, nullable: false, description: 'baseRomaji' })
  @IsString({ message: 'baseRomaji must be a string' })
  @IsNotEmpty()
  baseRomaji: string;

  @ApiProperty({ type: () => [WordDTO], required: true, nullable: false })
  @Type(() => WordDTO)
  @ValidateNested()
  @IsNotEmpty()
  word: Word[];

  @ApiProperty({ type: () => [WordHiraganaDTO], required: true, nullable: false })
  @Type(() => WordHiraganaDTO)
  @ValidateNested()
  @IsNotEmpty()
  wordHiragana: WordHiragana[];

  @ApiProperty({ type: () => [WordRomajiDTO], required: true, nullable: false })
  @Type(() => WordRomajiDTO)
  @ValidateNested()
  @IsNotEmpty()
  wordRomaji: WordRomaji[];
}

export class AdjectivesDTO {
  @ApiProperty({ type: () => AdjectiveBaseDTO, required: true, nullable: false })
  @Type(() => AdjectiveBaseDTO)
  @ValidateNested()
  @IsNotEmpty()
  adjective: AdjectiveBaseDTO;

  @ApiProperty({ type: String, required: true, nullable: false, description: 'adjectiveType' })
  @IsString({ message: 'adjectiveType must be a string' })
  @IsNotEmpty()
  adjectiveType: string;

  @ApiProperty({ type: () => AudioDTO, required: false, nullable: true })
  @Type(() => AudioDTO)
  @ValidateNested()
  @IsOptional()
  audio: AudioDTO;

  @ApiProperty({ type: () => ConditionalsDTO, required: true, nullable: false })
  @Type(() => ConditionalsDTO)
  @ValidateNested()
  @IsNotEmpty()
  conditionals: ConditionalsDTO;

  @ApiProperty({ type: () => ConjugationsDTO, required: true, nullable: false })
  @Type(() => ConjugationsDTO)
  @ValidateNested()
  @IsNotEmpty()
  conjugations: ConjugationsDTO;

  @ApiProperty({ type: () => [ExampleDTO], isArray: true, required: false, nullable: true })
  @Type(() => ExampleDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'example must be an array' })
  example: ExampleDTO[];

  @ApiProperty({ type: String, required: true, nullable: false, description: 'jltp' })
  @IsString({ message: 'jltp must be a string' })
  @IsNotEmpty()
  jltp: string;

  @ApiProperty({ type: () => NoteDTO, isArray: true, required: false, nullable: true })
  @Type(() => NoteDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'note must be a array' })
  note: NoteDTO[];

  @ApiProperty({ type: () => TerminationDTO, required: true, nullable: false })
  @Type(() => TerminationDTO)
  @ValidateNested()
  @IsNotEmpty()
  termination: TerminationDTO;

  @ApiProperty({ type: () => TraductionSpanishDTO, isArray: true, required: true, nullable: false })
  @Type(() => TraductionSpanishDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'traductionSpanish must be an array' })
  traductionSpanish: TraductionSpanishDTO[];
}
