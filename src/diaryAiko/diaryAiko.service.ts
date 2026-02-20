import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDiaryAikoSectionDto } from './dto/create-diaryAikoSection.dto';
import { UpdateDiaryAikoSectionDto } from './dto/update-diaryAikoSection.dto';
import { DiaryAikoSection } from './entities/diaryAikoSection.entity';

@Injectable()
export class DiaryAikoService {
  constructor(
    @InjectRepository(DiaryAikoSection)
    private readonly sectionRepository: Repository<DiaryAikoSection>,
  ) {}

  async create(createDto: CreateDiaryAikoSectionDto): Promise<DiaryAikoSection> {
    const section = this.sectionRepository.create(createDto);
    return await this.sectionRepository.save(section);
  }

  async findAll(): Promise<DiaryAikoSection[]> {
    return await this.sectionRepository.find({
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(uuid: string): Promise<DiaryAikoSection> {
    const section = await this.sectionRepository.findOne({ where: { uuid } });
    if (!section) {
      throw new NotFoundException(`Section with UUID ${uuid} not found`);
    }
    return section;
  }

  async update(id: string, updateDto: UpdateDiaryAikoSectionDto): Promise<DiaryAikoSection> {
    const section = await this.findOne(id);
    this.sectionRepository.merge(section, updateDto);
    return await this.sectionRepository.save(section);
  }

  async remove(id: string): Promise<void> {
    const section = await this.findOne(id);
    await this.sectionRepository.remove(section);
  }
}
