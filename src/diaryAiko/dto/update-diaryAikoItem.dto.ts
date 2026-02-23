import { PartialType } from '@nestjs/swagger';
import { CreateDiaryAikoItemDto } from './create-diaryAikoItem.dto';

export class UpdateDiaryAikoItemDto extends PartialType(CreateDiaryAikoItemDto) {}
