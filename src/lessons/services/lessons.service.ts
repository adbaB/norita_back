import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { ContentService } from '../../contentLessons/services/content.service';
import { CreatedResponse, DeleteResponse, UpdateResponse } from '../../utils/responses';
import { LessonDTO, UpdateLessonDTO } from '../dto/lesson.dto';
import { Lesson } from '../entities/lesson.entity';
import { TypeLessonEnum } from '../enums/typeLesson.enum';
import { SectionService } from './section.service';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson) private readonly lessonRepo: Repository<Lesson>,
    private readonly sectionService: SectionService,
    private readonly contentService: ContentService,
  ) {}

  @Transactional()
  async create(lesson: LessonDTO): Promise<CreatedResponse<Lesson>> {
    const { sectionUuid, contentLesson, ...rest } = lesson;
    const section = await this.sectionService.findByUUID(sectionUuid);

    if (!section) {
      throw new NotFoundException('Section not found ');
    }

    const lessonEntity = this.lessonRepo.create({
      ...rest,
      type: TypeLessonEnum[lesson.type as unknown as keyof typeof TypeLessonEnum],
      section,
    });

    const newLesson = await this.lessonRepo.save(lessonEntity);
    await this.contentService.create(newLesson, contentLesson);
    return {
      data: newLesson,
      message: 'Lesson created successfully',
      status: 201,
    };
  }

  async findByUUID(uuid: string): Promise<Lesson | null> {
    return this.lessonRepo.findOne({
      where: { uuid },
      relations: {
        lessonContent: { dialogs: true, notes: true, bibliographies: true, glossaries: true },
      },
    });
  }

  @Transactional()
  async update(uuid: string, lesson: UpdateLessonDTO): Promise<UpdateResponse> {
    const { sectionUuid, ...rest } = lesson;

    const lessonFound = await this.lessonRepo.findOne({
      where: { uuid },
      relations: ['lessonContent'],
    });

    if (!lessonFound) {
      throw new NotFoundException('Lesson not found ');
    }

    const section = await this.sectionService.findOne(sectionUuid);

    if (!section) {
      throw new NotFoundException('Section not found ');
    }

    const lessonEntity = this.lessonRepo.merge(lessonFound, {
      ...rest,
      section,
    });

    await this.lessonRepo.save(lessonEntity);
    if (lessonFound?.lessonContent.uuid) {
      await this.contentService.update(lessonFound?.lessonContent?.uuid, lesson.contentLesson);
    }
    return {
      affected: 1,
      message: 'Lesson updated successfully',
      status: 200,
    };
  }

  async delete(uuid: string): Promise<DeleteResponse> {
    const lessonFound = await this.findByUUID(uuid);
    if (!lessonFound) {
      throw new NotFoundException('Lesson not found ');
    }

    await this.lessonRepo.delete({ uuid });
    return {
      affected: 1,
      message: 'Lesson deleted successfully',
      status: 200,
    };
  }
}
