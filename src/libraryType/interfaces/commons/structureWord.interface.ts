import { Word } from './word.interface';
import { WordHiragana } from './wordHiragana.interface';
import { WordRomaji } from './wordRomaji.interface';

export interface LoanHiragana {
  word: string;
}

export interface LoanRomaji {
  word: string;
}

export interface SearchKanji {
  kanji: string;
}

export interface StructureWord {
  loanHiragana?: LoanHiragana[];
  loanRomaji?: LoanRomaji[];
  searchKanji?: SearchKanji[];
  word: Word[];
  wordHiragana: WordHiragana[];
  wordRomaji: WordRomaji[];
}
