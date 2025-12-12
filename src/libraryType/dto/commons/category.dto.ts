import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from '../../interfaces/commons/category.interface';

export class CategoryDTO implements Category {
  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsNotEmpty()
  order: number;
}
