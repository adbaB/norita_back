import { Exclude } from 'class-transformer';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('level')
export class Level {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ name: 'level', type: 'integer' })
  level: number;

  @Column({ name: 'title', type: 'varchar', unique: true })
  title: string;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @Column({ type: 'integer', unique: true })
  order: number;

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
