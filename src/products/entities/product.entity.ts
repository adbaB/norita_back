import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Library } from '../../library/entities/library.entity';

@Entity('products')
export class Product {
  @ApiProperty({ description: 'UUID of the product', type: String })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'Name of the product', type: String })
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  name: string;

  @ApiProperty({ description: 'Description of the product', type: String })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'Price of the product', type: Number })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @ApiProperty({ description: 'Discount percentage or amount', type: Number })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount: number;

  @ApiProperty({ description: 'Amount of currency provided', type: Number })
  @Column({ name: 'currency_amount', type: 'int', default: 0 })
  currencyAmount: number;

  @ApiProperty({ description: 'Libraries unlocked by this product', type: [Library] })
  @ManyToMany(() => Library, (library) => library.products)
  @JoinTable({
    name: 'product_libraries', // join table name
    joinColumn: { name: 'product_id', referencedColumnName: 'uuid' },
    inverseJoinColumn: { name: 'library_id', referencedColumnName: 'uuid' },
  })
  libraries: Library[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
