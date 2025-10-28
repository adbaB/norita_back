import { forwardRef, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonsService } from '../../lessons/services/lessons.service';
import { User } from '../../users/entities/user.entity';
import { LessonProgress } from '../entity/lessonProgress.entity';

@Injectable()
export class LessonProgressService {
  constructor(
    @InjectRepository(LessonProgress)
    private readonly lessonProgressRepo: Repository<LessonProgress>,
    @Inject(forwardRef(() => LessonsService)) private readonly lessonsService: LessonsService,
  ) {}

  async addInitialProgress(user: User): Promise<void> {
    const lesson = await this.lessonsService.getFirstLesson();

    if (!lesson) {
      throw new UnprocessableEntityException('No lessons found');
    }
    const lessonProgress = this.lessonProgressRepo.create({
      user,
      lesson,
      completed: false,
      dateCompleted: null,
      lastLineSeen: 0,
      unlocked: true,
    });

    await this.lessonProgressRepo.save(lessonProgress);
  }
}
