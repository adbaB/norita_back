import { ActivityTypeEnum } from '../../contentLessons/enums/activity-type.enum';
import { DifficultyEnum } from '../../lessons/enums/difficulty.enum';
import { ActivityConfig } from '../../contentLessons/interfaces/activity-config.interface';
import { ActivityOption } from '../../contentLessons/entities/activity-option.entity';
import { ChallengeHintEnum } from '../enums/challenge-hint.enum';

export interface SrsReviewContext {
  lessonName: string;
  daysSinceLastPracticed: number;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface ExerciseMetadata {
  isChallenge: boolean;
  sourceLessonId: string;
  uiHint: ChallengeHintEnum | null;
  /** Solo presente en ejercicios Tipo 3 (SPACED_REPETITION_REVIEW) */
  reviewContext?: SrsReviewContext;
}

export interface ExerciseWithMetadata {
  id: string;
  type: ActivityTypeEnum;
  difficulty: DifficultyEnum;
  instruction: string;
  audioInstruction: string | null;
  config: ActivityConfig;
  options: ActivityOption[];
  points: number;
  feedbackCorrect: string | null;
  feedbackIncorrect: string | null;
  audioCorrect: string | null;
  audioIncorrect: string | null;
  metadata: ExerciseMetadata;
}
