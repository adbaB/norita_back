import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Kunyomi } from '../../interfaces/commons/kunyomi.interface';

export class KunyomiDTO implements Kunyomi {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'kana',
  })
  @IsString()
  @IsNotEmpty()
  kana: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'romaji',
  })
  @IsString()
  @IsNotEmpty()
  romaji: string;

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
