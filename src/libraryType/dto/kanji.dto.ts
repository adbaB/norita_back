import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Name } from '../interfaces/commons/name.interface';
import { Kind } from '../interfaces/kanji/kind.interface';
import { Level } from '../interfaces/kanji/level.interface';
import { StepImageDTO } from './commons/StepImage.dto';
import { KunyomiDTO } from './commons/kunyomi.dto';
import { NoteDTO } from './commons/note.dto';
import { OnyomiDTO } from './commons/onyomi.dto';
import { TraductionSpanishDTO } from './commons/traductionSpanish.dto';
import { WordDTO } from './commons/word.dto';

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
  @IsNotEmpty()
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
  notes: NoteDTO[];

  @Type(() => OnyomiDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'onyomi must be an array' })
  onyomi: OnyomiDTO[];

  @Type(() => StepImageDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'images must be an array' })
  images: StepImageDTO[];

  @Type(() => TraductionSpanishDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'traductionsSpanish must be an array' })
  traductionsSpanish: TraductionSpanishDTO[];

  @Type(() => WordDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'words must be an array' })
  word: WordDTO[];

  @IsString()
  @IsNotEmpty()
  radicalElement: string;

  @IsString()
  @IsNotEmpty()
  radicalKey: string;
}
