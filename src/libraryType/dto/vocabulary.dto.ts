import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AudioDTO } from './commons/audio.dto';
import { CategoryDTO } from './commons/category.dto';
import { ExampleDTO } from './commons/example.dto';
import { NoteDTO } from './commons/note.dto';
import { TraductionSpanishDTO } from './commons/traductionSpanish.dto';

export class VocabularyDTO {
  @ApiProperty({ type: () => AudioDTO, required: false, nullable: true })
  @Type(() => AudioDTO)
  @ValidateNested()
  @IsOptional()
  audio: AudioDTO;

  @ApiProperty({ type: () => [CategoryDTO], isArray: true, required: true, nullable: false })
  @Type(() => CategoryDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'category must be an array' })
  category: CategoryDTO[];

  @ApiProperty({ type: () => [ExampleDTO], isArray: true, required: false, nullable: true })
  @Type(() => ExampleDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'example must be an array' })
  example: ExampleDTO[];

  @ApiProperty({ type: String, required: true, nullable: false, description: 'frequency' })
  @IsString({ message: 'frequency must be a string' })
  @IsNotEmpty()
  frequency: string;

  @ApiProperty({ type: String, required: true, nullable: false, description: 'jltp' })
  @IsString({ message: 'jltp must be a string' })
  @IsNotEmpty()
  jltp: string;

  @ApiProperty({ type: () => [NoteDTO], isArray: true, required: false, nullable: true })
  @Type(() => NoteDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'note must be an array' })
  note: NoteDTO[];

  @ApiProperty({
    type: () => [TraductionSpanishDTO],
    isArray: true,
    required: true,
    nullable: false,
  })
  @Type(() => TraductionSpanishDTO)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray({ message: 'traductionSpanish must be an array' })
  traductionSpanish: TraductionSpanishDTO[];

  @ApiProperty({ type: String, required: false, nullable: true, description: 'loanHiragana' })
  @IsString({ message: 'loanHiragana must be a string' })
  @IsOptional()
  loanHiragana?: string;

  @ApiProperty({ type: String, required: false, nullable: true, description: 'loanRomaji' })
  @IsString({ message: 'loanRomaji must be a string' })
  @IsOptional()
  loanRomaji?: string;

  @ApiProperty({ type: String, required: false, nullable: true, description: 'searchKanji' })
  @IsString({ message: 'searchKanji must be a string' })
  @IsOptional()
  searchKanji?: string;

  @ApiProperty({ type: String, required: true, nullable: false, description: 'word' })
  @IsString({ message: 'word must be a string' })
  @IsNotEmpty()
  word: string;

  @ApiProperty({ type: String, required: true, nullable: false, description: 'wordHiragana' })
  @IsString({ message: 'wordHiragana must be a string' })
  @IsNotEmpty()
  wordHiragana: string;

  @ApiProperty({ type: String, required: true, nullable: false, description: 'wordRomaji' })
  @IsString({ message: 'wordRomaji must be a string' })
  @IsNotEmpty()
  wordRomaji: string;
}
