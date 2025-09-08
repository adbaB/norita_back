import { Exclude } from 'class-transformer';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEnum } from '../enum/role.enum';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ unique: true, type: 'varchar', length: 255 })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, default: null, nullable: true })
  image: string;

  @Column({ name: 'sign_in_google', type: 'boolean', default: false })
  signInGoogle: boolean;

  @Column({ type: 'integer', default: 0 })
  coin: number;

  @Column({ name: 'is_premiun', type: 'boolean', default: false })
  isPremiun: boolean;

  @Column({ name: 'first_tutorial', type: 'boolean', default: false })
  firstTutorial: boolean;

  @Column({ name: 'second_tutorial', type: 'boolean', default: false })
  secondTutorial: boolean;

  @Column({ name: 'first_lesson', type: 'boolean', default: false })
  firstLesson: boolean;

  @Column({ name: 'second_lesson', type: 'boolean', default: false })
  secondLesson: boolean;

  @Column({ name: 'device_jwt', type: 'varchar', length: 255, default: '' })
  deviceJWT: string;

  level: string;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.USER })
  role: RoleEnum;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

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
