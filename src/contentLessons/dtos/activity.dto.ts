import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { ActivityTypeEnum } from '../enums/activity-type.enum';
import { DifficultyEnum } from '../../lessons/enums/difficulty.enum';
import { ActivityConfig } from '../interfaces/activity-config.interface';
import { ActivityOptionDTO } from './activity-option.dto';

// ── Custom Type-Aware Config Validator ─────────────────────────────────────────

export function IsActivityConfig(validationOptions?: ValidationOptions): PropertyDecorator {
  return function (object: object, propertyName: string | symbol): void {
    registerDecorator({
      name: 'isActivityConfig',
      target: object.constructor,
      propertyName: propertyName as string,
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments): boolean {
          const dto = args.object as CreateActivityDTO;
          const type = dto.type;

          if (!type || !value || typeof value !== 'object') {
            return false;
          }

          const val = value as Record<string, unknown>;

          switch (type) {
            case ActivityTypeEnum.DRAG_AND_DROP_IMAGE:
              return typeof val.columns === 'number' && typeof val.showLabelsBelow === 'boolean';

            case ActivityTypeEnum.DRAG_AND_DROP_TEXT:
              return (
                typeof val.showKana === 'boolean' &&
                typeof val.showKanji === 'boolean' &&
                typeof val.showRomaji === 'boolean' &&
                typeof val.showAudio === 'boolean'
              );

            case ActivityTypeEnum.WORD_SELECTION:
              return (
                typeof val.categoryTerm === 'string' &&
                typeof val.columns === 'number' &&
                typeof val.minCorrectToPass === 'number'
              );

            case ActivityTypeEnum.MULTIPLE_CHOICE: {
              if (
                !Array.isArray(val.questions) ||
                typeof val.shuffleOptions !== 'boolean' ||
                typeof val.optionsPerQuestion !== 'number'
              ) {
                return false;
              }
              const questions = val.questions as unknown[];
              return questions.every((item: unknown) => {
                if (!item || typeof item !== 'object') return false;
                const q = item as Record<string, unknown>;
                return (
                  typeof q.id === 'string' &&
                  typeof q.text === 'string' &&
                  (q.translation === undefined || typeof q.translation === 'string') &&
                  (q.audio === undefined || typeof q.audio === 'string')
                );
              });
            }

            case ActivityTypeEnum.FILL_IN_THE_BLANK: {
              if (
                !Array.isArray(val.sentences) ||
                typeof val.showWordBank !== 'boolean' ||
                typeof val.showKanjiToggle !== 'boolean'
              ) {
                return false;
              }
              const sentences = val.sentences as unknown[];
              return sentences.every((item: unknown) => {
                if (!item || typeof item !== 'object') return false;
                const s = item as Record<string, unknown>;
                return (
                  typeof s.id === 'string' &&
                  typeof s.template === 'string' &&
                  (s.translation === undefined || typeof s.translation === 'string') &&
                  (s.audio === undefined || typeof s.audio === 'string')
                );
              });
            }

            case ActivityTypeEnum.WORD_ORDER:
              return (
                typeof val.sourceText === 'string' &&
                typeof val.sourceLang === 'string' &&
                typeof val.correctSentence === 'string' &&
                typeof val.targetLang === 'string' &&
                typeof val.showKanjiToggle === 'boolean' &&
                typeof val.shuffleChips === 'boolean'
              );

            case ActivityTypeEnum.LISTEN_AND_SELECT: {
              if (
                typeof val.audioUrl !== 'string' ||
                typeof val.autoPlay !== 'boolean' ||
                typeof val.maxReplays !== 'number' ||
                typeof val.showTranscript !== 'boolean' ||
                typeof val.transcript !== 'string' ||
                (val.transcriptTranslation !== undefined &&
                  typeof val.transcriptTranslation !== 'string')
              ) {
                return false;
              }
              if (val.explanations !== undefined) {
                if (!Array.isArray(val.explanations)) return false;
                const explanations = val.explanations as unknown[];
                return explanations.every((item: unknown) => {
                  if (!item || typeof item !== 'object') return false;
                  const exp = item as Record<string, unknown>;
                  return (
                    typeof exp.word === 'string' &&
                    typeof exp.meaning === 'string' &&
                    (exp.audio === undefined || typeof exp.audio === 'string')
                  );
                });
              }
              return true;
            }

            case ActivityTypeEnum.FREE_WRITING: {
              if (
                typeof val.audioUrl !== 'string' ||
                typeof val.autoPlay !== 'boolean' ||
                typeof val.maxReplays !== 'number' ||
                !Array.isArray(val.correctAnswers) ||
                !(val.correctAnswers as unknown[]).every(
                  (ans: unknown) => typeof ans === 'string',
                ) ||
                !['text', 'kana', 'romaji'].includes(val.inputType as string) ||
                typeof val.maxLength !== 'number' ||
                typeof val.caseSensitive !== 'boolean' ||
                (val.placeholder !== undefined && typeof val.placeholder !== 'string')
              ) {
                return false;
              }
              if (val.explanations !== undefined) {
                if (!Array.isArray(val.explanations)) return false;
                const explanations = val.explanations as unknown[];
                return explanations.every((item: unknown) => {
                  if (!item || typeof item !== 'object') return false;
                  const exp = item as Record<string, unknown>;
                  return typeof exp.label === 'string' && typeof exp.text === 'string';
                });
              }
              return true;
            }

            default:
              return false;
          }
        },
        defaultMessage(args: ValidationArguments): string {
          const dto = args.object as CreateActivityDTO;
          return `config properties do not match the required shape for ActivityType ${dto.type}`;
        },
      },
    });
  };
}

// ── DTOs ───────────────────────────────────────────────────────────────────────

export class CreateActivityDTO {
  @ApiProperty({ description: 'Type of activity', enum: ActivityTypeEnum })
  @IsNotEmpty({ message: 'type should not be empty' })
  @IsEnum(ActivityTypeEnum, { message: 'type must be a valid ActivityTypeEnum value' })
  type: ActivityTypeEnum;

  @ApiProperty({
    description: 'Difficulty level of the activity',
    enum: DifficultyEnum,
    default: DifficultyEnum.EASY,
    required: false,
  })
  @IsOptional()
  @IsEnum(DifficultyEnum, { message: 'difficulty must be a valid DifficultyEnum value' })
  difficulty?: DifficultyEnum = DifficultyEnum.EASY;

  @ApiProperty({ description: 'Order of this activity within the lesson content', type: Number })
  @IsNotEmpty({ message: 'order should not be empty' })
  @IsInt({ message: 'order must be an integer' })
  @IsPositive({ message: 'order must be a positive number' })
  order: number;

  @ApiProperty({ description: 'Instruction text shown to the user', type: String })
  @IsNotEmpty({ message: 'instruction should not be empty' })
  @IsString({ message: 'instruction must be a string' })
  instruction: string;

  @ApiProperty({
    description: 'URL of the audio instruction',
    type: String,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'audioInstruction must be a string' })
  audioInstruction?: string;

  @ApiProperty({
    description:
      'Type-specific configuration object (DragDropImageConfig | DragDropTextConfig | WordSelectionConfig | ...)',
    type: Object,
    required: true,
  })
  @IsNotEmpty({ message: 'config should not be empty' })
  @IsActivityConfig()
  config: ActivityConfig;

  @ApiProperty({
    description: 'Feedback message shown when the user answers correctly',
    type: String,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'feedbackCorrect must be a string' })
  feedbackCorrect?: string;

  @ApiProperty({
    description: 'Feedback message shown when the user answers incorrectly',
    type: String,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'feedbackIncorrect must be a string' })
  feedbackIncorrect?: string;

  @ApiProperty({
    description: 'URL of the audio played on correct answer',
    type: String,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'audioCorrect must be a string' })
  audioCorrect?: string;

  @ApiProperty({
    description: 'URL of the audio played on incorrect answer',
    type: String,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'audioIncorrect must be a string' })
  audioIncorrect?: string;

  @ApiProperty({
    description: 'Points awarded for completing this activity',
    type: Number,
    default: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'points must be a number' },
  )
  points?: number = 10;

  @ApiProperty({
    description: 'Options/items belonging to this activity',
    type: () => [ActivityOptionDTO],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'options must be an array' })
  @ValidateNested({ each: true })
  @Type(() => ActivityOptionDTO)
  options?: ActivityOptionDTO[] = [];
}

export class UpdateActivityDTO extends PartialType(CreateActivityDTO) {}
