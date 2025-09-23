import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeLessonEnum } from '../enums/typeLesson.enum';
import { Section } from './section.entity';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ name: 'type', type: 'enum', enum: TypeLessonEnum })
  type: TypeLessonEnum;

  @Column({ name: 'reward', type: 'integer', default: 0 })
  reward: number;

  @Column({ name: 'icon', type: 'varchar', length: 255 })
  icon: string;

  @Column({ name: 'background', type: 'varchar', length: 255 })
  background: string;

  @Column({ name: 'number', type: 'varchar', length: 10 })
  number: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'time', type: 'integer', nullable: true })
  time: number;

  @Column({ name: 'coins_needed_unlock_with_requirements', type: 'integer', default: 0 })
  coinsNeededUnlockWithRequirements: number;

  @Column({ name: 'coins_needed_unlock_without_requirements', type: 'integer', default: 0 })
  coinsNeededUnlockWithoutRequirements: number;

  @ManyToOne(() => Section, (section) => section.lessons, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'section_uuid' })
  section: Section;

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
}
