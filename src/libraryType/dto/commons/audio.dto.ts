import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { LibraryAudio } from '../../interfaces/commons/audio.interface';

export class AudioDTO implements LibraryAudio {
  @ApiPropertyOptional()
  @IsString({ message: 'male Audio must be a string' })
  @IsOptional()
  male: string;

  @ApiPropertyOptional()
  @IsString({ message: 'female Audio must be a string' })
  @IsOptional()
  female: string;
}
