import { ConjugationPair } from './common/conjugationPair.interface';
import { FormValue } from './common/formValue.interface';

export interface Conjugations {
  pastDictionary: ConjugationPair;
  pastFormal: ConjugationPair;
  presentFutureDictionary: ConjugationPair;
  presentFutureFormal: ConjugationPair;
  teForm: FormValue;
}
