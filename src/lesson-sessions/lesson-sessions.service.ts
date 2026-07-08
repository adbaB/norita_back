import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { LessonSession } from './entities/lesson-session.entity';
import { SessionExercise } from './entities/session-exercise.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { CompleteSessionDto } from './dto/complete-session.dto';
import { SessionStatusEnum } from './enums/session-status.enum';
import { User } from '../users/entities/user.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { Activity } from '../contentLessons/entities/activity.entity';
import { FormatResponse } from '../utils/responses';

@Injectable()
export class LessonSessionsService {
  constructor(
    @InjectRepository(LessonSession)
    private readonly sessionRepo: Repository<LessonSession>,
    @InjectRepository(SessionExercise)
    private readonly sessionExerciseRepo: Repository<SessionExercise>,
  ) {}

  @Transactional()
  async createSession(
    userId: string,
    dto: CreateSessionDto,
  ): Promise<{ sessionId: string; startedAt: Date }> {
    const session = this.sessionRepo.create({
      user: { uuid: userId } as User,
      lesson: { uuid: dto.lessonId } as Lesson,
      difficulty: dto.difficulty,
      totalQuestions: dto.totalQuestions,
      status: SessionStatusEnum.ABANDONED, // Default to abandoned until completed
    });

    const savedSession = await this.sessionRepo.save(session);

    if (dto.exercises && dto.exercises.length > 0) {
      const exerciseEntities = dto.exercises.map((ex) => {
        return this.sessionExerciseRepo.create({
          session: savedSession,
          exercise: { uuid: ex.exerciseId } as unknown as Activity,
          difficulty: ex.difficulty,
        });
      });
      await this.sessionExerciseRepo.save(exerciseEntities);
    }

    return {
      sessionId: savedSession.uuid,
      startedAt: savedSession.startedAt,
    };
  }

  @Transactional()
  async completeSession(
    userId: string,
    sessionId: string,
    dto: CompleteSessionDto,
  ): Promise<LessonSession> {
    const session = await this.sessionRepo.findOne({
      where: { uuid: sessionId, user: { uuid: userId } },
      relations: ['exercises', 'exercises.exercise'],
    });

    if (!session) {
      throw new NotFoundException(`Session ${sessionId} not found for user`);
    }

    let correctAnswers = 0;
    let incorrectAnswers = 0;

    // Update exercises
    for (const completedEx of dto.exercises) {
      const existingEx = session.exercises.find((e) => e.exercise?.uuid === completedEx.exerciseId);
      if (existingEx) {
        existingEx.correct = completedEx.correct;
        existingEx.responseTimeMs = completedEx.responseTimeMs;
        existingEx.answeredAt = new Date(); // roughly now
        if (completedEx.correct) {
          correctAnswers++;
        } else {
          incorrectAnswers++;
        }
      }
    }

    await this.sessionExerciseRepo.save(session.exercises);

    session.status = dto.status;
    session.totalTimeMs = dto.totalTimeMs;
    session.correctAnswers = correctAnswers;
    session.incorrectAnswers = incorrectAnswers;
    session.percentage =
      session.totalQuestions > 0 ? (correctAnswers / session.totalQuestions) * 100 : 0;
    session.completedAt = new Date();

    return this.sessionRepo.save(session);
  }

  async getUserSessionsByLesson(
    userId: string,
    lessonId: string,
    limit: number = 20,
    page: number = 1,
  ): Promise<FormatResponse<LessonSession>> {
    const take = Math.min(limit, 100);
    const skip = (page - 1) * take;

    const [data, total] = await this.sessionRepo.findAndCount({
      where: { user: { uuid: userId }, lesson: { uuid: lessonId } },
      order: { startedAt: 'DESC' },
      take: take,
      skip: skip,
    });

    const lastPage = Math.ceil(total / take) || 1;
    const info = {
      total,
      currentPage: page,
      nextPage: page < lastPage ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      lastPage,
    };

    return { data, info };
  }

  async getSessionDetails(userId: string, sessionId: string): Promise<LessonSession> {
    const session = await this.sessionRepo.findOne({
      where: { uuid: sessionId, user: { uuid: userId } },
      relations: ['exercises', 'exercises.exercise'],
    });

    if (!session) {
      throw new NotFoundException(`Session ${sessionId} not found for user`);
    }

    return session;
  }
}
