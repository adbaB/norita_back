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

    // 1. Instanciar y asociar todas las actividades al content
    const activityEntities = activities.map((dto) => {
      const activityData = { ...dto };
      delete activityData.options;
      const activity = this.activityRepo.create(activityData);
      activity.lessonContent = lessonContent;
      return activity;
    });

    // 2. Guardar todas las actividades en un solo batch
    const savedActivities = await this.activityRepo.save(activityEntities);

    // 3. Recopilar todas las opciones en una lista plana asociándolas a su actividad guardada
    const allOptionEntities: ActivityOption[] = [];
    const optionsByActivityIndex = new Map<number, ActivityOption[]>();

    activities.forEach((dto, index) => {
      const savedActivity = savedActivities[index];
      const { options = [] } = dto;

      if (options.length > 0) {
        const optionEntities = options.map((opt) => {
          const option = this.optionRepo.create(opt);
          option.activity = savedActivity;
          return option;
        });

        allOptionEntities.push(...optionEntities);
        optionsByActivityIndex.set(index, optionEntities);
      }
    });

    // 4. Guardar todas las opciones juntas si hay alguna
    if (allOptionEntities.length > 0) {
      await this.optionRepo.save(allOptionEntities);

      // 5. Asignar las opciones guardadas en memoria para retornar la estructura correcta
      savedActivities.forEach((activity, index) => {
        activity.options = optionsByActivityIndex.get(index) || [];
      });
    } else {
      savedActivities.forEach((activity) => {
        activity.options = [];
      });
    }

    return savedActivities;
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

  @Transactional()
  async update(lessonContent: Content, activities: CreateActivityDTO[]): Promise<void> {
    // Siempre eliminamos todas las actividades existentes para este contenido
    await this.activityRepo.delete({ lessonContent: { uuid: lessonContent.uuid } });

    // Si la lista no viene vacía, creamos las nuevas actividades
    if (activities && activities.length > 0) {
      await this.create(lessonContent, activities);
    }
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
