import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Activity } from './entities/activity.entity';
import { ActivityOption } from './entities/activity-option.entity';
import { Bibliography } from './entities/biblography.entity';
import { Content } from './entities/content.entity';
import { Dialog } from './entities/dialog.entity';
import { Glossary } from './entities/glossary.entity';
import { Notes } from './entities/notes.entity';
import { TypeStructure } from './entities/type-structure.entity';
import { Lesson } from '../lessons/entities/lesson.entity';

import { ActivityController } from './controllers/activity.controller';
import { BibliographyController } from './controllers/biblography.controller';
import { DialogController } from './controllers/dialog.controller';
import { GlossaryController } from './controllers/glossary.controller';
import { NoteController } from './controllers/note.controller';
import { TypeStructureController } from './controllers/type-structure.controller';

import { ActivityService } from './services/activity.service';
import { BibliographyService } from './services/biblography.service';
import { ContentService } from './services/content.service';
import { DialogService } from './services/dialog.service';
import { GlossaryService } from './services/glossary.service';
import { NoteService } from './services/note.service';
import { TypeStructureService } from './services/type-structure.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Activity,
      ActivityOption,
      Content,
      Dialog,
      Bibliography,
      Glossary,
      Notes,
      TypeStructure,
      Lesson,
    ]),
  ],
  controllers: [
    ActivityController,
    BibliographyController,
    DialogController,
    GlossaryController,
    NoteController,
    TypeStructureController,
  ],
  providers: [
    ActivityService,
    ContentService,
    DialogService,
    BibliographyService,
    GlossaryService,
    NoteService,
    TypeStructureService,
  ],
  exports: [ContentService, ActivityService],
})
export class ContentLessonsModule {}
