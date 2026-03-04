import { Body, Controller, Param, ParseEnumPipe, Patch, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiProperty, ApiQuery } from '@nestjs/swagger';
import { User } from '../../users/decorators/user.decorator';
import { ApiResponse, UpdateResponse } from '../../utils/responses';
import { updateLessonProgressDTO } from '../dto/updateLessonProgress.dto';
import { LessonProgress } from '../entity/lessonProgress.entity';
import { TypeUnlockEnum } from '../enums/type-unlock.enum';
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
  @Patch('complete/:uuid')
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
  @ApiQuery({ name: 'type', enum: TypeUnlockEnum })
  @ApiParam({ name: 'uuid', type: String })
  @ApiOperation({ summary: 'Unlock a specific lesson using coins or premium' })
  @Patch('unlock/:uuid')
  async unlockLesson(
    @User() userUUID: string,
    @Param('uuid') lessonUUID: string,
    @Query('type', new ParseEnumPipe(TypeUnlockEnum)) type: TypeUnlockEnum,
  ): Promise<ApiResponse<LessonProgress>> {
    const lessonProgress = await this.lessonProgressService.unlockLesson(
      userUUID,
      lessonUUID,
      type,
    );
    return new ApiResponse(true, 'Lesson unlocked successfully', lessonProgress);
  }
}
