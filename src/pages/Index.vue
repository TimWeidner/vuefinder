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
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { CharacterAttributes } from '../data/models/character';

@Options({})
export default class PageIndex extends Vue {
  ancestry = undefined;

  get attributes() {
    const data = new CharacterAttributes(10, 10, 10, 10, 10, 10);
    return data;
  }
}
</script>
