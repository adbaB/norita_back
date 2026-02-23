import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DiaryAikoSection } from './diaryAikoSection.entity';

@Entity('diary_aiko_items')
export class DiaryAikoItem {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => DiaryAikoSection, (section) => section.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'section_uuid' })
  section: DiaryAikoSection;

  @Column({ name: 'name_romaji', type: 'varchar', length: 255 })
  nameRomaji: string;

  @Column({ name: 'name_kanji', type: 'varchar', length: 255, nullable: true })
  nameKanji?: string;

  @Column({ type: 'varchar', nullable: true })
  imageLocked?: string;

  @Column({ type: 'varchar', nullable: true })
  imageBiography?: string;

  @Column({ type: 'varchar', nullable: true })
  imageUnlocked?: string;

  @Column({ type: 'jsonb', nullable: true })
  attributes?: Record<string, unknown>;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ name: 'lesson_uuid', type: 'uuid', nullable: true })
  lessonUuid?: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
