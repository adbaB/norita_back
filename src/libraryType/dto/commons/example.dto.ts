import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Example } from '../../interfaces/commons/example.interface';
import { AudioDTO } from './audio.dto';

export class ExampleDTO implements Example {
  @ApiPropertyOptional({ type: () => AudioDTO })
  @Type(() => AudioDTO)
  @IsOptional()
  @ValidateNested()
  audio?: AudioDTO;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  kanji: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  romaji: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  traduction: string;
}
