import { DifficultyEnum } from '../../lessons/enums/difficulty.enum';

/**
 * Estrategia ELO para el sistema de aprendizaje adaptativo.
 * Clase pura con métodos estáticos — sin inyección de dependencias.
 */
export class EloStrategy {
  /** Factor K por intento. K=16 → progresión rápida y visible, ideal para pocas actividades por lección. */
  static readonly K = 16;

  /** ELO mínimo permitido. */
  static readonly MIN_ELO = 100;

  /** ELO máximo permitido. */
  static readonly MAX_ELO = 1200;

  /**
   * Umbral de probabilidad para activar Desafío Tipo 1 (escalada de dificultad).
   * Si P(acertar dificultad actual) > 85%, el usuario domina ese nivel.
   */
  static readonly CHALLENGE_PROBABILITY_THRESHOLD = 0.85;

  /**
   * Umbral de probabilidad para considerar que el usuario dominó toda la lección.
   * Se cumple cuando P(acertar HARD) > 75% → ELO ~1050.
   */
  static readonly LESSON_DOMINATED_THRESHOLD = 0.75;

  /**
   * Mapea DifficultyEnum a su puntaje ELO de referencia.
   * EASY=300, INTERMEDIATE=600, HARD=900.
   */
  static difficultyToScore(difficulty: DifficultyEnum): number {
    switch (difficulty) {
      case DifficultyEnum.EASY:
        return 300;
      case DifficultyEnum.INTERMEDIATE:
        return 600;
      case DifficultyEnum.HARD:
        return 900;
    }
  }

  /**
   * Devuelve la dificultad con un nivel superior a la actual.
   * Devuelve null si ya está en el nivel máximo (HARD).
   */
  static nextDifficulty(difficulty: DifficultyEnum): DifficultyEnum | null {
    switch (difficulty) {
      case DifficultyEnum.EASY:
        return DifficultyEnum.INTERMEDIATE;
      case DifficultyEnum.INTERMEDIATE:
        return DifficultyEnum.HARD;
      case DifficultyEnum.HARD:
        return null;
    }
  }

  /**
   * Calcula la probabilidad esperada de que el usuario acierte un ejercicio.
   * P = 1 / (1 + 10^((difficultyScore - userElo) / 400))
   */
  static expectedProbability(userElo: number, difficultyScore: number): number {
    return 1 / (1 + Math.pow(10, (difficultyScore - userElo) / 400));
  }

  /**
   * Calcula el delta de ELO para un intento individual.
   * deltaELO = K * (resultado - probabilidadEsperada)
   * resultado: 1 = acierto, 0 = fallo
   */
  static calculateEloDelta(
    currentElo: number,
    difficulty: DifficultyEnum,
    correct: boolean,
  ): number {
    const diffScore = EloStrategy.difficultyToScore(difficulty);
    const expected = EloStrategy.expectedProbability(currentElo, diffScore);
    const actual = correct ? 1 : 0;
    return EloStrategy.K * (actual - expected);
  }

  /**
   * Recomienda la canasta de dificultad cuya probabilidad esperada esté
   * más cercana al 70% (dificultad óptima de aprendizaje).
   */
  static recommendBucket(userElo: number): DifficultyEnum {
    const TARGET = 0.7;
    const difficulties = [DifficultyEnum.EASY, DifficultyEnum.INTERMEDIATE, DifficultyEnum.HARD];

    let bestDifficulty = DifficultyEnum.EASY;
    let bestDistance = Infinity;

    for (const diff of difficulties) {
      const score = EloStrategy.difficultyToScore(diff);
      const prob = EloStrategy.expectedProbability(userElo, score);
      const distance = Math.abs(prob - TARGET);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestDifficulty = diff;
      }
    }

    return bestDifficulty;
  }

  /**
   * Determina si se deben inyectar desafíos Tipo 1 (escalada intra-lección).
   * Condición: P(acertar dificultad actual) > 85% Y hay nivel superior.
   */
  static shouldInjectChallenges(userElo: number, currentDifficulty: DifficultyEnum): boolean {
    const diffScore = EloStrategy.difficultyToScore(currentDifficulty);
    const probability = EloStrategy.expectedProbability(userElo, diffScore);
    const hasNextLevel = EloStrategy.nextDifficulty(currentDifficulty) !== null;
    return probability > EloStrategy.CHALLENGE_PROBABILITY_THRESHOLD && hasNextLevel;
  }

  /**
   * Determina si el usuario ha dominado toda la lección.
   * Condición: P(acertar HARD) > LESSON_DOMINATED_THRESHOLD (85%).
   * Se usa para activar el Desafío Tipo 2 (preview de próxima lección).
   */
  static isLessonDominated(userElo: number): boolean {
    const hardScore = EloStrategy.difficultyToScore(DifficultyEnum.HARD);
    return (
      EloStrategy.expectedProbability(userElo, hardScore) > EloStrategy.LESSON_DOMINATED_THRESHOLD
    );
  }

  /**
   * Aplica clamp al ELO para mantenerlo dentro de los límites definidos.
   */
  static clamp(elo: number): number {
    return Math.max(EloStrategy.MIN_ELO, Math.min(EloStrategy.MAX_ELO, elo));
  }
}
