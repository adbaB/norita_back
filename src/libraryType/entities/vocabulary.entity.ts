import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LibraryItem } from '../../library/entities/libraryItem.entity';
import { WordType } from '../../library/interfaces/wordType.interface';
import { LibraryAudio } from '../interfaces/commons/audio.interface';
import { Category } from '../interfaces/commons/category.interface';
import { Example } from '../interfaces/commons/example.interface';
import { Note } from '../interfaces/commons/note.interface';
import { StructureWord } from '../interfaces/commons/structureWord.interface';
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

  @Column({ type: 'jsonb', default: {} })
  structureWord: StructureWord;

  @Column({ type: 'jsonb', default: [] })
  traductionSpanish: TraductionSpanish[];

  @OneToOne(() => LibraryItem, (libraryItem) => libraryItem.vocabulary)
  @JoinColumn({ name: 'library_item_uuid' })
  libraryItem: LibraryItem;
}
