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
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/role.decorator';
import { RoleEnum } from '../../users/enum/role.enum';
import {
  ApiResponse as ClassApiResponse,
  DeleteResponse,
  UpdateResponse,
} from '../../utils/responses';
import { CreateLibrarySectionDTO, UpdateLibrarySectionDTO } from '../dto/librarySection.dto';
import { LibrarySection } from '../entities/librarySection.entity';
import { LibrarySectionService } from '../services/librarySection.service';

@Controller('library/section')
export class LibrarySectionController {
  constructor(private readonly librarySectionService: LibrarySectionService) {}

  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid', description: 'Library UUID' })
  @ApiBody({ isArray: true, type: [CreateLibrarySectionDTO] })
  @ApiResponse({
    status: 201,
    type: [LibrarySection],
    isArray: true,
    description: 'Library sections created successfully',
  })
  @Roles(RoleEnum.ADMIN)
  @Post(':uuid')
  async create(
    @Param('uuid', ParseUUIDPipe) libraryUuid: string,
    @Body(
      new ParseArrayPipe({
        items: CreateLibrarySectionDTO,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    body: CreateLibrarySectionDTO[], // Asegúrate de especificar el tipo de los elementos del array
  ): Promise<ClassApiResponse<LibrarySection[]>> {
    return new ClassApiResponse(
      true,
      'Library section created successfully',
      await this.librarySectionService.create(libraryUuid, body),
    );
  }

  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid', description: 'Library Section UUID' })
  @ApiBody({ type: UpdateLibrarySectionDTO })
  @ApiResponse({
    status: 200,
    type: UpdateResponse,
    description: 'Library section updated successfully',
  })
  @Roles(RoleEnum.ADMIN)
  @Put(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() body: UpdateLibrarySectionDTO,
  ): Promise<ClassApiResponse<UpdateResponse>> {
    return new ClassApiResponse(
      true,
      'Library section updated successfully',
      await this.librarySectionService.update(uuid, body),
    );
  }

  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid', description: 'Library Section UUID' })
  @ApiResponse({
    status: 200,
    type: LibrarySection,
    description: 'Library section found successfully',
  })
  @Get(':uuid')
  async findOne(
    @Param('uuid', ParseUUIDPipe) sectionUuid: string,
  ): Promise<ClassApiResponse<LibrarySection>> {
    return new ClassApiResponse(
      true,
      'Library section found successfully',
      await this.librarySectionService.findOne(sectionUuid),
    );
  }

  @ApiResponse({
    status: 200,
    type: DeleteResponse,
    description: 'Library sections found successfully',
  })
  @ApiParam({ name: 'uuid', type: 'string', format: 'uuid', description: 'Library Section UUID' })
  @ApiResponse({
    status: 200,
    type: UpdateResponse,
    description: 'Library section deleted successfully',
  })
  @Roles(RoleEnum.ADMIN)
  @Delete(':uuid')
  async delete(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<ClassApiResponse<UpdateResponse>> {
    return new ClassApiResponse(
      true,
      'Library section deleted successfully',
      await this.librarySectionService.delete(uuid),
    );
  }
}
