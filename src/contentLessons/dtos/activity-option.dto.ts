import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import { ActivityOptionRoleEnum } from '../enums/activity-option-role.enum';

export class ActivityOptionDTO {
  @ApiProperty({ description: 'Display order of this option within the activity', type: Number })
  @IsInt({ message: 'order must be an integer' })
  @IsPositive({ message: 'order must be a positive number' })
  order: number;

  @ApiProperty({
    description:
      'Role of this option: ' +
      '"chip" = elemento arrastrable, ' +
      '"drop_zone" = zona de destino, ' +
      '"option" = opción seleccionable.',
    enum: ActivityOptionRoleEnum,
    default: ActivityOptionRoleEnum.OPTION,
    required: false,
  })
  @IsOptional()
  @IsEnum(ActivityOptionRoleEnum, { message: 'role must be a valid ActivityOptionRoleEnum value' })
  role?: ActivityOptionRoleEnum = ActivityOptionRoleEnum.OPTION;

  @ApiProperty({
    description: 'Visible text of the option (word, phrase, translation)',
    type: String,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'text must be a string' })
  text?: string;

  @ApiProperty({
    description: 'Kana representation',
    type: String,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'kana must be a string' })
  kana?: string;

  @ApiProperty({
    description: 'Kanji representation (optional spelling)',
    type: String,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'kanji must be a string' })
  kanji?: string;

  @ApiProperty({
    description: 'Romaji pronunciation aid (optional)',
    type: String,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'romaji must be a string' })
  romaji?: string;

  @ApiProperty({
    description: 'URL of the image (used in DragDropImage)',
    type: String,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'image must be a string' })
  image?: string;

  @ApiProperty({
    description: 'URL of the audio for this option',
    type: String,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'audio must be a string' })
  audio?: string;

  @ApiProperty({
    description: 'Whether this option is a correct answer (used in WordSelection)',
    type: Boolean,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isCorrect must be a boolean' })
  isCorrect?: boolean = false;

  @ApiProperty({
    description:
      'Pairing key for Drag & Drop and Multiple Choice. Options with the same groupKey belong to the same question/pair.',
    type: String,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'groupKey must be a string' })
  groupKey?: string;

  @ApiProperty({
    description:
      'Correct position of this chip in the sentence (1-based). Used in WORD_ORDER: ' +
      'chips sorted by correctPosition form the correct answer.',
    type: Number,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'correctPosition must be an integer' })
  @IsPositive({ message: 'correctPosition must be a positive number' })
  correctPosition?: number;
}
