import { Body, Controller, Post, Res } from '@nestjs/common';

import { AuthService } from '../services/auth.service';

import { ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { RegisterDto } from '../../users/dto/user/create-user.dto';
import { User } from '../../users/entities/user.entity';
import { CreatedResponse, LoginResponse } from '../../utils/responses';
import { IsPublic } from '../decorators/isPublic.decorator';
import { LoginDto } from '../dto/logIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Handle the login request and return the response.
   * @param loginDto {LoginDto} - The request body.
   * @param res {Response} - The response object.
   * @returns {Promise<void>} - A promise that resolves when the request is done.
   */
  @ApiResponse({ status: 201, type: LoginResponse, description: 'success' })
  @ApiUnauthorizedResponse({ description: 'email or password is incorrect' })
  @IsPublic()
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
    const response = await this.authService.signIn(loginDto);
    res.status(response.status).json(response);
  }

  /**
   * Handle the register request and return the response.
   * @param registerDto {RegisterDto} - The request body.
   * @returns {Promise<CreatedResponse<User>>} - A promise that resolves with the response.
   */
  @IsPublic()
  @ApiResponse({ status: 201, type: CreatedResponse<User>, description: 'success' })
  @ApiUnauthorizedResponse()
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<CreatedResponse<User>> {
    return this.authService.register(registerDto);
  }

  /**
   * Handle the guest user creation request and return the response.
   * @returns {Promise<CreatedResponse<User>>} - A promise that resolves with the created guest user and access token.
   */
  @IsPublic()
  @ApiResponse({ status: 201, type: CreatedResponse<User>, description: 'success' })
  @Post('guest')
  async guest(): Promise<CreatedResponse<User>> {
    return this.authService.createGuestUser();
  }
}
