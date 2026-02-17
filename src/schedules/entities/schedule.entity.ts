import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ScheduleTypeEnum } from '../enums/schedule-type.enum';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'enum', enum: ScheduleTypeEnum, default: ScheduleTypeEnum.SCHEDULED })
  type: ScheduleTypeEnum;

  @Column({ name: 'day_of_week', type: 'integer', nullable: true })
  dayOfWeek: number;

  @Column({ type: 'time', nullable: true })
  hour: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  timezone: string;

  @Column({ name: 'scheduled_for', type: 'timestamptz', nullable: true })
  scheduledFor: Date;

  @Column({ name: 'last_send', type: 'timestamptz', nullable: true })
  lastSend: Date;

  @ManyToOne(() => User, (user) => user.schedules, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_uuid' })
  user: User;
}
