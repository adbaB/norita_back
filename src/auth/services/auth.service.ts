import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { JwtTokenPayload, PayloadToken } from '../../libs/Auth/token';
import { LoginResponse } from '../../utils/responses';

import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { AppleService } from 'src/firebase/service/apple.service';
import { GoogleService } from 'src/firebase/service/google.service';
import configuration from '../../config/configuration';
import { MailService } from '../../mail/services/mail.service';
import {
  RegisterDto,
  RegisterGuestDTO,
  RegisterWithAppleDTO,
  RegisterWithGoogleDTO,
} from '../../users/dto/user/create-user.dto';
import { UsersService } from '../../users/services/users.service';
import { comparePassword } from '../../utils/bcrypt.utils';
import { LoginDto } from '../dto/logIn.dto';
import { ForgotPasswordDto, ResetPasswordDto, ValidateOtpDto } from '../dto/password-reset.dto';
import { RegisterInterface } from '../interfaces/register.interface';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly googleService: GoogleService,
    private readonly appleService: AppleService,
    @Inject(configuration.KEY) private readonly configService: ConfigType<typeof configuration>,
    private readonly emailService: MailService,
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
      status: 201,
      message: 'success',
      data: {
        accessToken: accessToken,
        refreshToken,
      },
    };
  }

  async signInWithGoogle(token: string): Promise<LoginResponse> {
    const payloadGoogle = await this.googleService.verifyGoogleToken(token);
    const user = await this.usersService.findByEmail(payloadGoogle.email);
    if (!user) {
      throw new BadRequestException('Email not found');
    }

    if (!user.isActive) {
      throw new BadRequestException('User is inactive');
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
      status: 201,
    };
  }

  async registerWithGoogle(dto: RegisterWithGoogleDTO): Promise<RegisterInterface> {
    const { token, firstRewards, firstTutorial, secondRewards, secondTutorial, levelUuid } = dto;

    const payloadGoogle = await this.googleService.verifyGoogleToken(token);

    const user = await this.usersService.findByEmail(payloadGoogle.email);
    if (user) {
      throw new BadRequestException('Email already exists');
    }
    const sessionUUID = randomUUID();
    const userCreated = await this.usersService.register({
      email: payloadGoogle.email,
      username: payloadGoogle.name,
      firstRewards,
      firstTutorial,
      secondRewards,
      secondTutorial,
      levelUuid,
      jwt: sessionUUID,
      password: randomUUID(),
      signInGoogle: true,
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

  async signInWithApple(identityToken: string): Promise<LoginResponse> {
    const applePayload = await this.appleService.verifyAppleToken(identityToken);
    const user = await this.usersService.findByEmail(applePayload.email);

    if (!user) {
      throw new BadRequestException('Email not found');
    }

    if (!user.isActive) {
      throw new BadRequestException('User is inactive');
    }

    if (!user.signInApple) {
      throw new BadRequestException('User not registered with Apple');
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
      data: { accessToken, refreshToken },
      message: 'success',
      status: 201,
    };
  }

  async registerWithApple(dto: RegisterWithAppleDTO): Promise<RegisterInterface> {
    const { identityToken, firstRewards, firstTutorial, secondRewards, secondTutorial, levelUuid } =
      dto;

    const applePayload = await this.appleService.verifyAppleToken(identityToken);

    const user = await this.usersService.findByEmail(applePayload.email);
    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const sessionUUID = randomUUID();
    const userCreated = await this.usersService.registerWithApple({
      email: applePayload.email,
      username: applePayload.email.split('@')[0],
      firstRewards,
      firstTutorial,
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

    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);

    return { accessToken, refreshToken, user: userCreated };
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
    const { firstRewards, firstTutorial, secondRewards, secondTutorial, levelUuid } = dto;
    const sessionUUID = randomUUID();
    const guestUsername = `guest-${sessionUUID}`;
    const guestPassword = randomUUID();
    const guestUser = await this.usersService.register({
      email: `${guestUsername}@norita-app.com`,
      username: guestUsername,
      password: guestPassword,
      firstRewards,
      firstTutorial,
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

  async attachAccountToGuest(): Promise<void> {
    // TODO: implement attachAccountToGuest
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

  async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      // Return success even if not found to prevent email enumeration
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    await this.usersService.update(user.uuid, {
      resetPasswordOtp: otp,
      resetPasswordOtpExpiresAt: expiresAt,
    });

    await this.emailService.sendPasswordResetOtp(user.email, otp);
  }

  async validateOtp(dto: ValidateOtpDto): Promise<{ token: string }> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || user.resetPasswordOtp !== dto.otp) {
      throw new BadRequestException('Invalid OTP or email');
    }

    if (!user.resetPasswordOtpExpiresAt || new Date() > user.resetPasswordOtpExpiresAt) {
      throw new BadRequestException('OTP has expired');
    }

    // Clear the OTP to prevent reuse
    await this.usersService.update(user.uuid, {
      resetPasswordOtp: null,
      resetPasswordOtpExpiresAt: null,
    });

    const resetToken = await this.jwtService.signAsync(
      { email: user.email, uuid: user.uuid, purpose: 'reset-password' },
      { expiresIn: '15m' },
    );

    return { token: resetToken };
  }

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    try {
      const payload = await this.jwtService.verifyAsync(dto.token);
      if (payload.purpose !== 'reset-password') {
        throw new BadRequestException('Invalid token');
      }

      const user = await this.usersService.findByEmail(payload.email);
      if (!user) {
        throw new BadRequestException('User not found');
      }

      await this.usersService.update(user.uuid, { password: dto.password });
    } catch {
      throw new BadRequestException('Invalid or expired token');
    }
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
}
