import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Content } from '../../contentLessons/entities/content.entity';
import { LessonProgress } from '../../lessonProgress/entity/lessonProgress.entity';
import { TypeLessonEnum } from '../enums/typeLesson.enum';
import { Section } from './section.entity';

@Entity('lessons')
export class Lesson {
  @ApiProperty({ description: 'UUID of the lesson', type: String })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'Type of the lesson', enum: TypeLessonEnum })
  @Column({ name: 'type', type: 'enum', enum: TypeLessonEnum })
  type: TypeLessonEnum;

  @ApiProperty({ description: 'Reward points for completing the lesson', type: Number, default: 0 })
  @Column({ name: 'reward', type: 'integer', default: 0 })
  reward: number;

  @ApiProperty({ description: 'Icon URL for the lesson', type: String, maxLength: 255 })
  @Column({ name: 'icon', type: 'varchar', length: 255 })
  icon: string;

  @ApiProperty({ description: 'Background image URL for the lesson', type: String, maxLength: 255 })
  @Column({ name: 'background', type: 'varchar', length: 255 })
  background: string;

  @ApiProperty({ description: 'Lesson number', type: String, maxLength: 10 })
  @Column({ name: 'number', type: 'varchar', length: 10, unique: true })
  number: string;

  @ApiProperty({ description: 'Name of the lesson', type: String, maxLength: 255 })
  @Column({ name: 'name', type: 'varchar', length: 255, unique: true })
  name: string;

  @ApiProperty({ description: 'Content of the lesson', type: String })
  @Column({ name: 'content', type: 'text' })
  content: string;

  @ApiProperty({ description: 'Description of the lesson', type: String, nullable: true })
  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    description: 'Estimated time to complete the lesson in minutes',
    type: Number,
    nullable: true,
  })
  @Column({ name: 'time', type: 'integer', nullable: true })
  time: number;

  @ApiProperty({
    description: 'Coins needed to unlock the lesson with requirements',
    type: Number,
    default: 0,
  })
  @Column({ name: 'coins_needed_unlock_with_requirements', type: 'integer', default: 0 })
  coinsNeededUnlockWithRequirements: number;

  @ApiProperty({
    description: 'Coins needed to unlock the lesson without requirements',
    type: Number,
    default: 0,
  })
  @Column({ name: 'coins_needed_unlock_without_requirements', type: 'integer', default: 0 })
  coinsNeededUnlockWithoutRequirements: number;

  @ManyToOne(() => Section, (section) => section.lessons, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'section_uuid' })
  section: Section;

  @ApiProperty({ description: 'Content of the lesson', type: () => Content })
  @OneToOne(() => Content, (content) => content.lesson)
  lessonContent: Content;

  @OneToMany(() => LessonProgress, (lessonProgress) => lessonProgress.lesson)
  lessonProgress: LessonProgress;

  @ApiProperty({ description: 'Order of the lesson within its section', type: Number })
  @Index({ unique: true })
  @Column({ name: 'order', type: 'decimal', precision: 10, scale: 2 })
  order: number;

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
