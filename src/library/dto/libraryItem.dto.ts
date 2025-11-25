import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { LibraryAudio } from '../interfaces/audio.interface';
import { ErrorItem } from '../interfaces/error.interface';
import { Pronunciation } from '../interfaces/pronunciation.interface';
import { Romanji } from '../interfaces/romanji.interface';
import { StepImage } from '../interfaces/stepImage.interface';
import { WordType } from '../interfaces/wordType.interface';

export class AudioDTO implements LibraryAudio {
  @IsString({ message: 'male Audio must be a string' })
  @IsOptional()
  male: string;

  @IsString({ message: 'female Audio must be a string' })
  @IsOptional()
  female: string;
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

export class RomanjiDTO implements Romanji {
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

export class StepImageDTO implements StepImage {
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'step must be a number' },
  )
  @IsNotEmpty()
  step: number;

  @IsString({ message: 'image must be a string' })
  @IsNotEmpty()
  image: string;
}

export class WordTypeDTO implements WordType {
  @IsString({ message: 'type must be a string' })
  @IsNotEmpty()
  type: string;

  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'order must be a number' },
  )
  order: number;
}

export class CreateLibraryItemDTO {
  @Type(() => AudioDTO)
  @ValidateNested()
  @IsOptional()
  audio: AudioDTO;

  @Type(() => ErrorItemDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'error must be an array' })
  error: ErrorItemDTO[];

  @IsString({ message: 'lottie must be a string' })
  @IsOptional()
  lottie: string;

  @IsString({ message: 'package must be a string' })
  @IsOptional()
  package: string;

  @Type(() => PronunciationDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'pronunciation must be an array' })
  pronunciation: PronunciationDTO[];

  @Type(() => RomanjiDTO)
  @ValidateNested()
  @IsOptional()
  romanji: RomanjiDTO;

  @Type(() => StepImageDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'images must be an array' })
  images: StepImageDTO[];

  @IsString({ message: 'finalImage must be a string' })
  @IsNotEmpty()
  finalImage: string;

  @IsString({ message: 'word must be a string' })
  @IsNotEmpty()
  word: string;

  @Type(() => WordTypeDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'wordType must be an array' })
  wordType: WordTypeDTO[];

  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'order must be a number' },
  )
  @IsNotEmpty()
  order: number;
}

export class UpdateLibraryItemDTO extends PartialType(CreateLibraryItemDTO) {
  @IsString({ message: 'sectionUuid must be a string' })
  @IsOptional()
  sectionUuid?: string;
}
