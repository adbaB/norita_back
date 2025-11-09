import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsUUID, Max, Min, ValidateNested } from 'class-validator';
import { Paginate } from '../../utils/models/paginate-request';

export class UserLike {
  @ApiProperty({
    description: 'UUID of the comment to like or dislike',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  @IsUUID('4')
  commentUuid: string;

  @ApiProperty({
    description: 'Indicates whether the comment is liked (true) or disliked (false)',
    example: true,
  })
  @IsNotEmpty()
  like: boolean;
}

export class CreateCommentDto {
  @ApiProperty({
    description: 'Content of the comment',
    example: 'This is a great lesson!',
  })
  @IsNotEmpty()
  comment: string;

  @ApiProperty({
    description: 'UUID of the lesson being commented on',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  lessonUuid: string;

  @ApiProperty({
    description: 'Rating given in the comment (1 to 5)',
    example: 4,
  })
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'List of user likes or dislikes for comments',
    type: [UserLike],
    required: false,
  })
  @ValidateNested({ each: true })
  @Type(() => UserLike)
  @IsOptional()
  @IsArray()
  userLikes: UserLike[];
}

export class findComment extends Paginate {
  @IsNotEmpty()
  @IsUUID('4')
  lessonUuid: string;
}
