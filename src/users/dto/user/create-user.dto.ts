import { IsBoolean, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  jwt?: string;

  @IsBoolean()
  @IsOptional()
  firstLesson: boolean;

  @IsBoolean()
  @IsOptional()
  secondLesson: boolean;

  @IsBoolean()
  @IsOptional()
  firstTutorial: boolean;

  @IsBoolean()
  @IsOptional()
  secondTutorial: boolean;
}
