import { Trait } from './traitModels';

export class Feat {
  name: FeatName;
  traits: Trait[];
  //TODO: Prerequesites

  constructor(n: FeatName, t: Trait[]) {
    this.name = n;
    this.traits = t;
  }
}

export const FEAT_NAMES = ['Student of the Canon', 'Steady Balance'] as const;
export type FeatName = typeof FEAT_NAMES[number];
