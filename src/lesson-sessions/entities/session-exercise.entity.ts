import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LessonSession } from './lesson-session.entity';
import { Activity } from '../../contentLessons/entities/activity.entity';
import { DifficultyEnum } from '../../lessons/enums/difficulty.enum';

@Entity('session_exercise')
export class SessionExercise {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => LessonSession, (session) => session.exercises, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'session_id' })
  session: LessonSession;

  @ManyToOne(() => Activity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'exercise_id' })
  exercise: Activity | null;

  @Column({ type: 'enum', enum: DifficultyEnum })
  difficulty: DifficultyEnum;

  @Column({ type: 'boolean', nullable: true })
  correct: boolean;

  @Column({ name: 'response_time_ms', type: 'int', nullable: true })
  responseTimeMs: number;

  @Column({ name: 'answered_at', type: 'timestamp with time zone', nullable: true })
  answeredAt: Date;
}
