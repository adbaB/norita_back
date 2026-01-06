import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Price of the product', example: 10.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Name of the product', example: 'Product 1' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the product', example: 'This is a product' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Discount amount', example: 0, required: false })
  @IsNumber()
  @IsOptional()
  discount?: number;

  @ApiProperty({ description: 'Currency amount given', example: 100 })
  @IsNumber()
  currencyAmount: number;

  @ApiProperty({ description: 'List of Library UUIDs to link', example: ['uuid1', 'uuid2'] })
  @IsArray()
  @IsUUID('4', { each: true })
  libraryIds: string[];
}
