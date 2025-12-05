import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ConfigType } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { Transactional } from 'typeorm-transactional';
import configuration from '../../config/configuration';
import { LessonProgressService } from '../../lessonProgress/services/lessonProgress.service';
import { hashPassword } from '../../utils/bcrypt.utils';
import { DeleteResponse, UpdateResponse } from '../../utils/responses';
import { RegisterDto } from '../dto/user/create-user.dto';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { User } from '../entities/user.entity';
import { LevelService } from './level.service';

/**
 * UsersService is a service that handles user-related operations.
 * It uses the TypeORM repository to interact with the database.
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly levelService: LevelService,
    private readonly lessonProgressService: LessonProgressService,
    @Inject(configuration.KEY) private configService: ConfigType<typeof configuration>,
  ) {}

  @Transactional()
  async registerWithGoogle(dto: RegisterDto): Promise<User> {
    const { password, jwt, levelUuid, firstRewards, secondRewards, ...rest } = dto;

    // Inicializar monedas y recompensas
    let initialCoins = 0;

    if (firstRewards) {
      initialCoins += this.configService.coins.tutorial;
    }
    if (secondRewards) {
      initialCoins += this.configService.coins.tutorial;
    }

    const passwordHash = await hashPassword(password);

    const user = this.userRepo.create({
      password: passwordHash,
      deviceJWT: jwt,
      ...rest,
      coin: initialCoins,
      firstRewards: firstRewards || false,
      secondRewards: secondRewards || false,
      username: rest.username ? rest.username : `user-${jwt}`,
      signInGoogle: true,
      isGuest: false,
      isActive: true,
    });

    if (levelUuid) {
      const levelEntity = await this.levelService.findByUUID(levelUuid);
      if (!levelEntity) {
        throw new NotFoundException(`Level with UUID ${levelUuid} not found`);
      }
      user.level = levelEntity;
    }

    const userCreated = await this.userRepo.save(user);

    await this.lessonProgressService.addInitialProgress(userCreated);

    return userCreated;
  }

  /**
   * Registers a new user.
   * @param {RegisterDto} dto - The request body containing the user's information.
   * @returns {Promise<User>} - A promise that resolves with the newly created user.
   */
  @Transactional()
  async register(dto: RegisterDto): Promise<User> {
    const { password, jwt, levelUuid, firstRewards, secondRewards, ...rest } = dto;

    const userFound = await this.userRepo.findOne({ where: { email: rest.email } });
    if (userFound) {
      throw new ConflictException('Email already exists');
    }
    // Inicializar monedas y recompensas
    let initialCoins = 0;

    if (firstRewards) {
      initialCoins += this.configService.coins.tutorial;
    }
    if (secondRewards) {
      initialCoins += this.configService.coins.tutorial;
    }

    const passwordHash = await hashPassword(password);

    const user = this.userRepo.create({
      password: passwordHash,
      deviceJWT: jwt,
      ...rest,
      coin: initialCoins,
      firstRewards: firstRewards || false,
      secondRewards: secondRewards || false,
      username: rest.username ? rest.username : `user-${jwt}`,
    });

    if (levelUuid) {
      const levelEntity = await this.levelService.findByUUID(levelUuid);
      if (!levelEntity) {
        throw new NotFoundException(`Level with UUID ${levelUuid} not found`);
      }
      user.level = levelEntity;
    }

    const userCreated = await this.userRepo.save(user);

    await this.lessonProgressService.addInitialProgress(userCreated);

    return userCreated;
  }

  /**
   * Finds a user by UUID.
   * @param {string} uuid - The UUID of the user to be found.
   * @returns {Promise<User>} - A promise that resolves with the user if found, null otherwise.
   */
  findByUUID(uuid: string): Promise<User> {
    return this.userRepo.findOne({ where: { uuid }, relations: ['level'] });
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

  async increaseCoins(uuid: string, coins: number): Promise<UpdateResponse> {
    const user = await this.userRepo.findOne({ where: { uuid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const result = await this.userRepo.update({ uuid }, { coin: user.coin + coins });
    return {
      affected: result.affected,
      status: result.affected === 0 ? 204 : 200,
    };
  }

  async decreaseCoins(uuid: string, coins: number): Promise<UpdateResponse> {
    const user = await this.userRepo.findOne({ where: { uuid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.coin - coins < 0) {
      throw new ConflictException('Not enough coins');
    }
    const result = await this.userRepo.update({ uuid }, { coin: user.coin - coins });
    return {
      affected: result.affected,
      status: result.affected === 0 ? 204 : 200,
    };
  }

  /**
   * Updates a user by UUID.
   * @param {string} uuid - The UUID of the user to be updated.
   * @param {UpdateUserDto} dto - The request body containing the user's updated information.
   * @returns {Promise<UpdateResponse>} - A promise that resolves with an UpdateResponse object containing the result of the update.
   */

  @Transactional()
  async update(uuid: string, dto: UpdateUserDto): Promise<UpdateResponse> {
    const { levelUuid, password, firstRewards, secondRewards, isGuest, ...updateData } = dto;

    let user = await this.userRepo.findOne({ where: { uuid } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateData.email) {
      const emailExists = await this.userRepo.findOne({ where: { email: updateData.email } });
      if (emailExists && emailExists.uuid !== uuid) {
        throw new ConflictException('Email already exists');
      }
    }

    if (user.isGuest && isGuest === false) {
      user.isGuest = false;
      user.username = `user-${randomUUID()}`;
    }

    let coinsToAdd = 0;

    if (firstRewards !== undefined) {
      if (firstRewards && user.firstRewards) {
        throw new ConflictException('First rewards already claimed, cannot update this field');
      }
      if (firstRewards && !user.firstRewards) {
        coinsToAdd += this.configService.coins.tutorial;
        user.firstRewards = true;
      }
    }

    if (secondRewards !== undefined) {
      if (secondRewards && user.secondRewards) {
        throw new ConflictException('Second rewards already claimed, cannot update this field');
      }
      if (secondRewards && !user.secondRewards) {
        coinsToAdd += this.configService.coins.tutorial;
        user.secondRewards = true;
      }
    }

    user = { ...user, ...updateData };
    if (password) {
      const hashedPassword = await hashPassword(password);
      user.password = hashedPassword;
    }

    if (levelUuid) {
      const levelEntity = await this.levelService.findByUUID(levelUuid);
      user.level = levelEntity;
    }

    user.coin += coinsToAdd;

    const result = await this.userRepo.update({ uuid }, user);

    return {
      affected: result.affected,
      status: result.affected === 0 ? 204 : 200,
    };
  }

  /**
   * Deletes a user by UUID.
   * @param {string} uuid - The UUID of the user to be deleted.
   * @returns {Promise<DeleteResponse>} - A promise that resolves with a DeleteResponse object containing the result of the deletion.
   */
  async delete(uuid: string): Promise<DeleteResponse> {
    const user = await this.userRepo.delete({ uuid });

    if (user.affected === 0) {
      throw new NotFoundException('User not found');
    }

    return {
      affected: user.affected,
      status: 200,
    };
  }
}
