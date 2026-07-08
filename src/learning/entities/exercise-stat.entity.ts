import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Activity } from '../../contentLessons/entities/activity.entity';

/**
 * Almacena el estado Bandit (UCB1) por par (usuario, ejercicio).
 * PK compuesta: (userId, exerciseId).
 */
@Entity('exercise_stat')
export class ExerciseStat {
  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
  userId: string;

  @PrimaryColumn({ name: 'exercise_id', type: 'uuid' })
  exerciseId: string;

  /** Número de veces que el usuario ha jugado este ejercicio. */
  @Column({ name: 'times_played', type: 'int', default: 0 })
  timesPlayed: number;

  /**
   * Suma acumulada de rewards de aprendizaje.
   * Reward = peso de dificultad si acierta, 0 si falla.
   * EASY=0.5, INTERMEDIATE=1.0, HARD=0.3
   */
  @Column({ name: 'total_learning', type: 'float', default: 0 })
  totalLearning: number;

  @Column({ name: 'last_played', type: 'timestamptz', nullable: true })
  lastPlayed: Date | null;

  /** Tiempo de respuesta promedio (ms). Útil para análisis futuros. */
  @Column({ name: 'average_response_time_ms', type: 'float', nullable: true })
  averageResponseTimeMs: number | null;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Activity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'exercise_id' })
  activity: Activity;
}
