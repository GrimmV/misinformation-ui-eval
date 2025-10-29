<script lang="ts">
	import { ChartColumn, Info } from 'lucide-svelte';
	import ShapBarChart from './ShapBarChart.svelte';
	import FeatureDistribution from './FeatureDistribution.svelte';
	import PerformanceMetrics from './PerformanceMetrics.svelte';
	import ConfusionMatrix from './ConfusionMatrix.svelte';
	import GlobalFeatureImportance from './GlobalFeatureImportance.svelte';
	import PartialDependencePlot from './PartialDependencePlot.svelte';
	import Heatmap from './Heatmap.svelte';
	interface Props {
		title: string;
		description: string;
		data: object;
	}

	let { title, description, data }: Props = $props();
</script>

<div class="h-fit w-fit rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
	<!-- Header -->
	<div class="flex items-center space-x-3">
		<div class="rounded-lg bg-purple-100 p-2">
			<ChartColumn class="h-6 w-6 text-purple-600" />
		</div>
		<div>
			<h3 class="text-lg font-semibold text-gray-900">{title}</h3>
			<p class="text-sm text-gray-500">Data visualization</p>
		</div>
	</div>

	<!-- Chart Container -->
	<div class="mb-4">
		<div class="relative h-full w-full">
			{#if title === 'individual feature importance'}
				<ShapBarChart values={data.values} />
			{:else if title === 'feature distribution'}
				<FeatureDistribution counts={data.counts} edges={data.edges} featureName="placeholder" />
			{:else if title === 'performance metrics'}
				<PerformanceMetrics
					accuracy={data.accuracy}
					f1_score={data.f1_score}
					precision={data.precision}
					recall={data.recall}
				/>
			{:else if title === 'confusion matrix'}
				<ConfusionMatrix matrix={data.confusion} />
			{:else if title === 'global feature importance'}
				<GlobalFeatureImportance values={data.values} />
			{:else if title === 'partial dependence plot'}
				<PartialDependencePlot
					feature={data.feature}
					class={data.class}
					grid_values={data.grid_values}
					average={data.average}
				/>
			{:else if title === 'feature distribution 2D'}
				<Heatmap markdownTable={data} />
			{/if}
		</div>
	</div>

	<!-- Description -->
	<div class="rounded-lg border-t border-gray-100 bg-gray-50 p-4">
		<div class="mb-2 flex items-center space-x-2">
			<Info class="h-4 w-4 text-gray-600" />
			<h5 class="text-sm font-medium text-gray-900">Description</h5>
		</div>
		<p class="text-sm leading-relaxed text-gray-700">{description}</p>
	</div>
</div>
