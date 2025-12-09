import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TraductionSpanish } from '../../interfaces/commons/traductionSpanish.interface';

export class TraductionSpanishDTO implements TraductionSpanish {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  traduction: string;

  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  order: number;
}
