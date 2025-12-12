import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Number } from '../../interfaces/counters/number.interface';

export class NumberDTO implements Number {
  @IsNotEmpty()
  @IsString()
  roman: string;

  @IsNotEmpty()
  @IsString()
  kanji: string;

  @IsNotEmpty()
  @IsString()
  hiragana: string;

  @IsNotEmpty()
  @IsString()
  romaji: string;

  @IsNotEmpty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  order: number;
}
