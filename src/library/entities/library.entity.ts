import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IOrder } from '../../utils/interfaces/order.interface';
import { LibraryTypeEnum } from '../enums/library.enum';
import { LibrarySection } from './librarySection.entity';

@Entity('Library')
export class Library implements IOrder {
  @ApiProperty({ description: 'UUID of the library', type: String })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({
    description: 'Icon URL for the library',
    type: String,
    maxLength: 255,
    required: false,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  icon: string;

  @ApiProperty({
    description: 'Coins needed to unlock the library item',
    type: Number,
  })
  @Column({ name: 'coins_needed', type: 'int', default: 0 })
  coinsNeeded: number;

  @ApiProperty({
    description: 'Title of the library',
    type: String,
    maxLength: 255,
  })
  @Column({ name: 'title_romaji', type: 'varchar', length: 255, nullable: false })
  titleRomanji: string;

  @ApiProperty({
    description: 'Title of the library',
    type: String,
    maxLength: 255,
  })
  @Column({ name: 'title_kanji', type: 'varchar', length: 255, nullable: false })
  titleKanji: string;

  @ApiProperty({
    description: 'Description of the library',
    type: String,
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    description: 'Warning of the library',
    type: String,
    nullable: true,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  warning: string;

  @ApiProperty({
    description: 'Order of the library',
    type: Number,
  })
  @Column({ type: 'int', nullable: false })
  order: number;

  @ApiProperty({
    description: 'Type of the library',
    enum: LibraryTypeEnum,
  })
  @Column({ type: 'enum', enum: LibraryTypeEnum, nullable: false })
  @Index('idx_library_type')
  type: LibraryTypeEnum;

  @ApiProperty({ description: 'Sections of the library', type: [LibrarySection] })
  @OneToMany(() => LibrarySection, (section) => section.library, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sections: LibrarySection[];

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
