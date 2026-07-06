import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

/**
 * Resumen de actividad del usuario por lección para el sistema SRS (Spaced Repetition).
 * PK compuesta: (userId, lessonId).
 * Se actualiza en cada POST /learning/attempts para rastrear cuándo fue
 * la última vez que el usuario practicó cada lección.
 */
@Entity('user_lesson_stat')
export class UserLessonStat {
  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
  userId: string;

  @PrimaryColumn({ name: 'lesson_id', type: 'uuid' })
  lessonId: string;

  /** Fecha de la última sesión del usuario en esta lección. */
  @Column({ name: 'last_played_at', type: 'timestamptz', nullable: true })
  lastPlayedAt: Date | null;

  /** Número de sesiones completadas en esta lección. */
  @Column({ name: 'times_played', type: 'int', default: 0 })
  timesPlayed: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Lesson, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;
}
