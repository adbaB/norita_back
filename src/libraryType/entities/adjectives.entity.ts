import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LibraryItem } from '../../library/entities/libraryItem.entity';
import { AdjectiveBase } from '../interfaces/adjectives/adjective.interface';
import { Conditionals } from '../interfaces/adjectives/conditionals.interface';
import { Conjugations } from '../interfaces/adjectives/conjugations.interface';
import { Termination } from '../interfaces/adjectives/termination.interface';
import { LibraryAudio } from '../interfaces/commons/audio.interface';
import { Example } from '../interfaces/commons/example.interface';
import { Note } from '../interfaces/commons/note.interface';
import { TraductionSpanish } from '../interfaces/commons/traductionSpanish.interface';

@Entity('library_item_adjectives')
export class Adjectives {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'jsonb', nullable: true })
  adjective: AdjectiveBase;

  @Column({ type: 'varchar', length: 255, nullable: true })
  adjectiveType: string;

  @Column({ type: 'jsonb', default: { male: '', female: '' } })
  audio: LibraryAudio;

  @Column({ type: 'jsonb', default: {} })
  conditionals: Conditionals;

  @Column({ type: 'jsonb', default: {} })
  conjugations: Conjugations;

  @Column({ type: 'jsonb', default: [] })
  example: Example[];

  @Column({ type: 'varchar', length: 50, nullable: true })
  jltp: string;

  @Column({ type: 'jsonb', default: [] })
  note: Note[];

  @Column({ type: 'jsonb', default: {} })
  termination: Termination;

  @Column({ type: 'jsonb', default: [] })
  traductionSpanish: TraductionSpanish[];

  @OneToOne(() => LibraryItem, (libraryItem) => libraryItem.adjectives)
  @JoinColumn({ name: 'library_item_uuid' })
  libraryItem: LibraryItem;
}
