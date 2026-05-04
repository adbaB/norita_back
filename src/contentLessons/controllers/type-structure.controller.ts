import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/role.decorator';
import { RoleEnum } from '../../users/enum/role.enum';
import { ApiResponse as ClassApiResponse, DeleteResponse } from '../../utils/responses';
import { CreateTypeStructureDto } from '../dtos/create-type-structure.dto';
import { UpdateTypeStructureDto } from '../dtos/update-type-structure.dto';
import { TypeStructure } from '../entities/type-structure.entity';
import { TypeStructureService } from '../services/type-structure.service';

@ApiBearerAuth()
@Controller('type-structures')
export class TypeStructureController {
  constructor(private readonly typeStructureService: TypeStructureService) {}

  // ── READ (cualquier usuario autenticado) ────────────────────────────────────

  @ApiResponse({ status: 200, type: ClassApiResponse, description: 'List of type structures' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({ summary: 'Get all type structures' })
  @Get()
  async findAll(): Promise<TypeStructure[]> {
    return this.typeStructureService.findAll();
  }

  @ApiResponse({ status: 200, type: ClassApiResponse, description: 'Type structure found' })
  @ApiResponse({ status: 404, description: 'Type structure not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({ summary: 'Get a specific type structure by ID' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<TypeStructure> {
    return this.typeStructureService.findOne(id);
  }

  // ── WRITE (solo administradores) ────────────────────────────────────────────

  @ApiResponse({ status: 201, type: ClassApiResponse, description: 'Type structure created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Create a new type structure (admin only)' })
  @Roles(RoleEnum.ADMIN)
  @Post()
  async create(@Body() dto: CreateTypeStructureDto): Promise<TypeStructure> {
    return this.typeStructureService.create(dto);
  }

  @ApiResponse({ status: 200, type: ClassApiResponse, description: 'Type structure updated' })
  @ApiResponse({ status: 404, description: 'Type structure not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Update a type structure (admin only)' })
  @Roles(RoleEnum.ADMIN)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTypeStructureDto,
  ): Promise<TypeStructure> {
    return this.typeStructureService.update(id, dto);
  }

  @ApiResponse({ status: 200, type: ClassApiResponse, description: 'Type structure deleted' })
  @ApiResponse({ status: 404, description: 'Type structure not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Delete a type structure (admin only)' })
  @Roles(RoleEnum.ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResponse> {
    return this.typeStructureService.remove(id);
  }
}
