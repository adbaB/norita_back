import { PartialType } from '@nestjs/swagger';
import { CreateEntitlementDto } from './create-product.dto';

export class UpdateEntitlementDto extends PartialType(CreateEntitlementDto) {}
