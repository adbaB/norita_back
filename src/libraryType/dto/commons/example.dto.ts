import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Example } from '../../interfaces/commons/example.interface';
import { AudioDTO } from './audio.dto';

export class ExampleDTO implements Example {
  @Type(() => AudioDTO)
  @IsOptional()
  @ValidateNested()
  audio?: AudioDTO;

  @IsOptional()
  @IsString()
  kanji: string;

  @IsOptional()
  @IsString()
  romaji: string;

  @IsOptional()
  @IsString()
  traduction: string;
}
