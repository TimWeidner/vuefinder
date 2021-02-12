import { Ancestry } from './ancestryModels';
import { Background } from './backgroundModels';
import { Feat } from './featModels';

export class Source {
  ancestries: Ancestry[];
  backgrounds: Background[];
  feats: Feat[];

  constructor(
    ancestries: Ancestry[],
    backgrounds: Background[],
    feats: Feat[]
  ) {
    this.ancestries = ancestries;
    this.backgrounds = backgrounds;
    this.feats = feats;
  }
}
