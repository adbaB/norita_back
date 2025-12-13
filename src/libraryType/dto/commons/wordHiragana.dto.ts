import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { WordHiragana } from '../../interfaces/commons/wordHiragana.interface';

export class WordHiraganaDTO implements WordHiragana {
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
