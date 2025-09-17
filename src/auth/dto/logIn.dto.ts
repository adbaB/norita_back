import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'email of the user', nullable: false, required: true, type: String })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'password of the user',
    nullable: false,
    required: true,
    type: String,
  })
  @IsNotEmpty()
  password: string;
}
