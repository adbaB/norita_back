import { ConjugationPair } from './common/conjugationPair.interface';

export interface Conjugations {
  pastDictionary: ConjugationPair;
  pastFormal: ConjugationPair;
  presentFutureDictionary: ConjugationPair;
  presentFutureFormal: ConjugationPair;
  teForm: ConjugationPair;
}
