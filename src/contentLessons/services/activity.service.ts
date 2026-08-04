import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { DeleteResponse } from '../../utils/responses';
import { DifficultyEnum } from '../../lessons/enums/difficulty.enum';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { CreateActivityDTO, UpdateActivityDTO } from '../dtos/activity.dto';
import { Activity } from '../entities/activity.entity';
import { ActivityOption } from '../entities/activity-option.entity';
import { UserSeenActivity } from '../entities/user-seen-activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepo: Repository<Activity>,
    @InjectRepository(ActivityOption)
    private readonly optionRepo: Repository<ActivityOption>,
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>,
    @InjectRepository(UserSeenActivity)
    private readonly seenRepo: Repository<UserSeenActivity>,
  ) {}

  // ── CREATE ──────────────────────────────────────────────────────────────────

  /**
   * Crea una Activity standalone (sin Content), sin vincularla a ninguna lección.
   * Usar attachToLesson() para vincularla posteriormente.
   */
  @Transactional()
  async createStandalone(dto: CreateActivityDTO): Promise<Activity> {
    const { options, ...activityData } = dto;

    const activity = this.activityRepo.create(activityData);
    const savedActivity = await this.activityRepo.save(activity);

    if (options && options.length > 0) {
      const optionEntities = options.map((opt) => {
        const option = this.optionRepo.create(opt);
        option.activity = savedActivity;
        return option;
      });
      savedActivity.options = await this.optionRepo.save(optionEntities);
    } else {
      savedActivity.options = [];
    }

    return savedActivity;
  }

  // ── LINK / UNLINK ────────────────────────────────────────────────────────────

  /**
   * Vincula una Activity existente a una Lesson.
   * El campo order se guarda en la tabla pivote lesson_activities
   * actualizando la relación N:M directamente.
   */
  @Transactional()
  async attachToLesson(activityUuid: string, lessonUuid: string, order: number): Promise<void> {
    const activity = await this.activityRepo.findOne({
      where: { uuid: activityUuid },
      relations: ['lessons'],
    });
    if (!activity) {
      throw new NotFoundException(`Activity with uuid ${activityUuid} not found`);
    }

    const lesson = await this.lessonRepo.findOne({ where: { uuid: lessonUuid } });
    if (!lesson) {
      throw new NotFoundException(`Lesson with uuid ${lessonUuid} not found`);
    }

    const alreadyLinked = activity.lessons?.some((l) => l.uuid === lessonUuid);
    if (alreadyLinked) {
      throw new BadRequestException(
        `Activity ${activityUuid} is already linked to lesson ${lessonUuid}`,
      );
    }

    // Añadir la lección al array de relaciones y guardar (TypeORM actualiza la tabla pivote)
    activity.lessons = [...(activity.lessons ?? []), lesson];
    await this.activityRepo.save(activity);

    // Actualizar el campo order en la tabla pivote directamente
    await this.activityRepo.query(
      'UPDATE lesson_activities SET "order" = $1 WHERE activity_uuid = $2 AND lesson_uuid = $3',
      [order, activityUuid, lessonUuid],
    );
  }

  /**
   * Desvincula una Activity de una Lesson (elimina el registro de la tabla pivote).
   */
  @Transactional()
  async detachFromLesson(activityUuid: string, lessonUuid: string): Promise<void> {
    const activity = await this.activityRepo.findOne({
      where: { uuid: activityUuid },
      relations: ['lessons'],
    });
    if (!activity) {
      throw new NotFoundException(`Activity with uuid ${activityUuid} not found`);
    }

    const linkedLesson = activity.lessons?.find((l) => l.uuid === lessonUuid);
    if (!linkedLesson) {
      throw new NotFoundException(`Activity ${activityUuid} is not linked to lesson ${lessonUuid}`);
    }

    activity.lessons = activity.lessons.filter((l) => l.uuid !== lessonUuid);
    await this.activityRepo.save(activity);
  }

  // ── READ ────────────────────────────────────────────────────────────────────

  /**
   * Obtiene todas las activities de una lección, ordenadas por el campo order
   * de la tabla pivote lesson_activities.
   */
  async findByLesson(lessonUuid: string): Promise<Activity[]> {
    return this.activityRepo
      .createQueryBuilder('activity')
      .leftJoinAndSelect('activity.options', 'options')
      .innerJoin(
        'lesson_activities',
        'la',
        'la.activity_uuid = activity.uuid AND la.lesson_uuid = :lessonUuid',
        { lessonUuid },
      )
      .where('activity.deletedAt IS NULL')
      .orderBy('la.order', 'ASC')
      .addOrderBy('options.order', 'ASC')
      .getMany();
  }

  /**
   * Obtiene activities de una lección filtradas por dificultad.
   * Usa JOIN a través de la tabla pivote lesson_activities.
   */
  async findByDifficulty(lessonUuid: string, difficulty: DifficultyEnum): Promise<Activity[]> {
    return this.activityRepo
      .createQueryBuilder('activity')
      .innerJoin('activity.lessons', 'lesson', 'lesson.uuid = :lessonUuid', { lessonUuid })
      .leftJoinAndSelect('activity.options', 'options')
      .where('activity.difficulty = :difficulty', { difficulty })
      .andWhere('activity.deletedAt IS NULL')
      .getMany();
  }

  /**
   * Obtiene ejercicios aleatorios con soporte para:
   * 1. Mezcla por tipo (typeCounts).
   * 2. No-repetición por usuario hasta agotar el pool de esa dificultad/lección (Opción A).
   * 3. Barajado (shuffle) automático de las opciones dentro de cada actividad.
   */
  async findRandomByDifficulty(
    lessonUuid: string,
    difficulty: DifficultyEnum,
    count?: number,
    previewCount: number = 3,
    userId?: string,
    typeCounts?: Record<number, number>,
  ): Promise<{ requested: Activity[]; preview: Activity[] }> {
    let requested: Activity[] = [];

    if (typeCounts && Object.keys(typeCounts).length > 0) {
      for (const [typeStr, requestedCountVal] of Object.entries(typeCounts)) {
        const typeNum = Number(typeStr);
        const reqCount = Number(requestedCountVal);
        if (isNaN(typeNum) || isNaN(reqCount) || reqCount <= 0) continue;

        const typeActivities: Activity[] = await this.selectActivitiesWithCycle(
          lessonUuid,
          difficulty,
          reqCount,
          userId,
          typeNum,
        );
        requested.push(...typeActivities);
      }
    } else {
      const targetCount = count && Number(count) > 0 ? Number(count) : 10;
      const defaultActivities: Activity[] = await this.selectActivitiesWithCycle(
        lessonUuid,
        difficulty,
        targetCount,
        userId,
      );
      requested.push(...defaultActivities);
    }

    // Barajar opciones dentro de cada actividad solicitada
    requested = requested.map((activity) => this.shuffleActivityOptions(activity));

    let preview: Activity[] = [];

    // Determinar la siguiente dificultad para preview
    let nextDifficulty: DifficultyEnum | null = null;
    if (difficulty === DifficultyEnum.EASY) {
      nextDifficulty = DifficultyEnum.INTERMEDIATE;
    } else if (difficulty === DifficultyEnum.INTERMEDIATE) {
      nextDifficulty = DifficultyEnum.HARD;
    }

    if (nextDifficulty && previewCount > 0) {
      const previewActivities: Activity[] = await this.selectActivitiesWithCycle(
        lessonUuid,
        nextDifficulty,
        Number(previewCount),
        userId,
      );
      preview = previewActivities.map((activity) => this.shuffleActivityOptions(activity));
    }

    return { requested, preview };
  }

  /**
   * Selecciona N actividades para una lección y dificultad (y opcionalmente por tipo),
   * excluyendo las ya vistas por el usuario en el ciclo actual.
   * Si el pool disponible no alcanza N, se resetea el historial del usuario para esa canasta
   * y se completa la selección del pool liberado.
   */
  private async selectActivitiesWithCycle(
    lessonUuid: string,
    difficulty: DifficultyEnum,
    count: number,
    userId?: string,
    activityType?: number,
  ): Promise<Activity[]> {
    let qb = this.activityRepo
      .createQueryBuilder('activity')
      .innerJoin('activity.lessons', 'lesson', 'lesson.uuid = :lessonUuid', { lessonUuid })
      .leftJoinAndSelect('activity.options', 'options')
      .where('activity.difficulty = :difficulty', { difficulty })
      .andWhere('activity.deletedAt IS NULL');

    if (activityType !== undefined) {
      qb = qb.andWhere('activity.type = :activityType', { activityType });
    }

    const fullPool: Activity[] = await qb.getMany();

    if (fullPool.length === 0) {
      return [];
    }

    if (!userId) {
      return this.shuffleArray<Activity>(fullPool).slice(0, count);
    }

    const seenRecords = await this.seenRepo.find({
      where: { userId, lessonUuid, difficulty },
      select: ['activityUuid'],
    });

    const seenUuids = new Set(seenRecords.map((s) => s.activityUuid));
    const unseenPool: Activity[] = fullPool.filter((a) => !seenUuids.has(a.uuid));

    let selected: Activity[] = [];

    if (unseenPool.length >= count) {
      selected = this.shuffleArray<Activity>(unseenPool).slice(0, count);
    } else {
      selected = [...unseenPool];
      const remainingNeeded = count - selected.length;

      await this.seenRepo.delete({ userId, lessonUuid, difficulty });

      const selectedUuids = new Set(selected.map((a) => a.uuid));
      const resetPool: Activity[] = fullPool.filter((a) => !selectedUuids.has(a.uuid));

      if (resetPool.length > 0) {
        const extraSelected = this.shuffleArray<Activity>(resetPool).slice(0, remainingNeeded);
        selected.push(...extraSelected);
      } else {
        const extraSelected = this.shuffleArray<Activity>(fullPool).slice(0, remainingNeeded);
        selected.push(...extraSelected);
      }
    }

    if (selected.length > 0) {
      const newSeenEntities = selected.map((a) =>
        this.seenRepo.create({
          userId,
          activityUuid: a.uuid,
          lessonUuid,
          difficulty,
        }),
      );
      await this.seenRepo.save(newSeenEntities);
    }

    return selected;
  }

  private shuffleActivityOptions(activity: Activity): Activity {
    if (activity.options && activity.options.length > 0) {
      activity.options = this.shuffleArray<ActivityOption>(activity.options);
    }
    return activity;
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  async findOne(uuid: string): Promise<Activity> {
    const activity = await this.activityRepo.findOne({
      where: { uuid },
      relations: ['options', 'lessons'],
      order: { options: { order: 'ASC' } },
    });
    if (!activity) {
      throw new NotFoundException(`Activity with uuid ${uuid} not found`);
    }
    return activity;
  }

  // ── UPDATE ──────────────────────────────────────────────────────────────────

  /**
   * Actualización parcial de una activity standalone (campos + reemplazo de opciones).
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
