import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Onyomi } from '../../interfaces/commons/onyomi.interface';

export class OnyomiDTO implements Onyomi {
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
