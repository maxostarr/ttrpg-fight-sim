<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, BarController, CategoryScale, LinearScale, BarElement } from 'chart.js';

	// Register only the necessary components for bar charts
	Chart.register(BarController, CategoryScale, LinearScale, BarElement);

	// Props: data should be an object with `labels` and `datasets` keys,
	// for example: { labels: ['Jan', 'Feb'], datasets: [{ label: 'Sales', data: [10, 20], backgroundColor: 'blue' }] }
	let {
		datasets,
		labels
	}: {
		labels: string[];
		datasets: {
			label: string;
			data: number[];
			backgroundColor?: string;
			borderColor?: string;
			borderWidth?: number;
		}[];
	} = $props();

	let chartCanvas: any;
	let chartInstance;

	// onMount(() => {
	// 	if (chartCanvas && datasets) {
	// 		chartInstance = new Chart(chartCanvas, {
	// 			type: 'bar',
	// 			data: {
	// 				labels: labels,
	// 				datasets: datasets.map((dataset) => ({
	// 					...dataset,
	// 					backgroundColor: dataset.backgroundColor || 'rgba(75, 192, 192, 0.2)',
	// 					borderColor: dataset.borderColor || 'rgba(75, 192, 192, 1)',
	// 					borderWidth: dataset.borderWidth || 1
	// 				}))
	// 			},
	// 			options: {
	// 				responsive: true,
	// 				maintainAspectRatio: false
	// 			}
	// 		});
	// 	}
	// });

	let chartObject: any;

	function chart(node: any, data: any) {
		function setupChart(_data: any) {
			chartObject = new Chart(node, {
				type: 'bar',
				data: {
					labels,
					datasets: [
						{
							label: '# of Votes',
							data: _data,
							borderWidth: 1
						}
					]
				},
				options: {
					scales: {
						y: {
							beginAtZero: true
						}
					}
				}
			});
		}
		setupChart(data);
		return {
			update(data: any) {
				chartObject.destroy();
				setupChart(data);
			},
			destroy() {
				chartObject.destroy();
			}
		};
	}
</script>

<div class="chart-container">
	<!-- <canvas bind:this={chartCanvas}></canvas> -->
	<canvas bind:this={chartCanvas} use:chart={$state.snapshot(datasets[0].data)}></canvas>
</div>

<style>
	/* Ensure the canvas container has a defined height */
	.chart-container {
		position: relative;
		width: 100%;
		height: 400px;
	}
</style>
