import { PartialType } from '@nestjs/swagger';
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
import { KanaDTO } from '../../libraryType/dto/kana.dto';
import { KanjiDto } from '../../libraryType/dto/kanji.dto';
import { LibraryItemTypeEnum } from '../enums/library.enum';
import { WordType } from '../interfaces/wordType.interface';

export class WordTypeDTO implements WordType {
  @IsString({ message: 'type must be a string' })
  @IsNotEmpty()
  type: string;

  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'order must be a number' },
  )
  order: number;
}

export class CreateLibraryItemDTO {
  @IsNotEmpty()
  @IsEnum(LibraryItemTypeEnum)
  type: LibraryItemTypeEnum;

  @IsString({ message: 'package must be a string' })
  @IsOptional()
  package: string;

  @Type(() => WordTypeDTO)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'wordType must be an array' })
  wordType: WordTypeDTO[];

  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'order must be a number' },
  )
  @IsNotEmpty()
  order: number;

  @ValidateIf((o) => o.type === LibraryItemTypeEnum.KANA)
  @Type(() => KanaDTO)
  @ValidateNested()
  kana: KanaDTO;

  @ValidateIf((o) => o.type === LibraryItemTypeEnum.KANJI)
  @Type(() => KanjiDto)
  @ValidateNested()
  kanji: KanjiDto;
}

export class UpdateLibraryItemDTO extends PartialType(CreateLibraryItemDTO) {
  @IsString({ message: 'sectionUuid must be a string' })
  @IsOptional()
  sectionUuid?: string;
}
