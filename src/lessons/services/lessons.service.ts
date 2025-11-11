import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, QueryFailedError, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { ContentService } from '../../contentLessons/services/content.service';
import { TypeFileEnum } from '../../files/enums/type-file.enum';
import { FileService } from '../../files/services/file.service';
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
    private readonly fileService: FileService,
  ) {}

  @Transactional()
  async create(lesson: LessonDTO): Promise<CreatedResponse<Lesson>> {
    try {
      let order = Number(await this.lessonRepo.maximum('order')) + 1;
      const { sectionUuid, contentLesson, nextLessonUuid, ...rest } = lesson;
      const section = await this.sectionService.findByUUID(sectionUuid);

      if (nextLessonUuid) {
        const nextLesson = await this.lessonRepo.findOne({
          where: { uuid: nextLessonUuid },
        });
        if (!nextLesson) {
          throw new NotFoundException('Next lesson not found ');
        }
        const previusLesson = await this.lessonRepo.findOne({
          where: { order: LessThan(nextLesson.order) },
          order: { order: 'DESC' },
        });
        order = Number(previusLesson.order) + 0.01;
      }

      if (!section) {
        throw new NotFoundException('Section not found ');
      }

      const lessonEntity = this.lessonRepo.create({
        ...rest,
        type: TypeLessonEnum[lesson.type as unknown as keyof typeof TypeLessonEnum],
        section,
        order,
      });

      const newLesson = await this.lessonRepo.save(lessonEntity);
      await this.contentService.create(newLesson, contentLesson);
      return {
        data: newLesson,
        message: 'Lesson created successfully',
        status: 201,
      };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException(error.message);
      }
    }
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
    });
  }

  @Transactional()
  async update(uuid: string, lesson: UpdateLessonDTO): Promise<UpdateResponse> {
    const { sectionUuid, nextLessonUuid, ...rest } = lesson;

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

    if (nextLessonUuid) {
      const nextLesson = await this.lessonRepo.findOne({
        where: { uuid: nextLessonUuid },
      });
      if (!nextLesson) {
        throw new NotFoundException('Next lesson not found ');
      }
      const previusLesson = await this.lessonRepo.findOne({
        where: { order: LessThan(nextLesson.order) },
        order: { order: 'DESC' },
      });
      if (previusLesson.uuid !== uuid) {
        lessonEntity.order = Number(previusLesson.order) + 0.01;
      }
    }

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
