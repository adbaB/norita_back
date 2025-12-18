import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IOrder } from '../../utils/interfaces/order.interface';
import { Library } from './library.entity';
import { LibraryItem } from './libraryItem.entity';

@Entity('library_section')
export class LibrarySection implements IOrder {
  @ApiProperty({ description: 'UUID of the library section', type: String })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'Title romanji of the library section', type: String })
  @Column({ name: 'title_romaji', type: 'varchar', length: 255, nullable: false })
  titleRomanji: string;

  @ApiProperty({ description: 'Title kanji of the library section', type: String })
  @Column({ name: 'title_kanji', type: 'varchar', length: 255, nullable: false })
  titleKanji: string;

  @ApiProperty({ description: 'Coins needed to access the library section', type: Number })
  @Column({ name: 'coins_needed', type: 'int', default: 0 })
  coinsNeeded: number;

  @ApiProperty({ description: 'Order of the library section', type: Number })
  @Column({ type: 'int', nullable: false })
  order: number;

  @Exclude({ toPlainOnly: true })
  @ManyToOne(() => Library, (library) => library.sections)
  @JoinColumn({ name: 'library_uuid' })
  library: Library;

  @ApiProperty({ description: 'Items in the library section', type: [LibraryItem] })
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
