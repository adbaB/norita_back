import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { PayloadToken } from '../../libs/Auth/token';
import { CreatedResponse, LoginResponse } from '../../utils/responses';

import { RegisterDto } from '../../users/dto/user/create-user.dto';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';
import { comparePassword } from '../../utils/bcrypt.utils';
import { LoginDto } from '../dto/logIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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

    return {
      status: 200,
      message: 'success',
      data: {
        accessToken: accessToken,
      },
    };
  }

  /**
   * Register a new user
   * @param registerDto {RegisterDto} - The request body
   * @returns {Promise<CreatedResponse<User>>} - A promise that resolves with the response
   */
  async register(registerDto: RegisterDto): Promise<CreatedResponse<User>> {
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
    return {
      status: 201,
      message: 'success',
      data: createdUser,
      accessToken,
    };
  }

  async createGuestUser(): Promise<CreatedResponse<User>> {
    const sessionUUID = randomUUID();
    const guestUsername = `guest-${sessionUUID}`;
    const guestPassword = randomUUID();
    const guestUser = await this.usersService.register({
      email: `${guestUsername}@norita-app.com`,
      username: guestUsername,
      password: guestPassword,
      fistTutorial: false,
      fistRewards: false,
      secondTutorial: false,
      secondRewards: false,
      isGuest: true,
      jwt: sessionUUID,
    });

    const payload: PayloadToken = {
      email: guestUser.email,
      uuid: guestUser.uuid,
      role: guestUser.role,
      sessionUUID,
    };

    // Generate an access token
    const accessToken = await this.generateAccessToken(payload);

    return {
      status: 201,
      message: 'success',
      data: guestUser,
      accessToken,
    };
  }

  async logOut(userUUID: string): Promise<void> {
    await this.usersService.updateSession(userUUID, null);
  }

  private async generateAccessToken(payload: PayloadToken): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
