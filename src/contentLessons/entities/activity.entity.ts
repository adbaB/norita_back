import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ActivityConfig } from '../interfaces/activity-config.interface';
import { ActivityTypeEnum } from '../enums/activity-type.enum';
import { DifficultyEnum } from '../../lessons/enums/difficulty.enum';
import { ActivityOption } from './activity-option.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity('activities')
export class Activity {
  @ApiProperty({ description: 'UUID of the activity', type: String })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'Type of activity', enum: ActivityTypeEnum })
  @Column({ name: 'type', type: 'enum', enum: ActivityTypeEnum })
  type: ActivityTypeEnum;

  @ApiProperty({
    description: 'Difficulty level of the activity',
    enum: DifficultyEnum,
    default: DifficultyEnum.EASY,
  })
  @Column({ name: 'difficulty', type: 'enum', enum: DifficultyEnum, default: DifficultyEnum.EASY })
  difficulty: DifficultyEnum;

  @ApiProperty({ description: 'Instruction text shown to the user', type: String })
  @Column({ name: 'instruction', type: 'text' })
  instruction: string;

  @ApiProperty({
    description: 'URL of the audio instruction (optional)',
    type: String,
    nullable: true,
  })
  @Column({ name: 'audio_instruction', type: 'varchar', length: 255, nullable: true })
  audioInstruction: string;

  @ApiProperty({
    description:
      'Type-specific configuration stored as JSONB (DragDropImageConfig | DragDropTextConfig | WordSelectionConfig | ...)',
    type: Object,
  })
  @Column({ name: 'config', type: 'jsonb' })
  config: ActivityConfig;

  @ApiProperty({
    description: 'Feedback message shown when the user answers correctly',
    type: String,
    nullable: true,
  })
  @Column({ name: 'feedback_correct', type: 'text', nullable: true })
  feedbackCorrect: string;

  @ApiProperty({
    description: 'Feedback message shown when the user answers incorrectly',
    type: String,
    nullable: true,
  })
  @Column({ name: 'feedback_incorrect', type: 'text', nullable: true })
  feedbackIncorrect: string;

  @ApiProperty({
    description: 'URL of the audio played on correct answer',
    type: String,
    nullable: true,
  })
  @Column({ name: 'audio_correct', type: 'varchar', length: 255, nullable: true })
  audioCorrect: string;

  @ApiProperty({
    description: 'URL of the audio played on incorrect answer',
    type: String,
    nullable: true,
  })
  @Column({ name: 'audio_incorrect', type: 'varchar', length: 255, nullable: true })
  audioIncorrect: string;

  @ApiProperty({
    description: 'Points awarded for completing this activity',
    type: Number,
    default: 10,
  })
  @Column({ name: 'points', type: 'integer', default: 10 })
  points: number;

  @ApiProperty({
    description: 'Options/items belonging to this activity',
    type: () => [ActivityOption],
  })
  @OneToMany(() => ActivityOption, (option) => option.activity, { cascade: true })
  options: ActivityOption[];

  /**
   * Relación N:M con Lesson a través de la tabla pivote `lesson_activities`.
   * Activity es el dueño de la relación (@JoinTable aquí).
   */
  @ManyToMany(() => Lesson, (lesson) => lesson.activities)
  @JoinTable({
    name: 'lesson_activities',
    joinColumn: { name: 'activity_uuid', referencedColumnName: 'uuid' },
    inverseJoinColumn: { name: 'lesson_uuid', referencedColumnName: 'uuid' },
  })
  @Exclude()
  lessons: Lesson[];

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
