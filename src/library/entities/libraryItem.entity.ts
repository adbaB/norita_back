import { Exclude, Expose } from 'class-transformer';
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
import { Vocabulary } from '../../libraryType/entities/vocabulary.entity';
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

  @Column({ type: 'boolean', default: true })
  enabled: boolean;

  @ManyToOne(() => LibrarySection, (section) => section.items)
  @JoinColumn({ name: 'library_section_uuid' })
  section: LibrarySection;

  // aditional information

  @Exclude({ toPlainOnly: true })
  @OneToOne(() => Kana, (kana) => kana.libraryItem, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  kana?: Kana;

  @Exclude({ toPlainOnly: true })
  @OneToOne(() => Kanji, (kanji) => kanji.libraryItem, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  kanji?: Kanji;

  @Exclude({ toPlainOnly: true })
  @OneToOne(() => Numbers, (numbers) => numbers.libraryItem, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  numbers?: Numbers;

  @Exclude({ toPlainOnly: true })
  @OneToOne(() => Counters, (counters) => counters.libraryItem, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  counters?: Counters;

  @Exclude({ toPlainOnly: true })
  @OneToOne(() => Adjectives, (adjectives) => adjectives.libraryItem, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  adjectives?: Adjectives;

  @Exclude({ toPlainOnly: true })
  @OneToOne(() => Onomatopoeia, (onomatopoeia) => onomatopoeia.libraryItem, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  onomatopoeia?: Onomatopoeia;

  @Exclude({ toPlainOnly: true })
  @OneToOne(() => Radicals, (radicals) => radicals.libraryItem, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  radicals?: Radicals;

  @Exclude({ toPlainOnly: true })
  @OneToOne(() => Vocabulary, (vocabulary) => vocabulary.libraryItem, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  vocabulary?: Vocabulary;

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

  @Expose({ toPlainOnly: true, name: 'info' })
  info(): Adjectives | Counters | Kana | Kanji | Numbers | Onomatopoeia | Radicals | Vocabulary {
    if (this.type === LibraryItemTypeEnum.KANA) return this.kana;
    if (this.type === LibraryItemTypeEnum.KANJI) return this.kanji;
    if (this.type === LibraryItemTypeEnum.NUMBER || this.type === LibraryItemTypeEnum.NUMBERS)
      return this.numbers;
    if (this.type === LibraryItemTypeEnum.COUNTER) return this.counters;
    if (this.type === LibraryItemTypeEnum.ADJECTIVE) return this.adjectives;
    if (this.type === LibraryItemTypeEnum.ONOMATOPOEIA) return this.onomatopoeia;
    if (this.type === LibraryItemTypeEnum.RADICAL) return this.radicals;
    if (this.type === LibraryItemTypeEnum.VOCABULARY) return this.vocabulary;
  }
}
