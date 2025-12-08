import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Kunyomi } from '../../interfaces/commons/kunyomi.interface';

export class KunyomiDTO implements Kunyomi {
  @IsString()
  @IsNotEmpty()
  kana: string;

  @IsString()
  @IsNotEmpty()
  romaji: string;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  order: number;
}
