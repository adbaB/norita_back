import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bibliography } from './entities/biblography.entity';
import { Content } from './entities/content.entity';
import { Dialog } from './entities/dialog.entity';
import { Glossary } from './entities/glossary.entity';
import { Notes } from './entities/notes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Content, Dialog, Bibliography, Glossary, Notes])],
})
export class ContentLessonsModule {}
