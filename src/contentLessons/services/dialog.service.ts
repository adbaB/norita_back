import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteResponse } from '../../utils/responses';
import { DialogDTO } from '../dtos/dialog.dto';
import { Content } from '../entities/content.entity';
import { Dialog } from '../entities/dialog.entity';

@Injectable()
export class DialogService {
  constructor(@InjectRepository(Dialog) private readonly dialogRepo: Repository<Dialog>) {}

  async create(contentLesson: Content, dialogs: DialogDTO[]): Promise<Dialog[]> {
    if (dialogs.length === 0) {
      return [];
    }
    const newDialogs = dialogs.map((dialog) => {
      const newDialog = this.dialogRepo.create(dialog);
      newDialog.lessonContent = contentLesson;
      return newDialog;
    });
    return this.dialogRepo.save(newDialogs);
  }

  async update(contentLesson: Content, dialogs: DialogDTO[]): Promise<void> {
    if (dialogs?.length === 0) {
      return;
    }
    await this.dialogRepo.delete({ lessonContent: { uuid: contentLesson.uuid } });
    await this.create(contentLesson, dialogs);
  }

  async delete(uuid: string): Promise<DeleteResponse> {
    const deleted = await this.dialogRepo.delete({ uuid });

    return { message: 'Dialog deleted successfully', affected: deleted.affected, status: 200 };
  }
}
