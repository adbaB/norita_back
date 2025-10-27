import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { Roles } from '../../auth/decorators/role.decorator';
import { RoleEnum } from '../../users/enum/role.enum';
import { DeleteResponse } from '../../utils/responses';
import { BibliographyService } from '../services/biblography.service';

@Controller('bibliography')
export class BibliographyController {
  constructor(private readonly bibliographyService: BibliographyService) {}

  @Roles(RoleEnum.ADMIN)
  @Delete(':uuid')
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<DeleteResponse> {
    return this.bibliographyService.delete(uuid);
  }
}
