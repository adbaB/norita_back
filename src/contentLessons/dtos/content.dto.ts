import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateActivityDTO } from './activity.dto';
import { BibliographyDTO } from './biblography.dto';
import { DialogDTO } from './dialog.dto';
import { GlossaryDTO } from './glossary.dto';
import { NoteDTO } from './note.dto';

export class ContentDTO {
  @ApiProperty({
    description: 'Content of the lesson',
    nullable: false,
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'content should not be empty' })
  @IsString({ message: 'content must be a string' })
  content: string;

  @ApiProperty({
    description: 'Name of the lesson',
    nullable: false,
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'name should not be empty' })
  @IsString({ message: 'name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Dialogs associated with the content',
    type: () => [DialogDTO],
    nullable: false,
    required: true,
  })
  @ValidateNested({ each: true })
  @Type(() => DialogDTO)
  @IsArray({ message: 'dialogs must be an array' })
  @IsNotEmpty({ message: 'dialogs should not be empty', each: true })
  dialogs: DialogDTO[];

  @ApiProperty({
    description: 'Glossaries associated with the content',
    type: () => [GlossaryDTO],
    nullable: true,
    required: false,
  })
  @ValidateNested({ each: true })
  @Type(() => GlossaryDTO)
  @IsArray({ message: 'glossaries must be an array' })
  @IsOptional()
  glossaries?: GlossaryDTO[] = [];

  @ApiProperty({
    description: 'Notes associated with the content',
    type: () => [NoteDTO],
    nullable: true,
    required: false,
  })
  @ValidateNested({ each: true })
  @Type(() => NoteDTO)
  @IsArray({ message: 'notes must be an array' })
  @IsOptional()
  notes?: NoteDTO[] = [];

  @ApiProperty({
    description: 'Bibliographies associated with the content',
    type: () => [BibliographyDTO],
    nullable: true,
    required: false,
  })
  @ValidateNested({ each: true })
  @Type(() => BibliographyDTO)
  @IsArray({ message: 'bibliographies must be an array' })
  @IsOptional()
  bibliographies?: BibliographyDTO[] = [];

  @ApiProperty({
    description: 'Activities/exercises associated with the content',
    type: () => [CreateActivityDTO],
    nullable: true,
    required: false,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateActivityDTO)
  @IsArray({ message: 'activities must be an array' })
  @IsOptional()
  activities?: CreateActivityDTO[] = [];
}

export class UpdateContentDTO extends PartialType(ContentDTO) {}
