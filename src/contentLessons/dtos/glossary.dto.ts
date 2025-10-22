import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GlossaryDTO {
  @IsNotEmpty({ message: 'kanji should not be empty' })
  @IsString({ message: 'kanji must be a string' })
  kanji: string;

  @IsNotEmpty({ message: 'kana should not be empty' })
  @IsString({ message: 'kana must be a string' })
  kana: string;

  @IsNotEmpty({ message: 'romaji should not be empty' })
  @IsString({ message: 'romaji must be a string' })
  romaji: string;

  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description: string;

  @IsOptional()
  @IsString({ message: 'audio must be a string' })
  audio: string;
}
