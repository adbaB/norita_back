import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { Roles } from '../../auth/decorators/role.decorator';
import { RoleEnum } from '../../users/enum/role.enum';
import { DeleteResponse } from '../../utils/responses';
import { DialogService } from '../services/dialog.service';

@Controller('dialogs')
export class DialogController {
  constructor(private readonly dialogService: DialogService) {}

  @Roles(RoleEnum.ADMIN)
  @Delete(':uuid')
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<DeleteResponse> {
    return this.dialogService.delete(uuid);
  }
}
