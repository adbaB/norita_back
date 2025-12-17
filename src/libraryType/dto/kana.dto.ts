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
import { ErrorItem } from '../interfaces/commons/error.interface';
import { Pronunciation } from '../interfaces/commons/pronunciation.interface';
import { ConsonantItem } from '../interfaces/kana/consonant.interface';
import { Romaji } from '../interfaces/kana/romanji.interface';
import { StepImageDTO } from './commons/StepImage.dto';
import { AudioDTO } from './commons/audio.dto';
import { TraductionSpanishDTO } from './commons/traductionSpanish.dto';

export class ConsonantDTO implements ConsonantItem {
  @ApiProperty({ type: String, required: true, nullable: false, description: 'note' })
  @IsString({ message: 'note must be a string' })
  @IsNotEmpty()
  note: string;

  @ApiProperty({ type: Number, required: true, nullable: false, description: 'order' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'order must be a number' },
  )
  order: number;
}

export class ErrorItemDTO implements ErrorItem {
  @ApiProperty({ type: String, required: true, nullable: false, description: 'note' })
  @IsString({ message: 'note must be a string' })
  @IsNotEmpty()
  note: string;

  @ApiProperty({ type: Number, required: true, nullable: false, description: 'order' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'order must be a number' },
  )
  @IsNotEmpty()
  order: number;
}

export class PronunciationDTO implements Pronunciation {
  @ApiProperty({ type: String, required: true, nullable: false, description: 'note' })
  @IsString({ message: 'note must be a string' })
  @IsNotEmpty()
  note: string;

  @ApiProperty({ type: Number, required: true, nullable: false, description: 'order' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'order must be a number' },
  )
  @IsNotEmpty()
  order: number;
}

export class RomajiDTO implements Romaji {
  @ApiProperty({ type: String, required: true, nullable: false, description: 'hepburn' })
  @IsString({ message: 'hepburn must be a string' })
  @IsNotEmpty()
  hepburn: string;

  @ApiProperty({ type: String, required: true, nullable: false, description: 'kunreishiki' })
  @IsString({ message: 'kunreishiki must be a string' })
  @IsNotEmpty()
  kunreishiki: string;

  @ApiProperty({ type: String, required: true, nullable: false, description: 'nihonshiki' })
  @IsString({ message: 'nihonshiki must be a string' })
  @IsNotEmpty()
  nihonshiki: string;
}

export class KanaDTO {
  @ApiProperty({ type: () => AudioDTO, required: true, nullable: false })
  @Type(() => AudioDTO)
  @ValidateNested()
  @IsOptional()
  audio: AudioDTO;

  @ApiProperty({ type: () => [ConsonantDTO], isArray: true, required: false, nullable: true })
  @Type(() => ConsonantDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'consonant must be an array' })
  consonant: ConsonantDTO[];

  @ApiProperty({ type: () => [ErrorItemDTO], isArray: true, required: false, nullable: true })
  @Type(() => ErrorItemDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'error must be an array' })
  error: ErrorItemDTO[];

  @ApiProperty({ type: String, required: false, nullable: true, description: 'lottie' })
  @IsString({ message: 'lottie must be a string' })
  @IsOptional()
  lottie: string;

  @ApiProperty({ type: () => [PronunciationDTO], isArray: true, required: false, nullable: true })
  @Type(() => PronunciationDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'pronunciation must be an array' })
  pronunciation: PronunciationDTO[];

  @ApiProperty({ type: () => RomajiDTO, required: true, nullable: false })
  @Type(() => RomajiDTO)
  @ValidateNested()
  @IsNotEmpty()
  romaji: RomajiDTO;

  @ApiProperty({ type: () => [StepImageDTO], isArray: true, required: true, nullable: false })
  @Type(() => StepImageDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'images must be an array' })
  images: StepImageDTO[];

  @ApiProperty({ type: String, required: false, nullable: true, description: 'steps' })
  @IsString({ message: 'steps must be a string' })
  @IsOptional()
  steps: string;

  @ApiProperty({ type: String, required: true, nullable: false, description: 'finalImage' })
  @IsString({ message: 'finalImage must be a string' })
  @IsOptional()
  finalImage: string;

  @ApiProperty({ type: String, required: true, nullable: false, description: 'word' })
  @IsString({ message: 'word must be a string' })
  @IsNotEmpty()
  word: string;

  @ApiProperty({
    type: () => [TraductionSpanishDTO],
    required: true,
    nullable: false,
    isArray: true,
  })
  @Type(() => TraductionSpanishDTO)
  @IsNotEmpty()
  @IsArray({ message: 'traductionSpanish must be an array' })
  @ValidateNested({ each: true })
  traductionSpanish: TraductionSpanishDTO[];
}
