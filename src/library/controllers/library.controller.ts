import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/role.decorator';
import { LibraryUserGuard } from '../../libraryUser/guards/libraryUser.guard';
import { User } from '../../users/decorators/user.decorator';
import { RoleEnum } from '../../users/enum/role.enum';
import {
  ApiResponse as ClassApiResponse,
  DeleteResponse,
  UpdateResponse,
} from '../../utils/responses';
import { CreateLibraryDTO, UpdateLibraryDTO } from '../dto/library.dto';
import { Library } from '../entities/library.entity';
import { ResponseLibrary } from '../interfaces/responseLibrary.interface';
import { LibraryService } from '../services/library.service';

@ApiBearerAuth()
@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @ApiResponse({ status: 201, type: Library, description: 'Created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Roles(RoleEnum.ADMIN)
  @Post()
  async create(@Body() body: CreateLibraryDTO): Promise<ClassApiResponse<Library>> {
    return new ClassApiResponse(
      true,
      'Library created successfully',
      await this.libraryService.create(body),
    );
  }

  @ApiResponse({ status: 200, type: UpdateResponse, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Library not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Roles(RoleEnum.ADMIN)
  @Put(':uuid')
  async update(
    @Body() body: UpdateLibraryDTO,
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<ClassApiResponse<UpdateResponse>> {
    return new ClassApiResponse(
      true,
      'Library updated successfully',
      await this.libraryService.update(uuid, body),
    );
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  async findAll(@User() userUUID: string): Promise<ClassApiResponse<ResponseLibrary>> {
    return new ClassApiResponse(
      true,
      'Libraries found successfully',
      await this.libraryService.findAll(userUUID),
    );
  }

  @ApiResponse({ status: 200, type: Library, description: 'Success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({ name: 'uuid', type: String, description: 'UUID of the library' })
  @UseGuards(LibraryUserGuard)
  @Get(':uuid')
  async findOne(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @User() userUUID: string,
  ): Promise<ClassApiResponse<Library>> {
    const library = await this.libraryService.findOne(uuid, userUUID);

    if (!library) {
      throw new NotFoundException('Library not found');
    }
    return new ClassApiResponse(true, 'Library found successfully', library);
  }

  @ApiResponse({ status: 200, type: DeleteResponse, description: 'Success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Roles(RoleEnum.ADMIN)
  @Delete(':uuid')
  async remove(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<ClassApiResponse<DeleteResponse>> {
    return new ClassApiResponse(
      true,
      'Library deleted successfully',
      await this.libraryService.delete(uuid),
    );
  }
}
