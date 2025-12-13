import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { WordKatakana } from '../../interfaces/commons/wordKatakana.interface';

export class WordKatakanaDTO implements WordKatakana {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'word',
  })
  @IsString({ message: 'word must be a string' })
  @IsNotEmpty()
  word: string;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    description: 'order',
  })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'order must be a number' },
  )
  @IsNotEmpty()
  order: number;
}
