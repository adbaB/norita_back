import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { LibraryAudio } from '../../interfaces/commons/audio.interface';

export class AudioDTO implements LibraryAudio {
  @ApiProperty({
    type: String,
    required: false,
    nullable: true,
    description: 'male Audio',
  })
  @IsString({ message: 'male Audio must be a string' })
  @IsOptional()
  male: string;

  @ApiProperty({
    type: String,
    required: false,
    nullable: true,
    description: 'female Audio',
  })
  @IsString({ message: 'female Audio must be a string' })
  @IsOptional()
  female: string;
}
