import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { User } from '../../users/entities/user.entity';

import { Exclude } from 'class-transformer';
import * as moment from 'moment';
import { TypeUnlockEnum } from '../enums/type-unlock.enum';

@Entity('lesson_access')
export class LessonAccess {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ name: 'unlocked_at', type: 'timestamptz' })
  unlockedAt: Date;

  @Column({
    name: 'type_unlock',
    type: 'enum',
    enum: TypeUnlockEnum,
    default: null,
    nullable: true,
  })
  typeUnlock: TypeUnlockEnum | null;

  @Column({ name: 'is_unlocked', type: 'boolean', default: false })
  isUnlocked: boolean;

  @ManyToOne(() => User, (user) => user.lessonAccess, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_uuid' })
  user: User;

  @ManyToOne(() => Lesson, (lesson) => lesson.lessonAccess, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'lesson_uuid' })
  lesson: Lesson;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude({ toPlainOnly: true })
  canUnlock(): boolean {
    return moment().isSameOrAfter(this.unlockedAt);
  }
}
