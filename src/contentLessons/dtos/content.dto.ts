import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { BibliographyDTO } from './biblography.dto';
import { DialogDTO } from './dialog.dto';
import { GlossaryDTO } from './glossary.dto';
import { NoteDTO } from './note.dto';

export class ContentDTO {
  @IsNotEmpty({ message: 'content should not be empty' })
  @IsString({ message: 'content must be a string' })
  content: string;

  @IsNotEmpty({ message: 'name should not be empty' })
  @IsString({ message: 'name must be a string' })
  name: string;

  @ValidateNested({ each: true })
  @Type(() => DialogDTO)
  @IsArray({ message: 'dialogs must be an array' })
  @IsNotEmpty({ message: 'dialogs should not be empty', each: true })
  dialogs: DialogDTO[];

  @ValidateNested({ each: true })
  @Type(() => GlossaryDTO)
  @IsArray({ message: 'glossaries must be an array' })
  @IsOptional()
  glossaries?: GlossaryDTO[] = [];

  @ValidateNested({ each: true })
  @Type(() => NoteDTO)
  @IsArray({ message: 'notes must be an array' })
  @IsOptional()
  notes?: NoteDTO[] = [];

  @ValidateNested({ each: true })
  @Type(() => BibliographyDTO)
  @IsArray({ message: 'bibliographies must be an array' })
  @IsOptional()
  bibliographies?: BibliographyDTO[] = [];
}

export class UpdateContentDTO extends PartialType(ContentDTO) {}
