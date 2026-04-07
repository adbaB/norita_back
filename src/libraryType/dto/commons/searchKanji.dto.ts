import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { SearchKanji } from '../../interfaces/commons/searchKanji.interface';

export class SearchKanjiDTO implements SearchKanji {
  @ApiProperty({ type: String, required: true, nullable: false, description: 'kanji' })
  @IsString({ message: 'kanji must be a string' })
  @IsNotEmpty()
  kanji: string;

  @ApiProperty({ type: Number, required: true, nullable: false, description: 'order' })
  @IsNumber()
  @IsNotEmpty()
  order: number;
}
