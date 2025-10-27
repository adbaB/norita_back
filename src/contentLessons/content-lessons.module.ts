import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Bibliography } from './entities/biblography.entity';
import { Content } from './entities/content.entity';
import { Dialog } from './entities/dialog.entity';
import { Glossary } from './entities/glossary.entity';
import { Notes } from './entities/notes.entity';

import { BibliographyController } from './controllers/biblography.controller';
import { DialogController } from './controllers/dialog.controller';
import { GlossaryController } from './controllers/glossary.controller';
import { NoteController } from './controllers/note.controller';

import { BibliographyService } from './services/biblography.service';
import { ContentService } from './services/content.service';
import { DialogService } from './services/dialog.service';
import { GlossaryService } from './services/glossary.service';
import { NoteService } from './services/note.service';

@Module({
  imports: [TypeOrmModule.forFeature([Content, Dialog, Bibliography, Glossary, Notes])],
  controllers: [BibliographyController, DialogController, GlossaryController, NoteController],
  providers: [ContentService, DialogService, BibliographyService, GlossaryService, NoteService],
  exports: [ContentService],
})
export class ContentLessonsModule {}
