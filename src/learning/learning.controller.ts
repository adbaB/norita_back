import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/decorators/user.decorator';
import { LearningService } from './learning.service';
import { GetExercisesDto } from './dto/get-exercises.dto';
import { SubmitAttemptsDto } from './dto/submit-attempts.dto';
import { ExerciseWithMetadata } from './interfaces/exercise-with-metadata.interface';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@ApiTags('Learning')
@ApiBearerAuth()
@Controller('learning')
export class LearningController {
  constructor(private readonly learningService: LearningService) {}

  /**
   * GET /learning/exercises
   * Retorna una sesión de ejercicios adaptativos para el usuario autenticado.
   * El algoritmo ELO determina la dificultad y el Bandit (UCB1) selecciona
   * los ejercicios específicos. Si el usuario domina el nivel (P > 85%),
   * se inyectan hasta un 30% de ejercicios de desafío de mayor dificultad.
   */
  @ApiOperation({
    summary: 'Get adaptive exercises for a lesson',
    description:
      'Returns a session of exercises selected using ELO (difficulty bucket) and Bandit UCB1 (specific exercise selection). ' +
      'If the user dominates the current difficulty (P(correct) > 85%), challenge exercises from a higher difficulty are injected (30% of the session).',
  })
  @ApiResponse({
    status: 200,
    description: 'Exercises session retrieved successfully',
    schema: {
      example: {
        lesson: { id: 'uuid', name: 'Hiragana Básico' },
        sessionMeta: {
          hasChallengeExercises: true,
          challengeReason: 'ELO alto detectado: se inyectan ejercicios de mayor dificultad',
        },
        exercises: [
          {
            id: 'uuid',
            type: 1,
            difficulty: 1,
            instruction: 'Arrastra la imagen correcta',
            config: {},
            options: [],
            points: 10,
            feedbackCorrect: '¡Bien!',
            feedbackIncorrect: 'Intenta de nuevo',
            audioCorrect: null,
            audioIncorrect: null,
            metadata: { isChallenge: false, sourceLessonId: 'uuid', uiHint: null },
          },
        ],
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized — JWT required' })
  @ApiResponse({ status: 404, description: 'Lesson or user not found' })
  @ApiExcludeEndpoint()
  @Get('exercises')
  async getExercises(
    @User() userId: string,
    @Query() dto: GetExercisesDto,
  ): Promise<{
    lesson: { id: string; name: string };
    userElo: number;
    sessionMeta: Record<string, unknown>;
    exercises: ExerciseWithMetadata[];
  }> {
    return this.learningService.getExercises(userId, dto);
  }

  /**
   * POST /learning/attempts
   * Procesa los resultados de una sesión de ejercicios en batch.
   * Actualiza el ELO del usuario y los stats Bandit por ejercicio.
   */
  @ApiOperation({
    summary: 'Submit exercise attempts in batch',
    description:
      'Processes all attempts from a session at once. Updates UserProgress ELO with the accumulated delta and upserts ExerciseStat for Bandit learning. Transactional.',
  })
  @ApiResponse({
    status: 200,
    description: 'Attempts processed successfully',
    schema: {
      example: { processed: 10, newElo: 342.5 },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized — JWT required' })
  @ApiResponse({ status: 404, description: 'Exercise not found' })
  @ApiExcludeEndpoint()
  @Post('attempts')
  @HttpCode(HttpStatus.OK)
  async submitAttempts(
    @User() userId: string,
    @Body() dto: SubmitAttemptsDto,
  ): Promise<{ processed: number; newElo: number }> {
    return this.learningService.submitAttempts(userId, dto);
  }
}
