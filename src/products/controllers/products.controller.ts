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

  @ApiOperation({ summary: 'Create a new entitlement configuration' })
  @Post()
  @Roles(RoleEnum.ADMIN)
  @ApiOkResponse({ type: Entitlement })
  @ApiBody({ type: CreateEntitlementDto })
  create(@Body() createEntitlementDto: CreateEntitlementDto): Promise<Entitlement> {
    return this.entitlementsService.create(createEntitlementDto);
  }

  @ApiOperation({ summary: 'Retrieve all configured entitlements' })
  @Get()
  @Roles(RoleEnum.ADMIN)
  @ApiOkResponse({ type: Entitlement, isArray: true })
  findAll(): Promise<Entitlement[]> {
    return this.entitlementsService.findAll();
  }

  @ApiOperation({ summary: 'Fetch a specific entitlement by its uuid' })
  @Get(':uuid')
  @Roles(RoleEnum.ADMIN)
  @ApiOkResponse({ type: Entitlement })
  findOne(@Param('uuid') uuid: string): Promise<Entitlement> {
    return this.entitlementsService.findOne(uuid);
  }

  @ApiOperation({ summary: 'Update parameters for an existing entitlement' })
  @Patch(':uuid')
  @Roles(RoleEnum.ADMIN)
  @ApiOkResponse({ type: Entitlement })
  @ApiBody({ type: UpdateEntitlementDto })
  update(
    @Param('uuid') uuid: string,
    @Body() updateEntitlementDto: UpdateEntitlementDto,
  ): Promise<Entitlement> {
    return this.entitlementsService.update(uuid, updateEntitlementDto);
  }

  @ApiOperation({ summary: 'Delete an entitlement completely from the system' })
  @Delete(':uuid')
  @Roles(RoleEnum.ADMIN)
  remove(@Param('uuid') uuid: string): Promise<void> {
    return this.entitlementsService.remove(uuid);
  }
}
