import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryModule } from '../library/library.module';
import { UsersModule } from '../users/users.module';
import { LibrarySectionUserController } from './controllers/librarySectionUser.controller';
import { LibraryUserController } from './controllers/libraryUser.controller';
import { LibrarySectionUser } from './entities/librarySectionUser.entity';
import { LibraryUser } from './entities/libraryUser.entity';
import { LibrarySectionUserGuard } from './guards/librarySectionUser.guard';
import { LibraryUserGuard } from './guards/libraryUser.guard';
import { LibrarySectionUserService } from './services/librarySectionUser.service';
import { LibraryUserService } from './services/libraryUser.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LibraryUser, LibrarySectionUser]),
    forwardRef(() => LibraryModule),
    UsersModule,
  ],
  controllers: [LibraryUserController, LibrarySectionUserController],
  providers: [
    LibraryUserService,
    LibraryUserGuard,
    LibrarySectionUserService,
    LibrarySectionUserGuard,
  ],
  exports: [
    LibraryUserService,
    LibraryUserGuard,
    LibrarySectionUserService,
    LibrarySectionUserGuard,
  ],
})
export class LibraryUserModule {}
