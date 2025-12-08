import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Kunyomi } from '../interfaces/commons/kunyomi.interface';
import { Name } from '../interfaces/commons/name.interface';
import { Note } from '../interfaces/commons/note.interface';
import { TraductionSpanish } from '../interfaces/commons/traductionSpanish.interface';
import { Word } from '../interfaces/commons/word.interface';
import { Kind } from '../interfaces/kanji/kind.interface';
import { Level } from '../interfaces/kanji/level.interface';
import { StepImageDTO } from './commons/StepImage.dto';

export class KindDTO implements Kind {
  @IsString()
  @IsOptional()
  hyougai: string;

  @IsString()
  @IsOptional()
  jinmeiyou: string;

  @IsString()
  @IsOptional()
  kyuujitai: string;

  @IsString()
  @IsOptional()
  shinjitai: string;
}

export class KunyomiDTO implements Kunyomi {
  @IsString()
  @IsNotEmpty()
  kana: string;

  @IsString()
  @IsNotEmpty()
  romaji: string;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  order: number;
}

export class LevelDTO implements Level {
  @IsString()
  @IsNotEmpty()
  jlpt: string;

  @IsString()
  @IsNotEmpty()
  jouyou: string;
}

export class NameDTO implements Name {
  @IsString()
  @IsNotEmpty()
  kana: string;

  @IsString()
  @IsNotEmpty()
  romaji: string;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  order: number;
}

export class NoteDTO implements Note {
  @IsString()
  @IsNotEmpty()
  note: string;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  order: number;
}

export class OnyomiDTO implements Kunyomi {
  @IsString()
  @IsNotEmpty()
  kana: string;

  @IsString()
  @IsNotEmpty()
  romaji: string;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  order: number;
}

export class TraductionSpanishDTO implements TraductionSpanish {
  @IsString()
  @IsNotEmpty()
  traduction: string;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  order: number;
}

export class WordDTO implements Word {
  @IsString()
  @IsNotEmpty()
  word: string;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  order: number;
}

export class KanjiDto {
  @Type(() => KindDTO)
  @ValidateNested()
  @IsOptional()
  kind: KindDTO;

  @Type(() => KunyomiDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'kunyomi must be an array' })
  kunyomi: KunyomiDTO[];

  @Type(() => LevelDTO)
  @ValidateNested()
  @IsOptional()
  level: LevelDTO;

  @IsString()
  @IsOptional()
  lottie: string;

  @Type(() => NameDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'name must be an array' })
  name: NameDTO[];

  @Type(() => NoteDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'notes must be an array' })
  notes: Note;

  @Type(() => OnyomiDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'onyomi must be an array' })
  onyomi: OnyomiDTO[];

  @IsString()
  @IsNotEmpty()
  package: string;

  @Type(() => StepImageDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'images must be an array' })
  images: StepImageDTO[];

  @Type(() => TraductionSpanishDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'traductionsSpanish must be an array' })
  traductionsSpanish: TraductionSpanishDTO[];

  @Type(() => WordDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'words must be an array' })
  word: WordDTO[];

  @IsString()
  @IsOptional()
  radicalElement: string;

  @IsString()
  @IsNotEmpty()
  radicalKey: string;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty({ message: 'order is required' })
  order: number;
}
