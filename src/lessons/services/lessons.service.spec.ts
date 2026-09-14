import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LessonsService } from './lessons.service';
import { Lesson } from '../entities/lesson.entity';
import { SectionService } from './section.service';
import { ContentService } from '../../contentLessons/services/content.service';
import { FileService } from '../../files/services/file.service';
import { ActivityService } from '../../contentLessons/services/activity.service';

describe('LessonsService - TypeCounts Management', () => {
  let service: LessonsService;
  let lessonRepo: jest.Mocked<Partial<Repository<Lesson>>>;

  beforeEach(async () => {
    lessonRepo = {
      findOne: jest.fn(),
      save: jest.fn().mockImplementation((lesson: Lesson) => Promise.resolve(lesson)),
      find: jest.fn(),
      create: jest.fn(),
      merge: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonsService,
        { provide: getRepositoryToken(Lesson), useValue: lessonRepo },
        { provide: SectionService, useValue: {} },
        { provide: ContentService, useValue: {} },
        { provide: FileService, useValue: {} },
        { provide: ActivityService, useValue: {} },
      ],
    }).compile();

    service = module.get<LessonsService>(LessonsService);
  });

  describe('updateTypeCounts', () => {
    it('should update and persist typeCounts on the lesson', async () => {
      const existingLesson = new Lesson();
      existingLesson.uuid = 'lesson-uuid-1';
      existingLesson.name = 'Lesson 2.0';
      existingLesson.typeCounts = {};

      (lessonRepo.findOne as jest.Mock).mockResolvedValue(existingLesson);

      const newTypeCounts = { 1: 1, 2: 3, 3: 1 };
      const result = await service.updateTypeCounts('lesson-uuid-1', newTypeCounts);

      expect(lessonRepo.findOne).toHaveBeenCalledWith({ where: { uuid: 'lesson-uuid-1' } });
      expect(result.typeCounts).toEqual(newTypeCounts);
      expect(lessonRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({
          uuid: 'lesson-uuid-1',
          typeCounts: newTypeCounts,
        }),
      );
    });

    it('should allow unsetting typeCounts with null', async () => {
      const existingLesson = new Lesson();
      existingLesson.uuid = 'lesson-uuid-1';
      existingLesson.typeCounts = { 1: 1, 2: 3 };

      (lessonRepo.findOne as jest.Mock).mockResolvedValue(existingLesson);

      const result = await service.updateTypeCounts('lesson-uuid-1', null);

      expect(result.typeCounts).toBeNull();
      expect(lessonRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({
          uuid: 'lesson-uuid-1',
          typeCounts: null,
        }),
      );
    });

    it('should allow unsetting typeCounts with empty object {}', async () => {
      const existingLesson = new Lesson();
      existingLesson.uuid = 'lesson-uuid-1';
      existingLesson.typeCounts = { 1: 1 };

      (lessonRepo.findOne as jest.Mock).mockResolvedValue(existingLesson);

      const result = await service.updateTypeCounts('lesson-uuid-1', {});

      expect(result.typeCounts).toEqual({});
      expect(lessonRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({
          uuid: 'lesson-uuid-1',
          typeCounts: {},
        }),
      );
    });

    it('should throw NotFoundException if lesson is not found', async () => {
      (lessonRepo.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.updateTypeCounts('non-existent-uuid', { 1: 3 })).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
