<template>
  <q-page>
    <q-tabs v-model="tabs">
      <q-tab name="creation" label="Creation" />
      <q-tab name="skills" label="Skills" />
    </q-tabs>

    <q-tab-panels v-model="tabs">
      <q-tab-panel name="creation" class="q-gutter-md q-pa-md">
        <div class="row q-gutter-md">
          <q-card class="col">
            <q-card-section>Hit Points</q-card-section>
            <q-card-section>{{ hitPoints }}</q-card-section>
          </q-card>
        </div>
        <div class="row q-gutter-md">
          <q-card class="col">
            <q-card-section>Strength</q-card-section>
            <q-card-section>{{ attributes.strength }}</q-card-section>
          </q-card>
          <q-card class="col">
            <q-card-section>Dexterity</q-card-section>
            <q-card-section>{{ attributes.dexterity }}</q-card-section>
          </q-card>
          <q-card class="col">
            <q-card-section>Constitution</q-card-section>
            <q-card-section>{{ attributes.constitution }}</q-card-section>
          </q-card>
          <q-card class="col">
            <q-card-section>Intelligence</q-card-section>
            <q-card-section>{{ attributes.intelligence }}</q-card-section>
          </q-card>
          <q-card class="col">
            <q-card-section>Wisdom</q-card-section>
            <q-card-section>{{ attributes.wisdom }}</q-card-section>
          </q-card>
          <q-card class="col">
            <q-card-section>Charisma</q-card-section>
            <q-card-section>{{ attributes.charisma }}</q-card-section>
          </q-card>
        </div>

        <div class="row q-gutter-md">
          <q-select
            label="Ancestry"
            v-model="ancestry"
            :options="source.ancestries"
            option-label="name"
            class="col"
            :display-value="ancestry ? ancestry.name : ''"
          />
        </div>
        <div class="row q-gutter-md">
          <q-select
            label="Ability Boost"
            v-for="(slot, index) in abilityBoosts.ancestry"
            v-model="abilityBoosts.ancestry[index]"
            :options="availableAncestryBoons[index]"
            :key="index"
            class="col"
          />
        </div>

        <div class="row q-gutter-md">
          <q-select
            label="Background"
            v-model="background"
            :options="source.backgrounds"
            option-label="name"
            class="col"
            :display-value="background ? background.name : ''"
          />
        </div>

        <div class="row q-gutter-md">
          <q-select
            label="Ability Boost"
            v-for="(slot, index) in abilityBoosts.background"
            v-model="abilityBoosts.background[index]"
            :options="availableBackgroundBoons[index]"
            :key="index"
            class="col"
          />
        </div>

        <div class="row q-gutter-md">
          <q-select
            label="Class"
            v-model="characterClass"
            :options="source.classes"
            option-label="name"
            class="col"
            :display-value="characterClass ? characterClass.name : ''"
          />
        </div>
      </q-tab-panel>
      <q-tab-panel name="skills" class="q-gutter-md q-pa-md">
        <q-list bordered>
          <q-item v-for="skill in skillArray" :key="skill.name">
            <q-item-section>
              <q-item-label>
                {{ skill.name }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ skill.value }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              {{ skill.training }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { CharacterAttributes } from '../data/models/character';
import CRB from '../data/coreRuleBook';
import { Source } from 'src/data/models/source';
import {
  ABILITY_OPTIONS,
  AbilitySlot,
  Ancestry,
  Ability,
  AbilityModifier,
} from 'src/data/models/ancestryModels';
import { Background } from 'src/data/models/backgroundModels';
import { Class } from 'src/data/models/classModels';
import {
  Skill,
  SkillEntry,
  SkillProficiency,
  SKILLS,
  SKILL_OPTIONS,
} from 'src/data/models/skillModels';
import {
  mapUppercaseToLowercase,
  trainingProficiency,
} from 'src/scripts/skills';

@Options({
  watch: {
    ancestry: [
      {
        handler: 'ancestryChanged',
        immediate: false,
        deep: false,
      },
    ],
    background: [
      {
        handler: 'backgroundChanged',
        immediate: false,
        deep: false,
      },
    ],
  },
})
export default class PageIndex extends Vue {
  tabs = 'creation';

  //Character Selection
  level = 1;
  ancestry: Ancestry | null = null;
  background: Background | null = null;
  characterClass: Class | null = null;

  abilityBoosts: { ancestry: AbilitySlot[]; background: AbilitySlot[] } = {
    ancestry: [],
    background: [],
  };
  abilityFlaws: { ancestry: AbilitySlot[] } = { ancestry: [] };

  sources: Source[] = [CRB];

  get hitPoints() {
    let hp = 0;

    if (this.ancestry) hp += this.ancestry.hitPoints;

    if (this.characterClass)
      hp +=
        this.level *
        (this.characterClass.hitPoints + this.attributeModifiers.constitution);

    return hp;
  }

  get attributes() {
    const data = new CharacterAttributes(10, 10, 10, 10, 10, 10);

    //Add Free Ancestry Boons
    let abilityBoosts: AbilitySlot[] = [];

    //Add Ancestry Boons
    this.pushAbilityModifier(
      <AbilityModifier[]>this.abilityBoosts.ancestry,
      abilityBoosts
    );
    if (this.ancestry)
      this.pushAbilityModifier(this.ancestry?.abilityBoosts, abilityBoosts);

    //Add Background Boons
    this.pushAbilityModifier(
      <AbilityModifier[]>this.abilityBoosts.background,
      abilityBoosts
    );
    if (this.background)
      this.pushAbilityModifier(this.background.abilityBoosts, abilityBoosts);

    //Add Class Boons
    if (this.characterClass)
      this.pushAbilityModifier(this.characterClass.keyAbility, abilityBoosts);

    abilityBoosts.forEach((el) => {
      if (el) this.addAbilityScore(data, el, 'add');
    });

    let abilityFlaws = [...this.abilityFlaws.ancestry];

    //Add Ancestry Flaw(s)
    if (this.ancestry)
      this.pushAbilityModifier(this.ancestry.abilityFlaws, abilityFlaws);

    abilityFlaws.forEach((el) => {
      if (el) this.addAbilityScore(data, el, 'subtract');
    });

    return data;
  }

  get attributeModifiers() {
    let modifiers = {
      strength: this.calculateModifier(this.attributes.strength),
      dexterity: this.calculateModifier(this.attributes.dexterity),
      constitution: this.calculateModifier(this.attributes.constitution),
      intelligence: this.calculateModifier(this.attributes.intelligence),
      wisdom: this.calculateModifier(this.attributes.wisdom),
      charisma: this.calculateModifier(this.attributes.charisma),
    };
    return modifiers;
  }

  calculateModifier(attr: number) {
    return (attr - 10) / 2;
  }

  get availableAncestryBoons() {
    let res: Ability[][] = [];
    if (this.ancestry)
      res = this.getAvailableBoons(this.ancestry, this.abilityBoosts.ancestry);
    return res;
  }

  get availableBackgroundBoons() {
    let res: Ability[][] = [];
    if (this.background)
      res = this.getAvailableBoons(
        this.background,
        this.abilityBoosts.background
      );
    return res;
  }

  get skillArray() {
    const skillProficiencies: SkillProficiency[] = [];
    const skillEntries: SkillEntry[] = [];

    const classSkills: SkillProficiency[] = [];
    if (this.characterClass)
      this.characterClass.progress.forEach((level) => {
        if (level.skills)
          level.skills
            .filter((skill) => SKILLS.includes(<Skill>skill.name.toString()))
            .forEach((skill) => {
              classSkills.push(
                new SkillProficiency(
                  skill.name,
                  skill.trainingLevel,
                  skill.custom
                )
              );
            });
      });

    skillProficiencies.push(...classSkills);

    skillProficiencies.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    SKILLS.forEach((el) => {
      let array = skillProficiencies
        .filter((prof) => prof.name == el)
        .sort((a, b) => {
          let tPa = trainingProficiency(a.trainingLevel);
          let tPb = trainingProficiency(b.trainingLevel);
          if (tPa > tPb) return -1;
          if (tPa < tPb) return 1;
          return 0;
        });
      if (array.length > 0) {
        let keyAbility = SKILL_OPTIONS.find((opt) => opt.name == array[0].name)
          ?.keyAbility;

        if (keyAbility) {
          skillEntries.push(
            new SkillEntry(
              <Skill>array[0].name,
              keyAbility,
              this.attributes[mapUppercaseToLowercase(keyAbility)],
              array[0].trainingLevel,
              trainingProficiency(array[0].trainingLevel),
              0
            )
          );
        }
      } else {
        let keyAbility = SKILL_OPTIONS.find((opt) => opt.name == el)
          ?.keyAbility;
        if (keyAbility)
          skillEntries.push(
            new SkillEntry(
              el,
              keyAbility,
              this.attributes[mapUppercaseToLowercase(keyAbility)],
              'Untrained',
              0,
              0
            )
          );
      }
    });

    return skillEntries;
  }

  get source() {
    return new Source(CRB.ancestries, CRB.backgrounds, CRB.feats, CRB.classes);
  }

  getAvailableBoons(src: Ancestry | Background, choice: AbilitySlot[]) {
    let options: Ability[][] = [];
    let boonOptions = [...ABILITY_OPTIONS];

    src?.abilityBoosts.forEach((el) => {
      if (Array.isArray(el)) options.push(el);
    });
    let remainingOptions = src?.abilityBoosts.length - options.length;

    for (let i = 0; i < remainingOptions; i++) {
      options.push(boonOptions);
    }

    let usedBoons: Ability[] = [];

    //Add standard Ancestry / Background Boons to filter
    if (src) this.pushAbilityModifier(src.abilityBoosts, usedBoons);

    //add previously selected Boons to filter
    choice.forEach((el) => {
      if (el) usedBoons.push(el);
    });

    let filteredOptions: Ability[][] = [];
    options.forEach((el) => {
      filteredOptions.push(el.filter((opt) => !usedBoons.includes(opt)));
    });

    return filteredOptions;
  }

  pushAbilityModifier(
    source: AbilityModifier[],
    target: Ability[] | AbilitySlot[]
  ) {
    source.forEach((el) => {
      if (el != 'Free' && !Array.isArray(el)) target.push(el);
    });
  }

  addAbilityScore(
    array: CharacterAttributes,
    attr: Ability,
    mod: 'add' | 'subtract'
  ) {
    let change = 2;
    if (mod == 'subtract') change = change * -1;

    switch (attr) {
      case 'Strength':
        array.strength += change;
        break;

      case 'Dexterity':
        array.dexterity += change;
        break;

      case 'Constitution':
        array.constitution += change;
        break;

      case 'Intelligence':
        array.intelligence += change;
        break;

      case 'Wisdom':
        array.wisdom += change;
        break;

      case 'Charisma':
        array.charisma += change;
        break;

      default:
        break;
    }

    return array;
  }

  ancestryChanged(newAncestry: Ancestry, oldAncestry: Ancestry | null) {
    if (newAncestry != oldAncestry) {
      let slots: AbilitySlot[] = [];
      this.ancestry?.abilityBoosts
        .filter((el) => el == 'Free')
        .forEach(() => slots.push(null));
      this.abilityBoosts.ancestry = slots;
    }
  }
  backgroundChanged(
    newBackground: Background,
    oldBackground: Background | null
  ) {
    if (newBackground != oldBackground) {
      let slots: AbilitySlot[] = [];
      this.background?.abilityBoosts
        .filter((el) => 'Free' || Array.isArray(el))
        .forEach(() => slots.push(null));
      this.abilityBoosts.background = slots;
    }
  }
}
</script>
