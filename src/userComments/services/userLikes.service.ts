import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLikes } from '../entities/userLikes.entity';

export class UserLikesService {
  constructor(@InjectRepository(UserLikes) private readonly userLikesRepo: Repository<UserLikes>) {}

  async likeComment(userUuid: string, commentUuid: string, isLike: boolean): Promise<UserLikes> {
    return this.userLikesRepo.save({ userUuid, commentUuid, isLike });
  }
}
