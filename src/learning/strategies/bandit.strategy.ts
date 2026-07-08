import { Activity } from '../../contentLessons/entities/activity.entity';
import { DifficultyEnum } from '../../lessons/enums/difficulty.enum';
import { ExerciseStat } from '../entities/exercise-stat.entity';

/**
 * Estrategia Bandit UCB1 mejorada con factor de tiempo para spaced repetition.
 * Clase pura con métodos estáticos — sin inyección de dependencias.
 *
 * UCB mejorado = (totalLearning / timesPlayed) + √(2·ln(N)/n) + bonus_tiempo
 * bonus_tiempo = min(días_sin_jugar × 0.05, 1.0)
 *
 * El bonus de tiempo premia ejercicios no jugados en mucho tiempo,
 * implementando spaced repetition a nivel de ejercicio individual.
 */
export class BanditStrategy {
  /**
   * Pesos de reward (aprendizaje) por dificultad.
   * EASY: menor peso (es sencillo).
   * INTERMEDIATE: mayor peso (mayor valor de aprendizaje).
   * HARD: menor peso (difícil, el usuario falla más).
   */
  static readonly LEARNING_WEIGHTS: Record<DifficultyEnum, number> = {
    [DifficultyEnum.EASY]: 0.5,
    [DifficultyEnum.INTERMEDIATE]: 1.0,
    [DifficultyEnum.HARD]: 0.3,
  };

  /**
   * Factor de penalización por tiempo (por día sin jugar).
   * bonus = min(días × TIME_DECAY_FACTOR, TIME_DECAY_MAX)
   */
  static readonly TIME_DECAY_FACTOR = 0.05;
  static readonly TIME_DECAY_MAX = 1.0;

  /**
   * Calcula el bonus de tiempo dado un timestamp de última jugada.
   * Si nunca se jugó (null) → devuelve TIME_DECAY_MAX (máxima prioridad).
   */
  static timeBonusFromLastPlayed(lastPlayed: Date | null): number {
    if (!lastPlayed) {
      return BanditStrategy.TIME_DECAY_MAX;
    }
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysSinceLastPlayed = (Date.now() - lastPlayed.getTime()) / msPerDay;
    return Math.min(
      daysSinceLastPlayed * BanditStrategy.TIME_DECAY_FACTOR,
      BanditStrategy.TIME_DECAY_MAX,
    );
  }

  /**
   * Calcula el score UCB1 mejorado con factor de tiempo.
   * @param timesPlayed - Veces que el usuario jugó este ejercicio
   * @param totalLearning - Suma acumulada de rewards de aprendizaje
   * @param totalPlays - Total de plays del usuario en todos los ejercicios
   * @param lastPlayed - Fecha de la última vez que jugó este ejercicio
   */
  static ucbScore(
    timesPlayed: number,
    totalLearning: number,
    totalPlays: number,
    lastPlayed: Date | null = null,
  ): number {
    const timeBonus = BanditStrategy.timeBonusFromLastPlayed(lastPlayed);

    // Si nunca se jugó, explorar inmediatamente (UCB = Infinity + bonus)
    if (timesPlayed === 0) {
      return Infinity;
    }

    const average = totalLearning / timesPlayed;
    const exploration = totalPlays === 0 ? 0 : Math.sqrt((2 * Math.log(totalPlays)) / timesPlayed);

    return average + exploration + timeBonus;
  }

  /**
   * Calcula el reward de aprendizaje para un intento.
   * Si acierta: peso de la dificultad. Si falla: 0.
   */
  static learningReward(difficulty: DifficultyEnum, correct: boolean): number {
    if (!correct) return 0;
    return BanditStrategy.LEARNING_WEIGHTS[difficulty] ?? 0;
  }

  /**
   * Selecciona los N mejores ejercicios usando el score UCB1 mejorado.
   * Ordena descendente por UCB y devuelve los primeros N.
   *
   * @param exercises - Pool de ejercicios candidatos
   * @param stats - Mapa de exerciseId → ExerciseStat (puede faltar si nunca jugado)
   * @param totalPlays - Total de plays del usuario
   * @param n - Cantidad de ejercicios a seleccionar
   */
  static selectTopN(
    exercises: Activity[],
    stats: Map<string, ExerciseStat>,
    totalPlays: number,
    n: number,
  ): Activity[] {
    if (n <= 0) return [];

    const scored = exercises.map((exercise) => {
      const stat = stats.get(exercise.uuid);
      const timesPlayed = stat?.timesPlayed ?? 0;
      const totalLearning = stat?.totalLearning ?? 0;
      const lastPlayed = stat?.lastPlayed ?? null;
      const score = BanditStrategy.ucbScore(timesPlayed, totalLearning, totalPlays, lastPlayed);
      return { exercise, score };
    });

    scored.sort((a, b) => {
      if (a.score === Infinity && b.score === Infinity) return 0;
      if (a.score === Infinity) return -1;
      if (b.score === Infinity) return 1;
      return b.score - a.score;
    });

    return scored.slice(0, n).map((s) => s.exercise);
  }
}
