import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateUpdateItemDto {
  @ApiProperty({ description: 'Título del punto' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Mensaje del punto' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiPropertyOptional({ description: 'Fecha estimada (esto sería para lo de próximamente)' })
  @IsOptional()
  @IsString()
  estimatedRelease?: string;
}

export class CreateUpdateSectionDto {
  @ApiProperty({ description: 'Tipo de sección' })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  type: number;

  @ApiPropertyOptional({ description: 'Título de la sección' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ type: [CreateUpdateItemDto], description: 'Ítems de la sección' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUpdateItemDto)
  items: CreateUpdateItemDto[];
}

export class CreateAppUpdateNewsDto {
  @ApiProperty({ description: 'Identificador único de la actualización' })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: 'Nombre de la versión' })
  @IsNotEmpty()
  @IsString()
  versionName: string;

  @ApiPropertyOptional({ description: 'Fecha de publicación' })
  @IsOptional()
  @IsString()
  publishedAt?: string;

  @ApiProperty({ description: 'Título amigable' })
  @IsNotEmpty()
  @IsString()
  friendlyTitle: string;

  @ApiProperty({ description: 'Mensaje de introducción' })
  @IsNotEmpty()
  @IsString()
  introMessage: string;

  @ApiPropertyOptional({ description: 'Mensaje de cierre' })
  @IsOptional()
  @IsString()
  closingMessage?: string;

  @ApiProperty({ type: [CreateUpdateSectionDto], description: 'Secciones de la actualización' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUpdateSectionDto)
  sections: CreateUpdateSectionDto[];

  @ApiPropertyOptional({ description: 'Indica si la novedad está activa', default: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateAppUpdateNewsDto extends PartialType(CreateAppUpdateNewsDto) {}
