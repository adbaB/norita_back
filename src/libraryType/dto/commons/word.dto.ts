import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Word } from '../../interfaces/commons/word.interface';

export class WordDTO implements Word {
  @IsString()
  @IsNotEmpty()
  word: string;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  order: number;
}
