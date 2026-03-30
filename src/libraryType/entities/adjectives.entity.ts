import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LibraryItem } from '../../library/entities/libraryItem.entity';
import { Conditionals } from '../interfaces/adjectives/conditionals.interface';
import { Conjugations } from '../interfaces/adjectives/conjugations.interface';
import { Termination } from '../interfaces/adjectives/termination.interface';
import { LibraryAudio } from '../interfaces/commons/audio.interface';
import { Example } from '../interfaces/commons/example.interface';
import { Note } from '../interfaces/commons/note.interface';
import { TraductionSpanish } from '../interfaces/commons/traductionSpanish.interface';
import { SearchKanji } from '../interfaces/adjectives/searchKanji.interface';

@Entity('library_item_adjectives')
export class Adjectives {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  adjectiveType: string;

  @Column({ type: 'jsonb', default: { male: '', female: '' }, nullable: true })
  audio: LibraryAudio | null;

  @Column({ type: 'jsonb', default: {} })
  conditionals: Conditionals;

  @Column({ type: 'jsonb', default: {} })
  conjugations: Conjugations;

  @Column({ type: 'jsonb', default: [], nullable: true })
  example: Example[] | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  jltp: string;

  @Column({ type: 'jsonb', default: [], nullable: true })
  note: Note[] | null;

  @Column({ type: 'jsonb', default: {} })
  termination: Termination;

  @Column({ type: 'jsonb', default: [] })
  traductionSpanish: TraductionSpanish[];

  @Column({ type: 'varchar', length: 255, nullable: false })
  baseHiragana: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  baseKanji?: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  baseRomaji: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  word: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  wordHiragana: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  wordRomaji: string;

  @Column({ type: 'jsonb', default: [], nullable: true })
  searchKanji: SearchKanji[] | null;

  @OneToOne(() => LibraryItem, (libraryItem) => libraryItem.adjectives, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'library_item_uuid' })
  libraryItem: LibraryItem;
}
