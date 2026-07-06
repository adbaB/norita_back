import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

/**
 * Almacena el estado ELO del usuario ESPECÍFICO POR LECCIÓN.
 * PK compuesta: (userId, lessonId) — cada lección tiene su propia curva de aprendizaje.
 * Un usuario puede ser avanzado en Hiragana (ELO=850) y principiante en Kanji (ELO=300).
 */
@Entity('user_progress')
export class UserProgress {
  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
  userId: string;

  @PrimaryColumn({ name: 'lesson_id', type: 'uuid' })
  lessonId: string;

  /**
   * Puntuación ELO para esta lección específica.
   * Default 300 (nivel EASY). Clamp: 100–1200.
   */
  @Column({ name: 'elo_score', type: 'float', default: 300 })
  eloScore: number;

  /** Total de intentos del usuario en esta lección. */
  @Column({ name: 'total_attempts', type: 'int', default: 0 })
  totalAttempts: number;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Lesson, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;
}
