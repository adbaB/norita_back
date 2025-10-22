import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Bibliography } from './entities/biblography.entity';
import { Content } from './entities/content.entity';
import { Dialog } from './entities/dialog.entity';
import { Glossary } from './entities/glossary.entity';
import { Notes } from './entities/notes.entity';

import { BibliographyService } from './services/biblography.service';
import { ContentService } from './services/content.service';
import { DialogService } from './services/dialog.service';
import { GlossaryService } from './services/glossary.service';
import { NoteService } from './services/note.service';

@Module({
  imports: [TypeOrmModule.forFeature([Content, Dialog, Bibliography, Glossary, Notes])],
  providers: [ContentService, DialogService, BibliographyService, GlossaryService, NoteService],
  exports: [ContentService],
})
export class ContentLessonsModule {}
