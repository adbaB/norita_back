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
import { ApiResponse as ClassApiResponse, UpdateResponse } from '../../utils/responses';
import { CreateLibrarySectionDTO, UpdateLibrarySectionDTO } from '../dto/librarySection.dto';
import { LibrarySection } from '../entities/librarySection.entity';
import { LibrarySectionService } from '../services/librarySection.service';

@Controller('library/section')
export class LibrarySectionController {
  constructor(private readonly librarySectionService: LibrarySectionService) {}

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
