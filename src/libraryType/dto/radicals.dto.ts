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
import { Position } from '../interfaces/radicals/position.interface';
import { Variant } from '../interfaces/radicals/variant.interface';
import { VariantPosition } from '../interfaces/radicals/variantPosition.interface';
import { TraductionSpanishDTO } from './commons/traductionSpanish.dto';

export class PositionDTO implements Position {
  @ApiProperty({ type: String, required: true, nullable: false, description: 'position' })
  @IsString({ message: 'position must be a string' })
  @IsNotEmpty()
  position: string;

  @ApiProperty({ type: Number, required: true, nullable: false, description: 'order' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'order must be a number' },
  )
  @IsNotEmpty()
  order: number;
}

export class VariantPositionDTO implements VariantPosition {
  @ApiProperty({ type: String, required: true, nullable: false, description: 'position' })
  @IsString({ message: 'position must be a string' })
  @IsNotEmpty()
  position: string;
}

export class VariantDTO implements Variant {
  @ApiProperty({ type: String, required: true, nullable: false, description: 'variantHiragana' })
  @IsString({ message: 'variantHiragana must be a string' })
  @IsNotEmpty()
  variantHiragana: string;

  @ApiProperty({ type: () => VariantPositionDTO, isArray: true, required: true, nullable: false })
  @Type(() => VariantPositionDTO)
  @ValidateNested({ each: true })
  @IsArray({ message: 'variantPosition must be an array' })
  variantPosition: VariantPositionDTO[];

  @ApiProperty({ type: String, required: true, nullable: false, description: 'variantRadical' })
  @IsString({ message: 'variantRadical must be a string' })
  @IsNotEmpty()
  variantRadical: string;

  @ApiProperty({ type: String, required: true, nullable: false, description: 'variantRomaji' })
  @IsString({ message: 'variantRomaji must be a string' })
  @IsNotEmpty()
  variantRomaji: string;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    description: 'variantStepsInteger',
  })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'variantStepsInteger must be a number' },
  )
  @IsNotEmpty()
  variantStepsInteger: number;
}

export class RadicalsDTO {
  @ApiProperty({ type: String, required: false, nullable: true, description: 'lottie' })
  @IsString({ message: 'lottie must be a string' })
  @IsOptional()
  lottie: string;

  @ApiProperty({ type: String, required: false, nullable: true, description: 'note' })
  @IsString({ message: 'note must be a string' })
  @IsOptional()
  note: string;

  @ApiProperty({ type: () => PositionDTO, isArray: true, required: true, nullable: false })
  @Type(() => PositionDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'position must be an array' })
  position: PositionDTO[];

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    description: 'stepsInteger',
  })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'stepsInteger must be a number' },
  )
  @IsNotEmpty()
  stepsInteger: number;

  @ApiProperty({ type: () => TraductionSpanishDTO, isArray: true, required: true, nullable: false })
  @Type(() => TraductionSpanishDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'traductionSpanish must be an array' })
  traductionSpanish: TraductionSpanishDTO[];

  @ApiProperty({ type: () => VariantDTO, isArray: true, required: false, nullable: true })
  @Type(() => VariantDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'variants must be an array' })
  variants: VariantDTO[];

  @ApiProperty({ type: String, required: true, nullable: false, description: 'word' })
  @IsString({ message: 'word must be a string' })
  @IsNotEmpty()
  word: string;

  @ApiProperty({ type: String, required: false, nullable: true, description: 'wordRomaji' })
  @IsString({ message: 'wordRomaji must be a string' })
  @IsOptional()
  wordHiragana: string;

  @ApiProperty({ type: String, required: false, nullable: true, description: 'wordRomaji' })
  @IsString({ message: 'wordRomaji must be a string' })
  @IsOptional()
  wordRomaji: string;
}
