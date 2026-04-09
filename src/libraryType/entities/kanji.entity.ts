import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LibraryItem } from '../../library/entities/libraryItem.entity';
import { Kunyomi } from '../interfaces/commons/kunyomi.interface';
import { Name } from '../interfaces/commons/name.interface';
import { Note } from '../interfaces/commons/note.interface';
import { Onyomi } from '../interfaces/commons/onyomi.interface';
import { StepImage } from '../interfaces/commons/stepImage.interface';
import { TraductionSpanish } from '../interfaces/commons/traductionSpanish.interface';
import { Kind } from '../interfaces/kanji/kind.interface';
import { Level } from '../interfaces/kanji/level.interface';

@Entity('library_item_kanji')
export class Kanji {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    type: 'jsonb',
    default: { hyougai: '', jinmeiyou: '', kyuujitai: '', shinjitai: '' },
    nullable: true,
  })
  kind: Kind | null;

  @Column({ type: 'jsonb', default: [], nullable: true })
  kunyomi: Kunyomi[] | null;

  @Column({ type: 'jsonb', default: { jouyou: '', jlpt: '' } })
  level: Level;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lottie: string | null;

  @Column({ type: 'jsonb', default: [], nullable: true })
  name: Name[] | null;

  @Column({ type: 'jsonb', default: [], nullable: true })
  notes: Note[] | null;

  @Column({ type: 'jsonb', default: [], nullable: true })
  onyomi: Onyomi[] | null;

  @Column({ type: 'jsonb', default: [], nullable: true })
  images: StepImage[] | null;

  @Column({ type: 'jsonb', default: [] })
  traductionSpanish: TraductionSpanish[];

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  word: string;

  @Column({ name: 'radical_element', type: 'varchar', length: 255, nullable: true })
  radicalElement: string;

  @Column({ name: 'radical_key', type: 'varchar', length: 255, nullable: true })
  radicalKey: string;

  @Column({ type: 'integer', nullable: false })
  strokes: number;

  @OneToOne(() => LibraryItem, (library) => library.kanji, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'library_item_uuid' })
  libraryItem: LibraryItem;

  steps(): number {
    return this.images.length;
  }
}
