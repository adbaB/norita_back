import { IsEnum, IsNotEmpty } from 'class-validator';
import { TypeUnlockEnum } from '../enums/type-unlock.enum';

export class unlockLessonDTO {
  @IsEnum(TypeUnlockEnum)
  @IsNotEmpty({ message: 'type should not be empty' })
  type: TypeUnlockEnum;
}
