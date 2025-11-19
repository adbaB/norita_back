import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { DeleteResponse, UpdateResponse } from '../../utils/responses';
import { CreateSectionDto, UpdateSectionDTO } from '../dto/section.dto';
import { Section } from '../entities/section.entity';

@Injectable()
export class SectionService {
  constructor(@InjectRepository(Section) private sectionRepository: Repository<Section>) {}

  @Transactional()
  async create(section: CreateSectionDto): Promise<Section> {
    const sections = await this.sectionRepository.find({
      where: { order: MoreThanOrEqual(section.order) },
    });

    for (const sec of sections) {
      sec.order += 1;
      await this.sectionRepository.save(sec);
    }

    const newSection = await this.sectionRepository.save(section);

    return newSection;
  }

  async findAll(userUUID?: string): Promise<Section[]> {
    const query = this.sectionRepository
      .createQueryBuilder('section')
      .leftJoinAndSelect('section.lessons', 'lesson')
      .orderBy('section.order', 'ASC')
      .addOrderBy('lesson.order', 'ASC');

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
    const section = await this.sectionRepository.findOne({ where: { uuid } });

    if (!section) {
      throw new Error('Section not found');
    }
    if (updateData?.order) {
      const sections = await this.sectionRepository.find({
        where: { order: MoreThanOrEqual(updateData.order) },
      });

      for (const sec of sections) {
        if (sec.uuid !== uuid) {
          sec.order += 1;
          await this.sectionRepository.save(sec);
        }
      }
    }
    await this.sectionRepository.save({ ...section, ...updateData });
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

    const sections = await this.sectionRepository.find({
      where: { order: MoreThanOrEqual(section.order + 1) },
    });

    for (const sec of sections) {
      sec.order -= 1;
      await this.sectionRepository.save(sec);
    }

    const deleted = await this.sectionRepository.delete(uuid);
    return {
      status: 200,
      affected: deleted.affected || 0,
    };
  }
}
