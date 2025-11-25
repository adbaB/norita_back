import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { IOrder } from '../../utils/interfaces/order.interface';
import { Library } from './library.entity';
import { LibraryItem } from './libraryItem.entity';

@Entity('library_section')
export class LibrarySection implements IOrder {
  @Column({ type: 'uuid', primary: true })
  uuid: string;

  @Column({ name: 'title_romaji', type: 'varchar', length: 255, nullable: false })
  titleRomanji: string;

  @Column({ name: 'title_kanji', type: 'varchar', length: 255, nullable: false })
  titleKanji: string;

  @Column({ name: 'coins_needed', type: 'int', default: 0 })
  coinsNeeded: number;

  @Column({ type: 'int', nullable: false })
  order: number;

  @ManyToOne(() => Library, (library) => library.sections)
  @JoinColumn({ name: 'library_uuid' })
  library: Library;

  @OneToMany(() => LibraryItem, (item) => item.section, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  items: LibraryItem[];

  @Exclude({ toPlainOnly: true })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
  })
  deletedAt?: Date;
}
