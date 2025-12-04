import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { LibraryItem } from '../../library/entities/libraryItem.entity';

import { LibraryAudio } from '../interfaces/commons/audio.interface';
import { ErrorItem } from '../interfaces/commons/error.interface';
import { Pronunciation } from '../interfaces/commons/pronunciation.interface';
import { StepImage } from '../interfaces/commons/stepImage.interface';

import { ConsonantItem } from '../interfaces/kana/consonant.interface';
import { Romanji } from '../interfaces/kana/romanji.interface';

@Entity('library_item_kana')
export class Kana {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'jsonb', default: { male: '', female: '' } })
  audio: LibraryAudio;

  @Column({ type: 'jsonb', default: [] })
  consonant: ConsonantItem[];

  @Column({ type: 'jsonb', default: [] })
  error: ErrorItem[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  lottie: string;

  @Column({ type: 'jsonb', default: [] })
  pronunciation: Pronunciation[];

  @Column({ type: 'jsonb', default: { hepburn: '', kunreishiki: '', nihonshiki: '' } })
  romanji: Romanji;

  @Column({ type: 'jsonb', default: [] })
  images: StepImage[];

  @Column({ type: 'varchar', length: 250, nullable: true })
  steps: string;

  @Column({ name: 'final_image', type: 'varchar', length: 255, nullable: true })
  finalImage: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  word: string;

  @OneToOne(() => LibraryItem, (libraryItem) => libraryItem.kana)
  @JoinColumn({ name: 'library_item_uuid' })
  libraryItem: LibraryItem;
}
