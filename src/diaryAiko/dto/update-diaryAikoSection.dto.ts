import { PartialType } from '@nestjs/swagger';
import { CreateDiaryAikoSectionDto } from './create-diaryAikoSection.dto';

export class UpdateDiaryAikoSectionDto extends PartialType(CreateDiaryAikoSectionDto) {}
