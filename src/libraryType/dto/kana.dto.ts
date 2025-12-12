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

export class ConsonantDTO implements ConsonantItem {
  @IsString({ message: 'note must be a string' })
  @IsNotEmpty()
  note: string;

  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'order must be a number' },
  )
  order: number;
}

export class ErrorItemDTO implements ErrorItem {
  @IsString({ message: 'note must be a string' })
  @IsNotEmpty()
  note: string;

  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'order must be a number' },
  )
  @IsNotEmpty()
  order: number;
}

export class PronunciationDTO implements Pronunciation {
  @IsString({ message: 'note must be a string' })
  @IsNotEmpty()
  note: string;

  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'order must be a number' },
  )
  @IsNotEmpty()
  order: number;
}

export class RomajiDTO implements Romaji {
  @IsString({ message: 'hepburn must be a string' })
  @IsNotEmpty()
  hepburn: string;

  @IsString({ message: 'kunreishiki must be a string' })
  @IsNotEmpty()
  kunreishiki: string;

  @IsString({ message: 'nihonshiki must be a string' })
  @IsNotEmpty()
  nihonshiki: string;
}

export class KanaDTO {
  @Type(() => AudioDTO)
  @ValidateNested()
  @IsNotEmpty()
  audio: AudioDTO;

  @Type(() => ConsonantDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'consonant must be an array' })
  consonant: ConsonantDTO[];

  @Type(() => ErrorItemDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'error must be an array' })
  error: ErrorItemDTO[];

  @IsString({ message: 'lottie must be a string' })
  @IsOptional()
  lottie: string;

  @Type(() => PronunciationDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'pronunciation must be an array' })
  pronunciation: PronunciationDTO[];

  @Type(() => RomajiDTO)
  @ValidateNested()
  @IsNotEmpty()
  romaji: RomajiDTO;

  @Type(() => StepImageDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'images must be an array' })
  images: StepImageDTO[];

  @IsString({ message: 'steps must be a string' })
  @IsOptional()
  steps: string;

  @IsString({ message: 'finalImage must be a string' })
  @IsNotEmpty()
  finalImage: string;

  @IsString({ message: 'word must be a string' })
  @IsNotEmpty()
  word: string;
}
