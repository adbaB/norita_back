import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductType } from '../enums/product-type.enum';

export class CreateEntitlementDto {
  @ApiProperty({ description: 'RevenueCat entitlement identifier' })
  @IsNotEmpty()
  @IsString()
  entitlementId: string;

  @ApiProperty({ description: 'Type of reward given by this entitlement', enum: ProductType })
  @IsNotEmpty()
  @IsEnum(ProductType)
  type: ProductType;

  @ApiProperty({ description: 'Grants premium to the user', default: false, required: false })
  @IsOptional()
  @IsBoolean()
  grantsPremium?: boolean;

  @ApiProperty({ description: 'Grants remove ads to the user', default: false, required: false })
  @IsOptional()
  @IsBoolean()
  grantsRemoveAds?: boolean;

  @ApiProperty({ description: 'Coins to grant to the user', default: 0, required: false })
  @IsOptional()
  @IsInt()
  coinsToGrant?: number;

  @ApiProperty({ description: 'Is the entitlement active?', default: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'UUIDs of the libraries to grant to the user',
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  grantsLibraryIds?: string[];
}
