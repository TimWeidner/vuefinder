import { CRBLanguage } from '../coreRuleBook/languages';

export class Ancestry {
  hitPoints: number;
  size: Size;
  speed: number;
  abilityBoosts: AbilityModifier[];
  abilityFlaws: AbilityModifier[];
  languages: Language[];
  ancestryFeatures: AncestryFeature[];
  ///TODO: ancestryItems

  constructor(
    hp: number,
    size: Size,
    speed: number,
    ab: AbilityModifier[],
    af: AbilityModifier[],
    l: Language[],
    afeat: AncestryFeature[]
  ) {
    this.hitPoints = hp;
    this.size = size;
    this.speed = speed;
    this.abilityBoosts = ab;
    this.abilityFlaws = af;
    this.languages = l;
    this.ancestryFeatures = afeat;
  }
}

export type AbilityModifier =
  | 'Strength'
  | 'Dexterity'
  | 'Constitution'
  | 'Intelligence'
  | 'Wisdom'
  | 'Charisma'
  | 'Free';

export type Size =
  | 'Tiny'
  | 'Small'
  | 'Medium'
  | 'Large'
  | 'Huge'
  | 'Gargantuan';

export type Language = CRBLanguage;

export type AncestryFeature = 'Darkvision';
