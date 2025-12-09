import { Category } from '../../interfaces/commons/category.interface';

export class CategoryDTO implements Category {
  category: string;
  order: number;
}
