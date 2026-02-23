import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryAikoService } from './services/diaryAiko.service';
import { DiaryAikoController } from './controllers/diaryAiko.controller';
import { DiaryAikoSection } from './entities/diaryAikoSection.entity';
import { DiaryAikoItem } from './entities/diaryAikoItem.entity';
import { UserDiaryAikoItem } from './entities/userDiaryAikoItem.entity';
import { DiaryAikoItemController } from './controllers/diaryAikoItem.controller';
import { DiaryAikoItemService } from './services/diaryAikoItem.service';
import { DiaryAikoLessonCompletedListener } from './listeners/diaryAiko-lesson-completed.listener';
import { LessonsModule } from 'src/lessons/lessons.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiaryAikoSection, DiaryAikoItem, UserDiaryAikoItem]),
    LessonsModule,
  ],
  controllers: [DiaryAikoController, DiaryAikoItemController],
  providers: [DiaryAikoService, DiaryAikoItemService, DiaryAikoLessonCompletedListener],
  exports: [DiaryAikoService, DiaryAikoItemService],
})
export class DiaryAikoModule {}
