import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IOrder } from '../../utils/interfaces/order.interface';
import { WordType } from '../interfaces/wordType.interface';
import { LibrarySection } from './librarySection.entity';

@Entity('library_item')
export class LibraryItem implements IOrder {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  package: string;

  @Column({ type: 'jsonb', default: [] })
  wordType: WordType[];

  @Column({ type: 'int', nullable: false })
  order: number;

  @ManyToOne(() => LibrarySection, (section) => section.items)
  @JoinColumn({ name: 'library_section_uuid' })
  section: LibrarySection;

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
