import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'transaction' })
export class Transaction {
  @ApiProperty({ description: 'ID of the transaction', type: String })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'UUID of the user who made the transaction', type: String })
  @Column({ name: 'user_uuid', type: 'uuid' })
  userUuid: string;

  @ApiProperty({
    description: 'Entitlement IDs that were received from RevenueCat',
    type: [String],
  })
  @Column({ name: 'entitlement_ids', type: 'simple-array' })
  entitlementIds: string[];

  @ApiProperty({
    description: 'Transaction ID from RevenueCat/Store',
    type: String,
    required: false,
  })
  @Column({ name: 'transaction_id', type: 'varchar', length: 255, nullable: true })
  transactionId: string | null;

  @ApiProperty({
    description: 'Event type from RevenueCat (e.g., INITIAL_PURCHASE, RENEWAL)',
    type: String,
  })
  @Column({ name: 'event_type', type: 'varchar', length: 255 })
  eventType: string;

  @ApiProperty({
    description: 'Environment (e.g., Sandbox, Production)',
    type: String,
    required: false,
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  environment: string | null;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
