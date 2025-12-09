export interface AdjectiveBase {
  baseHiragana: string;
  baseKanji?: string;
  baseRomaji: string;
  // searchKanji: SearchKanji[]; // Skipping for now or treating as generic json if needed, referencing DataAdjective.swift
}
