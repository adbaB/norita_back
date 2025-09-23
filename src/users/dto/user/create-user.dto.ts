import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({
    description: 'level selected of the user',
    nullable: true,
    required: false,
    type: String,
  })
  @IsUUID('4')
  @IsOptional()
  levelUuid?: string;
}
