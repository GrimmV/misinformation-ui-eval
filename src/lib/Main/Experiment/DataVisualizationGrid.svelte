<script lang="ts">
	import DataVisualization from './DataVisualization.svelte';
	import { Shield } from 'lucide-svelte';
	import type { VisualizationData } from '$lib';
	import { BookCheck, BookX } from 'lucide-svelte';

	interface Props {
		visualizations: VisualizationData[];
        modelPrediction: boolean;
		username?: string;
	}

	let { visualizations, modelPrediction, username }: Props = $props();

    // Model prediction icon and color
	let ModelIcon = $derived(modelPrediction ? BookCheck : BookX);
	let modelColor = $derived(modelPrediction ? 'green' : 'red');
</script>

<div class="mx-auto mb-4 max-w-6xl rounded-lg bg-white p-6">
	<!-- Header -->
	<div class="mb-4 flex items-center justify-between">
		<div class="flex items-center space-x-3">
			<div class="rounded-lg bg-blue-100 p-2">
				<Shield class="h-6 w-6 text-blue-600" />
			</div>
			<div>
				<h3 class="text-lg font-semibold text-gray-900">AI Dashboard</h3>
				<p class="text-sm text-gray-500">AI-powered content analysis</p>
			</div>
		</div>
	</div>

	<div class="mb-6">
		<div class="flex items-center space-x-2">
			<ModelIcon class="h-5 w-5 text-{modelColor}-600" />
			<h4 class="font-medium text-gray-900">
				{modelPrediction
					? 'The post is flagged as trustworthy'
					: 'The post is flagged as misinformation'}
			</h4>
		</div>
	</div>
	<!-- Grid of visualizations -->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
		{#each visualizations as viz, index (index)}
			<div class="w-full">
				<DataVisualization title={viz.title} description={viz.description} username={username ?? ''} data={viz.data} />
			</div>
		{/each}
	</div>
</div>

