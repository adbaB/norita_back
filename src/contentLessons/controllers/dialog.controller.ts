import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/role.decorator';
import { RoleEnum } from '../../users/enum/role.enum';
import { ApiResponse as ClassApiResponse, DeleteResponse } from '../../utils/responses';
import { DialogService } from '../services/dialog.service';

@ApiBearerAuth()
@Controller('dialogs')
export class DialogController {
  constructor(private readonly dialogService: DialogService) {}

  @ApiResponse({ status: 200, type: ClassApiResponse, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Dialog not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Roles(RoleEnum.ADMIN)
  @Delete(':uuid')
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<DeleteResponse> {
    return this.dialogService.delete(uuid);
  }
}
