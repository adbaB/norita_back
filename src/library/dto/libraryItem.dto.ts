import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { AdjectivesDTO } from '../../libraryType/dto/adjectives.dto';
import { CountersDTO } from '../../libraryType/dto/counters.dto';
import { KanaDTO } from '../../libraryType/dto/kana.dto';
import { KanjiDto } from '../../libraryType/dto/kanji.dto';
import { NumbersDTO } from '../../libraryType/dto/numbers.dto';
import { OnomatopoeiaDTO } from '../../libraryType/dto/onomatopoeia.dto';
import { RadicalsDTO } from '../../libraryType/dto/radicals.dto';
import { LibraryItemTypeEnum } from '../enums/library.enum';
import { WordType } from '../interfaces/wordType.interface';

export class WordTypeDTO implements WordType {
  @ApiProperty({ type: String, required: true, nullable: false, description: 'type' })
  @IsString({ message: 'type must be a string' })
  @IsNotEmpty()
  type: string;

  @ApiProperty({ type: Number, required: true, nullable: false, description: 'order' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'order must be a number' },
  )
  order: number;
}

export class CreateLibraryItemDTO {
  @ApiProperty({ type: String, required: true, nullable: false, description: 'type' })
  @IsNotEmpty()
  @IsEnum(LibraryItemTypeEnum)
  type: LibraryItemTypeEnum;

  @ApiProperty({ type: String, required: true, nullable: false, description: 'package' })
  @IsString({ message: 'package must be a string' })
  @IsNotEmpty()
  package: string;

  @ApiProperty({
    type: () => [WordTypeDTO],
    required: false,
    nullable: true,
    isArray: true,
    description: 'wordType',
  })
  @Type(() => WordTypeDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'wordType must be an array' })
  wordType: WordTypeDTO[];

  @ApiProperty({ type: Number, required: true, nullable: false, description: 'order' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'order must be a number' },
  )
  @IsNotEmpty()
  order: number;

  @ApiProperty({ type: () => KanaDTO, required: false, nullable: true })
  @ValidateIf((o) => o.type === LibraryItemTypeEnum.KANA)
  @Type(() => KanaDTO)
  @IsNotEmpty({ message: 'kana cannot be empty' })
  @ValidateNested()
  kana?: KanaDTO;

  @ApiProperty({ type: () => KanjiDto, required: false, nullable: true })
  @ValidateIf((o) => o.type === LibraryItemTypeEnum.KANJI)
  @Type(() => KanjiDto)
  @IsNotEmpty({ message: 'kanji cannot be empty' })
  @ValidateNested()
  kanji?: KanjiDto;

  @ApiProperty({ type: () => NumbersDTO, required: false, nullable: true })
  @ValidateIf(
    (o) => o.type === LibraryItemTypeEnum.NUMBER || o.type === LibraryItemTypeEnum.NUMBERS,
  )
  @IsNotEmpty({ message: 'numbers cannot be empty' })
  @Type(() => NumbersDTO)
  @ValidateNested()
  numbers?: NumbersDTO;

  @ApiProperty({ type: () => CountersDTO, required: false, nullable: true })
  @ValidateIf((o) => o.type === LibraryItemTypeEnum.COUNTER)
  @IsNotEmpty({ message: 'counters cannot be empty' })
  @Type(() => CountersDTO)
  @ValidateNested()
  counters?: CountersDTO;

  @ApiProperty({ type: () => AdjectivesDTO, required: false, nullable: true })
  @ValidateIf((o) => o.type === LibraryItemTypeEnum.ADJECTIVE)
  @IsNotEmpty({ message: 'adjectives cannot be empty' })
  @Type(() => AdjectivesDTO)
  @ValidateNested()
  adjectives?: AdjectivesDTO;

  @ApiProperty({ type: () => OnomatopoeiaDTO, required: false, nullable: true })
  @ValidateIf((o) => o.type === LibraryItemTypeEnum.ONOMATOPOEIA)
  @IsNotEmpty({ message: 'onomatopoeia cannot be empty' })
  @Type(() => OnomatopoeiaDTO)
  @ValidateNested()
  onomatopoeia?: OnomatopoeiaDTO;

  @ApiProperty({ type: () => RadicalsDTO, required: false, nullable: true })
  @ValidateIf((o) => o.type === LibraryItemTypeEnum.RADICAL)
  @IsNotEmpty({ message: 'radicals cannot be empty' })
  @Type(() => RadicalsDTO)
  @ValidateNested()
  radicals?: RadicalsDTO;
}

export class UpdateLibraryItemDTO extends PartialType(CreateLibraryItemDTO) {
  @ApiProperty({ type: String, required: false, nullable: true, description: 'sectionUuid' })
  @IsString({ message: 'sectionUuid must be a string' })
  @IsOptional()
  sectionUuid?: string;
}
