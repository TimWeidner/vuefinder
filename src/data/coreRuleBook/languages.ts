export type CommonLanguage =
  | 'Common'
  | 'Draconic'
  | 'Dwarven'
  | 'Elven'
  | 'Gnomish'
  | 'Goblin'
  | 'Halfling'
  | 'Jotun'
  | 'Orcish'
  | 'Sylvan'
  | 'Undercomon';

export type UncommonLanguage =
  | 'Abyssal'
  | 'Aklo'
  | 'Aquan'
  | 'Auran'
  | 'Celestial'
  | 'Gnoll'
  | 'Ignan'
  | 'Infernal'
  | 'Necril'
  | 'Shadowtongue'
  | 'Terran';

export type SecretLanguage = 'Druidic';

export type CRBLanguage = CommonLanguage | UncommonLanguage | SecretLanguage;
