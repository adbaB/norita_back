import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LibraryItem } from '../../library/entities/libraryItem.entity';
import { LibraryAudio } from '../interfaces/commons/audio.interface';
import { Category } from '../interfaces/commons/category.interface';
import { Example } from '../interfaces/commons/example.interface';
import { Note } from '../interfaces/commons/note.interface';
import { TraductionSpanish } from '../interfaces/commons/traductionSpanish.interface';

@Entity('library_item_vocabulary')
export class Vocabulary {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'jsonb', default: { male: '', female: '' } })
  audio: LibraryAudio;

  @Column({ type: 'jsonb', default: [] })
  category: Category[];

  @Column({ type: 'jsonb', default: [] })
  example: Example[];

  @Column({ type: 'varchar', length: 100, nullable: true })
  frequency: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  jltp: string;

  @Column({ type: 'jsonb', default: [] })
  note: Note[];

  @Column({ type: 'varchar', length: 100, nullable: true })
  loanHiragana?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  loanRomaji?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  searchKanji?: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  word: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  wordHiragana: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  wordRomaji: string;

  @Column({ type: 'jsonb', default: [] })
  traductionSpanish: TraductionSpanish[];

  @OneToOne(() => LibraryItem, (libraryItem) => libraryItem.vocabulary, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'library_item_uuid' })
  libraryItem: LibraryItem;
}
