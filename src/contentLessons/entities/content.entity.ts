import { Exclude } from 'class-transformer';
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
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  content: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Dialog, (dialog) => dialog.lessonContent)
  dialogs: Dialog[];

  @OneToMany(() => Notes, (notes) => notes.lessonContent)
  notes: Notes[];

  @OneToMany(() => Glossary, (glossary) => glossary.lessonContent)
  glossaries: Glossary[];

  @OneToMany(() => Bibliography, (bibliography) => bibliography.lessonContent)
  bibliographies: Bibliography[];

  //pending exercise entity
  exercises: unknown[];

  @OneToOne(() => Lesson, (lesson) => lesson.lessonContent)
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
}
