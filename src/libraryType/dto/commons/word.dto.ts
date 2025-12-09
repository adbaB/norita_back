import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Word } from '../../interfaces/commons/word.interface';

export class WordDTO implements Word {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  word: string;

  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  order: number;
}
