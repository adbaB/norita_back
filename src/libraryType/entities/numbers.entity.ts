import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LibraryItem } from '../../library/entities/libraryItem.entity';
import { LibraryAudio } from '../interfaces/commons/audio.interface';
import { Kunyomi } from '../interfaces/commons/kunyomi.interface';
import { Onyomi } from '../interfaces/commons/onyomi.interface';
import { StepImage } from '../interfaces/commons/stepImage.interface';
import { TraductionSpanish } from '../interfaces/commons/traductionSpanish.interface';

@Entity('library_item_numbers')
export class Numbers {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'jsonb', default: { male: '', female: '' } })
  audio: LibraryAudio;

  @Column({ type: 'jsonb', default: [] })
  kunyomi: Kunyomi[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  lottie: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ type: 'jsonb', default: [] })
  onyomi: Onyomi[];

  @Column({ type: 'varchar', length: 50, nullable: false })
  romanNumber: string;

  @Column({ type: 'jsonb', default: [] })
  stepImage: StepImage[];

  @Column({ type: 'jsonb', default: [] })
  traductionsSpanish: TraductionSpanish[];

  @Column({ type: 'varchar', length: 50, nullable: true, unique: true })
  word: string;

  @OneToOne(() => LibraryItem, (libraryItem) => libraryItem.numbers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'library_item_uuid' })
  libraryItem: LibraryItem;
}
