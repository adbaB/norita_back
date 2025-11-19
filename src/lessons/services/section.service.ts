import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { insertItem, moveItem, removeItem } from '../../utils/functions/order.function';
import { DeleteResponse, UpdateResponse } from '../../utils/responses';
import { CreateSectionDto, UpdateSectionDTO } from '../dto/section.dto';
import { Section } from '../entities/section.entity';

@Injectable()
export class SectionService {
  constructor(@InjectRepository(Section) private sectionRepository: Repository<Section>) {}

  @Transactional()
  async create(section: CreateSectionDto): Promise<Section> {
    const sections = await this.sectionRepository.find();

    const newSection = this.sectionRepository.create(section);

    const newSections = insertItem(sections, newSection, newSection.order);

    await this.sectionRepository.save(newSections);

    return newSection;
  }

  async findAll(userUUID?: string): Promise<Section[]> {
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
    return query.getMany();
  }

  async findOne(uuid: string): Promise<Section | null> {
    return this.sectionRepository.findOne({ where: { uuid }, relations: ['lessons'] });
  }

  async findByUUID(uuid: string): Promise<Section> {
    return this.sectionRepository.findOne({ where: { uuid: uuid } });
  }

  @Transactional()
  async update(uuid: string, updateData: UpdateSectionDTO): Promise<UpdateResponse> {
    const { order, ...rest } = updateData;
    const section = await this.sectionRepository.findOne({ where: { uuid } });

    if (!section) {
      throw new Error('Section not found');
    }

    const sectionEntity = this.sectionRepository.merge(section, rest);

    await this.sectionRepository.save(sectionEntity);

    if (Number.isInteger(order)) {
      const sections = await this.sectionRepository.find();

      const newSections = moveItem(sections, sectionEntity.order, order);

      await this.sectionRepository.save(newSections);
    }

    return {
      status: 200,
      affected: 1,
    };
  }

  @Transactional()
  async remove(uuid: string): Promise<DeleteResponse> {
    const section = await this.sectionRepository.findOne({ where: { uuid } });
    if (!section) {
      throw new Error('Section not found');
    }

    const sections = await this.sectionRepository.find();

    const newSections = removeItem(sections, section.order);

    const deleted = await this.sectionRepository.delete(uuid);

    await this.sectionRepository.save(newSections);
    return {
      status: 200,
      affected: deleted.affected || 0,
    };
  }
}
