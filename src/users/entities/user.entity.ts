import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LessonProgress } from '../../lessonProgress/entity/lessonProgress.entity';
import { LibrarySectionUser } from '../../libraryUser/entities/librarySectionUser.entity';
import { LibraryUser } from '../../libraryUser/entities/libraryUser.entity';
import { Comments } from '../../userComments/entities/comments.entity';
import { UserLikes } from '../../userComments/entities/userLikes.entity';
import { RoleEnum } from '../enum/role.enum';
import { Level } from './level.entity';

@Entity({ name: 'user' })
export class User {
  @ApiProperty({ description: 'id of the user', type: String })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'name of the user', type: String })
  @Column({ unique: true, type: 'varchar', length: 255 })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @ApiProperty({ description: 'image of the user', type: String })
  @Column({ type: 'varchar', length: 255, default: null, nullable: true })
  image: string;

  @ApiProperty({ description: 'is sign in google', type: Boolean })
  @Column({ name: 'sign_in_google', type: 'boolean', default: false })
  signInGoogle: boolean;

  @ApiProperty({ description: 'is guest of the user', type: Boolean })
  @Column({ name: 'is_guest', type: 'boolean', default: false })
  isGuest: boolean;

  @ApiProperty({ description: 'username of the user', type: String })
  @Column({ type: 'varchar', length: 255, default: null, nullable: true })
  username: string;

  @ApiProperty({ description: 'coin of the user', type: Number })
  @Column({ type: 'integer', default: 0 })
  coin: number;

  @ApiProperty({ description: 'is premium of the user', type: Boolean })
  @Column({ name: 'is_premium', type: 'boolean', default: false })
  isPremium: boolean;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'subscription_expires_at', type: 'timestamp', nullable: true })
  subscriptionExpiresAt: Date;

  @ApiProperty({ description: 'first tutorial of the user', type: Boolean })
  @Column({ name: 'first_tutorial', type: 'boolean', default: false })
  firstTutorial: boolean;

  @ApiProperty({ description: 'second tutorial of the user', type: Boolean })
  @Column({ name: 'second_tutorial', type: 'boolean', default: false })
  secondTutorial: boolean;

  @ApiProperty({ description: 'first lesson of the user', type: Boolean })
  @Column({ name: 'first_rewards', type: 'boolean', default: false })
  firstRewards: boolean;

  @ApiProperty({ description: 'second lesson of the user', type: Boolean })
  @Column({ name: 'second_rewards', type: 'boolean', default: false })
  secondRewards: boolean;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'device_jwt', type: 'varchar', length: 255, default: '' })
  deviceJWT: string;

  @ManyToOne(() => Level, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'level_uuid', referencedColumnName: 'uuid' })
  level: Level;

  @ApiProperty({ description: 'role of the user', type: String })
  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.USER })
  role: RoleEnum;

  @ApiProperty({ description: 'is active of the user', type: Boolean })
  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @ApiProperty({ description: 'show ads of the user', type: Boolean })
  @Column({ name: 'show_ads', type: 'boolean', default: true })
  showAds: boolean;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'ads_free_expiration', type: 'timestamptz', nullable: true })
  adsFreeExpiration: Date;

  @OneToMany(() => LessonProgress, (lessonProgress) => lessonProgress.user)
  lessonProgress: LessonProgress[];

  @OneToMany(() => LibraryUser, (libraryUser) => libraryUser.user)
  libraries: LibraryUser[];

  @OneToMany(() => LibrarySectionUser, (librarySection) => librarySection.user)
  sections: LibrarySectionUser[];

  @OneToMany(() => Comments, (comments) => comments.user)
  comments: Comments[];

  @OneToMany(() => UserLikes, (userLikes) => userLikes.user)
  likes: UserLikes[];

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
