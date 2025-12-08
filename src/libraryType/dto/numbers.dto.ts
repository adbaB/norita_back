import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AudioDTO } from './commons/audio.dto';
import { KunyomiDTO } from './commons/kunyomi.dto';
import { OnyomiDTO } from './commons/onyomi.dto';
import { StepImageDTO } from './commons/StepImage.dto';

export class NumbersDTO {
  @Type(() => AudioDTO)
  @ValidateNested()
  @IsOptional()
  audio: AudioDTO;

  @Type(() => KunyomiDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray()
  kunyomi?: KunyomiDTO[];

  @IsOptional()
  @IsString()
  lottie?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @Type(() => OnyomiDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'onyomi must be an array' })
  onyomi?: OnyomiDTO[];

  @IsNotEmpty()
  @IsString()
  package: string;

  @IsNotEmpty()
  @IsString()
  romanNumber: string;

  @Type(() => StepImageDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'stepImage must be an array' })
  stepImage?: StepImageDTO[];

  @IsOptional()
  @IsString()
  translation?: string;

  @IsOptional()
  @IsString()
  word?: string;
}
