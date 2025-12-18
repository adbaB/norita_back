import { Controller, Param, ParseEnumPipe, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { User } from '../../users/decorators/user.decorator';
import { LibrarySectionUser } from '../entities/librarySectionUser.entity';
import { TypeUnlockEnum } from '../enums/typeUnlock.enum';
import { LibrarySectionUserService } from '../services/librarySectionUser.service';

@ApiBearerAuth()
@Controller('librarySectionUser')
export class LibrarySectionUserController {
  constructor(private readonly librarySectionUserService: LibrarySectionUserService) {}

  @ApiQuery({ name: 'type', enum: TypeUnlockEnum })
  @ApiParam({ name: 'uuid' })
  @Post('unlock/:uuid')
  unlock(
    @Param('uuid', ParseUUIDPipe) sectionUUID: string,
    @Query('type', new ParseEnumPipe(TypeUnlockEnum)) type: TypeUnlockEnum,
    @User() userUUID: string,
  ): Promise<LibrarySectionUser> {
    return this.librarySectionUserService.unlock(sectionUUID, userUUID, type);
  }
}
