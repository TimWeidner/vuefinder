import { Ability } from './ancestryModels';
import { SkillProficiency, TrainingLevel } from './skillModels';

export class Class {
  name: string;
  keyAbility: Ability[];
  hitPoints: number;
  progress: Level[];

  constructor(n: string, kA: Ability[], hp: number, progress: Level[]) {
    this.name = n;
    this.keyAbility = kA;
    this.hitPoints = hp;
    this.progress = progress;
  }
}

export class Level {
  perception?: TrainingLevel;
  savingThrows?: SkillProficiency[];
  skills?: SkillProficiency[];
  //TODO: Weapon Proficiencies
  //TODO: Armor Proficiencies
  //TODO: Spells
  //TODO: Feat

  constructor(obj: {
    perception?: TrainingLevel;
    savingThrows?: SkillProficiency[];
    skills?: SkillProficiency[];
  }) {
    if (obj.perception) this.perception = obj.perception;
    if (obj.savingThrows) this.savingThrows = obj.savingThrows;
    if (obj.skills) this.skills = obj.skills;
  }
}
