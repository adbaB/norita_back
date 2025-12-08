import { IsOptional, IsString } from 'class-validator';
import { LibraryAudio } from '../../interfaces/commons/audio.interface';

export class AudioDTO implements LibraryAudio {
  @IsString({ message: 'male Audio must be a string' })
  @IsOptional()
  male: string;

  @IsString({ message: 'female Audio must be a string' })
  @IsOptional()
  female: string;
}
