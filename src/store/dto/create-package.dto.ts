import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { PackageTypeEnum } from '../enum/package.enum';

export class CreatePackageDto {
  @ApiProperty({ description: 'Price of the package', example: 10.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Name of the package', example: 'Package 1' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the package', example: 'This is a package' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Discount amount', example: 0, required: false })
  @IsNumber()
  @IsOptional()
  discount?: number;

  @ApiProperty({ description: 'Coins included in the package', example: 100 })
  @IsNumber()
  coinsIncluded: number;

  @ApiProperty({ description: 'Type of the package', enum: PackageTypeEnum })
  @IsEnum(PackageTypeEnum)
  type: PackageTypeEnum;

  @ApiProperty({
    description: 'Image of the package',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ description: 'List of Library UUIDs to link', example: ['uuid1', 'uuid2'] })
  @IsArray()
  @IsUUID('4', { each: true })
  libraryIds: string[];
}
