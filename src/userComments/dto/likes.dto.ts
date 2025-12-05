import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class LikesDto {
  @ApiProperty({
    description: 'UUID of the comment',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  @IsUUID()
  commentUuid: string;

  @ApiProperty({
    description:
      'Indicates whether the comment is liked (true) or disliked (false) or null (neutral)',
    example: true,
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  like?: boolean;
}
