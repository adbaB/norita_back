import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { LibraryItem } from '../../library/entities/libraryItem.entity';

import { LibraryAudio } from '../interfaces/commons/audio.interface';
import { ErrorItem } from '../interfaces/commons/error.interface';
import { Pronunciation } from '../interfaces/commons/pronunciation.interface';
import { StepImage } from '../interfaces/commons/stepImage.interface';

import { TraductionSpanish } from '../interfaces/commons/traductionSpanish.interface';
import { ConsonantItem } from '../interfaces/kana/consonant.interface';
import { Romaji } from '../interfaces/kana/romanji.interface';

@Entity('library_item_kana')
export class Kana {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'jsonb', default: { male: '', female: '' }, nullable: true })
  audio: LibraryAudio;

  @Column({ type: 'jsonb', default: [], nullable: true })
  consonant: ConsonantItem[];

  @Column({ type: 'jsonb', default: [], nullable: true })
  error: ErrorItem[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  lottie: string;

  @Column({ type: 'jsonb', default: [], nullable: true })
  pronunciation: Pronunciation[];

  @Column({ type: 'jsonb', default: { hepburn: '', kunreishiki: '', nihonshiki: '' } })
  romaji: Romaji;

  @Column({ type: 'jsonb', default: [], nullable: true })
  images: StepImage[];

  @Column({ name: 'final_image', type: 'varchar', length: 255, nullable: true })
  finalImage: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  word: string;

  @Column({ type: 'jsonb', default: [] })
  traductionSpanish: TraductionSpanish[];

  @OneToOne(() => LibraryItem, (libraryItem) => libraryItem.kana, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'library_item_uuid' })
  libraryItem: LibraryItem;

  steps(): number {
    return this.images?.length ?? 0;
  }
}
