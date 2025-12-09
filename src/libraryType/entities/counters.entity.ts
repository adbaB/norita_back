import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LibraryItem } from '../../library/entities/libraryItem.entity';
import { Category } from '../interfaces/commons/category.interface';
import { Example } from '../interfaces/commons/example.interface';
import { Note } from '../interfaces/commons/note.interface';
import { TraductionSpanish } from '../interfaces/commons/traductionSpanish.interface';
import { Word } from '../interfaces/commons/word.interface';
import { ExampleSpanish } from '../interfaces/counters/exampleSpanish.interface';
import { Number } from '../interfaces/counters/number.interface';

@Entity('library_item_counters')
export class Counters {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'jsonb', default: [] })
  category: Category[];

  @Column({ type: 'jsonb', default: [] })
  example: Example[];

  @Column({ type: 'jsonb', default: [] })
  exampleSpanish: ExampleSpanish[];

  @Column({ type: 'jsonb', default: [] })
  hiraganaNumber: Number[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  jltp: string;

  @Column({ type: 'jsonb', default: [] })
  kanjiNumber: Number[];

  @Column({ type: 'jsonb', default: [] })
  note: Note[];

  @Column({ type: 'jsonb', default: [] })
  romajiNumber: Number[];

  @Column({ type: 'jsonb', default: [] })
  romanNumber: Number[];

  @Column({ type: 'jsonb', default: [] })
  traductionSpanish: TraductionSpanish[];

  @Column({ type: 'varchar', length: 255, nullable: false })
  word: string;

  @Column({ type: 'jsonb', default: [] })
  wordHiragana: Word[];

  @Column({ type: 'jsonb', default: [] })
  wordRomaji: Word[];

  @OneToOne(() => LibraryItem, (libraryItem) => libraryItem.counters, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'library_item_uuid' })
  libraryItem: LibraryItem;
}
