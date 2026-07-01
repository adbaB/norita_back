import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

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
    enum: ['chip', 'drop_zone', 'option'],
    default: 'option',
    required: false,
  })
  @IsOptional()
  @IsIn(['chip', 'drop_zone', 'option'], { message: 'role must be chip | drop_zone | option' })
  role?: 'chip' | 'drop_zone' | 'option' = 'option';

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

export class UpdateActivityOptionDTO {
  @ApiProperty({ description: 'UUID of the option to update', type: String })
  @IsString()
  uuid: string;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'order must be a number' })
  order?: number;

  @ApiProperty({ enum: ['chip', 'drop_zone', 'option'], required: false })
  @IsOptional()
  @IsIn(['chip', 'drop_zone', 'option'])
  role?: 'chip' | 'drop_zone' | 'option';

  @ApiProperty({ type: String, nullable: true, required: false })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiProperty({ type: String, nullable: true, required: false })
  @IsOptional()
  @IsString()
  kana?: string;

  @ApiProperty({ type: String, nullable: true, required: false })
  @IsOptional()
  @IsString()
  kanji?: string;

  @ApiProperty({ type: String, nullable: true, required: false })
  @IsOptional()
  @IsString()
  romaji?: string;

  @ApiProperty({ type: String, nullable: true, required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ type: String, nullable: true, required: false })
  @IsOptional()
  @IsString()
  audio?: string;

  @ApiProperty({ type: Boolean, required: false })
  @IsOptional()
  @IsBoolean()
  isCorrect?: boolean;

  @ApiProperty({ type: String, nullable: true, required: false })
  @IsOptional()
  @IsString()
  groupKey?: string;

  @ApiProperty({ type: Number, nullable: true, required: false })
  @IsOptional()
  @IsInt()
  @IsPositive()
  correctPosition?: number;
}
