import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { DifficultyEnum } from '../../lessons/enums/difficulty.enum';
import { SessionStatusEnum } from '../enums/session-status.enum';
import { SessionExercise } from './session-exercise.entity';

@Entity('lesson_session')
@Index(['user', 'lesson', 'startedAt'])
export class LessonSession {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Lesson, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;

  @Column({ type: 'enum', enum: DifficultyEnum })
  difficulty: DifficultyEnum;

  @Column({ type: 'enum', enum: SessionStatusEnum, default: SessionStatusEnum.ABANDONED })
  status: SessionStatusEnum;

  @Column({ name: 'total_questions', type: 'int' })
  totalQuestions: number;

  @Column({ name: 'correct_answers', type: 'int', default: 0 })
  correctAnswers: number;

  @Column({ name: 'incorrect_answers', type: 'int', default: 0 })
  incorrectAnswers: number;

  @Column({ type: 'float', default: 0 })
  percentage: number;

  @Column({ name: 'total_time_ms', type: 'int', nullable: true })
  totalTimeMs: number;

  @CreateDateColumn({ name: 'started_at', type: 'timestamp with time zone' })
  startedAt: Date;

  @Column({ name: 'completed_at', type: 'timestamp with time zone', nullable: true })
  completedAt: Date;

  @OneToMany(() => SessionExercise, (exercise) => exercise.session, {
    cascade: true,
  })
  exercises: SessionExercise[];
}
