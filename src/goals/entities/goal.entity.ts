import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Section } from '../../lessons/entities/section.entity';

@Entity('goals')
export class Goal {
  @ApiProperty({ description: 'UUID of the goal', type: String })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'Title of the goal', type: String })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ description: 'Description of the goal', type: String })
  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ApiProperty({ description: 'Reward for completing the goal', type: Number, default: 0 })
  @Column({ type: 'int', default: 0 })
  reward: number;

  @ApiProperty({ description: 'Section associated with the goal', type: () => Section })
  @ManyToOne(() => Section, (section) => section.goals)
  @JoinColumn({ name: 'section_uuid' })
  section: Section;

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
}
