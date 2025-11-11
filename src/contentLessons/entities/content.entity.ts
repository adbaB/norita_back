import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { Bibliography } from './biblography.entity';
import { Dialog } from './dialog.entity';
import { Glossary } from './glossary.entity';
import { Notes } from './notes.entity';

@Entity('content')
export class Content {
  @ApiProperty({ description: 'UUID of the content', type: String })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'Content of the lesson', type: String })
  @Column({ type: 'varchar', length: 255 })
  content: string;

  @ApiProperty({ description: 'Name of the content', type: String })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ description: 'Dialogs associated with the content', type: () => [Dialog] })
  @OneToMany(() => Dialog, (dialog) => dialog.lessonContent)
  dialogs: Dialog[];

  @ApiProperty({ description: 'Notes associated with the content', type: () => [Notes] })
  @OneToMany(() => Notes, (notes) => notes.lessonContent)
  notes: Notes[];

  @ApiProperty({ description: 'Glossaries associated with the content', type: () => [Glossary] })
  @OneToMany(() => Glossary, (glossary) => glossary.lessonContent)
  glossaries: Glossary[];

  @ApiProperty({
    description: 'Bibliographies associated with the content',
    type: () => [Bibliography],
  })
  @OneToMany(() => Bibliography, (bibliography) => bibliography.lessonContent)
  bibliographies: Bibliography[];

  //pending exercise entity
  exercises: unknown[];

  @OneToOne(() => Lesson, (lesson) => lesson.lessonContent, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lesson_uuid' })
  lesson: Lesson;

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

  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
  })
  deletedAt?: Date;

  @Expose({ name: 'audio_popups' })
  audioPopups: string;

  @Expose({ name: 'audio_rewards_claimed' })
  audioRewardsClaimed: string;

  @Expose({ name: 'audio_rewards_disqualified' })
  audioRewardsDisqualified: string;

  @Expose({ name: 'audio_rewards' })
  audioRewards: string;
}
