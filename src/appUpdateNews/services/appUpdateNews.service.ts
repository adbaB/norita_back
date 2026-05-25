import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppUpdateNews } from '../entities/appUpdateNews.entity';

@Injectable()
export class AppUpdateNewsService {
  constructor(
    @InjectRepository(AppUpdateNews)
    private readonly newsRepository: Repository<AppUpdateNews>,
  ) {}

  async findAll(): Promise<AppUpdateNews[]> {
    return this.newsRepository.find({
      order: { publishedAt: 'DESC' },
    });
  }

  async findLatest(): Promise<AppUpdateNews | null> {
    return this.newsRepository.findOne({
      order: { publishedAt: 'DESC' },
    });
  }
}
