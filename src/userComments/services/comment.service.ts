import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { formatResponse, getSkip } from '../../utils/functions';
import { FormatResponse } from '../../utils/responses';
import { CreateCommentDto, findComment } from '../dto/comments.dto';
import { Comments } from '../entities/comments.entity';

export class CommentsService {
  constructor(
    @InjectRepository(Comments) private readonly commentsRepository: Repository<Comments>,
  ) {}

  async create(dto: CreateCommentDto, userUuid: string): Promise<Comments> {
    const { comment, rating, lessonUuid } = dto;

    const newComment = this.commentsRepository.create({
      comment,
      rating,
      user: { uuid: userUuid },
      lesson: { uuid: lessonUuid },
    });
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

  async delete(uuid: string, userUuid: string): Promise<void> {
    await this.commentsRepository.delete({ uuid, user: { uuid: userUuid } });
  }
}
