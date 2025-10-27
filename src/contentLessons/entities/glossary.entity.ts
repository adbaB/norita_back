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
import { Content } from './content.entity';

@Entity('glossary')
export class Glossary {
  @ApiProperty({ description: 'UUID of the glossary', type: String })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'Kanji representation', type: String })
  @Column({ type: 'text' })
  kanji: string;

  @ApiProperty({ description: 'Kana representation', type: String })
  @Column({ type: 'text' })
  kana: string;

  @ApiProperty({ description: 'Romaji representation', type: String })
  @Column({ type: 'text' })
  romaji: string;

  @ApiProperty({ description: 'Description of the glossary', type: String })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ description: 'Audio of the glossary', type: String, nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 255 })
  audio: string;

  @ManyToOne(() => Content, (content) => content.glossaries, {
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
