import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/role.decorator';
import { RoleEnum } from '../../users/enum/role.enum';
import { DeleteResponse } from '../../utils/responses';
import { NoteService } from '../services/note.service';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @ApiResponse({ status: 200, type: DeleteResponse, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Note not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Roles(RoleEnum.ADMIN)
  @Delete(':uuid')
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<DeleteResponse> {
    return this.noteService.delete(uuid);
  }
}
