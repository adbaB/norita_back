import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/role.decorator';
import { RoleEnum } from '../../users/enum/role.enum';
import {
  ApiResponse as ClassApiResponse,
  DeleteResponse,
  UpdateResponse,
} from '../../utils/responses';
import { CreateLibraryItemDTO, UpdateLibraryItemDTO } from '../dto/libraryItem.dto';
import { LibraryItem } from '../entities/libraryItem.entity';
import { LibraryItemService } from '../services/libraryItem.service';

@ApiBearerAuth()
@Controller('library/item')
export class LibraryItemController {
  constructor(private readonly libraryItemService: LibraryItemService) {}

  @ApiBody({ type: [CreateLibraryItemDTO] })
  @ApiResponse({ type: [LibraryItem] })
  @ApiParam({ name: 'uuid', description: 'UUID of the library section', type: String })
  @Post(':uuid')
  @Roles(RoleEnum.ADMIN)
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

  @Get('search')
  @ApiQuery({ name: 'term', required: true, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async search(
    @Query('term') term: string,
    @Query('limit') limit: number = 5,
  ): Promise<LibraryItem[]> {
    return this.libraryItemService.searchBySpanish(term, limit);
  }

  @Get(':uuid')
  async findOne(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<ClassApiResponse<LibraryItem>> {
    return new ClassApiResponse(
      true,
      'Library item found successfully',
      await this.libraryItemService.findOne(uuid),
    );
  }

  @Put(':uuid')
  @Roles(RoleEnum.ADMIN)
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() body: UpdateLibraryItemDTO,
  ): Promise<ClassApiResponse<UpdateResponse>> {
    return new ClassApiResponse(
      true,
      'Library item updated successfully',
      await this.libraryItemService.update(uuid, body),
    );
  }

  @Delete(':uuid')
  @Roles(RoleEnum.ADMIN)
  async delete(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<ClassApiResponse<DeleteResponse>> {
    return new ClassApiResponse(
      true,
      'Library item deleted successfully',
      await this.libraryItemService.delete(uuid),
    );
  }
}
