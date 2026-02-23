import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Goal } from './goal.entity';

@Entity('user_goals')
@Unique(['user', 'goal'])
export class UserGoal {
  @ApiProperty({ description: 'UUID of the user goal', type: String })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'user_uuid' })
  user: User;

  @ManyToOne(() => Goal, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'goal_uuid' })
  goal: Goal;

  @ApiProperty({ description: 'Indicates if the goal is claimed', type: Boolean })
  @Column({ name: 'is_claimed', type: 'boolean', default: false })
  isClaimed: boolean;

  @ApiProperty({ description: 'Date when the goal was claimed', type: Date, nullable: true })
  @Column({ name: 'claimed_at', type: 'timestamptz', nullable: true })
  claimedAt: Date;

  @Exclude({ toPlainOnly: true })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
