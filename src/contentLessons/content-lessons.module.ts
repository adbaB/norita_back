import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Bibliography } from './entities/biblography.entity';
import { Content } from './entities/content.entity';
import { Dialog } from './entities/dialog.entity';
import { Glossary } from './entities/glossary.entity';
import { Notes } from './entities/notes.entity';
import { TypeStructure } from './entities/type-structure.entity';

import { BibliographyController } from './controllers/biblography.controller';
import { DialogController } from './controllers/dialog.controller';
import { GlossaryController } from './controllers/glossary.controller';
import { NoteController } from './controllers/note.controller';
import { TypeStructureController } from './controllers/type-structure.controller';

import { BibliographyService } from './services/biblography.service';
import { ContentService } from './services/content.service';
import { DialogService } from './services/dialog.service';
import { GlossaryService } from './services/glossary.service';
import { NoteService } from './services/note.service';
import { TypeStructureService } from './services/type-structure.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content, Dialog, Bibliography, Glossary, Notes, TypeStructure]),
  ],
  controllers: [
    BibliographyController,
    DialogController,
    GlossaryController,
    NoteController,
    TypeStructureController,
  ],
  providers: [
    ContentService,
    DialogService,
    BibliographyService,
    GlossaryService,
    NoteService,
    TypeStructureService,
  ],
  exports: [ContentService],
})
export class ContentLessonsModule {}
