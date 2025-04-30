
import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import type { Defender, Attacker, DamageDistribution, SimResult } from '$lib/types';
import type RollResults from '@dice-roller/rpg-dice-roller/types/types/results/RollResults.js';

// const NUM_BUCKETS = 10

export function runSim(attacker: Attacker, defender: Defender, itterations = 100, enableCritDamage = true): SimResult {
  const results = []

  for (let i = 0; i < itterations; i++) {
    for (const attack of attacker.attacks) {
      const hitRoll = new DiceRoll(`1d20 + ${attack.hitBonus} + ${attack.hitOffset}`);

      const dieResult = parseInt((hitRoll.rolls[0] as unknown as RollResults).rolls[0].toString());

      const hit = (hitRoll.total >= defender.armorClass || dieResult === 20) && dieResult !== 1;
      if (hit) {
        const isCrit = dieResult >= attack.critRange;
        const critMultiplier = isCrit && enableCritDamage ? attack.critMultiplier : 1;
        const damageRoll = new DiceRoll(`{${Array(critMultiplier).fill(attack.damageRoll).join(',')}}`);
        const damage = damageRoll.total - defender.dr;
        results.push({
          attacker: attacker.name,
          defender: defender.name,
          hit: true,
          damage: Math.max(damage, 0),
          hitRoll: hitRoll.total,
          damageRoll: damageRoll.total
        });
      } else {
        results.push({
          attacker: attacker.name,
          defender: defender.name,
          hit: false,
          damage: 0,
          hitRoll: hitRoll.total,
          damageRoll: 0
        });
      }
    }
  }


  const totalDamage = results.reduce((acc, result) => acc + result.damage, 0);
  const totalHits = results.filter(result => result.hit).length;
  const minDamage = Math.min(...results.map(result => result.damage).filter(damage => damage > 0));
  const maxDamage = Math.max(...results.map(result => result.damage));
  const avgDamage = totalDamage / results.length;
  const hitRate = totalHits / results.length;


  // const NUM_BUCKETS = maxDamage - minDamage < 10 ? maxDamage - minDamage : Math.floor((maxDamage - minDamage) / 10);
  const NUM_BUCKETS = (maxDamage - minDamage) + 1;

  // const bucketWidth = (maxDamage - minDamage) / NUM_BUCKETS;
  const damageDistribution: DamageDistribution[] = new Array(NUM_BUCKETS).fill(0).map((x, i) => ({
    count: 0,
    percent: 0,
    range: {
      min: Math.floor(minDamage + i),
      max: Math.floor(minDamage + (i + 1))
    }
  } satisfies DamageDistribution));

  for (const result of results) {
    const bucketIndex = result.damage - minDamage;
    if (bucketIndex >= 0 && bucketIndex < NUM_BUCKETS) {
      damageDistribution[bucketIndex].count++;
      damageDistribution[bucketIndex].percent = (damageDistribution[bucketIndex].count / results.length) * 100;
    }
  }

  return {
    totalDamage,
    totalHits,
    minDamage,
    maxDamage,
    avgDamage,
    hitRate,
    damageDistribution,
    results
  };

}