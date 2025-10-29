import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class completeLessonDTO {
  @ApiProperty({ description: 'UUID of the lesson to be completed', type: String })
  @IsUUID('4', { message: 'lessonUUID must be a valid UUIDv4' })
  lessonUUID: string;
}
