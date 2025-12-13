import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LibraryItem } from '../../library/entities/libraryItem.entity';
import { LibraryItemTypeEnum } from '../../library/enums/library.enum';
import { Adjectives } from '../entities/adjectives.entity';
import { Counters } from '../entities/counters.entity';
import { Kana } from '../entities/kana.entity';
import { Kanji } from '../entities/kanji.entity';
import { Numbers } from '../entities/numbers.entity';
import { Onomatopoeia } from '../entities/onomatopoeia.entity';
import { Radicals } from '../entities/radicals.entity';

export type EntityTypeMap = {
  [LibraryItemTypeEnum.ADJECTIVE]: Adjectives;
  [LibraryItemTypeEnum.NUMBERS]: Numbers;
  [LibraryItemTypeEnum.COUNTER]: Counters;
  [LibraryItemTypeEnum.KANA]: Kana;
  [LibraryItemTypeEnum.KANJI]: Kanji;
  [LibraryItemTypeEnum.RADICAL]: Radicals;
  [LibraryItemTypeEnum.ONOMATOPOEIA]: Onomatopoeia;
  [LibraryItemTypeEnum.NUMBER]: Numbers;
  [LibraryItemTypeEnum.VERB]: never;
  [LibraryItemTypeEnum.VOCABULARY]: never;
};

export type RepositoryMap = {
  [K in keyof EntityTypeMap]: Repository<EntityTypeMap[K]>;
};

export type TypeMapperResult<T extends LibraryItemTypeEnum> = {
  repo: RepositoryMap[T];
  data: EntityTypeMap[T];
};

@Injectable()
export class LibraryTypeService {
  constructor(
    @InjectRepository(Adjectives) private readonly adjectivesRepo: Repository<Adjectives>,
    @InjectRepository(Numbers) private readonly numbersRepo: Repository<Numbers>,
    @InjectRepository(Kanji) private readonly kanjiRepo: Repository<Kanji>,
    @InjectRepository(Counters) private readonly countersRepo: Repository<Counters>,
    @InjectRepository(Kana) private readonly kanaRepo: Repository<Kana>,
    @InjectRepository(Onomatopoeia) private readonly onomatopoeiaRepo: Repository<Onomatopoeia>,
    @InjectRepository(Radicals) private readonly radicalsRepo: Repository<Radicals>,
  ) {}

  private get repositoryMap(): RepositoryMap {
    return {
      [LibraryItemTypeEnum.ADJECTIVE]: this.adjectivesRepo,
      [LibraryItemTypeEnum.NUMBERS]: this.numbersRepo,
      [LibraryItemTypeEnum.COUNTER]: this.countersRepo,
      [LibraryItemTypeEnum.KANA]: this.kanaRepo,
      [LibraryItemTypeEnum.KANJI]: this.kanjiRepo,
      [LibraryItemTypeEnum.RADICAL]: this.radicalsRepo,
      [LibraryItemTypeEnum.ONOMATOPOEIA]: this.onomatopoeiaRepo,
      [LibraryItemTypeEnum.NUMBER]: this.numbersRepo,
      [LibraryItemTypeEnum.VERB]: undefined as never,
      [LibraryItemTypeEnum.VOCABULARY]: undefined as never,
    };
  }

  private getDataFromLibraryItem<T extends LibraryItemTypeEnum>(
    type: T,
    item: LibraryItem,
  ): EntityTypeMap[T] {
    const dataMap: Record<LibraryItemTypeEnum, unknown> = {
      [LibraryItemTypeEnum.ADJECTIVE]: item.adjectives,
      [LibraryItemTypeEnum.NUMBERS]: item.numbers,
      [LibraryItemTypeEnum.COUNTER]: item.counters,
      [LibraryItemTypeEnum.KANA]: item.kana,
      [LibraryItemTypeEnum.KANJI]: item.kanji,
      [LibraryItemTypeEnum.RADICAL]: item.radicals,
      [LibraryItemTypeEnum.ONOMATOPOEIA]: item.onomatopoeia,
      [LibraryItemTypeEnum.NUMBER]: item.numbers,
      [LibraryItemTypeEnum.VERB]: undefined,
      [LibraryItemTypeEnum.VOCABULARY]: undefined,
    };

    return dataMap[type] as EntityTypeMap[T];
  }

  // Método principal para obtener repo y data con tipado
  getTypeMapper<T extends LibraryItemTypeEnum>(type: T, item: LibraryItem): TypeMapperResult<T> {
    const repo = this.repositoryMap[type];
    const data = this.getDataFromLibraryItem(type, item);

    if (!repo) {
      throw new UnprocessableEntityException(`Repository not found for type: ${type}`);
    }

    if (!data) {
      throw new UnprocessableEntityException(`Data not found for type: ${type}`);
    }

    return { repo, data } as TypeMapperResult<T>;
  }

  async create<T extends LibraryItemTypeEnum>(
    type: T,
    entity: LibraryItem,
  ): Promise<EntityTypeMap[T]> {
    const { repo, data } = this.getTypeMapper(type, entity);

    const itemType = repo.create({ ...data, libraryItem: entity });

    return repo.save(itemType);
  }

  getRepository<T extends LibraryItemTypeEnum>(type: T): RepositoryMap[T] {
    const repo = this.repositoryMap[type];

    if (!repo) {
      throw new UnprocessableEntityException(`Repository not found for type: ${type}`);
    }

    return repo;
  }

  getData<T extends LibraryItemTypeEnum>(type: T, item: LibraryItem): EntityTypeMap[T] {
    const data = this.getDataFromLibraryItem(type, item);

    if (!data) {
      throw new UnprocessableEntityException(`Data not found for type: ${type}`);
    }

    return data;
  }
}
