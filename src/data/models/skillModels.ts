import { Ability } from './ancestryModels';

export class SkillProficiency {
  name: Skill;
  trainingLevel: TrainingLevel;
  custom?: string;

  constructor(n: Skill, t: TrainingLevel, c?: string) {
    this.name = n;
    this.trainingLevel = t;
    if (c) this.custom = c;
  }
}

export class SkillOption {
  name: Skill;
  keyAbility: Ability;

  constructor(n: Skill, kA: Ability) {
    this.name = n;
    this.keyAbility = kA;
  }
}

export const SKILL_OPTIONS = [
  new SkillOption('Acrobatics', 'Dexterity'),
  new SkillOption('Arcana', 'Intelligence'),
  new SkillOption('Athletics', 'Strength'),
  new SkillOption('Crafting', 'Intelligence'),
  new SkillOption('Deception', 'Charisma'),
  new SkillOption('Diplomacy', 'Charisma'),
  new SkillOption('Intimidation', 'Charisma'),
  new SkillOption('Lore', 'Intelligence'),
  new SkillOption('Medicine', 'Wisdom'),
  new SkillOption('Nature', 'Wisdom'),
  new SkillOption('Occultism', 'Intelligence'),
  new SkillOption('Performance', 'Charisma'),
  new SkillOption('Religion', 'Wisdom'),
  new SkillOption('Society', 'Intelligence'),
  new SkillOption('Stealth', 'Dexterity'),
  new SkillOption('Survival', 'Wisdom'),
  new SkillOption('Thievery', 'Dexterity'),
] as const;

export const SKILLS = [
  'Acrobatics',
  'Arcana',
  'Athletics',
  'Crafting',
  'Deception',
  'Diplomacy',
  'Intimidation',
  'Lore',
  'Medicine',
  'Nature',
  'Occultism',
  'Performance',
  'Religion',
  'Society',
  'Stealth',
  'Survival',
  'Thievery',
] as const;
export type Skill = typeof SKILLS[number];

export const TRAINING_LEVELS = [
  'Untrained',
  'Trained',
  'Expert',
  'Master',
  'Legendary',
] as const;
export type TrainingLevel = typeof TRAINING_LEVELS[number];
