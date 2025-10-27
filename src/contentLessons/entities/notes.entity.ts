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

@Entity('notes')
export class Notes {
  @ApiProperty({ description: 'UUID of the notes', type: String })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'Content of the notes', type: String })
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({ description: 'Audio of the notes', type: String, nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  audio: string;

  @ManyToOne(() => Content, (content) => content.notes, {
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
