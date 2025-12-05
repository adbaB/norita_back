import { Body, Controller, NotFoundException, Post, Req, Res, UseGuards } from '@nestjs/common';

import { AuthService } from '../services/auth.service';

import { ApiBearerAuth, ApiHeader, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { JwtTokenPayload } from '../../libs/Auth/token';
import {
  RegisterDto,
  RegisterGuestDTO,
  RegisterWithGoogleDTO,
} from '../../users/dto/user/create-user.dto';
import { LoginResponse } from '../../utils/responses';
import { IsPublic } from '../decorators/isPublic.decorator';
import { LoginDto, LoginWithGoogleDTO } from '../dto/logIn.dto';
import { JwtRefreshGuard } from '../guards/jwtRefresh.guard';
import { RegisterInterface } from '../interfaces/register.interface';
import { ApiResponse as ClassApiResponse } from './../../utils/responses';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Handle the login request and return the response.
   * @param loginDto {LoginDto} - The request body.
   * @param res {Response} - The response object.
   * @returns {Promise<void>} - A promise that resolves when the request is done.
   */
  @ApiResponse({ status: 201, type: ClassApiResponse<LoginResponse>, description: 'success' })
  @ApiUnauthorizedResponse({ description: 'email or password is incorrect' })
  @IsPublic()
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
    const response = await this.authService.signIn(loginDto);
    res.status(response.status).json(new ClassApiResponse(true, response.message, response.data));
  }

  /**
   * Handle the register request and return the response.
   * @param registerDto {RegisterDto} - The request body.
   * @returns {Promise<ClassApiResponse<RegisterInterface>>} - A promise that resolves with the response.
   */
  @IsPublic()
  @ApiResponse({ status: 201, type: ClassApiResponse<RegisterInterface>, description: 'success' })
  @ApiUnauthorizedResponse()
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<ClassApiResponse<RegisterInterface>> {
    const user = await this.authService.register(registerDto);
    return new ClassApiResponse(true, 'User created successfully', user);
  }

  /**
   * Handle the renew access token request and return the response.
   * @param req {Request} - The request object.
   * @returns {Promise<ClassApiResponse<{ accessToken: string }>>} - A promise that resolves with the new access token.
   */
  @ApiHeader({
    name: 'x-refresh-token',
    required: true,
    description: 'Refresh token header',
    example: 'token',
  })
  @ApiResponse({
    status: 200,
    type: ClassApiResponse<{ accessToken: string }>,
    description: 'success',
  })
  @IsPublic()
  @Post('/renew-access-token')
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  async renewAccessToken(
    @Req() req: Request,
  ): Promise<ClassApiResponse<{ accessToken: string; refreshToken: string }>> {
    const refreshToken = req.headers['x-refresh-token'] as string;
    if (!refreshToken) {
      throw new NotFoundException('Refresh token is missing');
    }
    if (!req.user) {
      throw new NotFoundException('Access token not found');
    }
    const refreshTokenResponse = await this.authService.renewAccessToken(
      req.user as JwtTokenPayload,
      refreshToken,
    );
    return new ClassApiResponse(true, 'Access token renewed successfully', refreshTokenResponse);
  }

  /**
   * Handle the guest user creation request and return the response.
   * @returns {Promise<ClassApiResponse<RegisterInterface>>} - A promise that resolves with the created guest user and access token.
   */
  @IsPublic()
  @ApiResponse({ status: 201, type: ClassApiResponse<RegisterInterface>, description: 'success' })
  @Post('guest')
  async guest(@Body() registerDto: RegisterGuestDTO): Promise<ClassApiResponse<RegisterInterface>> {
    const user = await this.authService.createGuestUser(registerDto);

    return new ClassApiResponse(true, 'Guest user created successfully', user);
  }

  @ApiResponse({ status: 201, type: ClassApiResponse<RegisterInterface>, description: 'success' })
  @IsPublic()
  @Post('register-with-google')
  async registerWithGoogle(
    @Body() body: RegisterWithGoogleDTO,
  ): Promise<ClassApiResponse<RegisterInterface>> {
    const user = await this.authService.registerWithGoogle(body);

    return new ClassApiResponse(true, 'User created successfully', user);
  }

  @Post('login-with-google')
  @IsPublic()
  async loginWithGoogle(
    @Body() body: LoginWithGoogleDTO,
  ): Promise<ClassApiResponse<LoginResponse>> {
    const login = await this.authService.signInWithGoogle(body.token);

    return new ClassApiResponse(true, 'Login successful', login);
  }
}
