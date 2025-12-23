import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { LibrarySectionService } from '../../library/services/librarySection.service';
import { UsersService } from '../../users/services/users.service';
import { LibrarySectionUser } from '../entities/librarySectionUser.entity';
import { TypeUnlockEnum } from '../enums/typeUnlock.enum';
import { LibraryUserService } from './libraryUser.service';

@Injectable()
export class LibrarySectionUserService {
  constructor(
    @InjectRepository(LibrarySectionUser)
    private readonly librarySectionUser: Repository<LibrarySectionUser>,
    @Inject(forwardRef(() => LibrarySectionService))
    private readonly librarySectionService: LibrarySectionService,
    private readonly libraryUserService: LibraryUserService,
    private readonly usersService: UsersService,
  ) {}

  @Transactional()
  async unlock(
    sectionUUID: string,
    userUUID: string,
    typeUnlock: TypeUnlockEnum,
  ): Promise<LibrarySectionUser> {
    const section = await this.librarySectionService.findByUUID(sectionUUID);

    if (!section) {
      throw new NotFoundException('Section not found');
    }

    const user = await this.usersService.findByUUID(userUUID);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!section?.library?.uuid) {
      throw new NotFoundException('Library not found');
    }

    if (!user.isPremium && typeUnlock === TypeUnlockEnum.PREMIUM) {
      throw new ConflictException('User is not premium');
    }

    const libraryUser = await this.libraryUserService.findByLibraryAndUser(
      section?.library?.uuid,
      userUUID,
    );

    if (!libraryUser) {
      throw new ConflictException('the library is not unlocked, please unlock it first');
    }

    const librarySection = await this.librarySectionUser.findOne({
      where: { user: { uuid: userUUID }, section: { uuid: sectionUUID } },
    });

    if (librarySection) {
      if (librarySection.typeUnlock === TypeUnlockEnum.GEMS) {
        throw new ConflictException('Section is already unlocked');
      }

      if (typeUnlock === TypeUnlockEnum.GEMS && section.coinsNeeded > 0) {
        await this.usersService.decreaseCoins(userUUID, section.coinsNeeded);
      }

      librarySection.typeUnlock = typeUnlock;
      return this.librarySectionUser.save(librarySection);
    }

    if (typeUnlock === TypeUnlockEnum.GEMS && section.coinsNeeded > 0) {
      await this.usersService.decreaseCoins(userUUID, section.coinsNeeded);
    }

    const newLibrarySection = this.librarySectionUser.create({
      user,
      section,
      typeUnlock,
    });

    return await this.librarySectionUser.save(newLibrarySection);
  }

  async findBySectionAndUser(sectionUUID: string, userUUID: string): Promise<LibrarySectionUser> {
    const section = await this.librarySectionService.findByUUID(sectionUUID);

    if (!section) {
      throw new NotFoundException('Section not found');
    }

    const user = await this.usersService.findByUUID(userUUID);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.librarySectionUser.findOne({
      where: { user: { uuid: userUUID }, section: { uuid: sectionUUID } },
    });
  }

  async unlockAllFreeSections(
    userUUID: string,
    libraryUUID: string,
  ): Promise<LibrarySectionUser[]> {
    const sections = await this.librarySectionService.findByLibraryCoins(libraryUUID, 0);
    if (sections.length <= 0) {
      return null;
    }

    const libraryUser = await this.libraryUserService.findByLibraryAndUser(libraryUUID, userUUID);

    if (!libraryUser) {
      return null;
    }
    const librarySectionUsers = await Promise.all(
      sections.map(async (section) => {
        const sectionUser = await this.findBySectionAndUser(section.uuid, userUUID);

        if (sectionUser) {
          return sectionUser;
        }
        return this.unlock(section.uuid, userUUID, TypeUnlockEnum.GEMS);
      }),
    );
    return librarySectionUsers;
  }
}
