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

  @Column({ type: 'jsonb', default: { hyougai: '', jinmeiyou: '', kyuujitai: '', shinjitai: '' } })
  kind: Kind;

  @Column({ type: 'jsonb', default: [] })
  kunyomi: Kunyomi[];

  @Column({ type: 'jsonb', default: { jouyou: '', jlpt: '' } })
  level: Level;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lottie: string;

  @Column({ type: 'jsonb', default: [] })
  name: Name[];

  @Column({ type: 'jsonb', default: [] })
  notes: Note[];

  @Column({ type: 'jsonb', default: [] })
  onyomi: Onyomi[];

  @Column({ type: 'jsonb', default: [] })
  images: StepImage[];

  @Column({ type: 'jsonb', default: [] })
  traductionsSpanish: TraductionSpanish[];

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  word: string;

  @Column({ name: 'radical_element', type: 'varchar', length: 255, nullable: true })
  radicalElement: string;

  @Column({ name: 'radical_key', type: 'varchar', length: 255, nullable: true })
  radicalKey: string;

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
