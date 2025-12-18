import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { LibrarySection } from '../../library/entities/librarySection.entity';
import { User } from '../../users/entities/user.entity';
import { TypeUnlockEnum } from '../enums/typeUnlock.enum';

@Entity('library_section_user')
@Unique(['section', 'user'])
export class LibrarySectionUser {
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

  @ManyToOne(() => LibrarySection, (library) => library.sectionUser)
  @JoinColumn({ name: 'library_section_uuid' })
  section: LibrarySection;

  @ManyToOne(() => User, (user) => user.sections)
  @JoinColumn({ name: 'user_uuid' })
  user: User;
}
