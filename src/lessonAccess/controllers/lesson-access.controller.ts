import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/decorators/user.decorator';
import { ApiResponse } from '../../utils/responses';
import { UnlockLessonDTO } from '../dto/unlock.dto';
import { LessonAccess } from '../entity/lesson-access.entity';
import { LessonAccessService } from '../services/lesson-access.service';

@ApiBearerAuth()
@Controller('lesson-access')
export class LessonAccessController {
  constructor(private readonly lessonAccessService: LessonAccessService) {}

  @ApiProperty({
    description: 'Unlock lesson',
    type: LessonAccess,
  })
  @Post(':uuid/unlock')
  async unlockLesson(
    @User() userUUID: string,
    @Param('uuid') lessonUUID: string,
    @Body() dto: UnlockLessonDTO,
  ): Promise<ApiResponse<LessonAccess>> {
    const lessonAccess = await this.lessonAccessService.unlockLesson(
      userUUID,
      lessonUUID,
      dto.type,
    );
    return new ApiResponse(true, 'Lesson unlocked successfully', lessonAccess);
  }
}
