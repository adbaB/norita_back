import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UpdateSection } from './updateSection.entity';

@Entity({ name: 'app_update_news' })
export class AppUpdateNews {
  @ApiProperty({ description: 'Referente al identificador unico de la actualización' })
  @PrimaryColumn({ type: 'varchar', length: 100 })
  id: string;

  @ApiProperty({ description: 'Referente a la version' })
  @Column({ type: 'varchar', length: 50 })
  versionName: string;

  @ApiProperty({ description: 'Referente a la fecha de la actualización' })
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  publishedAt: Date;

  @ApiProperty({ description: 'Referente al titulo de actualización' })
  @Column({ type: 'varchar', length: 255 })
  friendlyTitle: string;

  @ApiProperty({ description: 'Referente al mensaje de actualización' })
  @Column({ type: 'text' })
  introMessage: string;

  @ApiProperty({ description: 'Referente al mensaje final de la actualizacion', nullable: true })
  @Column({ type: 'text', nullable: true })
  closingMessage?: string;

  @ApiProperty({
    description: 'Indica si la novedad está activa y visible para los clientes',
    default: false,
  })
  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @ApiProperty({
    type: () => [UpdateSection],
    description: 'Referente a las secciones de la actualización',
  })
  @OneToMany(() => UpdateSection, (section) => section.news, { cascade: true, eager: true })
  sections: UpdateSection[];
}
