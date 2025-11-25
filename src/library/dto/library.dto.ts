import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { LibraryTypeEnum } from '../enums/library.enum';

export class CreateLibraryDTO {
  @ApiProperty({
    description: 'Icon URL for the library item',
    type: String,
    required: false,
    example: 'icon.png',
  })
  @IsOptional()
  @IsString()
  icon: string;

  @ApiProperty({
    description: 'Coins needed to unlock the library item',
    type: Number,
    required: true,
    example: 0,
  })
  @IsNotEmpty({ message: 'Coins needed is required' })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  coinsNeeded: number;

  @ApiProperty({
    description: 'Title romanji of the library ',
    type: String,
    required: true,
    example: 'Kanji',
  })
  @IsNotEmpty({ message: 'Title romanji is required' })
  @IsString({ message: 'Title romanji must be a string' })
  titleRomanji: string;

  @ApiProperty({
    description: 'Title kanji of the library',
    type: String,
    required: true,
    example: '漢字',
  })
  @IsNotEmpty({ message: 'Title kanji is required' })
  @IsString({ message: 'Title kanji must be a string' })
  titleKanji: string;

  @ApiProperty({
    description: 'Description of the library',
    type: String,
    required: false,
    example: 'Description',
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ApiProperty({
    description: 'Warning of the library',
    type: String,
    required: false,
    example: 'Warning',
  })
  @IsOptional()
  @IsString({ message: 'Warning must be a string' })
  warning: string;

  @ApiProperty({
    description: 'Order of the library item',
    type: Number,
    required: true,
    example: 1,
    minimum: 1,
  })
  @IsNotEmpty({ message: 'Order is required' })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  order: number;

  @ApiProperty({ description: 'Type of the library item', enum: LibraryTypeEnum, required: true })
  @IsNotEmpty({ message: 'Type is required' })
  @IsEnum(LibraryTypeEnum, { message: 'Type must be a valid enum value' })
  type: LibraryTypeEnum;
}

export class UpdateLibraryDTO extends PartialType(CreateLibraryDTO) {}
