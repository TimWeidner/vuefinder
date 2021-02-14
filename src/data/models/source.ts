import { Ancestry } from './ancestryModels';
import { Background } from './backgroundModels';
import { Class } from './classModels';
import { Feat } from './featModels';

export class Source {
  ancestries: Ancestry[];
  backgrounds: Background[];
  feats: Feat[];
  classes: Class[];

  constructor(
    ancestries: Ancestry[],
    backgrounds: Background[],
    feats: Feat[],
    classes: Class[]
  ) {
    this.ancestries = ancestries;
    this.backgrounds = backgrounds;
    this.feats = feats;
    this.classes = classes;
  }
}
