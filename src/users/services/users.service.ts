import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { hashPassword } from '../../utils/bcrypt.utils';
import { UpdateResponse } from '../../utils/responses';
import { RegisterDto } from '../dto/user/create-user.dto';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  async register(dto: RegisterDto): Promise<User> {
    const { password, jwt, ...rest } = dto;
    const passwordHash = await hashPassword(password);
    const user = this.userRepo.create({ password: passwordHash, deviceJWT: jwt, ...rest });
    return await this.userRepo.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({ where: { email } });
  }

  async validateUser(uuid: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { uuid } });

    if (!user || !user.isActive) {
      return null;
    }

    return user;
  }

  async validateSession(userUUID: string, sessionUUID: string): Promise<boolean> {
    const user = await this.userRepo.findOne({ where: { uuid: userUUID } });

    if (!user) {
      return false;
    }

    if (!user && user.deviceJWT !== sessionUUID) {
      return false;
    }

    return !!user;
  }

  async updateSession(userUUID: string, sessionUUID: string): Promise<void> {
    await this.userRepo.update({ uuid: userUUID }, { deviceJWT: sessionUUID });
  }

  async update(uuid: string, updateUserDto: UpdateUserDto): Promise<UpdateResponse> {
    const user = await this.userRepo.update({ uuid }, updateUserDto);

    if (user.affected === 0) {
      return {
        affected: 0,
        status: 204,
        message: 'not content',
      };
    }
    return {
      affected: user.affected,
      status: 200,
      message: 'success',
    };
  }
}
