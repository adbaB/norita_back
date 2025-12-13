import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Number } from '../../interfaces/counters/number.interface';

export class NumberDTO implements Number {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'roman',
  })
  @IsNotEmpty()
  @IsString()
  roman: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'kanji',
  })
  @IsNotEmpty()
  @IsString()
  kanji: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'hiragana',
  })
  @IsNotEmpty()
  @IsString()
  hiragana: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'romaji',
  })
  @IsNotEmpty()
  @IsString()
  romaji: string;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    description: 'order',
  })
  @IsNotEmpty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  order: number;
}
