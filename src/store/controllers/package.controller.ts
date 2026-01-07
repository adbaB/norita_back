import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/role.decorator';
import { RoleEnum } from '../../users/enum/role.enum';
import { ApiResponse as ClassApiResponse, UpdateResponse } from '../../utils/responses';
import { CreatePackageDto } from '../dto/create-package.dto';
import { UpdatePackageDto } from '../dto/update-package.dto';
import { Package } from '../entities/package.entity';
import { PackageService } from '../services/package.service';

@ApiTags('Packages')
@Controller('packages')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  @Roles(RoleEnum.ADMIN)
  async create(@Body() body: CreatePackageDto): Promise<ClassApiResponse<Package>> {
    return new ClassApiResponse(
      true,
      'Package created successfully',
      await this.packageService.create(body),
    );
  }

  @ApiResponse({ type: Package, isArray: true })
  @ApiQuery({ name: 'countryCode', required: false })
  @Get()
  findAll(@Query('countryCode') countryCode: string): Promise<Package[]> {
    return this.packageService.findAll(countryCode);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string): Promise<Package> {
    return this.packageService.findOne(uuid);
  }

  @Put(':uuid')
  @Roles(RoleEnum.ADMIN)
  async update(
    @Param('uuid') uuid: string,
    @Body() updatePackageDto: UpdatePackageDto,
  ): Promise<ClassApiResponse<UpdateResponse>> {
    return new ClassApiResponse(
      true,
      'Package updated successfully',
      await this.packageService.update(uuid, updatePackageDto),
    );
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string): Promise<ClassApiResponse<void>> {
    return new ClassApiResponse(
      true,
      'Package deleted successfully',
      await this.packageService.remove(uuid),
    );
  }
}
