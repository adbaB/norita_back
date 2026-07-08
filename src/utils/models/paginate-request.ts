import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class Paginate {
  @IsOptional()
  @Transform(({ value }) => Math.max(1, parseInt(value, 10) || 1))
  @IsInt()
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => Math.max(1, parseInt(value, 10) || 20))
  @IsInt()
  limit?: number = 20;
}
