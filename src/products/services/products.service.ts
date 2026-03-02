import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateEntitlementDto } from '../dto/create-product.dto';
import { UpdateEntitlementDto } from '../dto/update-product.dto';
import { Entitlement } from '../entities/product.entity';
import { Library } from '../../library/entities/library.entity';

@Injectable()
export class EntitlementsService {
  constructor(
    @InjectRepository(Entitlement)
    private readonly entitlementRepo: Repository<Entitlement>,
    @InjectRepository(Library)
    private readonly libraryRepo: Repository<Library>,
  ) {}

  async create(dto: CreateEntitlementDto): Promise<Entitlement> {
    const { grantsLibraryIds, ...rest } = dto;
    const newEntitlement = this.entitlementRepo.create();
    Object.assign(newEntitlement, rest);

    if (grantsLibraryIds && grantsLibraryIds.length > 0) {
      newEntitlement.grantsLibrary = await this.resolveLibrariesOrThrow(grantsLibraryIds);
    }

    return await this.entitlementRepo.save(newEntitlement);
  }

  async findAll(): Promise<Entitlement[]> {
    return await this.entitlementRepo.find({
      relations: ['grantsLibrary'],
    });
  }

  async findOne(uuid: string): Promise<Entitlement> {
    const entitlement = await this.entitlementRepo.findOne({
      where: { uuid },
      relations: ['grantsLibrary'],
    });

    if (!entitlement) {
      throw new NotFoundException(`Entitlement with UUID ${uuid} not found`);
    }

    return entitlement;
  }

  async update(uuid: string, dto: UpdateEntitlementDto): Promise<Entitlement> {
    const entitlement = await this.findOne(uuid);

    const { grantsLibraryIds, ...rest } = dto;
    Object.assign(entitlement, rest);

    if (grantsLibraryIds !== undefined) {
      if (grantsLibraryIds.length > 0) {
        entitlement.grantsLibrary = await this.resolveLibrariesOrThrow(grantsLibraryIds);
      } else {
        entitlement.grantsLibrary = [];
      }
    }

    return await this.entitlementRepo.save(entitlement);
  }

  async remove(uuid: string): Promise<void> {
    const entitlement = await this.findOne(uuid);
    await this.entitlementRepo.remove(entitlement);
  }

  private async resolveLibrariesOrThrow(ids: string[]): Promise<Library[]> {
    const uniqueIds = [...new Set(ids)];
    const libraries = await this.libraryRepo.findBy({ uuid: In(uniqueIds) });
    if (libraries.length !== uniqueIds.length) {
      const found = new Set(libraries.map((l) => l.uuid));
      const missing = uniqueIds.filter((id) => !found.has(id));
      throw new NotFoundException(`Libraries not found: ${missing.join(', ')}`);
    }
    return libraries;
  }
}
