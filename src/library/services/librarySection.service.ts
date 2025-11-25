import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { insertItem, moveItem, removeItem } from '../../utils/functions/order.function';
import { UpdateResponse } from '../../utils/responses';
import { CreateLibrarySectionDTO, UpdateLibrarySectionDTO } from '../dto/librarySection.dto';
import { Library } from '../entities/library.entity';
import { LibrarySection } from '../entities/librarySection.entity';
import { LibraryService } from './library.service';

@Injectable()
export class LibrarySectionService {
  constructor(
    @InjectRepository(LibrarySection)
    private readonly librarySectionRepo: Repository<LibrarySection>,
    private readonly libraryService: LibraryService,
  ) {}

  @Transactional()
  async create(libraryUuid: string, dto: CreateLibrarySectionDTO[]): Promise<LibrarySection[]> {
    if (!Array.isArray(dto) || dto.length <= 0) {
      throw new NotFoundException('Invalid data format');
    }

    const library = await this.libraryService.findOne(libraryUuid);

    if (!library) {
      throw new NotFoundException('Library not found');
    }

    const promises = dto.map(async (sectionDto) => {
      const { order, ...rest } = sectionDto;

      const sections = await this.librarySectionRepo.find({
        where: { library: { uuid: libraryUuid } },
      });

      const newLibrarySection = this.librarySectionRepo.create(rest);

      newLibrarySection.library = library;

      const newSections = insertItem(sections, newLibrarySection, order);

      await this.librarySectionRepo.save(newSections);

      return newLibrarySection;
    });
    const createdSections = await Promise.all(promises);

    return createdSections;
  }

  @Transactional()
  async update(uuid: string, dto: UpdateLibrarySectionDTO): Promise<UpdateResponse> {
    const { order, libraryUuid, ...rest } = dto;

    let library: Library = null;

    const existingLibrarySection = await this.librarySectionRepo.findOne({ where: { uuid } });

    if (!existingLibrarySection) {
      throw new NotFoundException('Library section not found');
    }

    const updatedLibrarySection = await this.librarySectionRepo.merge(existingLibrarySection, rest);

    if (libraryUuid) {
      library = await this.libraryService.findOne(libraryUuid);

      if (!library) {
        throw new NotFoundException('Library not found');
      }
      updatedLibrarySection.library = library;
    }

    await this.librarySectionRepo.save(updatedLibrarySection);

    if (order && order !== existingLibrarySection.order) {
      const sections = await this.librarySectionRepo.find({
        where: { library: { uuid: libraryUuid } },
      });

      const newSections = moveItem(sections, updatedLibrarySection.order, order);

      await this.librarySectionRepo.save(newSections);
    }

    return {
      status: 200,
      affected: 1,
    };
  }

  async findAll(libraryUuid: string): Promise<LibrarySection[]> {
    return this.librarySectionRepo.find({
      where: { library: { uuid: libraryUuid } },
      order: { order: 'ASC' },
    });
  }

  async findOne(uuid: string): Promise<LibrarySection> {
    return this.librarySectionRepo.findOne({
      where: { uuid },
      relations: {
        items: true,
      },
      order: {
        items: {
          order: 'ASC',
        },
      },
    });
  }

  @Transactional()
  async delete(uuid: string): Promise<UpdateResponse> {
    const librarySection = await this.librarySectionRepo.findOne({
      where: { uuid },
      relations: { library: true },
    });
    if (!librarySection) {
      throw new NotFoundException('Library section not found');
    }

    const sections = await this.librarySectionRepo.find({
      where: { library: { uuid: librarySection.library.uuid } },
    });

    const newSections = removeItem(sections, librarySection.order);

    const deleted = await this.librarySectionRepo.delete(uuid);

    await this.librarySectionRepo.save(newSections);
    return {
      status: 200,
      affected: deleted.affected || 0,
    };
  }
}
