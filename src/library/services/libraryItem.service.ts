import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { insertItem, moveItem, removeItem } from '../../utils/functions/order.function';
import { DeleteResponse, UpdateResponse } from '../../utils/responses';
import { CreateLibraryItemDTO, UpdateLibraryItemDTO } from '../dto/libraryItem.dto';
import { LibraryItem } from '../entities/libraryItem.entity';
import { LibrarySectionService } from './librarySection.service';

@Injectable()
export class LibraryItemService {
  constructor(
    @InjectRepository(LibraryItem)
    private readonly libraryItemRepo: Repository<LibraryItem>,
    private readonly librarySectionService: LibrarySectionService,
  ) {}

  @Transactional()
  async create(
    librarySectionUuid: string,
    libraryItem: CreateLibraryItemDTO[],
  ): Promise<LibraryItem[]> {
    if (!Array.isArray(libraryItem) || libraryItem.length <= 0) {
      throw new NotFoundException('Invalid data format');
    }

    const librarySection = await this.librarySectionService.findOne(librarySectionUuid);

    if (!librarySection) {
      throw new NotFoundException('Library section not found');
    }

    const promises = libraryItem.map(async (item) => {
      const { order, ...rest } = item;

      const items = await this.libraryItemRepo.find({
        where: { section: { uuid: librarySectionUuid } },
      });

      const newLibraryItem = this.libraryItemRepo.create(rest);

      newLibraryItem.section = librarySection;

      const newItems = insertItem(items, newLibraryItem, order);

      await this.libraryItemRepo.save(newItems);

      return newLibraryItem;
    });
    const createdItems = await Promise.all(promises);

    return createdItems;
  }

  async update(uuid: string, libraryItem: UpdateLibraryItemDTO): Promise<UpdateResponse> {
    const { order, sectionUuid, ...rest } = libraryItem;

    const existingLibraryItem = await this.libraryItemRepo.findOne({
      where: { uuid },
      relations: { section: true },
    });

    if (!existingLibraryItem) {
      throw new NotFoundException('Library item not found');
    }

    if (sectionUuid) {
      const librarySection = await this.librarySectionService.findOne(sectionUuid);
      if (!librarySection) {
        throw new NotFoundException('Library section not found');
      }
      existingLibraryItem.section = librarySection;
    }

    const updatedLibraryItem = this.libraryItemRepo.merge(existingLibraryItem, rest);

    await this.libraryItemRepo.save(updatedLibraryItem);

    if (order && order !== existingLibraryItem.order) {
      const items = await this.libraryItemRepo.find({
        where: { section: { uuid: existingLibraryItem.section.uuid } },
      });

      const newItems = moveItem(items, updatedLibraryItem.order, order);
      await this.libraryItemRepo.save(newItems);
    }

    return {
      status: 200,
      affected: 1,
    };
  }

  async findOne(uuid: string): Promise<LibraryItem> {
    return this.libraryItemRepo.findOne({ where: { uuid } });
  }

  @Transactional()
  async delete(uuid: string): Promise<DeleteResponse> {
    const libraryItem = await this.libraryItemRepo.findOne({
      where: { uuid },
      relations: { section: true },
    });
    if (!libraryItem) {
      throw new NotFoundException('Library item not found');
    }

    const items = await this.libraryItemRepo.find({
      where: { section: { uuid: libraryItem.section.uuid } },
    });

    const deleted = await this.libraryItemRepo.delete(uuid);

    const newItems = removeItem(items, libraryItem.order);
    await this.libraryItemRepo.save(newItems);

    return {
      status: 200,
      affected: deleted.affected || 0,
    };
  }
}
