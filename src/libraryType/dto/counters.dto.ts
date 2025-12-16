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
import { ExampleSpanish } from '../interfaces/counters/exampleSpanish.interface';
import { CategoryDTO } from './commons/category.dto';
import { ExampleDTO } from './commons/example.dto';
import { NoteDTO } from './commons/note.dto';
import { NumberDTO } from './commons/number.dto';
import { TraductionSpanishDTO } from './commons/traductionSpanish.dto';

export class ExampleSpanishDTO implements ExampleSpanish {
  @ApiProperty({ type: String, required: true, nullable: false, description: 'traduction' })
  @IsNotEmpty()
  @IsString()
  traduction: string;

  @ApiProperty({ type: Number, required: true, nullable: false, description: 'order' })
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  order: number;
}

export class CountersDTO {
  @ApiProperty({ type: () => [CategoryDTO], required: true, nullable: false, isArray: true })
  @Type(() => CategoryDTO)
  @IsNotEmpty()
  @IsArray({ message: 'category must be an array' })
  @ValidateNested({ each: true })
  category: CategoryDTO[];

  @ApiProperty({ type: () => [ExampleDTO], required: false, nullable: true, isArray: true })
  @Type(() => ExampleDTO)
  @IsOptional()
  @IsArray({ message: 'example must be an array' })
  @ValidateNested({ each: true })
  example: ExampleDTO[];

  @ApiProperty({ type: () => [ExampleSpanishDTO], required: false, nullable: true, isArray: true })
  @Type(() => ExampleSpanishDTO)
  @IsOptional()
  @IsArray({ message: 'exampleSpanish must be an array' })
  @ValidateNested({ each: true })
  exampleSpanish: ExampleSpanishDTO[];

  @ApiProperty({ type: () => [NumberDTO], required: true, nullable: false, isArray: true })
  @Type(() => NumberDTO)
  @IsNotEmpty()
  @IsArray({ message: 'numbers must be an array' })
  @ValidateNested({ each: true })
  numbers: NumberDTO[];

  @ApiProperty({ type: String, required: true, nullable: false, description: 'jltp' })
  @IsString({ message: 'jlpt must be a string' })
  @IsNotEmpty()
  jltp: string;

  @ApiProperty({ type: () => [NoteDTO], required: false, nullable: true, isArray: true })
  @Type(() => NoteDTO)
  @IsOptional()
  @IsArray({ message: 'note must be an array' })
  @ValidateNested({ each: true })
  note: NoteDTO[];

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

  @ApiProperty({ type: String, required: true, nullable: false, description: 'word' })
  @IsString({ message: 'word must be a string' })
  @IsNotEmpty()
  word: string;

  @ApiProperty({ type: String, required: true, nullable: false, description: 'wordHiragana' })
  @IsString({ message: 'wordHiragana must be a string' })
  @IsNotEmpty()
  wordHiragana: string;

  @ApiProperty({ type: String, required: true, nullable: false, description: 'wordRomaji' })
  @IsString({ message: 'wordHiragana must be a string' })
  @IsNotEmpty()
  wordRomaji: string;
}
