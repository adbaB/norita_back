import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Activity } from './activity.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { DifficultyEnum } from '../../lessons/enums/difficulty.enum';

@Entity('user_seen_activities')
@Index(['userId', 'lessonUuid', 'difficulty'])
export class UserSeenActivity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'activity_uuid', type: 'uuid' })
  activityUuid: string;

  @Column({ name: 'lesson_uuid', type: 'uuid' })
  lessonUuid: string;

  @Column({ name: 'difficulty', type: 'enum', enum: DifficultyEnum, default: DifficultyEnum.EASY })
  difficulty: DifficultyEnum;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Activity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'activity_uuid' })
  activity: Activity;

  @ManyToOne(() => Lesson, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lesson_uuid' })
  lesson: Lesson;
}
