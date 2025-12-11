import { Word } from '../commons/word.interface';
import { WordHiragana } from '../commons/wordHiragana.interface';
import { WordRomaji } from '../commons/wordRomaji.interface';

export interface AdjectiveBase {
  baseHiragana: string;
  baseKanji?: string;
  baseRomaji: string;
  // searchKanji: SearchKanji[]; // Skipping for now or treating as generic json if needed, referencing DataAdjective.swift

  word: Word[];
  wordHiragana: WordHiragana[];
  wordRomaji: WordRomaji[];
}
