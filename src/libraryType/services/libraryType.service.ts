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

import { Vocabulary } from '../entities/vocabulary.entity';

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
  [LibraryItemTypeEnum.VOCABULARY]: Vocabulary;
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
    @InjectRepository(Vocabulary) private readonly vocabularyRepo: Repository<Vocabulary>,
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
      [LibraryItemTypeEnum.VOCABULARY]: this.vocabularyRepo,
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
      [LibraryItemTypeEnum.VOCABULARY]: item.vocabulary,
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

  async searchBySpanish(
    term: string,
    limit: number = 5,
    userUuid?: string,
  ): Promise<
    Record<
      string,
      (LibraryItem & {
        unlocked: boolean;
        libraryUnlocked: boolean;
        sectionUnlocked: boolean;
        hiragana: string | null;
        romaji: string | null;
      })[]
    >
  > {
    const termLike = `%${term}%`;
    const searchConfig = [
      {
        type: LibraryItemTypeEnum.KANA,
        field: 'traductionSpanish',
        prop: 'kana',
        readingFields: ['romaji'],
      },
      {
        type: LibraryItemTypeEnum.KANJI,
        field: 'traductionsSpanish',
        prop: 'kanji',
        readingFields: [],
      },
      {
        type: LibraryItemTypeEnum.ADJECTIVE,
        field: 'traductionSpanish',
        prop: 'adjectives',
        readingFields: ['wordHiragana', 'wordRomaji'],
      },
      {
        type: LibraryItemTypeEnum.NUMBERS,
        field: 'traductionsSpanish',
        prop: 'numbers',
        readingFields: ['romanNumber'],
      },
      {
        type: LibraryItemTypeEnum.COUNTER,
        field: 'traductionSpanish',
        prop: 'counters',
        readingFields: ['wordHiragana', 'wordRomaji'],
      },
      {
        type: LibraryItemTypeEnum.RADICAL,
        field: 'traductionSpanish',
        prop: 'radicals',
        readingFields: ['wordHiragana', 'wordRomaji'],
      },
      {
        type: LibraryItemTypeEnum.ONOMATOPOEIA,
        field: 'traductionSpanish',
        prop: 'onomatopoeia',
        readingFields: ['wordKatakana', 'wordRomaji'],
      },
      {
        type: LibraryItemTypeEnum.VOCABULARY,
        field: 'traductionSpanish',
        prop: 'vocabulary',
        readingFields: ['wordHiragana', 'wordRomaji'],
      },
    ];

    const results: Record<
      string,
      (LibraryItem & {
        unlocked: boolean;
        libraryUnlocked: boolean;
        sectionUnlocked: boolean;
        hiragana: string | null;
        romaji: string | null;
      })[]
    > = {};

    for (const { type, field, prop, readingFields } of searchConfig) {
      const repo = this.getRepository(type);
      const alias = type;
      const col = repo.metadata.findColumnWithPropertyName(field);
      // Fallback in case column not found or property name is the column name
      const columnName = col ? col.databaseName : field;
      // Use query builder to filter inside the JSONB array
      const data = await repo
        .createQueryBuilder(alias)
        .select([
          `${alias}.uuid`,
          `${alias}.${field}`,
          `${alias}.word`,
          ...readingFields.map((rf) => `${alias}.${rf}`),
          'libraryItem.uuid',
          'libraryItem.type',
          'libraryItem.package',
          'libraryItem.order',
          'section.uuid',
          'library.uuid',
          'libraryUser.uuid',
          'librarySectionUser.uuid',
        ])
        .leftJoin(`${alias}.libraryItem`, 'libraryItem')
        .leftJoin('libraryItem.section', 'section')
        .leftJoin('section.library', 'library')
        .leftJoin('library.user', 'libraryUser', 'libraryUser.user_uuid = :userUuid', {
          userUuid,
        })
        .leftJoin(
          'section.sectionUser',
          'librarySectionUser',
          'librarySectionUser.user_uuid = :userUuid',
          { userUuid },
        )
        .where(
          `EXISTS (
            SELECT 1 FROM jsonb_array_elements(${alias}."${columnName}") as el 
            WHERE el->>'traduction' ILIKE :term
          )`,
          { term: termLike },
        )
        .take(limit)
        .getMany();

      // Transform result to return LibraryItem with the specific type populated
      const mapped = data.map(
        (
          item:
            | Kanji
            | Adjectives
            | Counters
            | Kana
            | Onomatopoeia
            | Radicals
            | Numbers
            | Vocabulary,
        ) => {
          const libraryItem = item.libraryItem;
          // Attach the item to the libraryItem on the correct property (child-to-parent reverse mapping simulation)
          delete item.libraryItem;
          libraryItem[prop] = item;

          // Create a plain object with unlock status fields explicitly included
          const libraryUnlocked = !!libraryItem.section?.library?.user;
          const sectionUnlocked = !!libraryItem.section?.sectionUser;

          // Map hiragana and romaji based on type
          let hiragana: string | null = null;
          let romaji: string | null = null;

          switch (type) {
            case LibraryItemTypeEnum.KANA:
              romaji = (item as Kana).romaji?.hepburn || null;
              hiragana = (item as Kana).word || null;
              break;
            case LibraryItemTypeEnum.KANJI:
              romaji = null;
              hiragana = null;
              break;
            case LibraryItemTypeEnum.NUMBERS:
              romaji = (item as Numbers).romanNumber || null;
              hiragana = null;
              break;
            case LibraryItemTypeEnum.ONOMATOPOEIA:
              romaji = (item as Onomatopoeia).wordRomaji || null;
              hiragana = (item as Onomatopoeia).word || null;
              break;
            case LibraryItemTypeEnum.RADICAL:
            case LibraryItemTypeEnum.COUNTER:
            case LibraryItemTypeEnum.ADJECTIVE:
            case LibraryItemTypeEnum.VOCABULARY:
              romaji = (item as Adjectives | Counters | Radicals | Vocabulary).wordRomaji || null;
              hiragana =
                (item as Adjectives | Counters | Radicals | Vocabulary).wordHiragana || null;
              break;
          }

          return {
            ...libraryItem,
            unlocked: libraryUnlocked && sectionUnlocked,
            libraryUnlocked,
            sectionUnlocked,
            hiragana,
            romaji,
          };
        },
      );

      results[type] = mapped as (LibraryItem & {
        unlocked: boolean;
        libraryUnlocked: boolean;
        sectionUnlocked: boolean;
        hiragana: string | null;
        romaji: string | null;
      })[];
    }

    return results;
  }
}
