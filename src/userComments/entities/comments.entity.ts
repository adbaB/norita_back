import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { User } from '../../users/entities/user.entity';
import { UserLikes } from './userLikes.entity';

@Entity('comment')
export class Comments {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'text', nullable: false })
  comment: string;

  @Column({ type: 'integer', default: 0 })
  rating: number;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'user_uuid' })
  user: User;

  @ManyToOne(() => Lesson, (lesson) => lesson.comments)
  @JoinColumn({ name: 'lesson_uuid' })
  lesson: Lesson;

  @OneToMany(() => UserLikes, (userLikes) => userLikes.comment)
  Userlikes: UserLikes[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;

  @Expose({ name: 'likes' })
  getLikesCount(): number {
    return this.Userlikes ? this.Userlikes.filter((like) => like.isLike).length : 0;
  }

  @Expose({ name: 'dislikes' })
  getDislikesCount(): number {
    return this.Userlikes ? this.Userlikes.filter((like) => !like.isLike).length : 0;
  }
}
