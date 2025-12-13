import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Example } from '../../interfaces/commons/example.interface';
import { AudioDTO } from './audio.dto';

export class ExampleDTO implements Example {
  @ApiProperty({ type: () => AudioDTO, required: false, nullable: true })
  @Type(() => AudioDTO)
  @IsOptional()
  @ValidateNested()
  audio?: AudioDTO;

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
  romaji: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'traduction',
  })
  @IsNotEmpty()
  @IsString()
  traduction: string;
}
