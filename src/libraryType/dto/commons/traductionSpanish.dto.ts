import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TraductionSpanish } from '../../interfaces/commons/traductionSpanish.interface';

export class TraductionSpanishDTO implements TraductionSpanish {
  @IsString()
  @IsNotEmpty()
  traduction: string;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  order: number;
}
