import { VariantPosition } from './variantPosition.interface';

export interface Variant {
  variantHiragana: string;
  variantPosition: VariantPosition[];
  variantRadical: string;
  variantRomaji: string;
  variantStepsInteger: number;
}
