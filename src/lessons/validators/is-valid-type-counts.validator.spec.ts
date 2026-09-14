import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { isValidTypeCounts } from './is-valid-type-counts.validator';
import { LessonDTO, UpdateLessonDTO, UpdateLessonTypeCountsDto } from '../dto/lesson.dto';
import { TypeLessonEnum } from '../enums/typeLesson.enum';

describe('IsValidTypeCounts Validator', () => {
  describe('isValidTypeCounts function', () => {
    it('should return true for null (unset configuration)', () => {
      expect(isValidTypeCounts(null)).toBe(true);
    });

    it('should return true for an empty object {} (unset configuration)', () => {
      expect(isValidTypeCounts({})).toBe(true);
    });

    it('should return true for valid ActivityTypeEnum keys and positive integer counts', () => {
      expect(isValidTypeCounts({ '1': 1, '2': 3, '3': 1 })).toBe(true);
      expect(isValidTypeCounts({ 1: 1, 2: 3, 3: 1 })).toBe(true);
      expect(isValidTypeCounts({ '10': 5 })).toBe(true);
    });

    it('should return true for non-negative count of 0', () => {
      expect(isValidTypeCounts({ '1': 0 })).toBe(true);
    });

    it('should return false for unknown ActivityTypeEnum keys', () => {
      expect(isValidTypeCounts({ '999': 1 })).toBe(false);
      expect(isValidTypeCounts({ '0': 1 })).toBe(false);
      expect(isValidTypeCounts({ '11': 1 })).toBe(false);
      expect(isValidTypeCounts({ foo: 1 })).toBe(false);
      expect(isValidTypeCounts({ DRAG_AND_DROP_IMAGE: 1 })).toBe(false);
    });

    it('should return false for invalid count values (negative, float, non-number)', () => {
      expect(isValidTypeCounts({ '1': -1 })).toBe(false);
      expect(isValidTypeCounts({ '1': 1.5 })).toBe(false);
      expect(isValidTypeCounts({ '1': '2' })).toBe(false);
      expect(isValidTypeCounts({ '1': null })).toBe(false);
      expect(isValidTypeCounts({ '1': undefined })).toBe(false);
      expect(isValidTypeCounts({ '1': NaN })).toBe(false);
    });

    it('should return false for non-object types or arrays', () => {
      expect(isValidTypeCounts([])).toBe(false);
      expect(isValidTypeCounts([1, 2])).toBe(false);
      expect(isValidTypeCounts('invalid')).toBe(false);
      expect(isValidTypeCounts(123)).toBe(false);
      expect(isValidTypeCounts(true)).toBe(false);
      expect(isValidTypeCounts(undefined)).toBe(false);
    });
  });

  describe('DTO Integration Validation', () => {
    describe('UpdateLessonTypeCountsDto', () => {
      it('should pass validation when typeCounts is null (unset configuration)', async () => {
        const dto = plainToInstance(UpdateLessonTypeCountsDto, {
          typeCounts: null,
        });
        const errors = await validate(dto);
        const typeCountsErrors = errors.filter((e) => e.property === 'typeCounts');
        expect(typeCountsErrors).toHaveLength(0);
      });

      it('should pass validation when typeCounts is {} (unset configuration)', async () => {
        const dto = plainToInstance(UpdateLessonTypeCountsDto, {
          typeCounts: {},
        });
        const errors = await validate(dto);
        const typeCountsErrors = errors.filter((e) => e.property === 'typeCounts');
        expect(typeCountsErrors).toHaveLength(0);
      });

      it('should pass validation for valid typeCounts', async () => {
        const dto = plainToInstance(UpdateLessonTypeCountsDto, {
          typeCounts: { '1': 2, '3': 4 },
        });
        const errors = await validate(dto);
        const typeCountsErrors = errors.filter((e) => e.property === 'typeCounts');
        expect(typeCountsErrors).toHaveLength(0);
      });

      it('should fail validation when typeCounts has unknown enum keys', async () => {
        const dto = plainToInstance(UpdateLessonTypeCountsDto, {
          typeCounts: { '999': 2 },
        });
        const errors = await validate(dto);
        const typeCountsErrors = errors.filter((e) => e.property === 'typeCounts');
        expect(typeCountsErrors.length).toBeGreaterThan(0);
        expect(typeCountsErrors[0].constraints?.isValidTypeCounts).toContain(
          'typeCounts must be an object with valid ActivityTypeEnum keys and non-negative integer values, or null/empty',
        );
      });

      it('should fail validation when typeCounts has negative counts', async () => {
        const dto = plainToInstance(UpdateLessonTypeCountsDto, {
          typeCounts: { '1': -1 },
        });
        const errors = await validate(dto);
        const typeCountsErrors = errors.filter((e) => e.property === 'typeCounts');
        expect(typeCountsErrors.length).toBeGreaterThan(0);
      });

      it('should fail validation when typeCounts has non-integer counts', async () => {
        const dto = plainToInstance(UpdateLessonTypeCountsDto, {
          typeCounts: { '1': 2.5 },
        });
        const errors = await validate(dto);
        const typeCountsErrors = errors.filter((e) => e.property === 'typeCounts');
        expect(typeCountsErrors.length).toBeGreaterThan(0);
      });

      it('should fail validation when typeCounts is missing on UpdateLessonTypeCountsDto', async () => {
        const dto = plainToInstance(UpdateLessonTypeCountsDto, {});
        const errors = await validate(dto);
        const typeCountsErrors = errors.filter((e) => e.property === 'typeCounts');
        expect(typeCountsErrors.length).toBeGreaterThan(0);
      });
    });

    describe('LessonDTO', () => {
      it('should pass when typeCounts is omitted', async () => {
        const dto = plainToInstance(LessonDTO, {
          type: TypeLessonEnum.LESSON,
          reward: 10,
          icon: 'icon.png',
          background: 'bg.png',
          number: '1',
          name: 'Lesson 1',
          content: 'Content',
          time: 15,
          order: 1,
          sectionUuid: '00000000-0000-0000-0000-000000000000',
        });
        const errors = await validate(dto);
        const typeCountsErrors = errors.filter((e) => e.property === 'typeCounts');
        expect(typeCountsErrors).toHaveLength(0);
      });

      it('should pass when typeCounts is null', async () => {
        const dto = plainToInstance(LessonDTO, {
          type: TypeLessonEnum.LESSON,
          reward: 10,
          icon: 'icon.png',
          background: 'bg.png',
          number: '1',
          name: 'Lesson 1',
          content: 'Content',
          time: 15,
          order: 1,
          sectionUuid: '00000000-0000-0000-0000-000000000000',
          typeCounts: null,
        });
        const errors = await validate(dto);
        const typeCountsErrors = errors.filter((e) => e.property === 'typeCounts');
        expect(typeCountsErrors).toHaveLength(0);
      });

      it('should fail when typeCounts contains invalid enum key', async () => {
        const dto = plainToInstance(LessonDTO, {
          type: TypeLessonEnum.LESSON,
          reward: 10,
          icon: 'icon.png',
          background: 'bg.png',
          number: '1',
          name: 'Lesson 1',
          content: 'Content',
          time: 15,
          order: 1,
          sectionUuid: '00000000-0000-0000-0000-000000000000',
          typeCounts: { '999': 1 },
        });
        const errors = await validate(dto);
        const typeCountsErrors = errors.filter((e) => e.property === 'typeCounts');
        expect(typeCountsErrors.length).toBeGreaterThan(0);
      });
    });

    describe('UpdateLessonDTO', () => {
      it('should pass when typeCounts is null or empty', async () => {
        const dto = plainToInstance(UpdateLessonDTO, {
          typeCounts: null,
        });
        const errors = await validate(dto);
        const typeCountsErrors = errors.filter((e) => e.property === 'typeCounts');
        expect(typeCountsErrors).toHaveLength(0);

        const dtoEmpty = plainToInstance(UpdateLessonDTO, {
          typeCounts: {},
        });
        const errorsEmpty = await validate(dtoEmpty);
        const typeCountsErrorsEmpty = errorsEmpty.filter((e) => e.property === 'typeCounts');
        expect(typeCountsErrorsEmpty).toHaveLength(0);
      });

      it('should fail when typeCounts contains negative value', async () => {
        const dto = plainToInstance(UpdateLessonDTO, {
          typeCounts: { '1': -5 },
        });
        const errors = await validate(dto);
        const typeCountsErrors = errors.filter((e) => e.property === 'typeCounts');
        expect(typeCountsErrors.length).toBeGreaterThan(0);
      });
    });
  });
});
