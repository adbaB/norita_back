import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Lesson } from '../../lessons/entities/lesson.entity';
import { Content } from '../entities/content.entity';
import { BibliographyService } from './biblography.service';

import { DialogService } from './dialog.service';
import { GlossaryService } from './glossary.service';
import { NoteService } from './note.service';

import { ContentDTO } from '../dtos/content.dto';
@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content) private readonly contentRepo: Repository<Content>,
    private readonly dialogService: DialogService,
    private readonly glossaryService: GlossaryService,
    private readonly noteService: NoteService,
    private readonly bibliographyService: BibliographyService,
  ) {}

  async create(lesson: Lesson, content: ContentDTO): Promise<Content> {
    const newContent = this.contentRepo.create(content);
    newContent.lesson = lesson;
    const newContentSaved = await this.contentRepo.save(newContent);

    const [dialog] = await Promise.all([
      this.dialogService.create(newContentSaved, content.dialogs),
      this.glossaryService.create(newContentSaved, content.glossaries),
      this.noteService.create(newContentSaved, content.notes),
      this.bibliographyService.create(content.bibliographies, newContentSaved),
    ]);
    newContentSaved.dialogs = dialog;
    return newContentSaved;
  }

  update(): void {}
}
