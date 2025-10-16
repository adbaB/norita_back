import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../entities/lesson.entity';

@Injectable()
export class LessonsService {
  constructor(@InjectRepository(Lesson) private readonly lessonRepo: Repository<Lesson>) {}

  async findByUUID(uuid: string): Promise<Lesson | null> {
    return this.lessonRepo.findOne({
      where: { uuid },
      relations: {
        lessonContent: { dialogs: true, notes: true, glossaries: true, bibliographies: true },
      },
    });
  }
}
