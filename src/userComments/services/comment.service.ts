import { ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { formatResponse, getSkip } from '../../utils/functions';
import { FormatResponse } from '../../utils/responses';
import { CreateCommentDto, findComment } from '../dto/comments.dto';
import { Comments } from '../entities/comments.entity';
import { StatsResponse } from '../interfaces/stats.reponse';
import { UserLikesService } from './userLikes.service';

export class CommentsService {
  constructor(
    @InjectRepository(Comments) private readonly commentsRepository: Repository<Comments>,
    private readonly userLikesService: UserLikesService,
  ) {}

  @Transactional()
  async create(dto: CreateCommentDto, userUuid: string): Promise<Comments> {
    const { comment, rating, lessonUuid } = dto;

    const existingComment = await this.commentsRepository.findOne({
      where: { lesson: { uuid: lessonUuid }, user: { uuid: userUuid } },
    });
    if (existingComment) {
      throw new ConflictException('User has already commented on this lesson');
    }

    const newComment = this.commentsRepository.create({
      comment,
      rating,
      user: { uuid: userUuid },
      lesson: { uuid: lessonUuid },
    });

    if (dto.userLikes && dto.userLikes.length > 0) {
      await this.userLikesService.likeComment(userUuid, dto.userLikes);
    }
    return this.commentsRepository.save(newComment);
  }
  async findAll(dto: findComment): Promise<FormatResponse<Comments>> {
    const { limit, page, lessonUuid } = dto;
    const skip = getSkip(limit, page);
    const [comments, total] = await this.commentsRepository.findAndCount({
      relations: { Userlikes: true },
      where: { lesson: { uuid: lessonUuid } },
      take: limit,
      skip,
    });
    return formatResponse(comments, page, limit, total);
  }

  async findStats(uuid: string): Promise<StatsResponse> {
    const average = await this.commentsRepository
      .createQueryBuilder('comment')
      .select('AVG(comment.rating)', 'rating')
      .where('comment.lesson_uuid = :uuid', { uuid })
      .getRawOne();

    const rating = await this.commentsRepository
      .createQueryBuilder('comment')
      .select('comment.rating, COUNT(comment.rating)', 'count')
      .where('comment.lesson_uuid = :uuid', { uuid })
      .groupBy('comment.rating')
      .getRawMany();
    console.log(rating);
    console.log('average', average);
    return { average: average.rating, rating };
  }

  async delete(uuid: string, userUuid: string): Promise<void> {
    await this.commentsRepository.softDelete({ uuid, user: { uuid: userUuid } });
  }
}
