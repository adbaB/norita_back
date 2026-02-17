import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ name: 'day_of_week', type: 'varchar', length: 255, nullable: true })
  dayOfWeek: number;

  @Column({ type: 'time', nullable: true })
  hour: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  timezone: string;

  @Column({ type: 'timestamp', nullable: true })
  lastSend: Date;

  @ManyToOne(() => User, (user) => user.schedules)
  @JoinColumn({ name: 'user_uuid' })
  user: User;
}
