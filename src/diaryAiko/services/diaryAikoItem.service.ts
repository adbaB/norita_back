import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDiaryAikoItemDto } from '../dto/create-diaryAikoItem.dto';
import { UpdateDiaryAikoItemDto } from '../dto/update-diaryAikoItem.dto';
import { DiaryAikoItem } from '../entities/diaryAikoItem.entity';
import { UserDiaryAikoItem } from '../entities/userDiaryAikoItem.entity';
import { formatResponse, getSkip } from 'src/utils/functions';
import { FormatResponse } from 'src/utils/responses';
import { DiaryAikoService } from './diaryAiko.service';
import { LessonsService } from 'src/lessons/services/lessons.service';

export type DiaryAikoItemResponse = DiaryAikoItem & { isUnlocked?: boolean };

@Injectable()
export class DiaryAikoItemService {
  constructor(
    @InjectRepository(DiaryAikoItem)
    private readonly itemRepository: Repository<DiaryAikoItem>,
    @InjectRepository(UserDiaryAikoItem)
    private readonly userItemRepository: Repository<UserDiaryAikoItem>,
    private readonly lessonService: LessonsService,
    private readonly sectionService: DiaryAikoService,
  ) {}

  async create(createDto: CreateDiaryAikoItemDto): Promise<DiaryAikoItem> {
    const section = await this.sectionService.findOne(createDto.sectionUuid);
    if (!section) {
      throw new NotFoundException(`Section with UUID ${createDto.sectionUuid} not found`);
    }

    const lesson = await this.lessonService.findByUUID(createDto.lessonUuid);
    if (!lesson) {
      throw new NotFoundException(`Lesson with UUID ${createDto.lessonUuid} not found`);
    }

    const item = this.itemRepository.create({
      ...createDto,
      section,
    });
    return await this.itemRepository.save(item);
  }

  async findAllBySection(
    sectionUuid: string,
    limit: number,
    page: number,
    userUuid: string,
  ): Promise<FormatResponse<Record<string, unknown>>> {
    const skip = getSkip(limit, page);
    const [items, total] = await this.itemRepository.findAndCount({
      where: { section: { uuid: sectionUuid } },
      take: limit,
      skip,
      order: { createdAt: 'ASC' },
    });
    const userUnlocks = await this.userItemRepository.find({
      where: { user: { uuid: userUuid }, item: { section: { uuid: sectionUuid } } },
      relations: ['item'],
    });

    const itemsWithUnlockStatus = items.map((item) => {
      const userUnlockInfo = userUnlocks.find((u) => u.item.uuid === item.uuid);
      const isUnlockable = !!userUnlockInfo;
      const isUnlocked = isUnlockable && userUnlockInfo!.isUnlocked;

      return {
        uuid: item.uuid,
        nameRomaji: item.nameRomaji,
        nameKanji: item.nameKanji,
        image: isUnlocked ? item.imageUnlocked : item.imageLocked,
        isUnlocked,
        isUnlockable,
      } as Record<string, unknown>;
    });

    return formatResponse(itemsWithUnlockStatus, page, limit, total);
  }

  async findOne(uuid: string, userUuid?: string): Promise<DiaryAikoItemResponse> {
    const item = await this.itemRepository.findOne({ where: { uuid } });
    if (!item) {
      throw new NotFoundException(`Item with UUID ${uuid} not found`);
    }

    if (userUuid) {
      const unlock = await this.userItemRepository.findOne({
        where: { user: { uuid: userUuid }, item: { uuid: item.uuid } },
      });
      const isUnlocked = unlock ? unlock.isUnlocked : false;
      if (!isUnlocked) {
        throw new ForbiddenException("You haven't unlocked this item yet");
      }
      return { ...item, isUnlocked };
    }

    return item;
  }

  async unlockItem(uuid: string, userUuid: string): Promise<void> {
    const unlock = await this.userItemRepository.findOne({
      where: { user: { uuid: userUuid }, item: { uuid } },
    });

    if (!unlock) {
      throw new NotFoundException('You do not have access to unlock this item');
    }

    if (unlock.isUnlocked) {
      return;
    }

    unlock.isUnlocked = true;
    await this.userItemRepository.save(unlock);
  }

  async update(uuid: string, updateDto: UpdateDiaryAikoItemDto): Promise<DiaryAikoItem> {
    const item = await this.findOne(uuid);
    this.itemRepository.merge(item, updateDto);
    return await this.itemRepository.save(item);
  }

  async remove(uuid: string): Promise<void> {
    const item = await this.findOne(uuid);
    await this.itemRepository.remove(item);
  }
}
