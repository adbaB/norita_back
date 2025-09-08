import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { RegisterDto } from './create-user.dto';

export class UpdateUserParamsDto {
  id: number;
}

export class UpdateUserDto extends PartialType(RegisterDto) {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
