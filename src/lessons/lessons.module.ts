import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentLessonsModule } from '../contentLessons/content-lessons.module';
import { FileModule } from '../files/file.module';
import { LessonsController } from './controllers/lessons.controller';
import { SectionController } from './controllers/section.controller';
import { Lesson } from './entities/lesson.entity';
import { Section } from './entities/section.entity';
import { LessonsService } from './services/lessons.service';
import { SectionService } from './services/section.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Section]), ContentLessonsModule, FileModule],
  controllers: [SectionController, LessonsController],
  providers: [SectionService, LessonsService],
  exports: [LessonsService, SectionService],
})
export class LessonsModule {}
