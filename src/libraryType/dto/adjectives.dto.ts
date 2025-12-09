import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AdjectiveBase } from '../interfaces/adjectives/adjective.interface';
import { ConjugationPair } from '../interfaces/adjectives/common/conjugationPair.interface';
import { FormValue } from '../interfaces/adjectives/common/formValue.interface';
import { Conditionals } from '../interfaces/adjectives/conditionals.interface';
import { Conjugations } from '../interfaces/adjectives/conjugations.interface';
import { Termination } from '../interfaces/adjectives/termination.interface';
import { AudioDTO } from './commons/audio.dto';
import { ExampleDTO } from './commons/example.dto';
import { NoteDTO } from './commons/note.dto';
import { TraductionSpanishDTO } from './commons/traductionSpanish.dto';

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
  pastDictionary: ConjugationPairDTO;

  @ApiProperty({ type: () => ConjugationPairDTO })
  @Type(() => ConjugationPairDTO)
  @ValidateNested()
  pastFormal: ConjugationPairDTO;

  @ApiProperty({ type: () => ConjugationPairDTO })
  @Type(() => ConjugationPairDTO)
  @ValidateNested()
  presentFutureDictionary: ConjugationPairDTO;

  @ApiProperty({ type: () => ConjugationPairDTO })
  @Type(() => ConjugationPairDTO)
  @ValidateNested()
  presentFutureFormal: ConjugationPairDTO;

  @ApiProperty({ type: () => ConjugationPairDTO })
  @Type(() => ConjugationPairDTO)
  @ValidateNested()
  teForm: ConjugationPairDTO;
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
}

export class AdjectivesDTO {
  @ApiPropertyOptional({ type: () => AdjectiveBaseDTO })
  @Type(() => AdjectiveBaseDTO)
  @ValidateNested()
  @IsOptional()
  adjective: AdjectiveBaseDTO;

  @ApiPropertyOptional()
  @IsString({ message: 'adjectiveType must be a string' })
  @IsOptional()
  adjectiveType: string;

  @ApiPropertyOptional({ type: () => AudioDTO })
  @Type(() => AudioDTO)
  @ValidateNested()
  @IsOptional()
  audio: AudioDTO;

  @ApiPropertyOptional({ type: () => ConditionalsDTO })
  @Type(() => ConditionalsDTO)
  @ValidateNested()
  @IsOptional()
  conditionals: ConditionalsDTO;

  @ApiPropertyOptional({ type: () => ConjugationsDTO })
  @Type(() => ConjugationsDTO)
  @ValidateNested()
  @IsOptional()
  conjugations: ConjugationsDTO;

  @ApiPropertyOptional({ type: () => ExampleDTO, isArray: true })
  @Type(() => ExampleDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'example must be an array' })
  example: ExampleDTO[];

  @ApiPropertyOptional()
  @IsString({ message: 'jltp must be a string' })
  @IsOptional()
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
  @IsOptional()
  termination: TerminationDTO;

  @ApiPropertyOptional({ type: () => TraductionSpanishDTO, isArray: true })
  @Type(() => TraductionSpanishDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'traductionSpanish must be an array' })
  traductionSpanish: TraductionSpanishDTO[];
}
