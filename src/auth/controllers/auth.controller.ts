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

    /**
     * Set the response status and json body.
     * @param response {LoginResponse} - The response object.
     */
    res.status(response.status).json(response);
  }

  @IsPublic()
  @ApiResponse({ status: 201, type: CreatedResponse<User>, description: 'success' })
  @ApiUnauthorizedResponse()
  @Post('register')
  /**
   * Handle the register request and return the response.
   * @param registerDto {RegisterDto} - The request body.
   * @returns {Promise<CreatedResponse<unknown>>} - A promise that resolves with the response.
   */
  async register(@Body() registerDto: RegisterDto): Promise<CreatedResponse<User>> {
    /**
     * Call the AuthService.register method to register a new user.
     * @param registerDto {RegisterDto} - The request body.
     * @returns {Promise<CreatedResponse<unknown>>} - A promise that resolves with the response.
     */
    return this.authService.register(registerDto);
  }
}
