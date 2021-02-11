import { Ancestry } from './ancestryModels';

export class Source {
  ancestries: Ancestry[];

  constructor(ancestries: Ancestry[]) {
    this.ancestries = ancestries;
  }
}
