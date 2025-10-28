import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { User } from '../../users/entities/user.entity';

@Entity('lesson_progress')
export class LessonProgress {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'boolean', default: false })
  unlocked: boolean;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @Column({ type: 'int', default: 0 })
  lastLineSeen: number;

  @Column({ type: 'timestamptz', nullable: true })
  dateCompleted: Date | null;

  @ManyToOne(() => User, (user) => user.lessonProgress, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_uuid' })
  user: User;

  @ManyToOne(() => Lesson, (lesson) => lesson.lessonProgress, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lesson_uuid' })
  lesson: Lesson;
}
