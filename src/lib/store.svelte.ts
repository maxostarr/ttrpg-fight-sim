import { writable } from 'svelte/store';
import type { Attacker, Defender } from './types';

// export const attacker = writable<Attacker>({
//   name: '',
//   attacks: [
//     {
//       hitBonus: 0,
//       damageRoll: '1d6',
//       hitOffset: 0
//     }
//   ]
// });


// export const defender = writable<Defender>({
//   name: '',
//   armorClass: 0,
//   dr: 0
// });

export const attacker: Attacker = $state({
  name: 'Attacker',
  attacks: [
    {
      hitBonus: 5,
      damageRoll: '1d8+3',
      hitOffset: 0
    },
    {
      hitBonus: 7,
      damageRoll: '2d6+2',
      hitOffset: 0
    }
  ]
});

export const defender: Defender = $state({
  name: 'Defender',
  armorClass: 15,
  dr: 0
});