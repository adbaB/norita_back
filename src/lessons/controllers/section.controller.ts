import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/role.decorator';
import { User } from '../../users/decorators/user.decorator';
import { RoleEnum } from '../../users/enum/role.enum';
import {
  ApiResponse as ClassApiResponse,
  DeleteResponse,
  UpdateResponse,
} from '../../utils/responses';
import { CreateSectionDto, UpdateSectionDTO } from '../dto/section.dto';
import { Section } from '../entities/section.entity';
import { SectionService } from '../services/section.service';

@ApiBearerAuth()
@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  @Roles(RoleEnum.ADMIN)
  async create(@Body() dto: CreateSectionDto): Promise<ClassApiResponse<Section>> {
    const section = await this.sectionService.create(dto);
    return new ClassApiResponse(true, 'Section created successfully', section);
  }

  @ApiResponse({ status: 200, type: [Section], description: 'Success' })
  @ApiResponse({ status: '5XX', description: 'Internal error' })
  @Get()
  async findAll(@User() userUUID: string): Promise<Section[]> {
    return this.sectionService.findAll(userUUID);
  }

  @Put('/:uuid')
  @Roles(RoleEnum.ADMIN)
  async update(
    @Param('uuid') uuid: string,
    @Body() updateData: UpdateSectionDTO,
  ): Promise<UpdateResponse> {
    return this.sectionService.update(uuid, updateData);
  }

  @Delete('/:uuid')
  @Roles(RoleEnum.ADMIN)
  async remove(@Param('uuid') uuid: string): Promise<DeleteResponse> {
    return this.sectionService.remove(uuid);
  }
}
