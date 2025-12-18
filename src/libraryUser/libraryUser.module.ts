import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryModule } from '../library/library.module';
import { UsersModule } from '../users/users.module';
import { LibraryUserController } from './controllers/libraryUser.controller';
import { LibraryUser } from './entities/libraryUser.entity';
import { LibraryUserGuard } from './guards/libraryUser.guard';
import { LibraryUserService } from './services/libraryUser.service';

@Module({
  imports: [TypeOrmModule.forFeature([LibraryUser]), forwardRef(() => LibraryModule), UsersModule],
  controllers: [LibraryUserController],
  providers: [LibraryUserService, LibraryUserGuard],
  exports: [LibraryUserService, LibraryUserGuard],
})
export class LibraryUserModule {}
