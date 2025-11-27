import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLibrarySectionDTO {
  @ApiProperty({
    description: 'Title romanji of the library section',
    example: 'Library Section',
    type: String,
  })
  @IsNotEmpty({ message: 'Title romanji is required' })
  @IsString({ message: 'Title romanji must be a string' })
  titleRomanji: string;

  @ApiProperty({
    description: 'Title kanji of the library section',
    example: '図書館セクション',
    type: String,
  })
  @IsNotEmpty({ message: 'Title kanji is required' })
  @IsString({ message: 'Title kanji must be a string' })
  titleKanji: string;

  @ApiProperty({
    description: 'Coins needed to access the library section',
    example: 100,
    type: Number,
  })
  @IsNotEmpty({ message: 'Coins needed is required' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'Coins needed must be a number' },
  )
  coinsNeeded: number;

  @ApiProperty({
    description: 'Order of the library section',
    example: 1,
    type: Number,
  })
  @IsNotEmpty({ message: 'Order is required' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'Order must be a number' },
  )
  order: number;
}

export class UpdateLibrarySectionDTO extends PartialType(CreateLibrarySectionDTO) {
  @ApiProperty({
    description: 'Library UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
    required: false,
  })
  @IsOptional({ message: 'Library UUID is required' })
  @IsString({ message: 'Library UUID must be a string' })
  libraryUuid: string;
}
