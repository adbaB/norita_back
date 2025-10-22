import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
