import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NoteDTO {
  @IsNotEmpty({ message: 'content should not be empty' })
  @IsString({ message: 'content must be a string' })
  content: string;

  @IsOptional()
  @IsString({ message: 'audio must be a string' })
  audio?: string;
}
