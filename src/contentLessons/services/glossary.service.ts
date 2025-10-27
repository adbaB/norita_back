import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlossaryDTO } from '../dtos/glossary.dto';
import { Content } from '../entities/content.entity';
import { Glossary } from '../entities/glossary.entity';
import { DeleteResponse } from '../../utils/responses';

@Injectable()
export class GlossaryService {
  constructor(@InjectRepository(Glossary) private readonly glossaryRepo: Repository<Glossary>) {}

  async create(lessonContent: Content, glossaries: GlossaryDTO[]): Promise<Glossary[]> {
    if (glossaries.length === 0) {
      return [];
    }
    const newGlossaries = glossaries.map((glossary) => {
      const newGlossary = this.glossaryRepo.create(glossary);
      newGlossary.lessonContent = lessonContent;
      return newGlossary;
    });

    return this.glossaryRepo.save(newGlossaries);
  }

  async update(lessonContent: Content, glossaries: GlossaryDTO[]): Promise<void> {
    if (glossaries?.length === 0) {
      return;
    }
    await this.glossaryRepo.delete({ lessonContent: { uuid: lessonContent.uuid } });
    await this.create(lessonContent, glossaries);
  }

  async delete(uuid: string): Promise<DeleteResponse> {
    const deleted = await this.glossaryRepo.delete({ uuid });

    return {
      message: 'Glossary deleted successfully',
      affected: deleted.affected,
      status: 200,
    };
  }
}
