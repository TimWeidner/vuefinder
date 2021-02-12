import { Background } from '../models/backgroundModels';
import { SkillProficiency } from '../models/skillModels';

export const CRBBackgrounds = [
  new Background(
    'Acolyte',
    [['Wisdom', 'Intelligence'], 'Free'],
    [
      new SkillProficiency('Religion', 'Trained'),
      new SkillProficiency('Lore', 'Trained', 'Scribing'),
    ],
    ['Student of the Canon']
  ),
];
