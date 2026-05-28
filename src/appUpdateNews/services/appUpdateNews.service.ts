import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppUpdateNews } from '../entities/appUpdateNews.entity';
import { CreateAppUpdateNewsDto, UpdateAppUpdateNewsDto } from '../dto/create-appUpdateNews.dto';

@Injectable()
export class AppUpdateNewsService {
  constructor(
    @InjectRepository(AppUpdateNews)
    private readonly newsRepository: Repository<AppUpdateNews>,
  ) {}

  async findAll(isAdmin: boolean = false): Promise<AppUpdateNews[]> {
    const where = isAdmin ? {} : { isActive: true };
    return this.newsRepository.find({
      where,
      order: { publishedAt: 'DESC' },
    });
  }

  async findLatest(): Promise<AppUpdateNews | null> {
    return this.newsRepository.findOne({
      where: { isActive: true },
      order: { publishedAt: 'DESC' },
    });
  }

  async create(dto: CreateAppUpdateNewsDto): Promise<AppUpdateNews> {
    const news = this.newsRepository.create(dto);
    return this.newsRepository.save(news);
  }

  async update(id: string, dto: UpdateAppUpdateNewsDto): Promise<AppUpdateNews> {
    const news = await this.newsRepository.findOne({ where: { id } });
    if (!news) {
      throw new NotFoundException(`Novedad con ID ${id} no encontrada`);
    }
    const updated = this.newsRepository.create({ ...news, ...dto });
    return this.newsRepository.save(updated);
  }
}
