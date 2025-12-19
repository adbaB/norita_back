import { Controller, Param, ParseEnumPipe, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { User } from '../../users/decorators/user.decorator';
import { LibraryUser } from '../entities/libraryUser.entity';
import { TypeUnlockEnum } from '../enums/typeUnlock.enum';
import { LibraryUserService } from '../services/libraryUser.service';

@ApiBearerAuth()
@Controller('libraryUser')
export class LibraryUserController {
  constructor(private readonly libraryUserService: LibraryUserService) {}

  @ApiQuery({ name: 'type', enum: TypeUnlockEnum })
  @ApiParam({ name: 'uuid' })
  @Post('unlock/:uuid')
  unlock(
    @Param('uuid', ParseUUIDPipe) libraryUUID: string,
    @Query('type', new ParseEnumPipe(TypeUnlockEnum)) type: TypeUnlockEnum,
    @User() userUUID: string,
  ): Promise<LibraryUser> {
    return this.libraryUserService.unlock(userUUID, libraryUUID, type);
  }
}
