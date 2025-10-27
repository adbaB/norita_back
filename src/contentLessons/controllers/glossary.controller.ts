import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { Roles } from '../../auth/decorators/role.decorator';
import { RoleEnum } from '../../users/enum/role.enum';
import { DeleteResponse } from '../../utils/responses';
import { GlossaryService } from '../services/glossary.service';

@Controller('glossary')
export class GlossaryController {
  constructor(private readonly glossaryService: GlossaryService) {}

  @Roles(RoleEnum.ADMIN)
  @Delete(':uuid')
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<DeleteResponse> {
    return this.glossaryService.delete(uuid);
  }
}
