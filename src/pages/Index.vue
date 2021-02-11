<template>
  <q-page class="q-pa-md">
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
        :options="availableAncestryBoons"
        :key="index"
        class="col"
      />
    </div>
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
} from 'src/data/models/ancestryModels';

@Options({
  watch: {
    ancestry: [
      {
        handler: 'ancestryChanged',
        immediate: false,
        deep: false,
      },
    ],
  },
})
export default class PageIndex extends Vue {
  ABILITY_OPTIONS = ABILITY_OPTIONS;

  //Character Selection
  ancestry: Ancestry | null = null;
  abilityBoosts: { ancestry: AbilitySlot[] } = { ancestry: [] };
  abilityFlaws: { ancestry: AbilitySlot[] } = { ancestry: [] };

  sources: Source[] = [CRB];

  get attributes() {
    const data = new CharacterAttributes(10, 10, 10, 10, 10, 10);

    //Add Free Ancestry Boons
    let abilityBoosts = [...this.abilityBoosts.ancestry];

    //Add Ancestry Boons
    this.ancestry?.abilityBoosts.forEach((el) => {
      if (el != 'Free') abilityBoosts.push(el);
    });

    abilityBoosts.forEach((el) => {
      if (el) this.addAbilityScore(data, el, 'add');
    });

    let abilityFlaws = [...this.abilityFlaws.ancestry];

    //Add Ancestry Flaw(s)
    this.ancestry?.abilityFlaws.forEach((el) => {
      if (el != 'Free') abilityFlaws.push(el);
    });

    abilityFlaws.forEach((el) => {
      if (el) this.addAbilityScore(data, el, 'subtract');
    });

    return data;
  }

  get availableAncestryBoons() {
    let boonOptions = <Ability[]>JSON.parse(JSON.stringify(ABILITY_OPTIONS));

    let usedBoons: Ability[] = [];
    //Add Standard Ancestry Boons to filter
    this.ancestry?.abilityBoosts.forEach((el) => {
      if (el != 'Free') usedBoons.push(el);
    });

    //Add previously selected Ancestry Boons to filter
    this.abilityBoosts.ancestry.forEach((el) => {
      if (el) usedBoons.push(el);
    });

    return boonOptions.filter((el) => !usedBoons.includes(el));
  }

  get source() {
    return new Source(CRB.ancestries);
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
}
</script>
