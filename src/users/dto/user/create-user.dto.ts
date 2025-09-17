import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

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
  @IsNotEmpty()
  password: string;

  jwt?: string;

  @ApiProperty({
    description: 'firstLesson of the user',
    nullable: false,
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  firstLesson: boolean;

  @ApiProperty({
    description: 'secondLesson of the user',
    nullable: false,
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  secondLesson: boolean;

  @ApiProperty({
    description: 'firstTutorial of the user',
    nullable: false,
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  firstTutorial: boolean;

  @ApiProperty({
    description: 'firstTutorial of the user',
    nullable: false,
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  secondTutorial: boolean;
}
