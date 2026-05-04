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
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { StoryStructureEnum } from '../enums/story-structure.enum';
import { Content } from './content.entity';
import { TypeStructure } from './type-structure.entity';

export class ContentJSON {
  paragraph?: string; // opcional
  image?: string; // opcional
  lottie?: string; // opcional
  gif?: string; // opcional
  nextPoint?: string; // opcional
  subtopicPoint?: string; // opcional
}

@Entity('dialog')
@Unique(['lessonContent', 'order'])
export class Dialog {
  @ApiProperty({ description: 'UUID of the dialog', type: String })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'Lottie animation', type: String, maxLength: 255 })
  @Column({ type: 'varchar', length: 255, name: 'lottie_animation', nullable: true })
  lottieAnimation: string;

  @ApiProperty({ description: 'Story structure', enum: StoryStructureEnum })
  @Column({
    type: 'enum',
    enum: StoryStructureEnum,
    name: 'story_structure',
    comment: '1: beginning, 2: middle, 3: end',
  })
  storyStructure: StoryStructureEnum;

  @ApiProperty({ description: 'Order of the dialog', type: Number })
  @Column({ type: 'integer', name: 'order', nullable: true })
  order: number;

  @ApiProperty({ description: 'Type structure', type: () => TypeStructure })
  @ManyToOne(() => TypeStructure, { eager: true, nullable: false })
  @JoinColumn({ name: 'type_structure_id' })
  typeStructure: TypeStructure;

  @ApiProperty({ description: 'Focused of the dialog', type: Boolean })
  @Column({ type: 'boolean', default: false })
  focused: boolean;

  @ApiProperty({ description: 'Audio of the dialog', type: String, maxLength: 255 })
  @Column({ type: 'varchar', length: 255, nullable: true })
  audio: string;

  @ApiProperty({ description: 'Content of the dialog', type: Object })
  @Column({ type: 'jsonb', name: 'content', default: '{}' })
  content: ContentJSON;

  @ManyToOne(() => Content, (content) => content.dialogs, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'lesson_content_uuid' })
  lessonContent: Content;

  @ApiProperty({ description: 'Final Lottie animation', type: String, maxLength: 255 })
  @Column({ type: 'varchar', length: 255, name: 'lottie_animation_final', nullable: true })
  lottieAnimationFinal: string;

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
