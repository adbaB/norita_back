import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Library } from '../../library/entities/library.entity';
import { User } from '../../users/entities/user.entity';
import { TypeUnlockEnum } from '../enums/typeUnlock.enum';

@Entity('library_user')
@Unique(['library', 'user'])
export class LibraryUser {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'enum', enum: TypeUnlockEnum, nullable: false })
  typeUnlock: TypeUnlockEnum;

  @Column({
    name: 'unlocked_at',
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  unlockedAt: Date;

  @ManyToOne(() => Library, (library) => library.user)
  @JoinColumn({ name: 'library_uuid' })
  library: Library;

  @ManyToOne(() => User, (user) => user.libraries)
  @JoinColumn({ name: 'user_uuid' })
  user: User;
}
