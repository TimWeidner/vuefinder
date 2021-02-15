import { Ability } from 'src/data/models/ancestryModels';
import { TrainingLevel } from 'src/data/models/skillModels';

export function trainingProficiency(training: TrainingLevel) {
  if (training == 'Legendary') return 8;
  if (training == 'Master') return 6;
  if (training == 'Expert') return 4;
  if (training == 'Trained') return 2;
  return 0;
}

export function mapUppercaseToLowercase(ability: Ability) {
  switch (ability) {
    case 'Strength':
      return 'strength';

    case 'Dexterity':
      return 'dexterity';

    case 'Constitution':
      return 'constitution';

    case 'Intelligence':
      return 'intelligence';

    case 'Wisdom':
      return 'wisdom';

    case 'Charisma':
      return 'charisma';
  }
}
