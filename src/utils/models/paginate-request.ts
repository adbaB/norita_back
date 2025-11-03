import { IsNotEmpty, IsNumberString } from 'class-validator';

export class Paginate {
  @IsNotEmpty()
  @IsNumberString()
  page: number;
  @IsNotEmpty()
  @IsNumberString()
  limit: number;
}
