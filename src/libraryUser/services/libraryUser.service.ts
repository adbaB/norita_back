import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LibraryService } from '../../library/services/library.service';
import { UsersService } from '../../users/services/users.service';
import { LibraryUser } from '../entities/libraryUser.entity';
import { TypeUnlockEnum } from '../enums/typeUnlock.enum';

@Injectable()
export class LibraryUserService {
  constructor(
    @InjectRepository(LibraryUser) private readonly libraryUserRepo: Repository<LibraryUser>,
    @Inject(forwardRef(() => LibraryService)) private readonly libraryService: LibraryService,
    private readonly usersService: UsersService,
  ) {}

  async unlock(
    userUUID: string,
    libraryUUID: string,
    typeUnlock: TypeUnlockEnum,
  ): Promise<LibraryUser> {
    const library = await this.libraryService.findOne(libraryUUID);

    if (!library) {
      throw new NotFoundException('Library not found');
    }

    const user = await this.usersService.findByUUID(userUUID);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!user.isPremiun && typeUnlock === TypeUnlockEnum.PREMIUM) {
      throw new ConflictException('User is not premium');
    }
    const libraryUser = await this.libraryUserRepo.findOne({
      where: { user: { uuid: userUUID }, library: { uuid: libraryUUID } },
    });

    if (libraryUser) {
      if (libraryUser.typeUnlock === TypeUnlockEnum.GEMS) {
        throw new ConflictException('Library is already unlocked');
      }

      if (typeUnlock === TypeUnlockEnum.GEMS && library.coinsNeeded > 0) {
        await this.usersService.decreaseCoins(userUUID, library.coinsNeeded);
      }

      libraryUser.typeUnlock = typeUnlock;
      return this.libraryUserRepo.save(libraryUser);
    }

    if (typeUnlock === TypeUnlockEnum.GEMS && library.coinsNeeded > 0) {
      await this.usersService.decreaseCoins(userUUID, library.coinsNeeded);
    }

    const newLibraryUser = this.libraryUserRepo.create({
      user,
      library,
      typeUnlock,
    });

    return this.libraryUserRepo.save(newLibraryUser);
  }

  findByLibraryAndUser(libraryUUID: string, userUUID: string): Promise<LibraryUser> {
    return this.libraryUserRepo.findOne({
      where: { library: { uuid: libraryUUID }, user: { uuid: userUUID } },
    });
  }
}
