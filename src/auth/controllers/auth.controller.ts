import { Body, Controller, NotFoundException, Post, Req, Res, UseGuards } from '@nestjs/common';

import { AuthService } from '../services/auth.service';

import { ApiHeader, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { JwtTokenPayload } from '../../libs/Auth/token';
import { RegisterDto, RegisterGuestDTO } from '../../users/dto/user/create-user.dto';
import { User } from '../../users/entities/user.entity';
import { CreatedResponse, LoginResponse } from '../../utils/responses';
import { IsPublic } from '../decorators/isPublic.decorator';
import { LoginDto } from '../dto/logIn.dto';
import { JwtRefreshGuard } from '../guards/jwtRefresh.guard';

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

  @ApiHeader({ name: 'x-refresh-token', required: true, description: 'Refresh token' })
  @Post('/renew-access-token')
  @UseGuards(JwtRefreshGuard)
  async renewAccessToken(@Req() req: Request): Promise<{ accessToken: string }> {
    const refreshToken = req.headers['x-refresh-token'] as string;
    if (!refreshToken) {
      throw new NotFoundException('Refresh token is missing');
    }
    return this.authService.renewAccessToken(req.user as JwtTokenPayload);
  }

  /**
   * Handle the guest user creation request and return the response.
   * @returns {Promise<CreatedResponse<User>>} - A promise that resolves with the created guest user and access token.
   */
  @IsPublic()
  @ApiResponse({ status: 201, type: CreatedResponse<User>, description: 'success' })
  @Post('guest')
  async guest(@Body() registerDto: RegisterGuestDTO): Promise<CreatedResponse<User>> {
    return this.authService.createGuestUser(registerDto);
  }
}
