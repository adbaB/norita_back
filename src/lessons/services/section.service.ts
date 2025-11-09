import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { CreatedResponse } from '../../utils/responses';
import { CreateSectionDto } from '../dto/section.dto';
import { Section } from '../entities/section.entity';

@Injectable()
export class SectionService {
  constructor(@InjectRepository(Section) private sectionRepository: Repository<Section>) {}

  async create(section: CreateSectionDto): Promise<CreatedResponse<Section>> {
    const sections = await this.sectionRepository.find({
      where: { order: MoreThanOrEqual(section.order) },
    });

    for (const sec of sections) {
      sec.order += 1;
      await this.sectionRepository.save(sec);
    }

    const newSection = await this.sectionRepository.save(section);

    return {
      status: 201,
      message: 'Section created successfully',
      data: newSection,
    };
  }

  async findAll(userUUID?: string): Promise<Section[]> {
    // return this.sectionRepository.find({ order: { order: 'ASC' }, relations: ['lessons'] });

    const query = this.sectionRepository
      .createQueryBuilder('section')
      .leftJoinAndSelect('section.lessons', 'lesson')
      .orderBy('section.order', 'ASC');

    if (userUUID) {
      query.leftJoinAndSelect(
        'lesson.lessonProgress',
        'lessonProgress',
        'lessonProgress.user_uuid = :userUUID',
        { userUUID },
      );
    }
    return query.printSql().getMany();
  }

  async findOne(uuid: string): Promise<Section | null> {
    return this.sectionRepository.findOne({ where: { uuid }, relations: ['lessons'] });
  }

  async findByUUID(uuid: string): Promise<Section> {
    return this.sectionRepository.findOne({ where: { uuid: uuid } });
  }

  async update(uuid: string, updateData: Partial<Section>): Promise<Section> {
    const section = await this.sectionRepository.findOne({ where: { uuid } });

    if (!section) {
      throw new Error('Section not found');
    }
    const sections = await this.sectionRepository.find({
      where: { order: MoreThanOrEqual(updateData.order) },
    });

    for (const sec of sections) {
      if (sec.uuid !== uuid) {
        sec.order += 1;
        await this.sectionRepository.save(sec);
      }
    }
    return this.sectionRepository.save({ ...section, ...updateData });
  }

  async remove(uuid: string): Promise<void> {
    await this.sectionRepository.delete(uuid);
  }
}
