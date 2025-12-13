import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TraductionSpanish } from '../../interfaces/commons/traductionSpanish.interface';

export class TraductionSpanishDTO implements TraductionSpanish {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'traduction',
  })
  @IsString()
  @IsNotEmpty()
  traduction: string;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    description: 'order',
  })
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  order: number;
}
