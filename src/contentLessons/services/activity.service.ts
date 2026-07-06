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

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepo: Repository<Activity>,
    @InjectRepository(ActivityOption)
    private readonly optionRepo: Repository<ActivityOption>,
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>,
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
      .innerJoin('activity.lessons', 'lesson', 'lesson.uuid = :lessonUuid', { lessonUuid })
      .leftJoinAndSelect('activity.options', 'options')
      .addSelect('la.order', 'pivotOrder')
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
   * Obtiene ejercicios aleatorios de una dificultad, y un número opcional
   * de ejercicios del siguiente nivel (preview).
   */
  async findRandomByDifficulty(
    lessonUuid: string,
    difficulty: DifficultyEnum,
    count: number,
    previewCount: number = 3,
  ): Promise<{ requested: Activity[]; preview: Activity[] }> {
    // 1. Obtener los de la dificultad solicitada
    const allRequested = await this.findByDifficulty(lessonUuid, difficulty);
    const requested = this.shuffleArray(allRequested).slice(0, count);

    let preview: Activity[] = [];

    // 2. Determinar la siguiente dificultad
    let nextDifficulty: DifficultyEnum | null = null;
    if (difficulty === DifficultyEnum.EASY) {
      nextDifficulty = DifficultyEnum.INTERMEDIATE;
    } else if (difficulty === DifficultyEnum.INTERMEDIATE) {
      nextDifficulty = DifficultyEnum.HARD;
    }

    // 3. Obtener los de la siguiente dificultad (si aplica)
    if (nextDifficulty && previewCount > 0) {
      const allPreview = await this.findByDifficulty(lessonUuid, nextDifficulty);
      preview = this.shuffleArray(allPreview).slice(0, previewCount);
    }

    return { requested, preview };
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
