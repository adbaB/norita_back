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
  @OneToOne(() => Kana, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
    eager: true,
  })
  kana?: Kana;

  @OneToOne(() => Kanji, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
    eager: true,
  })
  kanji?: Kanji;

  @OneToOne(() => Numbers, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
    eager: true,
  })
  numbers?: Numbers;

  @OneToOne(() => Counters, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
    eager: true,
  })
  counters?: Counters;

  @OneToOne(() => Adjectives, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
    eager: true,
  })
  adjectives?: Adjectives;

  @OneToOne(() => Onomatopoeia, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
    eager: true,
  })
  onomatopoeia?: Onomatopoeia;

  @OneToOne(() => Radicals, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
    eager: true,
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
