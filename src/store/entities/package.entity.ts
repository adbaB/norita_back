import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
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
import { PackageTypeEnum } from '../enum/package.enum';

@Entity('products')
export class Package {
  @ApiProperty({ description: 'UUID of the package', type: String })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'Name of the package', type: String })
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  name: string;

  @ApiProperty({ description: 'Type of the package', enum: PackageTypeEnum })
  @Column({ type: 'enum', enum: PackageTypeEnum, nullable: false })
  type: PackageTypeEnum;

  @ApiProperty({ description: 'Enabled status of the package', type: Boolean })
  @Column({ type: 'boolean', default: true })
  enabled: boolean;

  @ApiProperty({ description: 'Image of the package', type: String })
  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @ApiProperty({ description: 'Description of the package', type: String })
  @Column({ type: 'text', nullable: true })
  description: string;

  @Exclude({ toPlainOnly: true })
  @ApiProperty({ description: 'Price of the package', type: Number })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @ApiProperty({ description: 'Discount percentage or amount', type: Number })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount: number;

  @ApiProperty({ description: 'Coins included in the package', type: Number })
  @Column({ name: 'coins_included', type: 'int', default: 0 })
  coinsIncluded: number;

  @ApiProperty({ description: 'Libraries unlocked by this package', type: [Library] })
  @ManyToMany(() => Library, (library) => library.packages)
  @JoinTable({
    name: 'product_libraries',
    joinColumn: { name: 'product_id', referencedColumnName: 'uuid' },
    inverseJoinColumn: { name: 'library_id', referencedColumnName: 'uuid' },
  })
  libraries: Library[];

  @Exclude({ toPlainOnly: true })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Expose({ name: 'price' })
  newPrice: number;

  @Expose({ name: 'currency' })
  currency: string;
}
