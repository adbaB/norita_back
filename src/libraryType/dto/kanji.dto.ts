import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ type: String, required: false, nullable: true, description: 'hyougai' })
  @IsString()
  @IsOptional()
  hyougai: string;

  @ApiProperty({ type: String, required: false, nullable: true, description: 'jinmeiyou' })
  @IsString()
  @IsOptional()
  jinmeiyou: string;

  @ApiProperty({ type: String, required: false, nullable: true, description: 'kyuujitai' })
  @IsString()
  @IsOptional()
  kyuujitai: string;

  @ApiProperty({ type: String, required: false, nullable: true, description: 'shinjitai' })
  @IsString()
  @IsOptional()
  shinjitai: string;
}

export class LevelDTO implements Level {
  @ApiProperty({ type: String, required: true, nullable: false, description: 'jlpt' })
  @IsString()
  @IsNotEmpty()
  jlpt: string;

  @ApiProperty({ type: String, required: true, nullable: false, description: 'jouyou' })
  @IsString()
  @IsNotEmpty()
  jouyou: string;
}

export class NameDTO implements Name {
  @ApiProperty({ type: String, required: true, nullable: false, description: 'kana' })
  @IsString()
  @IsNotEmpty()
  kana: string;

  @ApiProperty({ type: String, required: true, nullable: false, description: 'romaji' })
  @IsString()
  @IsNotEmpty()
  romaji: string;

  @ApiProperty({ type: Number, required: true, nullable: false, description: 'order' })
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  order: number;
}

export class KanjiDto {
  @ApiProperty({ type: () => KindDTO, required: false, nullable: true })
  @Type(() => KindDTO)
  @ValidateNested()
  @IsOptional()
  kind: KindDTO;

  @ApiProperty({ type: () => KunyomiDTO, required: false, nullable: true, isArray: true })
  @Type(() => KunyomiDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'kunyomi must be an array' })
  kunyomi: KunyomiDTO[];

  @ApiProperty({ type: () => LevelDTO, required: true, nullable: false })
  @Type(() => LevelDTO)
  @ValidateNested()
  @IsNotEmpty()
  level: LevelDTO;

  @ApiProperty({ type: String, required: false, nullable: true, description: 'lottie' })
  @IsString()
  @IsOptional()
  lottie: string;

  @ApiProperty({ type: () => NameDTO, required: false, nullable: true, isArray: true })
  @Type(() => NameDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'name must be an array' })
  name: NameDTO[];

  @ApiProperty({ type: () => NoteDTO, required: false, nullable: true, isArray: true })
  @Type(() => NoteDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'notes must be an array' })
  notes: NoteDTO[];

  @ApiProperty({ type: () => OnyomiDTO, required: false, nullable: true, isArray: true })
  @Type(() => OnyomiDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'onyomi must be an array' })
  onyomi: OnyomiDTO[];

  @ApiProperty({ type: () => StepImageDTO, required: false, nullable: true, isArray: true })
  @Type(() => StepImageDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'images must be an array' })
  images: StepImageDTO[];

  @ApiProperty({ type: () => TraductionSpanishDTO, required: true, nullable: false, isArray: true })
  @Type(() => TraductionSpanishDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'traductionsSpanish must be an array' })
  traductionsSpanish: TraductionSpanishDTO[];

  @ApiProperty({ type: () => WordDTO, required: true, nullable: false, isArray: true })
  @Type(() => WordDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'words must be an array' })
  word: WordDTO[];

  @ApiProperty({ type: String, required: true, nullable: false, description: 'radicalElement' })
  @IsString()
  @IsNotEmpty()
  radicalElement: string;

  @ApiProperty({ type: String, required: true, nullable: false, description: 'radicalKey' })
  @IsString()
  @IsNotEmpty()
  radicalKey: string;
}
