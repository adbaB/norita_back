import { LibraryAudio } from './audio.interface';

export interface Example {
  audio?: LibraryAudio;
  kanji: string;
  romaji: string;
  traduction: string;
}
