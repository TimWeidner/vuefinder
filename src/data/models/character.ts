export class CharacterAttributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;

  constructor(
    s: number,
    d: number,
    co: number,
    i: number,
    w: number,
    ch: number
  ) {
    this.strength = s;
    this.dexterity = d;
    this.constitution = co;
    this.intelligence = i;
    this.wisdom = w;
    this.charisma = ch;
  }
}
