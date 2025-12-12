import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Example } from '../../interfaces/commons/example.interface';
import { AudioDTO } from './audio.dto';

export class ExampleDTO implements Example {
  @ApiPropertyOptional({ type: () => AudioDTO })
  @Type(() => AudioDTO)
  @IsOptional()
  @ValidateNested()
  audio?: AudioDTO;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  kanji: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  romaji: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  traduction: string;
}
