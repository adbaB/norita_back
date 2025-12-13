import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AudioDTO } from './commons/audio.dto';
import { KunyomiDTO } from './commons/kunyomi.dto';
import { OnyomiDTO } from './commons/onyomi.dto';
import { StepImageDTO } from './commons/StepImage.dto';

export class NumbersDTO {
  @ApiProperty({ type: () => AudioDTO, required: false, nullable: true })
  @Type(() => AudioDTO)
  @ValidateNested()
  @IsOptional()
  audio: AudioDTO;

  @ApiProperty({ type: () => [KunyomiDTO], isArray: true, required: false, nullable: true })
  @Type(() => KunyomiDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray()
  kunyomi?: KunyomiDTO[];

  @ApiProperty({ type: String, required: false, nullable: true, description: 'lottie' })
  @IsOptional()
  @IsString()
  lottie?: string;

  @ApiProperty({ type: String, required: false, nullable: true, description: 'note' })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ type: () => [OnyomiDTO], isArray: true, required: false, nullable: true })
  @Type(() => OnyomiDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'onyomi must be an array' })
  onyomi?: OnyomiDTO[];

  @ApiProperty({ type: String, required: true, nullable: false, description: 'romanNumber' })
  @IsNotEmpty()
  @IsString()
  romanNumber: string;

  @ApiProperty({ type: () => [StepImageDTO], isArray: true, required: false, nullable: true })
  @Type(() => StepImageDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'stepImage must be an array' })
  stepImage?: StepImageDTO[];

  @ApiProperty({ type: String, required: false, nullable: true, description: 'translation' })
  @IsOptional()
  @IsString()
  translation?: string;

  @ApiProperty({ type: String, required: false, nullable: true, description: 'word' })
  @IsOptional()
  @IsString()
  word?: string;
}
