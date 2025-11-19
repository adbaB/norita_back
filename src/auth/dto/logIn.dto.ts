import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'email of the user', nullable: false, required: true, type: String })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password of the user',
    nullable: false,
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginWithGoogleDTO {
  @ApiProperty({ description: 'Google OAuth token', nullable: false, required: true, type: String })
  @IsNotEmpty()
  @IsString()
  token: string;
}
