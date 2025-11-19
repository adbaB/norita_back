import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IOrder } from '../../utils/interfaces/order.interface';
import { Lesson } from './lesson.entity';

@Entity('sections')
export class Section implements IOrder {
  @ApiProperty({ description: 'UUID of the section', type: String })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'Name of the section', type: String, maxLength: 255 })
  @Column({ name: 'name', type: 'varchar', length: 255, unique: true })
  name: string;

  @ApiProperty({ description: 'Order of the section', type: Number })
  @Column({ name: 'order', type: 'integer' })
  order: number;

  @ApiProperty({ description: 'Lessons in the section', type: () => [Lesson] })
  @OneToMany(() => Lesson, (lesson) => lesson.section)
  lessons: Lesson[];

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
