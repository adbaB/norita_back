import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { User } from '../../users/decorators/user.decorator';
import { UpdateResponse } from '../../utils/responses';
import { updateLessonProgressDTO } from '../dto/updateLessonProgress.dto';
import { LessonProgress } from '../entity/lessonProgress.entity';
import { LessonProgressService } from '../services/lessonProgress.service';

@Controller('lesson-progress')
export class LessonProgressController {
  constructor(private readonly lessonProgressService: LessonProgressService) {}

  @Put(':uuid')
  async updateLessonProgress(
    @User() userUUID: string,
    @Param('uuid') lessonUUID: string,
    @Body() dto: updateLessonProgressDTO,
  ): Promise<UpdateResponse> {
    return this.lessonProgressService.updateLessonProgress(userUUID, lessonUUID, dto.lastLineSeen);
  }

  @Put(':uuid/complete')
  async completeLesson(
    @User() userUUID: string,
    @Param('uuid') lessonUUID: string,
  ): Promise<UpdateResponse> {
    return this.lessonProgressService.completeLesson(userUUID, lessonUUID);
  }

  @Post(':uuid/unlock')
  async unlockLesson(
    @User() userUUID: string,
    @Param('uuid') lessonUUID: string,
  ): Promise<LessonProgress> {
    return this.lessonProgressService.unlockLesson(userUUID, lessonUUID);
  }
}
