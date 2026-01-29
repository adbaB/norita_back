import { LibraryItemTypeEnum } from 'src/library/enums/library.enum';
import { TraductionSpanish } from 'src/libraryType/interfaces/commons/traductionSpanish.interface';

export interface SearchResponse {
  uuid: string;
  type: LibraryItemTypeEnum;
  package: string;
  unlocked: boolean;
  libraryUnlocked: boolean;
  sectionUnlocked: boolean;
  hiragana: string | null;
  romaji: string | null;
  word: string;
  traductionSpanish: TraductionSpanish[];
}
