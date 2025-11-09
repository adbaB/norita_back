import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: 'email of the user', nullable: false, required: true, type: String })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password of the user',
    nullable: false,
    required: true,
    type: String,
    minimum: 8,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  jwt?: string;

  @ApiProperty({
    description: 'fistRewards of the user',
    nullable: false,
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  fistRewards: boolean;

  @ApiProperty({
    description: 'secondRewards of the user',
    nullable: false,
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  secondRewards: boolean;

  @ApiProperty({
    description: 'fistTutorial of the user',
    nullable: false,
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  fistTutorial: boolean;

  @ApiProperty({
    description: 'secondTutorial of the user',
    nullable: false,
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  secondTutorial: boolean;

  @ApiProperty({
    description: 'level selected of the user',
    nullable: true,
    required: false,
    type: String,
  })
  @IsUUID('4')
  @IsOptional()
  levelUuid?: string;

  @ApiProperty({
    description: 'image of the user',
    nullable: true,
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'username of the user',
    nullable: true,
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  username?: string;

  isGuest?: boolean;
}

export class RegisterGuestDTO extends OmitType(RegisterDto, [
  'email',
  'password',
  'image',
  'username',
] as const) {}
