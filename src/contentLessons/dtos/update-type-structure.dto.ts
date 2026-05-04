import { PartialType } from '@nestjs/swagger';
import { CreateTypeStructureDto } from './create-type-structure.dto';

export class UpdateTypeStructureDto extends PartialType(CreateTypeStructureDto) {}
