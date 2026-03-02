import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/role.decorator';
import { RoleEnum } from '../../users/enum/role.enum';
import { CreateEntitlementDto } from '../dto/create-product.dto';
import { UpdateEntitlementDto } from '../dto/update-product.dto';
import { Entitlement } from '../entities/product.entity';
import { EntitlementsService } from '../services/products.service';

@Controller('entitlements')
@ApiBearerAuth()
export class EntitlementsController {
  constructor(private readonly entitlementsService: EntitlementsService) {}

  @Post()
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Create a new entitlement' })
  @ApiOkResponse({ type: Entitlement })
  @ApiBody({ type: CreateEntitlementDto })
  create(@Body() createEntitlementDto: CreateEntitlementDto): Promise<Entitlement> {
    return this.entitlementsService.create(createEntitlementDto);
  }

  @Get()
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Get all entitlements' })
  @ApiOkResponse({ type: Entitlement, isArray: true })
  findAll(): Promise<Entitlement[]> {
    return this.entitlementsService.findAll();
  }

  @Get(':uuid')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Get an entitlement by uuid' })
  @ApiOkResponse({ type: Entitlement })
  findOne(@Param('uuid') uuid: string): Promise<Entitlement> {
    return this.entitlementsService.findOne(uuid);
  }

  @Patch(':uuid')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Update an entitlement ' })
  @ApiOkResponse({ type: Entitlement })
  @ApiBody({ type: UpdateEntitlementDto })
  update(
    @Param('uuid') uuid: string,
    @Body() updateEntitlementDto: UpdateEntitlementDto,
  ): Promise<Entitlement> {
    return this.entitlementsService.update(uuid, updateEntitlementDto);
  }

  @Delete(':uuid')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Delete an entitlement ' })
  remove(@Param('uuid') uuid: string): Promise<void> {
    return this.entitlementsService.remove(uuid);
  }
}
