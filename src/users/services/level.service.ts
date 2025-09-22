import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from '../entities/level.entity';

@Injectable()
export class LevelService {
  constructor(@InjectRepository(Level) private readonly levelRepo: Repository<Level>) {}

  async findAll(): Promise<Level[]> {
    return this.levelRepo.find();
  }

  async findByOrder(order: number): Promise<Level> {
    return this.levelRepo.findOne({ where: { order } });
  }
}
