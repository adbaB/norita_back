import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LibraryItem } from '../../library/entities/libraryItem.entity';
import { LibraryAudio } from '../interfaces/commons/audio.interface';
import { Example } from '../interfaces/commons/example.interface';
import { Note } from '../interfaces/commons/note.interface';
import { TraductionSpanish } from '../interfaces/commons/traductionSpanish.interface';
import { Word } from '../interfaces/commons/word.interface';
import { WordKatakana } from '../interfaces/commons/wordKatakana.interface';
import { WordRomaji } from '../interfaces/commons/wordRomaji.interface';

@Entity('library_item_onomatopoeia')
export class Onomatopoeia {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'jsonb', default: { male: '', female: '' } })
  audio: LibraryAudio;

  @Column({ type: 'jsonb', default: [] })
  example: Example[];

  @Column({ type: 'varchar', length: 50, nullable: true })
  frequency: string;

  @Column({ type: 'jsonb', default: [] })
  note: Note[];

  @Column({ type: 'varchar', length: 50, nullable: true })
  onomatopoeiaType: string;

  @Column({ type: 'jsonb', default: [] })
  traductionSpanish: TraductionSpanish[];

  @Column({ type: 'jsonb', default: [] })
  word: Word[];

  @Column({ type: 'jsonb', default: [] })
  wordKatakana: WordKatakana[];

  @Column({ type: 'jsonb', default: [] })
  wordRomaji: WordRomaji[];

  @OneToOne(() => LibraryItem, (libraryItem) => libraryItem.onomatopoeia)
  @JoinColumn({ name: 'library_item_uuid' })
  libraryItem: LibraryItem;
}
