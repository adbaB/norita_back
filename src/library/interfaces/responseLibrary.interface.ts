import { Library } from '../entities/library.entity';

export interface ResponseLibrary {
  grammars: Library[];
  vocabularies: Library[];
  specialized: Library[];
}
