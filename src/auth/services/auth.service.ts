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

  async register(registerDto: RegisterDto): Promise<CreatedResponse<User>> {
    const user = await this.usersService.findByEmail(registerDto.email);
    if (user) {
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
      sessionUUID,
    };

    const accessToken = await this.generateAccessToken(payload);
    return {
      status: 201,
      message: 'success',
      data: createdUser,
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
