import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Section } from '../entities/section.entity';

@Injectable()
export class SectionService {
  constructor(@InjectRepository(Section) private sectionRepository: Repository<Section>) {}

  async findAll(): Promise<Section[]> {
    return this.sectionRepository.find({ order: { order: 'ASC' }, relations: ['lessons'] });
  }

  async findOne(uuid: string): Promise<Section | null> {
    return this.sectionRepository.findOne({ where: { uuid }, relations: ['lessons'] });
  }

  async findByUUID(uuid: string): Promise<Section> {
    return this.sectionRepository.findOne({ where: { uuid: uuid } });
  }
}
