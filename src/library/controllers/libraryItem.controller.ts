import { Body, Controller, Param, ParseArrayPipe, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiResponse as ClassApiResponse } from '../../utils/responses';
import { CreateLibraryItemDTO } from '../dto/libraryItem.dto';
import { LibraryItem } from '../entities/libraryItem.entity';
import { LibraryItemService } from '../services/libraryItem.service';

@Controller('library/item')
export class LibraryItemController {
  constructor(private readonly libraryItemService: LibraryItemService) {}

  @Post(':uuid')
  async create(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(
      new ParseArrayPipe({
        items: CreateLibraryItemDTO,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    body: CreateLibraryItemDTO[],
  ): Promise<ClassApiResponse<LibraryItem[]>> {
    return new ClassApiResponse(
      true,
      'Library item created successfully',
      await this.libraryItemService.create(uuid, body),
    );
  }
}
