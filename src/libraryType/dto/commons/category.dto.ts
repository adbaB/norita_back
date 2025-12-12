import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from '../../interfaces/commons/category.interface';

export class CategoryDTO implements Category {
  @ApiProperty({
    type: String,
    description: 'category',
    example: 'radicals',
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({
    type: Number,
    description: 'order',
    example: 1,
    required: true,
    nullable: false,
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsNotEmpty()
  order: number;
}
