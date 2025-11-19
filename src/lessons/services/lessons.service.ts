import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { ContentService } from '../../contentLessons/services/content.service';
import { TypeFileEnum } from '../../files/enums/type-file.enum';
import { FileService } from '../../files/services/file.service';
import { insertItem, moveItem, removeItem } from '../../utils/functions/order.function';
import { DeleteResponse, UpdateResponse } from '../../utils/responses';
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
    private readonly fileService: FileService,
  ) {}

  @Transactional()
  async create(lesson: LessonDTO): Promise<Lesson> {
    const { sectionUuid, contentLesson, order, ...rest } = lesson;
    const section = await this.sectionService.findByUUID(sectionUuid);
    const lessons = await this.lessonRepo.find();

    if (!section) {
      throw new NotFoundException('Section not found ');
    }

    const lessonEntity = this.lessonRepo.create({
      ...rest,
      type: TypeLessonEnum[lesson.type as unknown as keyof typeof TypeLessonEnum],
      section,
      order,
    });

    const newLessons = insertItem(lessons, lessonEntity, order);

    await Promise.all([
      this.lessonRepo.save(newLessons),
      this.contentService.create(lessonEntity, contentLesson),
    ]);

    return lessonEntity;
  }

  async findByUUID(uuid: string, userUUID?: string): Promise<Lesson | null> {
    const queryBuilder = this.lessonRepo
      .createQueryBuilder('lesson')
      .leftJoinAndSelect('lesson.lessonContent', 'lessonContent')
      .leftJoinAndSelect('lessonContent.dialogs', 'dialog')
      .leftJoinAndSelect('lessonContent.notes', 'notes')
      .leftJoinAndSelect('lessonContent.bibliographies', 'bibliography')
      .leftJoinAndSelect('lessonContent.glossaries', 'glossary')
      .where('lesson.uuid = :uuid', { uuid });

    if (userUUID) {
      queryBuilder.leftJoinAndSelect(
        'lesson.lessonProgress',
        'lessonProgress',
        'lessonProgress.user_uuid = :userUUID',
        { userUUID },
      );
    }
    const lesson = await queryBuilder.getOne();

    if (!lesson) {
      throw new NotFoundException('Lesson not found ');
    }

    if (lesson.lessonProgress) {
      lesson['progress'] = lesson.lessonProgress[0];
    }
    if (lesson?.lessonContent) {
      lesson.lessonContent.audioPopups = await this.fileService
        .getFileByTypeRandom(TypeFileEnum.AUDIO_POPUPS)
        .then((file) => file?.file || null);

      lesson.lessonContent.audioRewards = await this.fileService
        .getFileByTypeRandom(TypeFileEnum.AUDIO_REWARDS)
        .then((file) => file?.file || null);

      lesson.lessonContent.audioRewardsClaimed = await this.fileService
        .getFileByTypeRandom(TypeFileEnum.AUDIO_REWARDS_CLAIMED)
        .then((file) => file?.file || null);

      lesson.lessonContent.audioRewardsDisqualified = await this.fileService
        .getFileByTypeRandom(TypeFileEnum.AUDIO_REWARDS_DISQUALIFIED)
        .then((file) => file?.file || null);
    }
    if (lesson?.lessonContent?.dialogs?.length > 0) {
      lesson.lessonContent.dialogs = lesson.lessonContent.dialogs.sort(
        (a, b) => a?.order - b?.order,
      );
    }

    if (lesson?.lessonContent?.notes?.length > 0) {
      lesson.lessonContent.notes = lesson.lessonContent.notes.sort((a, b) => a?.order - b?.order);
    }

    if (lesson?.lessonContent?.bibliographies?.length > 0) {
      lesson.lessonContent.bibliographies = lesson.lessonContent.bibliographies.sort(
        (a, b) => a?.order - b?.order,
      );
    }

    if (lesson?.lessonContent?.glossaries?.length > 0) {
      lesson.lessonContent.glossaries = lesson.lessonContent.glossaries.sort(
        (a, b) => a?.order - b?.order,
      );
    }

    return lesson;
  }

  async getFirstLesson(): Promise<Lesson | null> {
    return this.lessonRepo.findOne({
      where: {
        order: 1,
      },
    });
  }

  async getNextLesson(uuid: string): Promise<Lesson | null> {
    const lesson = await this.lessonRepo.findOne({
      where: {
        uuid,
      },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found ');
    }

    return this.lessonRepo.findOne({
      where: {
        order: MoreThan(lesson.order),
      },
      order: {
        order: 'ASC',
      },
    });
  }

  @Transactional()
  async update(uuid: string, lesson: UpdateLessonDTO): Promise<UpdateResponse> {
    const { sectionUuid, order, ...rest } = lesson;

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

    if (order && lessonFound.order !== order) {
      const lessons = await this.lessonRepo.find();
      const newLessons = moveItem(lessons, lessonFound.order, order);
      await this.lessonRepo.save(newLessons);
    }

    if (lessonFound?.lessonContent?.uuid) {
      await this.contentService.update(lessonFound?.lessonContent?.uuid, lesson.contentLesson);
    }
    return {
      affected: 1,
      status: 200,
    };
  }

  async delete(uuid: string): Promise<DeleteResponse> {
    const lessonFound = await this.findByUUID(uuid);
    if (!lessonFound) {
      throw new NotFoundException('Lesson not found ');
    }
    const lessons = await this.lessonRepo.find();

    const newLessons = removeItem(lessons, lessonFound.order);

    const deleted = await this.lessonRepo.delete({ uuid });
    await this.lessonRepo.save(newLessons);
    return {
      affected: deleted.affected,
      status: 200,
    };
  }
}
