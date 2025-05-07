export type Attack = {
  hitBonus: number;
  damageRoll: string;
  hitOffset: number;
  critRange: number;
  critMultiplier: number;
};

export type Attacker = {
  name: string;
  attacks: Attack[];
};

export type Defender = {
  name: string;
  armorClass: number;
  dr: number;
};

export type RawSimResult = {
  hit: boolean;
  damage: number;
  hitRoll: number;
  damageRoll: number;
};

export type RawRoundResult = {
  damage: number;
  attacks: RawSimResult[];
};

export type DamageDistribution = {
  damage: number;
  count: number;
  percent: number;
}

export type SimResult = {
  totalDamage: number;
  totalHits: number;
  minDamage: number;
  maxDamage: number;
  avgDamage: number;
  hitRate: number;
  attacker: string;
  defender: string;
  damageDistribution: DamageDistribution[];
  results: RawRoundResult[];
};