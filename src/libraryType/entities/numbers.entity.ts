import { LibraryAudio } from '../interfaces/commons/audio.interface';
import { Kunyomi } from '../interfaces/commons/kunyomi.interface';
import { Onyomi } from '../interfaces/commons/onyomi.interface';
import { StepImage } from '../interfaces/commons/stepImage.interface';

export class Numbers {
  uuid: string;

  audio: LibraryAudio;

  kunyomi: Kunyomi[];

  lottie: string;

  note: string;

  onyomi: Onyomi[];

  package: string;

  romanNumber: string;

  stepImage: StepImage[];

  translation: string;

  word: string;
}
