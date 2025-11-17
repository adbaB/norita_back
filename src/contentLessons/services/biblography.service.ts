import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteResponse } from '../../utils/responses';
import { BibliographyDTO } from '../dtos/biblography.dto';
import { Bibliography } from '../entities/biblography.entity';
import { Content } from '../entities/content.entity';

@Injectable()
export class BibliographyService {
  constructor(
    @InjectRepository(Bibliography) private readonly bibliographyRepo: Repository<Bibliography>,
  ) {}

  async create(bibliographies: BibliographyDTO[], lessonContent: Content): Promise<Bibliography[]> {
    if (bibliographies.length === 0) {
      return [];
    }
    const newBibliographies = bibliographies.map((bibliography) => {
      const newBibliography = this.bibliographyRepo.create(bibliography);
      newBibliography.lessonContent = lessonContent;
      return newBibliography;
    });

    return this.bibliographyRepo.save(newBibliographies);
  }

  async update(lessonContent: Content, bibliographies: BibliographyDTO[]): Promise<void> {
    if (bibliographies?.length === 0) {
      return;
    }

    await this.bibliographyRepo.delete({ lessonContent: { uuid: lessonContent.uuid } });
    await this.create(bibliographies, lessonContent);
  }

  async delete(uuid: string): Promise<DeleteResponse> {
    const deleted = await this.bibliographyRepo.delete({ uuid });

    if (deleted.affected === 0) {
      throw new NotFoundException('Bibliography not found');
    }

    return {
      affected: deleted.affected,
      status: 200,
    };
  }
}
