import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, MoreThan, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { Activity } from '../contentLessons/entities/activity.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { User } from '../users/entities/user.entity';
import { DifficultyEnum } from '../lessons/enums/difficulty.enum';

import { UserProgress } from './entities/user-progress.entity';
import { ExerciseStat } from './entities/exercise-stat.entity';
import { UserLessonStat } from './entities/user-lesson-stat.entity';
import { GetExercisesDto } from './dto/get-exercises.dto';
import { SubmitAttemptsDto } from './dto/submit-attempts.dto';
import { ExerciseWithMetadata } from './interfaces/exercise-with-metadata.interface';
import { ChallengeHintEnum } from './enums/challenge-hint.enum';
import { EloStrategy } from './strategies/elo.strategy';
import { BanditStrategy } from './strategies/bandit.strategy';

// ── Interfaces internas ──────────────────────────────────────────────────────

interface ChallengeDistribution {
  normalCount: number;
  tipo1Count: number;
  tipo2Count: number;
  tipo3Count: number;
}

interface SrsUrgency {
  lesson: Lesson;
  daysSinceLastPlayed: number;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH';
}

// ── Constantes ───────────────────────────────────────────────────────────────

/** Umbrales SRS en días */
const SRS_LOW_THRESHOLD_DAYS = 3;
const SRS_MEDIUM_THRESHOLD_DAYS = 7;
const SRS_HIGH_THRESHOLD_DAYS = 30;

/** Proporciones de desafíos */
const TIPO1_RATIO = 0.3;
const TIPO2_RATIO = 0.2;
const TIPO3_RATIO = 0.2;

@Injectable()
export class LearningService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepo: Repository<Activity>,
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(UserProgress)
    private readonly userProgressRepo: Repository<UserProgress>,
    @InjectRepository(ExerciseStat)
    private readonly exerciseStatRepo: Repository<ExerciseStat>,
    @InjectRepository(UserLessonStat)
    private readonly userLessonStatRepo: Repository<UserLessonStat>,
  ) {}

  // ── GET EXERCISES ────────────────────────────────────────────────────────────

  async getExercises(
    userId: string,
    dto: GetExercisesDto,
  ): Promise<{
    lesson: { id: string; name: string };
    userElo: number;
    sessionMeta: Record<string, unknown>;
    exercises: ExerciseWithMetadata[];
  }> {
    const { lessonId, count } = dto;

    // 1. Verificar que la lección existe
    const lesson = await this.lessonRepo.findOne({
      where: { uuid: lessonId },
      relations: ['section'],
    });
    if (!lesson) {
      throw new NotFoundException(`Lesson with id ${lessonId} not found`);
    }

    // 2. Buscar o crear UserProgress lesson-scoped
    const userProgress = await this.findOrCreateUserProgress(userId, lessonId);
    const userElo = userProgress.eloScore;

    // 3. Determinar la canasta de dificultad recomendada por ELO (lesson-scoped)
    const recommendedDifficulty = EloStrategy.recommendBucket(userElo);

    // 4. Buscar actividades de la lección en la dificultad recomendada
    let selectedActivities = await this.findActivitiesByLessonAndDifficulty(
      lessonId,
      recommendedDifficulty,
    );

    // 5. Fallback: dificultad más cercana disponible
    let effectiveDifficulty = recommendedDifficulty;
    if (selectedActivities.length === 0) {
      const fallback = await this.fallbackDifficulty(lessonId, recommendedDifficulty);
      selectedActivities = fallback.activities;
      effectiveDifficulty = fallback.difficulty;
    }

    // 6. Cargar stats del usuario para estas actividades
    const activityIds = selectedActivities.map((a) => a.uuid);
    const statsMap = await this.loadStatsMap(userId, activityIds);
    const totalPlays = await this.countTotalPlays(userId);

    // 7. Evaluar qué tipos de desafíos aplican
    const tipo1Active = EloStrategy.shouldInjectChallenges(userElo, effectiveDifficulty);
    const lessonDominated = EloStrategy.isLessonDominated(userElo);

    // Tipo 3 (SRS): buscar lección urgente SIEMPRE (coexiste con Tipo 1)
    const srsUrgency = await this.findUrgentReviewLesson(userId, lesson.order);

    // Tipo 2: solo si lección dominada Y Tipo 1 no activo Y no hay SRS urgente
    const tipo2Active = lessonDominated && !tipo1Active && srsUrgency === null;

    // Tipo 3 activo si hay lección urgente (coexiste con Tipo 1 pero NO con Tipo 2)
    const tipo3Active = srsUrgency !== null && !tipo2Active;

    // 8. Calcular distribución
    const distribution = this.calculateDistribution(count, tipo1Active, tipo2Active, tipo3Active);

    // 9. Seleccionar ejercicios normales
    const normalExercises = BanditStrategy.selectTopN(
      selectedActivities,
      statsMap,
      totalPlays,
      distribution.normalCount,
    );
    const normalWithMeta: ExerciseWithMetadata[] = normalExercises.map((a) =>
      this.toExerciseWithMetadata(a, lessonId, false, null),
    );

    let tipo1WithMeta: ExerciseWithMetadata[] = [];
    let tipo2WithMeta: ExerciseWithMetadata[] = [];
    let tipo3WithMeta: ExerciseWithMetadata[] = [];

    // 10. TIPO 1: ejercicios de dificultad superior en la misma lección
    if (tipo1Active && distribution.tipo1Count > 0) {
      const nextDiff = EloStrategy.nextDifficulty(effectiveDifficulty);
      if (nextDiff !== null) {
        const challengePool = await this.findActivitiesByLessonAndDifficulty(lessonId, nextDiff);
        if (challengePool.length > 0) {
          const challengeIds = challengePool.map((a) => a.uuid);
          const challengeStats = await this.loadStatsMap(userId, challengeIds);
          const selected = BanditStrategy.selectTopN(
            challengePool,
            challengeStats,
            totalPlays,
            distribution.tipo1Count,
          );
          tipo1WithMeta = selected.map((a) =>
            this.toExerciseWithMetadata(
              a,
              lessonId,
              true,
              ChallengeHintEnum.CHALLENGE_ELEVATED_DIFFICULTY,
            ),
          );
        }
      }
    }

    // 11. TIPO 2: preview de próxima lección (EASY)
    if (tipo2Active && distribution.tipo2Count > 0) {
      const nextLesson = await this.lessonRepo.findOne({
        where: { order: MoreThan(lesson.order), section: { uuid: lesson.section.uuid } },
        order: { order: 'ASC' },
      });
      if (nextLesson) {
        const previewPool = await this.findActivitiesByLessonAndDifficulty(
          nextLesson.uuid,
          DifficultyEnum.EASY,
        );
        if (previewPool.length > 0) {
          const previewIds = previewPool.map((a) => a.uuid);
          const previewStats = await this.loadStatsMap(userId, previewIds);
          const selected = BanditStrategy.selectTopN(
            previewPool,
            previewStats,
            totalPlays,
            distribution.tipo2Count,
          );
          tipo2WithMeta = selected.map((a) =>
            this.toExerciseWithMetadata(a, nextLesson.uuid, true, ChallengeHintEnum.LESSON_PREVIEW),
          );
        }
      }
    }

    // 12. TIPO 3: repaso SRS de lección con mayor urgencia
    if (tipo3Active && srsUrgency !== null && distribution.tipo3Count > 0) {
      const reviewLesson = srsUrgency.lesson;
      // Usar ELO lesson-scoped de la lección de repaso para determinar dificultad
      const reviewProgress = await this.findOrCreateUserProgress(userId, reviewLesson.uuid);
      const reviewDifficulty = EloStrategy.recommendBucket(reviewProgress.eloScore);

      let srsPool = await this.findActivitiesByLessonAndDifficulty(
        reviewLesson.uuid,
        reviewDifficulty,
      );
      if (srsPool.length === 0) {
        const fallback = await this.fallbackDifficulty(reviewLesson.uuid, reviewDifficulty);
        srsPool = fallback.activities;
      }

      if (srsPool.length > 0) {
        const srsIds = srsPool.map((a) => a.uuid);
        const srsStats = await this.loadStatsMap(userId, srsIds);
        const selected = BanditStrategy.selectTopN(
          srsPool,
          srsStats,
          totalPlays,
          distribution.tipo3Count,
        );
        tipo3WithMeta = selected.map((a) =>
          this.toExerciseWithMetadataWithSrs(a, reviewLesson.uuid, srsUrgency),
        );
      }
    }

    // 13. Combinar y mezclar
    const allExercises = [...normalWithMeta, ...tipo1WithMeta, ...tipo2WithMeta, ...tipo3WithMeta];
    this.shuffle(allExercises);

    // 14. Construir sessionMeta
    const activeChallengeTypes: string[] = [];
    if (tipo1WithMeta.length > 0)
      activeChallengeTypes.push(ChallengeHintEnum.CHALLENGE_ELEVATED_DIFFICULTY);
    if (tipo2WithMeta.length > 0) activeChallengeTypes.push(ChallengeHintEnum.LESSON_PREVIEW);
    if (tipo3WithMeta.length > 0)
      activeChallengeTypes.push(ChallengeHintEnum.SPACED_REPETITION_REVIEW);

    return {
      lesson: { id: lesson.uuid, name: lesson.name },
      userElo,
      sessionMeta: {
        hasChallengeExercises: allExercises.some((e) => e.metadata.isChallenge),
        activeChallengeTypes,
        distribution: {
          normal: normalWithMeta.length,
          tipo1_escalada: tipo1WithMeta.length,
          tipo2_preview: tipo2WithMeta.length,
          tipo3_repaso: tipo3WithMeta.length,
        },
        srsInfo: srsUrgency
          ? {
              reviewLessonId: srsUrgency.lesson.uuid,
              reviewLessonName: srsUrgency.lesson.name,
              daysSinceLastPracticed: Math.floor(srsUrgency.daysSinceLastPlayed),
              urgency: srsUrgency.urgency,
            }
          : null,
      },
      exercises: allExercises,
    };
  }

  // ── SUBMIT ATTEMPTS ──────────────────────────────────────────────────────────

  @Transactional()
  async submitAttempts(
    userId: string,
    dto: SubmitAttemptsDto,
  ): Promise<{ processed: number; newElo: number }> {
    const { lessonId, attempts } = dto;

    // Verificar que la lección existe
    const lesson = await this.lessonRepo.findOne({ where: { uuid: lessonId } });
    if (!lesson) {
      throw new NotFoundException(`Lesson with id ${lessonId} not found`);
    }

    if (attempts.length === 0) {
      // Aún así actualizamos el UserLessonStat para registrar la sesión
      await this.upsertUserLessonStat(userId, lessonId);
      const progress = await this.findOrCreateUserProgress(userId, lessonId);
      return { processed: 0, newElo: progress.eloScore };
    }

    // 1. Cargar todos los ejercicios en una sola query
    const exerciseIds = [...new Set(attempts.map((a) => a.exerciseId))];
    const exercises = await this.activityRepo.findBy({ uuid: In(exerciseIds) });
    const exerciseMap = new Map(exercises.map((e) => [e.uuid, e]));

    for (const attempt of attempts) {
      if (!exerciseMap.has(attempt.exerciseId)) {
        throw new NotFoundException(`Exercise with id ${attempt.exerciseId} not found`);
      }
    }

    // 2. Buscar o crear UserProgress lesson-scoped
    const userProgress = await this.findOrCreateUserProgress(userId, lessonId);
    const runningElo = userProgress.eloScore;
    let totalEloDelta = 0;

    // 3. Calcular deltas ELO y rewards por cada intento
    const statUpdates = new Map<
      string,
      { learning: number; timesPlayed: number; lastResponseTimeMs: number }
    >();

    for (const attempt of attempts) {
      const exercise = exerciseMap.get(attempt.exerciseId);
      const eloDelta = EloStrategy.calculateEloDelta(
        runningElo + totalEloDelta,
        exercise.difficulty,
        attempt.correct,
      );
      totalEloDelta += eloDelta;

      const learning = BanditStrategy.learningReward(exercise.difficulty, attempt.correct);
      const existing = statUpdates.get(attempt.exerciseId) ?? {
        learning: 0,
        timesPlayed: 0,
        lastResponseTimeMs: 0,
      };
      statUpdates.set(attempt.exerciseId, {
        learning: existing.learning + learning,
        timesPlayed: existing.timesPlayed + 1,
        lastResponseTimeMs: attempt.responseTimeMs,
      });
    }

    // 4. Actualizar ELO lesson-scoped
    const newElo = EloStrategy.clamp(runningElo + totalEloDelta);
    userProgress.eloScore = newElo;
    userProgress.totalAttempts += attempts.length;
    await this.userProgressRepo.save(userProgress);

    // 5. Upsert ExerciseStat (global por ejercicio) en batch
    const now = new Date();
    const existingStats = await this.exerciseStatRepo.find({
      where: { userId, exerciseId: In(Array.from(statUpdates.keys())) },
    });
    const existingStatsMap = new Map(existingStats.map((s) => [s.exerciseId, s]));
    const statsToSave: ExerciseStat[] = [];

    for (const [exerciseId, update] of statUpdates) {
      let stat = existingStatsMap.get(exerciseId);
      if (!stat) {
        stat = this.exerciseStatRepo.create({ userId, exerciseId });
        stat.timesPlayed = 0;
        stat.totalLearning = 0;
        stat.averageResponseTimeMs = null;
      }

      const prevAvg = stat.averageResponseTimeMs ?? 0;
      const prevCount = stat.timesPlayed;
      const newCount = prevCount + update.timesPlayed;
      const newAvg =
        newCount > 0
          ? (prevAvg * prevCount + update.lastResponseTimeMs * update.timesPlayed) / newCount
          : null;

      stat.timesPlayed = newCount;
      stat.totalLearning += update.learning;
      stat.lastPlayed = now;
      stat.averageResponseTimeMs = newAvg;
      statsToSave.push(stat);
    }

    if (statsToSave.length > 0) {
      await this.exerciseStatRepo.save(statsToSave);
    }

    // 6. Upsert UserLessonStat (SRS — actualizar last_played_at de esta lección)
    await this.upsertUserLessonStat(userId, lessonId);

    return { processed: attempts.length, newElo };
  }

  // ── HELPERS PRIVADOS ─────────────────────────────────────────────────────────

  /**
   * Calcula la distribución de ejercicios según los tipos activos.
   */
  private calculateDistribution(
    count: number,
    tipo1: boolean,
    tipo2: boolean,
    tipo3: boolean,
  ): ChallengeDistribution {
    let totalAssigned = 0;
    let tipo1Count = 0;
    let tipo2Count = 0;
    let tipo3Count = 0;

    if (tipo1 && tipo3) {
      // Coexistencia: 6 normales + 2 tipo1 + 2 tipo3
      tipo1Count = Math.min(Math.ceil(count * TIPO1_RATIO * 0.67), count - totalAssigned);
      totalAssigned += tipo1Count;
      tipo3Count = Math.min(Math.ceil(count * TIPO3_RATIO * 0.67), count - totalAssigned);
      totalAssigned += tipo3Count;
    } else if (tipo1) {
      tipo1Count = Math.min(Math.ceil(count * TIPO1_RATIO), count - totalAssigned);
      totalAssigned += tipo1Count;
    } else if (tipo2) {
      tipo2Count = Math.min(Math.ceil(count * TIPO2_RATIO), count - totalAssigned);
      totalAssigned += tipo2Count;
    } else if (tipo3) {
      tipo3Count = Math.min(Math.ceil(count * TIPO3_RATIO), count - totalAssigned);
      totalAssigned += tipo3Count;
    }

    const normalCount = Math.max(0, count - totalAssigned);
    return {
      normalCount,
      tipo1Count,
      tipo2Count,
      tipo3Count,
    };
  }

  /**
   * Busca la lección con mayor urgencia de repaso SRS.
   * Considera lecciones con order < lessonActual.order.
   * Devuelve null si no hay lección que necesite repaso (< SRS_LOW_THRESHOLD_DAYS).
   */
  private async findUrgentReviewLesson(
    userId: string,
    currentLessonOrder: number,
  ): Promise<SrsUrgency | null> {
    if (currentLessonOrder <= 1) return null;

    // Obtener las lecciones anteriores que el usuario ha jugado alguna vez
    const stats = await this.userLessonStatRepo
      .createQueryBuilder('stat')
      .innerJoinAndSelect('stat.lesson', 'lesson')
      .where('stat.user_id = :userId', { userId })
      .andWhere('lesson.order < :currentOrder', { currentOrder: currentLessonOrder })
      .andWhere('stat.last_played_at IS NOT NULL')
      .getMany();

    if (stats.length === 0) return null;

    const msPerDay = 1000 * 60 * 60 * 24;
    const now = Date.now();

    // Calcular días sin practicar y filtrar por umbral mínimo
    const urgencies: SrsUrgency[] = stats
      .map((stat) => {
        const daysSinceLastPlayed = (now - stat.lastPlayedAt.getTime()) / msPerDay;
        let urgency: 'LOW' | 'MEDIUM' | 'HIGH';
        if (daysSinceLastPlayed >= SRS_HIGH_THRESHOLD_DAYS) urgency = 'HIGH';
        else if (daysSinceLastPlayed >= SRS_MEDIUM_THRESHOLD_DAYS) urgency = 'MEDIUM';
        else urgency = 'LOW';
        return { lesson: stat.lesson, daysSinceLastPlayed, urgency };
      })
      .filter((u) => u.daysSinceLastPlayed >= SRS_LOW_THRESHOLD_DAYS);

    if (urgencies.length === 0) return null;

    // Ordenar por urgencia descendente (más días primero)
    urgencies.sort((a, b) => b.daysSinceLastPlayed - a.daysSinceLastPlayed);
    return urgencies[0];
  }

  /**
   * Busca o crea el UserProgress para el par (userId, lessonId).
   */
  private async findOrCreateUserProgress(userId: string, lessonId: string): Promise<UserProgress> {
    const user = await this.userRepo.findOne({ where: { uuid: userId } });
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);

    await this.userProgressRepo
      .createQueryBuilder()
      .insert()
      .into(UserProgress)
      .values({ userId, lessonId, eloScore: 300, totalAttempts: 0 })
      .orIgnore()
      .execute();

    return this.userProgressRepo.findOne({ where: { userId, lessonId } });
  }

  /**
   * Crea o actualiza el UserLessonStat para registrar una sesión.
   */
  private async upsertUserLessonStat(userId: string, lessonId: string): Promise<void> {
    const now = new Date().toISOString();
    await this.userLessonStatRepo.query(
      `INSERT INTO "user_lesson_stat" ("user_id", "lesson_id", "times_played", "last_played_at")
       VALUES ($1, $2, 1, $3)
       ON CONFLICT ("user_id", "lesson_id")
       DO UPDATE SET "times_played" = "user_lesson_stat"."times_played" + 1, "last_played_at" = EXCLUDED."last_played_at"`,
      [userId, lessonId, now],
    );
  }

  /**
   * Busca actividades de una lección con la dificultad especificada.
   */
  private async findActivitiesByLessonAndDifficulty(
    lessonUuid: string,
    difficulty: DifficultyEnum,
  ): Promise<Activity[]> {
    return this.activityRepo
      .createQueryBuilder('activity')
      .innerJoin('activity.lessons', 'lesson', 'lesson.uuid = :lessonUuid', { lessonUuid })
      .leftJoinAndSelect('activity.options', 'options')
      .where('activity.difficulty = :difficulty', { difficulty })
      .andWhere('activity.deletedAt IS NULL')
      .orderBy('options.order', 'ASC')
      .getMany();
  }

  /**
   * Fallback de dificultad: busca la dificultad más cercana disponible.
   */
  private async fallbackDifficulty(
    lessonUuid: string,
    recommendedDifficulty: DifficultyEnum,
  ): Promise<{ activities: Activity[]; difficulty: DifficultyEnum }> {
    const available = await this.activityRepo
      .createQueryBuilder('activity')
      .innerJoin('activity.lessons', 'lesson', 'lesson.uuid = :lessonUuid', { lessonUuid })
      .select('DISTINCT activity.difficulty', 'difficulty')
      .where('activity.deletedAt IS NULL')
      .getRawMany<{ difficulty: DifficultyEnum }>();

    if (available.length === 0) return { activities: [], difficulty: recommendedDifficulty };

    const diffValues: Record<DifficultyEnum, number> = {
      [DifficultyEnum.EASY]: 1,
      [DifficultyEnum.INTERMEDIATE]: 2,
      [DifficultyEnum.HARD]: 3,
    };
    const targetValue = diffValues[recommendedDifficulty];
    const sorted = available.sort(
      (a, b) =>
        Math.abs(diffValues[a.difficulty] - targetValue) -
        Math.abs(diffValues[b.difficulty] - targetValue),
    );

    const closestDifficulty = sorted[0].difficulty;
    const activities = await this.findActivitiesByLessonAndDifficulty(
      lessonUuid,
      closestDifficulty,
    );
    return { activities, difficulty: closestDifficulty };
  }

  /**
   * Carga el mapa de ExerciseStats para un usuario y lista de exerciseIds.
   */
  private async loadStatsMap(
    userId: string,
    activityIds: string[],
  ): Promise<Map<string, ExerciseStat>> {
    if (activityIds.length === 0) return new Map();
    const stats = await this.exerciseStatRepo.find({
      where: { userId, exerciseId: In(activityIds) },
    });
    return new Map(stats.map((s) => [s.exerciseId, s]));
  }

  /**
   * Cuenta el total de plays del usuario sumando todos sus ExerciseStats.
   */
  private async countTotalPlays(userId: string): Promise<number> {
    const result = await this.exerciseStatRepo
      .createQueryBuilder('stat')
      .select('COALESCE(SUM(stat.times_played), 0)', 'total')
      .where('stat.user_id = :userId', { userId })
      .getRawOne<{ total: string }>();
    return parseInt(result?.total ?? '0', 10);
  }

  /**
   * Construye un ExerciseWithMetadata estándar.
   */
  private toExerciseWithMetadata(
    activity: Activity,
    sourceLessonId: string,
    isChallenge: boolean,
    uiHint: ChallengeHintEnum | null,
  ): ExerciseWithMetadata {
    return {
      id: activity.uuid,
      type: activity.type,
      difficulty: activity.difficulty,
      instruction: activity.instruction,
      audioInstruction: activity.audioInstruction ?? null,
      config: activity.config,
      options: activity.options ?? [],
      points: activity.points,
      feedbackCorrect: activity.feedbackCorrect ?? null,
      feedbackIncorrect: activity.feedbackIncorrect ?? null,
      audioCorrect: activity.audioCorrect ?? null,
      audioIncorrect: activity.audioIncorrect ?? null,
      metadata: { isChallenge, sourceLessonId, uiHint },
    };
  }

  /**
   * Construye un ExerciseWithMetadata para desafíos Tipo 3 (SRS)
   * incluyendo contexto de urgencia en los metadatos.
   */
  private toExerciseWithMetadataWithSrs(
    activity: Activity,
    sourceLessonId: string,
    srsUrgency: SrsUrgency,
  ): ExerciseWithMetadata {
    const base = this.toExerciseWithMetadata(
      activity,
      sourceLessonId,
      true,
      ChallengeHintEnum.SPACED_REPETITION_REVIEW,
    );
    base.metadata.reviewContext = {
      lessonName: srsUrgency.lesson.name,
      daysSinceLastPracticed: Math.floor(srsUrgency.daysSinceLastPlayed),
      urgency: srsUrgency.urgency,
    };
    return base;
  }

  /**
   * Mezcla un array in-place usando Fisher-Yates.
   */
  private shuffle<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
