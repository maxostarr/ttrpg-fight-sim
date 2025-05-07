import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import type { Defender, Attacker, DamageDistribution, SimResult } from '$lib/types';

// const NUM_BUCKETS = 10

type Rolls = InstanceType<typeof DiceRoll>['rolls'];

const getFirstDieResult = (rolls: Rolls): number => {
  if (rolls.length === 0) {
    return 0;
  }
  const firstRoll = rolls[0];
  if (typeof firstRoll === 'number') {
    return firstRoll;
  }
  if (typeof firstRoll === 'string') {
    const match = firstRoll.match(/(\d+)/);
    if (match) {
      return parseInt(match[1], 10);
    }
  }
  if (typeof firstRoll === 'object' && 'value' in firstRoll) {
    return firstRoll.value;
  }
  return 0;
};

export function runSim(attacker: Attacker, defender: Defender, itterations = 100, enableCritDamage = true): SimResult {
  const roundResults = []

  for (let i = 0; i < itterations; i++) {
    let roundDamage = 0;
    const attackResults = []
    for (const attack of attacker.attacks) {
      const hitRoll = new DiceRoll(`1d20 + ${attack.hitBonus} + ${attack.hitOffset}`);

      // const dieResult = parseInt((hitRoll.rolls[0] as unknown as RollResults).rolls[0].toString());
      const dieResult = getFirstDieResult(hitRoll.rolls);

      const hit = (hitRoll.total >= defender.armorClass || dieResult === 20) && dieResult !== 1;
      if (hit) {
        const isCrit = dieResult >= attack.critRange;
        const critMultiplier = isCrit && enableCritDamage ? attack.critMultiplier : 1;
        const damageRoll = new DiceRoll(`{${Array(critMultiplier).fill(attack.damageRoll).join(',')}}`);
        const damage = damageRoll.total - defender.dr;
        roundDamage += Math.max(damage, 0);
        attackResults.push({
          hit: true,
          damage: Math.max(damage, 0),
          hitRoll: hitRoll.total,
          damageRoll: damageRoll.total
        });
      } else {
        attackResults.push({
          hit: false,
          damage: 0,
          hitRoll: hitRoll.total,
          damageRoll: 0
        });
      }
    }
    roundResults.push({
      attacks: attackResults,
      damage: roundDamage
    });
  }


  // const totalDamage = results.reduce((acc, result) => acc + result.damage, 0);
  const totalDamage = roundResults.reduce((acc, result) => acc + result.damage, 0);
  // const totalHits = results.filter(result => result.hit).length;
  const totalHits = roundResults.reduce((acc, result) => acc + result.attacks.filter(attack => attack.hit).length, 0);
  const minDamage = Math.min(...roundResults.map(result => result.damage).filter(damage => damage > 0));
  const maxDamage = Math.max(...roundResults.map(result => result.damage));
  const avgDamage = totalDamage / roundResults.length;
  // const hitRate = totalHits / results.length;
  const hitRate = totalHits / (roundResults.length * attacker.attacks.length);


  // const NUM_BUCKETS = maxDamage - minDamage < 10 ? maxDamage - minDamage : Math.floor((maxDamage - minDamage) / 10);
  const NUM_BUCKETS = (maxDamage - minDamage) + 1;

  // const bucketWidth = (maxDamage - minDamage) / NUM_BUCKETS;
  const damageDistribution: DamageDistribution[] = new Array(NUM_BUCKETS).fill(0).map((x, i) => ({
    count: 0,
    percent: 0,
    damage: minDamage + i,
    perAttack: []
  } satisfies DamageDistribution));

  for (const result of roundResults) {
    const bucketIndex = result.damage - minDamage;
    if (bucketIndex >= 0 && bucketIndex < NUM_BUCKETS) {
      damageDistribution[bucketIndex].count++;
      damageDistribution[bucketIndex].percent = (damageDistribution[bucketIndex].count / roundResults.length) * 100;
      result.attacks.forEach((attack, index) => {
        if (attack.hit) {
          damageDistribution[bucketIndex].perAttack[index] = (damageDistribution[bucketIndex].perAttack[index] || 0) + 1;
        }
      });
    }
  }

  return {
    attacker: attacker.name,
    defender: defender.name,
    totalDamage,
    totalHits,
    minDamage,
    maxDamage,
    avgDamage,
    hitRate,
    damageDistribution,
    results: roundResults,
  };

}