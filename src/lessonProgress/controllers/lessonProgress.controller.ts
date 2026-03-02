import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/decorators/user.decorator';
import { ApiResponse, UpdateResponse } from '../../utils/responses';
import { UnlockLessonDTO } from '../dto/unlock.dto';
import { updateLessonProgressDTO } from '../dto/updateLessonProgress.dto';
import { LessonProgress } from '../entity/lessonProgress.entity';
import { LessonProgressService } from '../services/lessonProgress.service';

@ApiBearerAuth()
@Controller('lesson-progress')
export class LessonProgressController {
  constructor(private readonly lessonProgressService: LessonProgressService) {}

  @ApiProperty({
    description: 'Update lesson progress',
    type: UpdateResponse,
    example: {
      affected: 1,
      message: 'Lesson progress updated successfully',
      status: 200,
    },
  })
  @ApiOperation({ summary: 'Incrementally update the progress state of a lesson' })
  @Put(':uuid')
  async updateLessonProgress(
    @User() userUUID: string,
    @Param('uuid') lessonUUID: string,
    @Body() dto: updateLessonProgressDTO,
  ): Promise<UpdateResponse> {
    return this.lessonProgressService.updateLessonProgress(userUUID, lessonUUID, dto);
  }

  @ApiProperty({
    description: 'Complete lesson',
    type: UpdateResponse,
    example: {
      affected: 1,
      message: 'Lesson completed successfully',
      status: 200,
    },
  })
  @ApiOperation({ summary: 'Mark a lesson as fully completed' })
  @Put(':uuid/complete')
  async completeLesson(
    @User() userUUID: string,
    @Param('uuid') lessonUUID: string,
  ): Promise<ApiResponse<UpdateResponse>> {
    const response = await this.lessonProgressService.completeLesson(userUUID, lessonUUID);
    return new ApiResponse(true, 'Lesson completed successfully', response);
  }

  @ApiProperty({
    description: 'Unlock lesson',
    type: LessonProgress,
  })
  @ApiOperation({ summary: 'Unlock a specific lesson using coins or premium' })
  @Post(':uuid/unlock')
  async unlockLesson(
    @User() userUUID: string,
    @Param('uuid') lessonUUID: string,
    @Body() dto: UnlockLessonDTO,
  ): Promise<ApiResponse<LessonProgress>> {
    const lessonProgress = await this.lessonProgressService.unlockLesson(
      userUUID,
      lessonUUID,
      dto.type,
    );
    return new ApiResponse(true, 'Lesson unlocked successfully', lessonProgress);
  }
}
