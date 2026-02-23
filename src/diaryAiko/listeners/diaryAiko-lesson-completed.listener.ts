import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonCompletedEvent } from '../../schedules/events/lesson-completed.event';
import { DiaryAikoItem } from '../entities/diaryAikoItem.entity';
import { UserDiaryAikoItem } from '../entities/userDiaryAikoItem.entity';

@Injectable()
export class DiaryAikoLessonCompletedListener {
  private readonly logger = new Logger(DiaryAikoLessonCompletedListener.name);

  constructor(
    @InjectRepository(DiaryAikoItem)
    private readonly diaryAikoItemRepo: Repository<DiaryAikoItem>,
    @InjectRepository(UserDiaryAikoItem)
    private readonly userDiaryAikoItemRepo: Repository<UserDiaryAikoItem>,
  ) {}

  @OnEvent('lesson.completed')
  async handleLessonCompleted(event: LessonCompletedEvent): Promise<void> {
    try {
      this.logger.log(
        `Checking Diary Aiko unlocks for user ${event.userUuid} from lesson ${event.lessonUuid}`,
      );

      const itemsToUnlock = await this.diaryAikoItemRepo.find({
        where: { lessonUuid: event.lessonUuid },
      });

      if (itemsToUnlock.length === 0) {
        return;
      }

      for (const item of itemsToUnlock) {
        const existingUnlock = await this.userDiaryAikoItemRepo.findOne({
          where: { user: { uuid: event.userUuid }, item: { uuid: item.uuid } },
        });

        if (!existingUnlock) {
          const newUnlock = this.userDiaryAikoItemRepo.create({
            user: { uuid: event.userUuid },
            item: { uuid: item.uuid },
          });
          await this.userDiaryAikoItemRepo.save(newUnlock);
          this.logger.log(`Unlocked Diary Aiko Item ${item.uuid} for user ${event.userUuid}`);
        }
      }
    } catch (error) {
      this.logger.error(
        `Error unlocking Diary Aiko items for user ${event.userUuid}: ${error.message}`,
        error.stack,
      );
    }
  }
}
