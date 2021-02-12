//This is precisely where the ever expanding list of traits goes
export const TRAITS = ['General', 'Skill'] as const;

export type Trait = typeof TRAITS[number];
