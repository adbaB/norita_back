import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
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

  @ApiProperty({
    description: 'notification token of the user',
    nullable: true,
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  notificationToken?: string;

  @IsOptional()
  @IsString()
  resetPasswordOtp?: string | null;

  @IsOptional()
  resetPasswordOtpExpiresAt?: Date | null;
  @ApiProperty({
    description: 'google token of the user',
    nullable: true,
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  googleToken?: string;

  @ApiProperty({
    description: 'apple identity token of the user',
    nullable: true,
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  appleToken?: string;
}
