import { Ancestry } from '../models/ancestryModels';

export const CRBAncestries: Ancestry[] = [
  new Ancestry(
    'Dwarf',
    10,
    'Medium',
    20,
    ['Constitution', 'Wisdom', 'Free'],
    ['Charisma'],
    ['Common', 'Dwarven'],
    ['Darkvision']
  ),
  new Ancestry('Human', 8, 'Medium', 25, ['Free', 'Free'], [], ['Common'], []),
];
