import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLibrarySectionDTO {
  @IsNotEmpty({ message: 'Title romanji is required' })
  @IsString({ message: 'Title romanji must be a string' })
  titleRomanji: string;

  @IsNotEmpty({ message: 'Title kanji is required' })
  @IsString({ message: 'Title kanji must be a string' })
  titleKanji: string;

  @IsNotEmpty({ message: 'Coins needed is required' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'Coins needed must be a number' },
  )
  coinsNeeded: number;

  @IsNotEmpty({ message: 'Order is required' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'Order must be a number' },
  )
  order: number;
}

export class UpdateLibrarySectionDTO extends PartialType(CreateLibrarySectionDTO) {
  @IsNotEmpty({ message: 'Library UUID is required' })
  @IsString({ message: 'Library UUID must be a string' })
  libraryUuid: string;
}
