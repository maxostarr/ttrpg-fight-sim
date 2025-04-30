<script lang="ts">
	// import type { Attacker } from '$lib/types';
	import { attacker } from '$lib/store.svelte';

	function addAttack() {
		if (attacker.attacks.length === 0) {
			attacker.attacks.push({
				hitBonus: 0,
				hitOffset: 0,
				damageRoll: '',
				critRange: 20,
				critMultiplier: 2
			});
			return;
		}

		const lastAttack = attacker.attacks[attacker.attacks.length - 1];
		attacker.attacks.push({
			...lastAttack
		});
	}

	function removeAttack(index: number) {
		attacker.attacks.splice(index, 1);
		if (attacker.attacks.length === 0) {
			attacker.attacks.push({
				hitBonus: 0,
				hitOffset: 0,
				damageRoll: '',
				critRange: 20,
				critMultiplier: 2
			});
		}
	}
</script>

<form class="mx-auto max-w-md space-y-4 rounded-lg bg-white p-6 shadow-md">
	<div>
		<label class="mb-1 block text-sm font-medium text-gray-700"> Attacker Name: </label>
		<input
			type="text"
			bind:value={attacker.name}
			class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		/>
	</div>

	{#each attacker.attacks as attack, index}
		<div class="relative space-y-2 rounded border border-gray-200 p-4 shadow-sm">
			<!-- Remove button -->
			<button
				type="button"
				on:click={() => removeAttack(index)}
				class="absolute top-4 right-4 rounded-md bg-red-500 px-2 py-1 text-sm font-medium text-white hover:bg-red-600"
			>
				Remove
			</button>

			<div>
				<label class="mb-1 block text-sm font-medium text-gray-700">
					Attack {index + 1} Hit Bonus:
				</label>
				<input
					type="number"
					bind:value={attack.hitBonus}
					class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
				<!-- Button group for attack offset -->
				<!-- Options are -2, -5, -7 -->
				<div class="mt-2 flex space-x-2">
					<button
						type="button"
						on:click={() => (attack.hitOffset = -2)}
						class="rounded-md px-2 py-1 text-sm font-medium hover:bg-gray-300 {attack.hitOffset ===
						-2
							? 'highlighted bg-blue-500 text-white'
							: 'bg-gray-200 text-gray-700'}"
					>
						-2
					</button>
					<button
						type="button"
						on:click={() => (attack.hitOffset = -5)}
						class="rounded-md px-2 py-1 text-sm font-medium hover:bg-gray-300 {attack.hitOffset ===
						-5
							? 'highlighted bg-blue-500 text-white'
							: 'bg-gray-200 text-gray-700'}"
					>
						-5
					</button>
					<button
						type="button"
						on:click={() => (attack.hitOffset = -7)}
						class="rounded-md px-2 py-1 text-sm font-medium hover:bg-gray-300 {attack.hitOffset ===
						-7
							? 'highlighted bg-blue-500 text-white'
							: 'bg-gray-200 text-gray-700'}"
					>
						-7
					</button>
				</div>
			</div>
			<div>
				<label class="mb-1 block text-sm font-medium text-gray-700"> Damage Roll: </label>
				<input
					type="text"
					bind:value={attack.damageRoll}
					class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</div>
			<div>
				<label class="mb-1 block text-sm font-medium text-gray-700"> Crit Range </label>
				<input
					type="text"
					bind:value={attack.critRange}
					class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</div>
			<div>
				<label class="mb-1 block text-sm font-medium text-gray-700"> Crit Multiplier </label>
				<input
					type="text"
					bind:value={attack.critMultiplier}
					class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</div>
		</div>
	{/each}

	<button
		type="button"
		on:click={() => addAttack()}
		class="w-full rounded-md bg-blue-500 py-2 font-medium text-white transition-colors hover:bg-blue-600"
	>
		Add Attack
	</button>
</form>
