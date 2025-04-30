<script lang="ts">
	import { runSim } from '$lib/sim';
	import { attacker, defender } from '$lib/store.svelte';
	import Attacker from '../components/attacker.svelte';
	import Chart from '../components/chart.svelte';
	import Defender from '../components/defender.svelte';

	// const initialChartData: any = {
	// 	labels: [],
	// 	datasets: [
	// 		{
	// 			label: 'Votes',
	// 			data: [],
	// 			backgroundColor: [],
	// 			borderColor: [],
	// 			borderWidth: 1
	// 		}
	// 	]
	// };

	// const chartData = $state(initialChartData);

	let labels = $state(['0-0', '0-0', '0-0', '0-0', '0-0']);
	let datasets = $state([
		{
			label: 'Votes',
			data: [0, 0, 0, 0, 0],
			backgroundColor: [
				'rgba(75, 192, 192, 0.2)',
				'rgba(255, 99, 132, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)'
			],
			borderColor: [
				'rgba(75, 192, 192, 1)',
				'rgba(255, 99, 132, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)'
			],
			borderWidth: 1
		}
	]);
	let iterations = $state(1000);

	function runSimulation() {
		// Placeholder for simulation logic
		console.log('Running simulation...');

		const results = runSim(attacker, defender, iterations);

		// Update chart data with simulation results
		labels = results.damageDistribution.map((result) => `${result.range.min}`);
		datasets[0].data = results.damageDistribution.map((result) => result.count);

		datasets[0].backgroundColor = results.damageDistribution.map((result) =>
			result.count > 0 ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)'
		);

		datasets[0].borderColor = results.damageDistribution.map((result) =>
			result.count > 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'
		);
		datasets[0].borderWidth = 1;
	}
</script>

<Chart {datasets} {labels} />

<button on:click={runSimulation} class="rounded bg-blue-500 px-4 py-2 text-white">
	Run Simulation
</button>

<!-- Iterations input -->
<div class="mt-4">
	<label class="mb-1 block text-sm font-medium text-gray-700">Iterations:</label>
	<input
		type="number"
		bind:value={iterations}
		class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
	/>
</div>

<div class="flex">
	<Attacker />
	<Defender />
</div>
