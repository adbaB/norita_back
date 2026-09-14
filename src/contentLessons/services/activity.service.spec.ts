import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ActivityService } from './activity.service';
import { Activity } from '../entities/activity.entity';
import { ActivityOption } from '../entities/activity-option.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { UserSeenActivity } from '../entities/user-seen-activity.entity';
import { DifficultyEnum } from '../../lessons/enums/difficulty.enum';
import { ActivityTypeEnum } from '../enums/activity-type.enum';

describe('ActivityService - TypeCounts & Activity Selection', () => {
  let service: ActivityService;
  let activityRepo: jest.Mocked<Partial<Repository<Activity>>>;
  let optionRepo: jest.Mocked<Partial<Repository<ActivityOption>>>;
  let lessonRepo: jest.Mocked<Partial<Repository<Lesson>>>;
  let seenRepo: jest.Mocked<Partial<Repository<UserSeenActivity>>>;

  const createMockActivity = (
    uuid: string,
    type: ActivityTypeEnum,
    difficulty: DifficultyEnum = DifficultyEnum.EASY,
  ): Activity => {
    const activity = new Activity();
    activity.uuid = uuid;
    activity.type = type;
    activity.difficulty = difficulty;
    activity.options = [];
    return activity;
  };

  const sampleActivities: Activity[] = [
    createMockActivity('act-1-1', ActivityTypeEnum.DRAG_AND_DROP_IMAGE),
    createMockActivity('act-1-2', ActivityTypeEnum.DRAG_AND_DROP_IMAGE),
    createMockActivity('act-2-1', ActivityTypeEnum.DRAG_AND_DROP_TEXT),
    createMockActivity('act-2-2', ActivityTypeEnum.DRAG_AND_DROP_TEXT),
    createMockActivity('act-2-3', ActivityTypeEnum.DRAG_AND_DROP_TEXT),
    createMockActivity('act-2-4', ActivityTypeEnum.DRAG_AND_DROP_TEXT),
    createMockActivity('act-3-1', ActivityTypeEnum.WORD_SELECTION),
    createMockActivity('act-3-2', ActivityTypeEnum.WORD_SELECTION),
  ];

  beforeEach(async () => {
    activityRepo = {
      createQueryBuilder: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
    };

    optionRepo = {
      delete: jest.fn().mockResolvedValue({ raw: [], affected: 1 }),
      save: jest.fn().mockResolvedValue([]),
    };

    lessonRepo = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    seenRepo = {
      find: jest.fn().mockResolvedValue([]),
      delete: jest.fn().mockResolvedValue({ raw: [], affected: 1 }),
      create: jest.fn().mockImplementation((d: UserSeenActivity) => d),
      save: jest.fn().mockResolvedValue([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityService,
        { provide: getRepositoryToken(Activity), useValue: activityRepo },
        { provide: getRepositoryToken(ActivityOption), useValue: optionRepo },
        { provide: getRepositoryToken(Lesson), useValue: lessonRepo },
        { provide: getRepositoryToken(UserSeenActivity), useValue: seenRepo },
      ],
    }).compile();

    service = module.get<ActivityService>(ActivityService);
  });

  describe('findByLesson with typeCounts', () => {
    it('should filter activities to match configured lesson typeCounts (1 of type 1, 3 of type 2, 1 of type 3)', async () => {
      const qb = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        addOrderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(sampleActivities),
      } as unknown as SelectQueryBuilder<Activity>;
      (activityRepo.createQueryBuilder as jest.Mock).mockReturnValue(qb);

      const mockLesson = new Lesson();
      mockLesson.uuid = 'lesson-uuid-1';
      mockLesson.typeCounts = { 1: 1, 2: 3, 3: 1 };
      (lessonRepo.findOne as jest.Mock).mockResolvedValue(mockLesson);

      const result = await service.findByLesson('lesson-uuid-1', false);

      expect(result).toHaveLength(5);
      const countType1 = result.filter(
        (a) => a.type === ActivityTypeEnum.DRAG_AND_DROP_IMAGE,
      ).length;
      const countType2 = result.filter(
        (a) => a.type === ActivityTypeEnum.DRAG_AND_DROP_TEXT,
      ).length;
      const countType3 = result.filter((a) => a.type === ActivityTypeEnum.WORD_SELECTION).length;

      expect(countType1).toBe(1);
      expect(countType2).toBe(3);
      expect(countType3).toBe(1);
    });

    it('should return all activities when all=true regardless of typeCounts', async () => {
      const qb = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        addOrderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(sampleActivities),
      } as unknown as SelectQueryBuilder<Activity>;
      (activityRepo.createQueryBuilder as jest.Mock).mockReturnValue(qb);

      const result = await service.findByLesson('lesson-uuid-1', true);
      expect(result).toHaveLength(sampleActivities.length);
    });
  });

  describe('findRandomByDifficulty with typeCounts fallback', () => {
    it('should automatically use lesson.typeCounts when query typeCounts is omitted', async () => {
      const mockLesson = new Lesson();
      mockLesson.uuid = 'lesson-uuid-2.0';
      mockLesson.typeCounts = { 1: 1, 2: 3, 3: 1 };
      (lessonRepo.findOne as jest.Mock).mockResolvedValue(mockLesson);

      (activityRepo.createQueryBuilder as jest.Mock).mockImplementation(() => {
        let currentType: number | undefined;
        const qb = {
          innerJoin: jest.fn().mockReturnThis(),
          leftJoinAndSelect: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          andWhere: jest
            .fn()
            .mockImplementation((_clause: string, params?: Record<string, unknown>) => {
              if (params?.activityType !== undefined) {
                currentType = Number(params.activityType);
              }
              return qb;
            }),
          getMany: jest.fn().mockImplementation(async () => {
            if (currentType !== undefined) {
              return sampleActivities.filter((a) => a.type === currentType);
            }
            return sampleActivities;
          }),
        } as unknown as SelectQueryBuilder<Activity>;
        return qb;
      });

      const result = await service.findRandomByDifficulty(
        'lesson-uuid-2.0',
        DifficultyEnum.EASY,
        undefined,
        0,
        'user-uuid-1',
        undefined,
      );

      expect(result.requested).toHaveLength(5);
      const countType1 = result.requested.filter(
        (a) => a.type === ActivityTypeEnum.DRAG_AND_DROP_IMAGE,
      ).length;
      const countType2 = result.requested.filter(
        (a) => a.type === ActivityTypeEnum.DRAG_AND_DROP_TEXT,
      ).length;
      const countType3 = result.requested.filter(
        (a) => a.type === ActivityTypeEnum.WORD_SELECTION,
      ).length;

      expect(countType1).toBe(1);
      expect(countType2).toBe(3);
      expect(countType3).toBe(1);
    });
  });
});
