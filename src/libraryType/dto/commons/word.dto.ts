import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Word } from '../../interfaces/commons/word.interface';

export class WordDTO implements Word {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'word',
  })
  @IsString()
  @IsNotEmpty()
  word: string;

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
