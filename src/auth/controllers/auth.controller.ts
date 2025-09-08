import { Body, Controller, Post, Res } from '@nestjs/common';

import { AuthService } from '../services/auth.service';

import { Response } from 'express';
import { IsPublic } from '../decorators/isPublic.decorator';
import { LoginDto } from '../dto/logIn.dto';
import { RegisterDto } from '../../users/dto/user/create-user.dto';
import { CreatedResponse } from '../../utils/responses';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
    const response = await this.authService.signIn(loginDto);

    res.status(response.status).json(response);
  }

  @IsPublic()
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<CreatedResponse<unknown>> {
    return this.authService.register(registerDto);
  }
}
