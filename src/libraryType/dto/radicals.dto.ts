import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Position } from '../interfaces/radicals/position.interface';
import { Variant } from '../interfaces/radicals/variant.interface';
import { VariantPosition } from '../interfaces/radicals/variantPosition.interface';
import { TraductionSpanishDTO } from './commons/traductionSpanish.dto';
import { WordDTO } from './commons/word.dto';
import { WordHiraganaDTO } from './commons/wordHiragana.dto';
import { WordRomajiDTO } from './commons/wordRomaji.dto';

export class PositionDTO implements Position {
  @ApiProperty()
  @IsString({ message: 'position must be a string' })
  @IsNotEmpty()
  position: string;

  @ApiProperty()
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'order must be a number' },
  )
  @IsNotEmpty()
  order: number;
}

export class VariantPositionDTO implements VariantPosition {
  @ApiProperty()
  @IsString({ message: 'position must be a string' })
  @IsNotEmpty()
  position: string;
}

export class VariantDTO implements Variant {
  @ApiProperty()
  @IsString({ message: 'variantHiragana must be a string' })
  @IsNotEmpty()
  variantHiragana: string;

  @ApiProperty({ type: () => VariantPositionDTO, isArray: true })
  @Type(() => VariantPositionDTO)
  @ValidateNested({ each: true })
  @IsArray({ message: 'variantPosition must be an array' })
  variantPosition: VariantPositionDTO[];

  @ApiProperty()
  @IsString({ message: 'variantRadical must be a string' })
  @IsNotEmpty()
  variantRadical: string;

  @ApiProperty()
  @IsString({ message: 'variantRomaji must be a string' })
  @IsNotEmpty()
  variantRomaji: string;

  @ApiProperty()
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'variantStepsInteger must be a number' },
  )
  @IsNotEmpty()
  variantStepsInteger: number;
}

export class RadicalsDTO {
  @ApiPropertyOptional()
  @IsString({ message: 'lottie must be a string' })
  @IsOptional()
  lottie: string;

  @ApiPropertyOptional()
  @IsString({ message: 'note must be a string' })
  @IsOptional()
  note: string;

  @ApiPropertyOptional({ type: () => PositionDTO, isArray: true })
  @Type(() => PositionDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'position must be an array' })
  position: PositionDTO[];

  @ApiPropertyOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'stepsInteger must be a number' },
  )
  @IsNotEmpty()
  stepsInteger: number;

  @ApiPropertyOptional({ type: () => TraductionSpanishDTO, isArray: true })
  @Type(() => TraductionSpanishDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'traductionSpanish must be an array' })
  traductionSpanish: TraductionSpanishDTO[];

  @ApiPropertyOptional({ type: () => VariantDTO, isArray: true })
  @Type(() => VariantDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'variants must be an array' })
  variants: VariantDTO[];

  @ApiPropertyOptional({ type: () => WordDTO, isArray: true })
  @Type(() => WordDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'word must be an array' })
  word: WordDTO[];

  @ApiPropertyOptional({ type: () => WordHiraganaDTO, isArray: true })
  @Type(() => WordHiraganaDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'wordHiragana must be an array' })
  wordHiragana: WordHiraganaDTO[];

  @ApiPropertyOptional({ type: () => WordRomajiDTO, isArray: true })
  @Type(() => WordRomajiDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'wordRomaji must be an array' })
  wordRomaji: WordRomajiDTO[];
}
