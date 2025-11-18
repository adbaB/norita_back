import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { RegisterDto } from './create-user.dto';

export class UpdateUserParamsDto {
  id: number;
}

export class UpdateUserDto extends PartialType(RegisterDto) {
  @ApiProperty({
    description: 'isActive of the user',
    nullable: true,
    required: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'isGuest of the user',
    nullable: true,
    required: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  isGuest?: boolean;
}
