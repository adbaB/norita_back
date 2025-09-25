import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'UUID of the level', type: String })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'Level number', type: Number })
  @Column({ name: 'level', type: 'integer' })
  level: number;

  @ApiProperty({ description: 'Title of the level', type: String })
  @Column({ name: 'title', type: 'varchar', unique: true })
  title: string;

  @ApiProperty({ description: 'Description of the level', type: String })
  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @ApiProperty({ description: 'Order of the level', type: Number })
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
