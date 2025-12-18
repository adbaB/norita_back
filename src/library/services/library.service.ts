import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { insertItem, moveItem, removeItem } from '../../utils/functions/order.function';
import { DeleteResponse, UpdateResponse } from '../../utils/responses';
import { CreateLibraryDTO, UpdateLibraryDTO } from '../dto/library.dto';
import { Library } from '../entities/library.entity';
import { LibraryTypeEnum } from '../enums/library.enum';
import { ResponseLibrary } from '../interfaces/responseLibrary.interface';

@Injectable()
export class LibraryService {
  constructor(@InjectRepository(Library) private readonly libraryRepo: Repository<Library>) {}

  @Transactional()
  async create(library: CreateLibraryDTO): Promise<Library> {
    const newLibrary = this.libraryRepo.create(library);

    const libraries = await this.libraryRepo.find({ where: { type: newLibrary.type } });

    const newLibraries = insertItem(libraries, newLibrary, newLibrary.order);

    await this.libraryRepo.save(newLibraries);

    return newLibrary;
  }

  @Transactional()
  async update(uuid: string, library: UpdateLibraryDTO): Promise<UpdateResponse> {
    const { order, ...rest } = library;
    const existingLibrary = await this.libraryRepo.findOne({ where: { uuid } });

    if (!existingLibrary) {
      throw new NotFoundException('Library not found');
    }
    const updatedLibrary = this.libraryRepo.merge(existingLibrary, rest);

    await this.libraryRepo.save(updatedLibrary);

    if (library.order && library.order !== existingLibrary.order) {
      const libraries = await this.libraryRepo.find({ where: { type: updatedLibrary.type } });

      const newLibraries = moveItem(libraries, updatedLibrary.order, order);

      await this.libraryRepo.save(newLibraries);
    }

    return {
      status: 200,
      affected: 1,
    };
  }

  async findAll(): Promise<ResponseLibrary> {
    const promiseGrammars = this.libraryRepo.find({
      where: { type: LibraryTypeEnum.GRAMMAR },
      order: { order: 'ASC' },
    });

    const promiseVocabularies = this.libraryRepo.find({
      where: { type: LibraryTypeEnum.VOCABULARY },
      order: { order: 'ASC' },
    });

    const promiseSpecialized = this.libraryRepo.find({
      where: { type: LibraryTypeEnum.SPECIALIZED },
      order: { order: 'ASC' },
    });

    const [grammars, vocabularies, specialized] = await Promise.all([
      promiseGrammars,
      promiseVocabularies,
      promiseSpecialized,
    ]);

    return {
      grammars,
      vocabularies,
      specialized,
    };
  }

  async findOne(uuid: string): Promise<Library> {
    return this.libraryRepo.findOne({
      where: { uuid },
      relations: {
        sections: true,
      },
      order: {
        sections: {
          order: 'ASC',
        },
      },
    });
  }

  async delete(uuid: string): Promise<DeleteResponse> {
    const library = await this.libraryRepo.findOne({ where: { uuid } });
    if (!library) {
      throw new NotFoundException('Library not found');
    }
    const libraries = await this.libraryRepo.find({ where: { type: library.type } });

    const deleted = await this.libraryRepo.delete(uuid);

    const newLibraries = removeItem(libraries, library.order);

    await this.libraryRepo.save(newLibraries);

    return {
      status: 200,
      affected: deleted.affected || 0,
    };
  }
}
