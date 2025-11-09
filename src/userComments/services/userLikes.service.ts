import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLike } from '../dto/comments.dto';
import { UserLikes } from '../entities/userLikes.entity';

@Injectable()
export class UserLikesService {
  constructor(@InjectRepository(UserLikes) private readonly userLikesRepo: Repository<UserLikes>) {}

  async likeComment(userUuid: string, userLikes: UserLike[]): Promise<UserLikes[]> {
    const likes = userLikes.map((like) => {
      return this.userLikesRepo.create({
        user: { uuid: userUuid },
        comment: { uuid: like.commentUuid },
        isLike: like.like,
      });
    });
    return this.userLikesRepo.save(likes);
  }
}
