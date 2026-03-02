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
import { ProductType } from '../enums/product-type.enum';
import { Library } from '../../library/entities/library.entity';

@Entity({ name: 'entitlement' })
export class Entitlement {
  @ApiProperty({ description: 'UUID of the entitlement (internal)', type: String })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'RevenueCat entitlement identifier', type: String })
  @Column({ name: 'entitlement_id', type: 'varchar', length: 255, unique: true })
  entitlementId: string;

  @ApiProperty({ description: 'Type of reward given by this entitlement', enum: ProductType })
  @Column({ type: 'enum', enum: ProductType })
  type: ProductType;

  @ApiProperty({ description: 'Grants premium to the user', type: Boolean })
  @Column({ name: 'grants_premiun', type: 'boolean', default: false })
  grantsPremium: boolean;

  @ApiProperty({ description: 'Grants remove ads to the user', type: Boolean })
  @Column({ name: 'grants_remove_ads', type: 'boolean', default: false })
  grantsRemoveAds: boolean;

  @ApiProperty({ description: 'Coins to grant to the user', type: Number })
  @Column({ name: 'coins_to_grant', type: 'integer', default: 0 })
  coinsToGrant: number;

  @ApiProperty({ description: 'UUID of the library to grant to the user', type: String })
  @ManyToMany(() => Library, { cascade: true, nullable: true })
  @JoinTable({
    name: 'entitlement_library',
    joinColumn: { name: 'entitlement_uuid' },
    inverseJoinColumn: { name: 'library_uuid' },
  })
  grantsLibrary: Library[];

  @ApiProperty({ description: 'Is the entitlement active?', type: Boolean })
  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
