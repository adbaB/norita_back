import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Adjectives } from '../../libraryType/entities/adjectives.entity';
import { Counters } from '../../libraryType/entities/counters.entity';
import { Kana } from '../../libraryType/entities/kana.entity';
import { Kanji } from '../../libraryType/entities/kanji.entity';
import { Numbers } from '../../libraryType/entities/numbers.entity';
import { Onomatopoeia } from '../../libraryType/entities/onomatopoeia.entity';
import { Radicals } from '../../libraryType/entities/radicals.entity';
import { IOrder } from '../../utils/interfaces/order.interface';
import { LibraryItemTypeEnum } from '../enums/library.enum';
import { WordType } from '../interfaces/wordType.interface';
import { LibrarySection } from './librarySection.entity';

@Entity('library_item')
export class LibraryItem implements IOrder {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'enum', enum: LibraryItemTypeEnum, nullable: false })
  type: LibraryItemTypeEnum;

  @Column({ type: 'varchar', length: 255, nullable: false })
  package: string;

  @Column({ type: 'jsonb', default: [] })
  wordType: WordType[];

  @Column({ type: 'int', nullable: false })
  order: number;

  @ManyToOne(() => LibrarySection, (section) => section.items)
  @JoinColumn({ name: 'library_section_uuid' })
  section: LibrarySection;

  // aditional information
  @OneToOne(() => Kana, (kana) => kana.libraryItem, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  kana?: Kana;

  @OneToOne(() => Kanji, (kanji) => kanji.libraryItem, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  kanji?: Kanji;

  @OneToOne(() => Numbers, (numbers) => numbers.libraryItem, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  numbers?: Numbers;

  @OneToOne(() => Counters, (counters) => counters.libraryItem, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  counters?: Counters;

  @OneToOne(() => Adjectives, (adjectives) => adjectives.libraryItem, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  adjectives?: Adjectives;

  @OneToOne(() => Onomatopoeia, (onomatopoeia) => onomatopoeia.libraryItem, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  onomatopoeia?: Onomatopoeia;

  @OneToOne(() => Radicals, (radicals) => radicals.libraryItem, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  radicals?: Radicals;

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
