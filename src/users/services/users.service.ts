import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { hashPassword } from '../../utils/bcrypt.utils';
import { UpdateResponse } from '../../utils/responses';
import { RegisterDto } from '../dto/user/create-user.dto';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { User } from '../entities/user.entity';

/**
 * UsersService is a service that handles user-related operations.
 * It uses the TypeORM repository to interact with the database.
 */
@Injectable()
export class UsersService {
  /**
   * Constructor of UsersService.
   * @param {Repository<User>} userRepo - The TypeORM repository for User entity.
   */
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  /**
   * Registers a new user.
   * @param {RegisterDto} dto - The request body containing the user's information.
   * @returns {Promise<User>} - A promise that resolves with the newly created user.
   */
  async register(dto: RegisterDto): Promise<User> {
    const { password, jwt, ...rest } = dto;
    const passwordHash = await hashPassword(password);
    const user = this.userRepo.create({ password: passwordHash, deviceJWT: jwt, ...rest });
    return await this.userRepo.save(user);
  }

  /**
   * Finds a user by email.
   * @param {string} email - The email of the user to be found.
   * @returns {Promise<User>} - A promise that resolves with the user if found, null otherwise.
   */
  async findByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({ where: { email } });
  }

  /**
   * Validates a user by UUID.
   * @param {string} uuid - The UUID of the user to be validated.
   * @returns {Promise<User>} - A promise that resolves with the user if valid, null otherwise.
   */
  async validateUser(uuid: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { uuid } });

    if (!user || !user.isActive) {
      return null;
    }

    return user;
  }

  /**
   * Validates a user's session by UUID and sessionUUID.
   * @param {string} userUUID - The UUID of the user to be validated.
   * @param {string} sessionUUID - The sessionUUID of the user to be validated.
   * @returns {Promise<boolean>} - A promise that resolves with true if the user's session is valid, false otherwise.
   */
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

  /**
   * Updates a user's session by UUID.
   * @param {string} userUUID - The UUID of the user to be updated.
   * @param {string} sessionUUID - The new sessionUUID of the user.
   * @returns {Promise<void>} - A promise that resolves when the user's session is updated.
   */
  async updateSession(userUUID: string, sessionUUID: string): Promise<void> {
    await this.userRepo.update({ uuid: userUUID }, { deviceJWT: sessionUUID });
  }

  /**
   * Updates a user by UUID.
   * @param {string} uuid - The UUID of the user to be updated.
   * @param {UpdateUserDto} updateUserDto - The request body containing the user's updated information.
   * @returns {Promise<UpdateResponse>} - A promise that resolves with an UpdateResponse object containing the result of the update.
   */
  async update(uuid: string, updateUserDto: UpdateUserDto): Promise<UpdateResponse> {
    if (updateUserDto?.password) {
      const passwordHash = await hashPassword(updateUserDto.password);
      updateUserDto.password = passwordHash;
    }
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
