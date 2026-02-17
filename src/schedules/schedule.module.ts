import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseModule } from '../firebase/firebase.module';
import { Schedule } from './entities/schedule.entity';
import { LessonCompletedListener } from './listeners/lesson-completed.listener';
import { ScheduleService } from './services/schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule]), FirebaseModule],
  controllers: [],
  providers: [ScheduleService, LessonCompletedListener],
  exports: [ScheduleService],
})
export class ScheduleModule {}
