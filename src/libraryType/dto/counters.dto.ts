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
import { WordDTO } from './commons/word.dto';

export class ExampleSpanishDTO implements ExampleSpanish {
  @IsNotEmpty()
  @IsString()
  traduction: string;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  order: number;
}

export class CountersDTO {
  @Type(() => CategoryDTO)
  @IsNotEmpty()
  @IsArray({ message: 'category must be an array' })
  @ValidateNested({ each: true })
  category: CategoryDTO[];

  @Type(() => ExampleDTO)
  @IsOptional()
  @IsArray({ message: 'example must be an array' })
  @ValidateNested({ each: true })
  example: ExampleDTO[];

  @Type(() => ExampleSpanishDTO)
  @IsOptional()
  @IsArray({ message: 'exampleSpanish must be an array' })
  @ValidateNested({ each: true })
  exampleSpanish: ExampleSpanishDTO[];

  @Type(() => NumberDTO)
  @IsNotEmpty()
  @IsArray({ message: 'numbers must be an array' })
  @ValidateNested({ each: true })
  numbers: NumberDTO[];

  @IsString({ message: 'jlpt must be a string' })
  @IsNotEmpty()
  jltp: string;

  @Type(() => NoteDTO)
  @IsOptional()
  @IsArray({ message: 'note must be an array' })
  @ValidateNested({ each: true })
  note: NoteDTO[];

  @Type(() => TraductionSpanishDTO)
  @IsNotEmpty()
  @IsArray({ message: 'traductionSpanish must be an array' })
  @ValidateNested({ each: true })
  traductionSpanish: TraductionSpanishDTO[];

  @IsString({ message: 'word must be a string' })
  @IsNotEmpty()
  word: string;

  @Type(() => WordDTO)
  @IsNotEmpty()
  @IsArray({ message: 'wordHiragana must be an array' })
  @ValidateNested({ each: true })
  wordHiragana: WordDTO[];

  @Type(() => WordDTO)
  @IsNotEmpty()
  @IsArray({ message: 'wordRomaji must be an array' })
  @ValidateNested({ each: true })
  wordRomaji: WordDTO[];
}
