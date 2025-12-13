import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Onyomi } from '../../interfaces/commons/onyomi.interface';

export class OnyomiDTO implements Onyomi {
  @ApiProperty({ type: String, required: true, nullable: false, description: 'kana' })
  @IsString()
  @IsNotEmpty()
  kana: string;

  @ApiProperty({ type: String, required: true, nullable: false, description: 'romaji' })
  @IsString()
  @IsNotEmpty()
  romaji: string;

  @ApiProperty({ type: Number, required: true, nullable: false, description: 'order' })
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  order: number;
}
