import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AppUpdateNews } from './appUpdateNews.entity';
import { UpdateItem } from './updateItem.entity';

@Entity({ name: 'update_section' })
export class UpdateSection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Referente al titulo de la seccion' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({
    description:
      'Referente a como se tratara la seccion (corrección, proximamente, novedades, etc)',
  })
  @Column({ type: 'int' })
  type: number;

  @ManyToOne(() => AppUpdateNews, (news) => news.sections, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'news_id' })
  news: AppUpdateNews;

  @ApiProperty({ type: () => [UpdateItem] })
  @OneToMany(() => UpdateItem, (item) => item.section, { cascade: true, eager: true })
  items: UpdateItem[];
}
