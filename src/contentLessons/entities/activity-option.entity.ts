import { ApiProperty } from '@nestjs/swagger';
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
import { Activity } from './activity.entity';

@Entity('activity_options')
export class ActivityOption {
  @ApiProperty({ description: 'UUID of the activity option', type: String })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'Display order of this option within the activity', type: Number })
  @Column({ name: 'order', type: 'integer' })
  order: number;

  @ApiProperty({
    description:
      'Role of this option in the activity. ' +
      '"chip" = elemento arrastrable. ' +
      '"drop_zone" = zona de destino donde se suelta el chip. ' +
      '"option" = opción seleccionable (WordSelection, MultipleChoice, FillInTheBlank).',
    enum: ['chip', 'drop_zone', 'option'],
    default: 'option',
  })
  @Column({
    name: 'role',
    type: 'varchar',
    length: 20,
    default: 'option',
  })
  role: 'chip' | 'drop_zone' | 'option';

  @ApiProperty({
    description: 'Visible text of the option (word, phrase, translation)',
    type: String,
    nullable: true,
  })
  @Column({ name: 'text', type: 'text', nullable: true })
  text: string;

  @ApiProperty({ description: 'Kana representation', type: String, nullable: true })
  @Column({ name: 'kana', type: 'text', nullable: true })
  kana: string;

  @ApiProperty({
    description: 'Kanji representation (optional for kanji spelling)',
    type: String,
    nullable: true,
  })
  @Column({ name: 'kanji', type: 'text', nullable: true })
  kanji: string;

  @ApiProperty({
    description: 'Romaji representation (optional pronunciation aid)',
    type: String,
    nullable: true,
  })
  @Column({ name: 'romaji', type: 'text', nullable: true })
  romaji: string;

  @ApiProperty({
    description: 'URL of the image (used in DragDropImage)',
    type: String,
    nullable: true,
  })
  @Column({ name: 'image', type: 'varchar', length: 255, nullable: true })
  image: string;

  @ApiProperty({ description: 'URL of the audio for this option', type: String, nullable: true })
  @Column({ name: 'audio', type: 'varchar', length: 255, nullable: true })
  audio: string;

  @ApiProperty({
    description: 'Whether this option is a correct answer (used in WordSelection)',
    type: Boolean,
    default: false,
  })
  @Column({ name: 'is_correct', type: 'boolean', default: false })
  isCorrect: boolean;

  @ApiProperty({
    description:
      'Pairing key used in Drag & Drop and Multiple Choice exercises. Options sharing the same groupKey are matched together.',
    type: String,
    nullable: true,
  })
  @Column({ name: 'group_key', type: 'varchar', length: 100, nullable: true })
  groupKey: string;

  @ApiProperty({
    description:
      'Correct position of this chip in the sentence (1-based, used in WORD_ORDER). ' +
      'When chips are placed in ascending correctPosition order the sentence is correct.',
    type: Number,
    nullable: true,
  })
  @Column({ name: 'correct_position', type: 'integer', nullable: true })
  correctPosition: number;

  @ManyToOne(() => Activity, (activity) => activity.options, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'activity_uuid' })
  activity: Activity;

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
