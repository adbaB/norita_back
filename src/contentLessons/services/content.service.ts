import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Lesson } from '../../lessons/entities/lesson.entity';
import { Content } from '../entities/content.entity';
import { BibliographyService } from './biblography.service';

import { DialogService } from './dialog.service';
import { GlossaryService } from './glossary.service';
import { NoteService } from './note.service';

import { ContentDTO, UpdateContentDTO } from '../dtos/content.dto';
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

    await Promise.all([
      this.dialogService.create(newContentSaved, content.dialogs),
      this.glossaryService.create(newContentSaved, content.glossaries),
      this.noteService.create(newContentSaved, content.notes),
      this.bibliographyService.create(content.bibliographies, newContentSaved),
    ]);

    return newContentSaved;
  }

  async update(uuid: string, content: UpdateContentDTO): Promise<void> {
    const contentFound = await this.contentRepo.findOne({ where: { uuid } });
    if (!contentFound) {
      throw new NotFoundException('Content not found');
    }

    console.log(content);

    await this.contentRepo.update({ uuid }, { name: content.name, content: content.content });
    await this.dialogService.update(contentFound, content?.dialogs);
    await this.glossaryService.update(contentFound, content?.glossaries);
    await this.noteService.update(contentFound, content?.notes);
    await this.bibliographyService.update(contentFound, content?.bibliographies);
  }
}
