import { AbilityModifier } from './ancestryModels';
import { FeatName } from './featModels';
import { SkillProficiency } from './skillModels';

export class Background {
  name: string;
  abilityBoosts: AbilityModifier[];
  skillProficiency: SkillProficiency[];
  feats: FeatName[];

  constructor(
    n: string,
    ab: AbilityModifier[],
    sp: SkillProficiency[],
    feats: FeatName[]
  ) {
    this.name = n;
    this.abilityBoosts = ab;
    this.skillProficiency = sp;
    this.feats = feats;
  }
}
