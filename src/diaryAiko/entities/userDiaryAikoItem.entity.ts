import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { DiaryAikoItem } from './diaryAikoItem.entity';

@Unique(['user', 'item'])
@Entity('user_diary_aiko_items')
export class UserDiaryAikoItem {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => User, (user) => user.diaryAikoItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_uuid' })
  user: User;

  @ManyToOne(() => DiaryAikoItem, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'item_uuid' })
  item: DiaryAikoItem;

  @Column({ name: 'is_unlocked', type: 'boolean', default: false })
  isUnlocked: boolean;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
