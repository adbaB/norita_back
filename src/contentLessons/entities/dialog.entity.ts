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
import { StoryStructureEnum } from '../enums/story-structure.enum';
import { TypeStructureEnum } from '../enums/type-structure.enum';
import { Content } from './content.entity';

export class ContentJSON {
  paragraph?: string; // opcional
  image?: string; // opcional
  lottie?: string; // opcional
  gif?: string; // opcional
  nextPoint?: string; // opcional
  subtopicPoint?: string; // opcional
}

@Entity('dialog')
export class Dialog {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 255, name: 'lottie_animation', nullable: true })
  lottieAnimation: string;

  @Column({
    type: 'enum',
    enum: StoryStructureEnum,
    name: 'story_structure',
    comment: '1: beginning, 2: middle, 3: end',
  })
  storyStructure: StoryStructureEnum;

  @Column({
    type: 'enum',
    enum: TypeStructureEnum,
    name: 'type_structure',
    comment: '1: Paragraph, 2: Image , 3: Lottie , 4: Gif, 5: Next point, 6: Subtopic point',
  })
  typeStructure: TypeStructureEnum;

  @Column({ type: 'boolean', default: false })
  focused: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  audio: string;

  @Column({ type: 'jsonb', name: 'content', default: '{}' })
  content: ContentJSON;

  @ManyToOne(() => Content, (content) => content.dialogs, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'lesson_content_uuid' })
  lessonContent: Content;

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
