<script lang="ts">
	import { Chart } from 'chart.js/auto';

	type Dataset = {
		label: string;
		data: number[];
		backgroundColor?: string;
		borderColor?: string;
		borderWidth?: number;
	};
	let {
		datasets,
		labels
	}: {
		labels: string[];
		datasets: Dataset[];
	} = $props();

	let chartCanvas: any;
	let chartObject: any;

	function chart(node: any, data: Dataset[]) {
		function setupChart(_data: Dataset[]) {
			chartObject = new Chart(node, {
				type: 'bar',
				data: {
					labels,
					datasets: _data.map((dataset) => ({
						...dataset,
						backgroundColor: dataset.backgroundColor || 'rgba(75, 192, 192, 0.2)',
						borderColor: dataset.borderColor || 'rgba(75, 192, 192, 1)',
						borderWidth: dataset.borderWidth || 1
					}))
				},

				options: {
					plugins: {
						legend: {
							title: {
								display: true,
								text: 'Damage Distribution',
								font: {
									size: 16
								}
							}
						}
					},
					responsive: true,
					scales: {
						y: {
							beginAtZero: true,
							stacked: true,

							title: {
								display: true,
								text: 'Number of Hits'
							}
						},
						x: {
							stacked: true
						}
					}
				}
			});
		}
		setupChart(data);
		return {
			update(data: Dataset[]) {
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
	<canvas bind:this={chartCanvas} use:chart={$state.snapshot(datasets)}></canvas>
</div>

<style>
	/* Ensure the canvas container has a defined height */
	.chart-container {
		position: relative;
		width: 100%;
		height: 400px;
	}
</style>
