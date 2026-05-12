import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LibraryItem } from '../../library/entities/libraryItem.entity';
import { LibraryAudio } from '../interfaces/commons/audio.interface';

@Entity('library_item_simple_numbers')
export class SimpleNumbers {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  roman: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  kanji: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  hiragana: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  romaji: string;

  @Column({ type: 'jsonb', default: {}, nullable: true })
  audio: LibraryAudio;

  @OneToOne(() => LibraryItem, (libraryItem) => libraryItem.simpleNumbers)
  @JoinColumn({ name: 'library_item_uuid' })
  libraryItem: LibraryItem;
}
