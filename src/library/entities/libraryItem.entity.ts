import { Exclude, Expose } from 'class-transformer';
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
import { IOrder } from '../../utils/interfaces/order.interface';
import { LibraryAudio } from '../interfaces/audio.interface';
import { ErrorItem } from '../interfaces/error.interface';
import { Pronunciation } from '../interfaces/pronunciation.interface';
import { Romanji } from '../interfaces/romanji.interface';
import { StepImage } from '../interfaces/stepImage.interface';
import { WordType } from '../interfaces/wordType.interface';
import { LibrarySection } from './librarySection.entity';

@Entity('library_item')
export class LibraryItem implements IOrder {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'jsonb', default: { male: '', female: '' } })
  audio: LibraryAudio;

  @Column({ type: 'jsonb', default: [] })
  error: ErrorItem[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  lottie: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  package: string;

  @Column({ type: 'jsonb', default: [] })
  pronunciation: Pronunciation[];

  @Column({ type: 'jsonb', default: { hepburn: '', kunreishiki: '', nihonshiki: '' } })
  romanji: Romanji;

  @Column({ type: 'jsonb', default: [] })
  images: StepImage[];

  @Column({ name: 'final_image', type: 'varchar', length: 255, nullable: true })
  finalImage: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  word: string;

  @Column({ type: 'jsonb', default: [] })
  wordType: WordType[];

  @Column({ type: 'int', nullable: false })
  order: number;

  @ManyToOne(() => LibrarySection, (section) => section.items)
  @JoinColumn({ name: 'library_section_uuid' })
  section: LibrarySection;

  @Expose({ name: 'steps' })
  steps(): number {
    return this.images.length;
  }

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
