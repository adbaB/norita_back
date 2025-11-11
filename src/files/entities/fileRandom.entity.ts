import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { TypeFileEnum } from '../enums/type-file.enum';

@Entity('file_random')
export class FileRandom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  file: string;

  @Index()
  @Column({ type: 'enum', enum: TypeFileEnum })
  type: TypeFileEnum;
}
