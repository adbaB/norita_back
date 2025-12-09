import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LibraryItem } from '../../library/entities/libraryItem.entity';
import { TraductionSpanish } from '../interfaces/commons/traductionSpanish.interface';
import { Word } from '../interfaces/commons/word.interface';
import { WordHiragana } from '../interfaces/commons/wordHiragana.interface';
import { WordRomaji } from '../interfaces/commons/wordRomaji.interface'; // Actually WordRomaji was created
import { Position } from '../interfaces/radicals/position.interface';
import { Variant } from '../interfaces/radicals/variant.interface';

@Entity('library_item_radicals')
export class Radicals {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lottie: string; // Assuming file path or url

  @Column({ type: 'varchar', length: 255, nullable: true })
  note: string; // Wait, DataRadical says note: String? (not Array of Notes), verify? Step 39: var note: String?

  @Column({ type: 'jsonb', default: [] })
  position: Position[];

  @Column({ type: 'int', nullable: false }) // steps_integer in Swift
  stepsInteger: number;

  @Column({ type: 'jsonb', default: [] })
  traductionSpanish: TraductionSpanish[];

  @Column({ type: 'jsonb', default: [] })
  variants: Variant[];

  @Column({ type: 'jsonb', default: [] })
  word: Word[];

  @Column({ type: 'jsonb', default: [] })
  wordHiragana: WordHiragana[];

  @Column({ type: 'jsonb', default: [] })
  wordRomaji: WordRomaji[];

  @OneToOne(() => LibraryItem, (libraryItem) => libraryItem.radicals)
  @JoinColumn({ name: 'library_item_uuid' })
  libraryItem: LibraryItem;
}
