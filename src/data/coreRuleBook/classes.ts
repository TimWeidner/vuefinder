import { Class, Level } from '../models/classModels';
import { SkillProficiency } from '../models/skillModels';

export const CRBClasses: Class[] = [
  new Class('Cleric', ['Wisdom'], 8, [
    new Level({
      perception: 'Trained',
      savingThrows: [
        new SkillProficiency('Fortitude', 'Trained'),
        new SkillProficiency('Reflex', 'Trained'),
        new SkillProficiency('Will', 'Expert'),
      ],
      skills: [
        new SkillProficiency('Religion', 'Trained'),
        new SkillProficiency('Deity', 'Trained'),
        new SkillProficiency(2, 'Trained'),
      ],
    }),
  ]),
];
