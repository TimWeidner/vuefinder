import { CRBLanguage } from '../coreRuleBook/languages';

export class Ancestry {
  name: string;
  hitPoints: number;
  size: Size;
  speed: number;
  abilityBoosts: AbilityModifier[];
  abilityFlaws: AbilityModifier[];
  languages: Language[];
  ancestryFeatures: AncestryFeature[];
  ///TODO: ancestryItems

  constructor(
    name: string,
    hp: number,
    size: Size,
    speed: number,
    ab: AbilityModifier[],
    af: AbilityModifier[],
    l: Language[],
    afeat: AncestryFeature[]
  ) {
    this.name = name;
    this.hitPoints = hp;
    this.size = size;
    this.speed = speed;
    this.abilityBoosts = ab;
    this.abilityFlaws = af;
    this.languages = l;
    this.ancestryFeatures = afeat;
  }
}

export type AbilityModifier = Ability | 'Free' | Ability[];

export const ABILITY_OPTIONS = [
  'Strength',
  'Dexterity',
  'Constitution',
  'Intelligence',
  'Wisdom',
  'Charisma',
] as const;
export type Ability = typeof ABILITY_OPTIONS[number];

export type Size =
  | 'Tiny'
  | 'Small'
  | 'Medium'
  | 'Large'
  | 'Huge'
  | 'Gargantuan';

export type AbilitySlot = Ability | null;

export type Language = CRBLanguage;

export type AncestryFeature = 'Darkvision';
