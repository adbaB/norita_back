import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
