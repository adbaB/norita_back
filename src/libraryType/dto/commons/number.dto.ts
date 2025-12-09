import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Number } from '../../interfaces/counters/number.interface';

export class NumberDTO implements Number {
  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  order: number;
}
