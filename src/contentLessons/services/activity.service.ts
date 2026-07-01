import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { DeleteResponse } from '../../utils/responses';
import { DifficultyEnum } from '../../lessons/enums/difficulty.enum';
import { CreateActivityDTO, UpdateActivityDTO } from '../dtos/activity.dto';
import { Activity } from '../entities/activity.entity';
import { ActivityOption } from '../entities/activity-option.entity';
import { Content } from '../entities/content.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepo: Repository<Activity>,
    @InjectRepository(ActivityOption)
    private readonly optionRepo: Repository<ActivityOption>,
  ) {}

  // ── CREATE ──────────────────────────────────────────────────────────────────

  @Transactional()
  async create(lessonContent: Content, activities: CreateActivityDTO[]): Promise<Activity[]> {
    if (!activities || activities.length === 0) {
      return [];
    }

    const saved: Activity[] = [];

    for (const dto of activities) {
      const { options = [], ...activityData } = dto;

      const activity = this.activityRepo.create(activityData);
      activity.lessonContent = lessonContent;
      const savedActivity = await this.activityRepo.save(activity);

      if (options.length > 0) {
        const optionEntities = options.map((opt) => {
          const option = this.optionRepo.create(opt);
          option.activity = savedActivity;
          return option;
        });
        await this.optionRepo.save(optionEntities);
        savedActivity.options = optionEntities;
      }

      saved.push(savedActivity);
    }

    return saved;
  }

  // ── READ ────────────────────────────────────────────────────────────────────

  async findByContent(lessonContentUuid: string): Promise<Activity[]> {
    return this.activityRepo.find({
      where: { lessonContent: { uuid: lessonContentUuid } },
      relations: ['options'],
      order: { order: 'ASC', options: { order: 'ASC' } },
    });
  }

  async findByDifficulty(lessonUuid: string, difficulty: DifficultyEnum): Promise<Activity[]> {
    return this.activityRepo.find({
      where: {
        difficulty,
        lessonContent: { lesson: { uuid: lessonUuid } },
      },
      relations: ['options'],
      order: { order: 'ASC', options: { order: 'ASC' } },
    });
  }

  async findOne(uuid: string): Promise<Activity> {
    const activity = await this.activityRepo.findOne({
      where: { uuid },
      relations: ['options'],
      order: { options: { order: 'ASC' } },
    });
    if (!activity) {
      throw new NotFoundException(`Activity with uuid ${uuid} not found`);
    }
    return activity;
  }

  // ── UPDATE ──────────────────────────────────────────────────────────────────

  /**
   * Full replace strategy (same as DialogService.update):
   * Deletes all existing activities for a content and re-creates them.
   */
  @Transactional()
  async update(lessonContent: Content, activities: CreateActivityDTO[]): Promise<void> {
    if (!activities || activities.length === 0) {
      return;
    }
    await this.activityRepo.delete({ lessonContent: { uuid: lessonContent.uuid } });
    await this.create(lessonContent, activities);
  }

  /**
   * Partial update of a single activity (fields + options replacement).
   */
  @Transactional()
  async updateOne(uuid: string, dto: UpdateActivityDTO): Promise<Activity> {
    const activity = await this.findOne(uuid);

    const { options, ...activityData } = dto;

    await this.activityRepo.update({ uuid }, activityData);

    if (options !== undefined) {
      await this.optionRepo.delete({ activity: { uuid } });
      if (options.length > 0) {
        const optionEntities = options.map((opt) => {
          const option = this.optionRepo.create(opt);
          option.activity = activity;
          return option;
        });
        await this.optionRepo.save(optionEntities);
      }
    }

    return this.findOne(uuid);
  }

  // ── DELETE ──────────────────────────────────────────────────────────────────

  async delete(uuid: string): Promise<DeleteResponse> {
    const deleted = await this.activityRepo.delete({ uuid });
    if (deleted.affected === 0) {
      throw new NotFoundException(`Activity with uuid ${uuid} not found`);
    }
    return { affected: deleted.affected, status: 200 };
  }

  async deleteOption(uuid: string): Promise<DeleteResponse> {
    const deleted = await this.optionRepo.delete({ uuid });
    if (deleted.affected === 0) {
      throw new NotFoundException(`ActivityOption with uuid ${uuid} not found`);
    }
    return { affected: deleted.affected, status: 200 };
  }
}
