<script lang="ts">
	import { defender } from '$lib/store.svelte';
</script>

<form class="mx-auto max-w-md space-y-4 rounded-lg bg-white p-6 shadow-md">
	<div>
		<label class="mb-1 block text-sm font-medium text-gray-700"> Defender Name: </label>
		<input
			type="text"
			bind:value={defender.name}
			class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		/>
	</div>

	<div>
		<label class="mb-1 block text-sm font-medium text-gray-700"> Armor Class: </label>
		<input
			type="number"
			bind:value={defender.armorClass}
			class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		/>
	</div>

	<div>
		<label class="mb-1 block text-sm font-medium text-gray-700"> Damage Reduction: </label>
		<input
			type="number"
			bind:value={defender.dr}
			class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		/>
	</div>
</form>
