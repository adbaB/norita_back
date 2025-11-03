import { IsNotEmpty, IsUUID, Max, Min } from 'class-validator';
import { Paginate } from '../../utils/models/paginate-request';

export class CreateCommentDto {
  @IsNotEmpty()
  comment: string;

  @IsNotEmpty()
  lessonUuid: string;

  @IsNotEmpty()
  @Min(1)
  @Max(5)
  rating: number;
}

export class findComment extends Paginate {
  @IsNotEmpty()
  @IsUUID('4')
  lessonUuid: string;
}
