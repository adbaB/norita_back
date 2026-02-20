import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryAikoService } from './diaryAiko.service';
import { DiaryAikoController } from './diaryAiko.controller';
import { DiaryAikoSection } from './entities/diaryAikoSection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiaryAikoSection])],
  controllers: [DiaryAikoController],
  providers: [DiaryAikoService],
  exports: [DiaryAikoService],
})
export class DiaryAikoModule {}
