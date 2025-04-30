export type Attack = {
  hitBonus: number;
  damageRoll: string;
  hitOffset: number;
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
  attacker: string;
  defender: string;
  hit: boolean;
  damage: number;
  hitRoll: number;
  damageRoll: number;
};

export type DamageDistribution = {
  range: {
    min: number;
    max: number;
  };
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
  damageDistribution: DamageDistribution[];
  results: RawSimResult[];
};