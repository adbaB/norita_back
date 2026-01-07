import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('countries')
export class Countries {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  country: string;

  @Column({
    name: 'country_iso_code',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  countryIsoCode: string;

  @Column({
    name: 'currency_iso_code',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: false,
  })
  currencyIsoCode: string;

  @Column({
    name: 'currency_name',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: false,
  })
  currencyName: string;

  @Column({
    name: 'symbol',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: false,
  })
  symbol: string;

  @Column('decimal', { precision: 10, scale: 4 })
  rate: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
