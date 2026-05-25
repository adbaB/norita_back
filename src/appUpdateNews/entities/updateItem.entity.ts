import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UpdateSection } from './updateSection.entity';

@Entity({ name: 'update_item' })
export class UpdateItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Titulo del punto' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ description: 'Mensaje del punto' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({
    description: 'Fecha estimda (esto seria para lo de proximamente)',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 100, nullable: true })
  estimatedRelease?: string;

  @ManyToOne(() => UpdateSection, (section) => section.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'section_id' })
  section: UpdateSection;
}
