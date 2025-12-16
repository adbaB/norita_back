import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LibraryItem } from '../../library/entities/libraryItem.entity';
import { LibraryAudio } from '../interfaces/commons/audio.interface';
import { Example } from '../interfaces/commons/example.interface';
import { Note } from '../interfaces/commons/note.interface';
import { TraductionSpanish } from '../interfaces/commons/traductionSpanish.interface';

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

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  word: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  wordKatakana: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  wordRomaji: string;

  @OneToOne(() => LibraryItem, (libraryItem) => libraryItem.onomatopoeia, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'library_item_uuid' })
  libraryItem: LibraryItem;
}
