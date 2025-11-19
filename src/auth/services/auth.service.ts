import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { JwtTokenPayload, PayloadToken } from '../../libs/Auth/token';
import { LoginResponse } from '../../utils/responses';

import { ConfigType } from '@nestjs/config';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import configuration from '../../config/configuration';
import {
  RegisterDto,
  RegisterGuestDTO,
  RegisterWithGoogleDTO,
} from '../../users/dto/user/create-user.dto';
import { UsersService } from '../../users/services/users.service';
import { comparePassword } from '../../utils/bcrypt.utils';
import { LoginDto } from '../dto/logIn.dto';
import { RegisterInterface } from '../interfaces/register.interface';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(configuration.KEY) private readonly configService: ConfigType<typeof configuration>,
  ) {
    this.googleClient = new OAuth2Client({
      clientId: this.configService.google.client,
      clientSecret: this.configService.google.secret,
    });
  }

  /**
   * Sign in with the provided credentials.
   * @param loginDto {LoginDto} - The request body containing the email and password.
   * @returns {Promise<LoginResponse>} - A promise that resolves with a LoginResponse object containing the access token.
   * @throws {UnauthorizedException} - If the email or password is incorrect.
   */
  async signIn(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;

    const user = await this.usersService.findByEmail(email);

    if (!user || !user.isActive) {
      throw new UnauthorizedException('email or password is incorrect');
    }
    const isValid = await comparePassword(password, user?.password);

    if (!isValid) {
      throw new UnauthorizedException('email or password is incorrect');
    }

    const sessionUUID = randomUUID();
    const payload: PayloadToken = {
      email,
      uuid: user.uuid,
      role: user.role,
      sessionUUID,
    };

    await this.usersService.updateSession(user.uuid, sessionUUID);
    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);

    return {
      status: 200,
      message: 'success',
      data: {
        accessToken: accessToken,
        refreshToken,
      },
    };
  }

  async signInWithGoogle(token: string): Promise<LoginResponse> {
    const payloadGoogle = await this.verifyGoogleToken(token);
    const user = await this.usersService.findByEmail(payloadGoogle.email);
    if (!user) {
      throw new BadRequestException('Email not found');
    }
    if (!user.signInGoogle) {
      throw new BadRequestException('User not registered with Google');
    }

    const sessionUUID = randomUUID();

    const payload: PayloadToken = {
      email: user.email,
      uuid: user.uuid,
      role: user.role,
      sessionUUID,
    };

    await this.usersService.updateSession(user.uuid, sessionUUID);
    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);

    return {
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
      message: 'success',
      status: 200,
    };
  }

  async registerWithGoogle(dto: RegisterWithGoogleDTO): Promise<RegisterInterface> {
    const { token, firstRewards, fistTutorial, secondRewards, secondTutorial, levelUuid } = dto;

    const payloadGoogle = await this.verifyGoogleToken(token);

    const user = await this.usersService.findByEmail(payloadGoogle.email);
    if (user) {
      throw new BadRequestException('Email already exists');
    }
    const sessionUUID = randomUUID();
    const userCreated = await this.usersService.registerWithGoogle({
      email: payloadGoogle.email,
      username: payloadGoogle.name,
      firstRewards,
      fistTutorial,
      secondRewards,
      secondTutorial,
      levelUuid,
      jwt: sessionUUID,
      password: randomUUID(),
    });
    const payload: PayloadToken = {
      email: userCreated.email,
      uuid: userCreated.uuid,
      role: userCreated.role,
      sessionUUID,
    };

    // Generate an access token
    const accessToken = await this.generateAccessToken(payload);

    const refreshToken = await this.generateRefreshToken(payload);

    return { accessToken: accessToken, refreshToken: refreshToken, user: userCreated };
  }

  /**
   * Register a new user
   * @param registerDto {RegisterDto} - The request body
   * @returns {Promise<CreatedResponse<User>>} - A promise that resolves with the response
   */
  async register(registerDto: RegisterDto): Promise<RegisterInterface> {
    const user = await this.usersService.findByEmail(registerDto.email);
    if (user) {
      // If the user already exists, throw a BadRequestException
      throw new BadRequestException('Email already exists');
    }

    const sessionUUID = randomUUID();

    const createdUser = await this.usersService.register({
      ...registerDto,
      jwt: sessionUUID,
    });

    const payload: PayloadToken = {
      email: createdUser.email,
      uuid: createdUser.uuid,
      role: createdUser.role,
      sessionUUID,
    };

    // Generate an access token
    const accessToken = await this.generateAccessToken(payload);

    const refreshToken = await this.generateRefreshToken(payload);
    return {
      user: createdUser,
      accessToken,
      refreshToken,
    };
  }

  async createGuestUser(dto: RegisterGuestDTO): Promise<RegisterInterface> {
    const { firstRewards, fistTutorial, secondRewards, secondTutorial, levelUuid } = dto;
    const sessionUUID = randomUUID();
    const guestUsername = `guest-${sessionUUID}`;
    const guestPassword = randomUUID();
    const guestUser = await this.usersService.register({
      email: `${guestUsername}@norita-app.com`,
      username: guestUsername,
      password: guestPassword,
      firstRewards,
      fistTutorial,
      secondRewards,
      secondTutorial,
      isGuest: true,
      jwt: sessionUUID,
      levelUuid,
    });

    const payload: PayloadToken = {
      email: guestUser.email,
      uuid: guestUser.uuid,
      role: guestUser.role,
      sessionUUID,
    };

    // Generate an access token
    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);
    return {
      user: guestUser,
      accessToken,
      refreshToken,
    };
  }

  async renewAccessToken(
    payload: JwtTokenPayload,
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, sessionUUID, uuid, role } = payload;
    const accessToken = await this.generateAccessToken({
      email,
      uuid,
      role,
      sessionUUID,
    });

    const decodedRefreshToken = this.jwtService.decode(refreshToken) as JwtTokenPayload;

    if (decodedRefreshToken.sessionUUID !== sessionUUID) {
      throw new UnauthorizedException('Invalid refresh token session');
    }

    const newRefreshToken = await this.generateRefreshToken({
      email: decodedRefreshToken.email,
      uuid: decodedRefreshToken.uuid,
      role: decodedRefreshToken.role,
      sessionUUID: decodedRefreshToken.sessionUUID,
    });

    return { accessToken, refreshToken: newRefreshToken };
  }

  async logOut(userUUID: string): Promise<void> {
    await this.usersService.updateSession(userUUID, null);
  }

  private async generateAccessToken(payload: PayloadToken): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  private async generateRefreshToken(payload: PayloadToken): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.jwtRefresh.expiresIn,
      secret: this.configService.jwtRefresh.secret,
    });
  }

  private async verifyGoogleToken(token: string): Promise<TokenPayload> {
    const ticket = await this.googleClient.verifyIdToken({
      idToken: token,
      audience: this.configService.google.client,
    });
    const payloadGoogle = ticket.getPayload();
    if (!payloadGoogle || !payloadGoogle.email_verified) {
      throw new BadRequestException('Invalid Google token');
    }
    return payloadGoogle;
  }
}
