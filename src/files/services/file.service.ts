import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileRandom } from '../entities/fileRandom.entity';
import { TypeFileEnum } from '../enums/type-file.enum';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileRandom) private readonly fileRandomRepository: Repository<FileRandom>,
  ) {}

  async createFileRandom(file: string, type: TypeFileEnum): Promise<FileRandom> {
    const fileRandom = this.fileRandomRepository.create({ file, type });
    return this.fileRandomRepository.save(fileRandom);
  }

  async getFileByTypeRandom(type: TypeFileEnum): Promise<FileRandom> {
    const files = await this.fileRandomRepository.find({ where: { type } });
    const randomIndex = Math.floor(Math.random() * files.length);

    return files[randomIndex];
  }
}
