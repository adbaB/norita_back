import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Comments } from './comments.entity';

@Entity('user_likes')
@Unique(['user', 'comment'])
export class UserLikes {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'boolean', default: true, nullable: true })
  isLike: boolean;

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({ name: 'user_uuid' })
  user: User;

  @ManyToOne(() => Comments, (comment) => comment.Userlikes)
  @Index()
  @JoinColumn({ name: 'comment_uuid' })
  comment: Comments;
}
