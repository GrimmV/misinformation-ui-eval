<script lang="ts">
	import {
		Shield,
		Brain,
		CircleCheckBig,
		AlertTriangle,
		ChartColumn,
		CircleX,
        BookX,
        BookCheck
	} from 'lucide-svelte';
	import DataVisualizationCarousel from './DataVisualizationCarousel.svelte';
	import type { EvaluationData } from '$lib';
	import type { VisualizationData } from '$lib';
	interface Props {
		modelPrediction: true | false;
		evaluationData: EvaluationData;
		visualizationData: VisualizationData[];
		showVisualizations?: boolean;
	}

	let {
		modelPrediction = true,
		evaluationData,
		visualizationData,
		showVisualizations = false
	}: Props = $props();

	// State for showing detailed analysis
	let showDetailedAnalysis = $state(false);

	// Computed values
	let trustColor = $derived(
		evaluationData.trustScore === 'High'
			? 'green'
			: evaluationData.trustScore === 'Medium'
				? 'yellow'
				: evaluationData.trustScore === 'Low'
					? 'orange'
					: 'red'
	);
	let TrustIcon = $derived(
		evaluationData.trustScore === 'High'
			? CircleCheckBig
			: evaluationData.trustScore === 'Medium'
				? AlertTriangle
				: evaluationData.trustScore === 'Low'
					? CircleX
					: CircleX
	);
	
	// Model prediction icon and color
	let ModelIcon = $derived(modelPrediction ? BookCheck : BookX);
	let modelColor = $derived(modelPrediction ? 'green' : 'red');
</script>

<div class="mx-auto mb-4 w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
	<!-- Header -->
	<div class="mb-4 flex items-center justify-between">
		<div class="flex items-center space-x-3">
			<div class="rounded-lg bg-blue-100 p-2">
				<Shield class="h-6 w-6 text-blue-600" />
			</div>
			<div>
				<h3 class="text-lg font-semibold text-gray-900">Evaluation Assistant</h3>
				<p class="text-sm text-gray-500">AI-powered content analysis</p>
			</div>
		</div>
	</div>

	<div class="mb-6">
		<div class="flex items-center space-x-2">
			<ModelIcon class="h-5 w-5 text-{modelColor}-600" />
			<h4 class="font-medium text-gray-900">
				{modelPrediction ? 'The post is flagged as trustworthy' : 'The post is flagged as misinformation'}
			</h4>
		</div>
	</div>

	<!-- Trust Assessment -->
	<div class="mb-6">
		<div class="mb-3 flex items-center justify-between">
			<div class="flex items-center space-x-2">
				<TrustIcon class="h-5 w-5 text-{trustColor}-600" />
				<h4 class="font-medium text-gray-900">Trust Assessment</h4>
			</div>
		</div>

		<!-- Progress bar with sub-bars -->
		<div class="space-y-3">
			<div class="flex space-x-1">
				<!-- No Trust Bar -->
				<div class="flex-1">
					<div
						class="h-2 rounded-full {evaluationData.trustScore === 'No'
							? 'bg-red-500'
							: 'bg-gray-200'} transition-all duration-300"
					></div>
					<div class="mt-1 text-center">
						<span
							class="text-xs font-medium {evaluationData.trustScore === 'No' ? 'text-red-600' : 'text-gray-500'}"
							>No</span
						>
					</div>
				</div>

				<!-- Low Trust Bar -->
				<div class="flex-1">
					<div
						class="h-2 rounded-full {evaluationData.trustScore === 'Low'
							? 'bg-orange-500'
							: 'bg-gray-200'} transition-all duration-300"
					></div>
					<div class="mt-1 text-center">
						<span
							class="text-xs font-medium {evaluationData.trustScore === 'Low'
								? 'text-orange-600'
								: 'text-gray-500'}">Low</span
						>
					</div>
				</div>

				<!-- Medium Trust Bar -->
				<div class="flex-1">
					<div
						class="h-2 rounded-full {evaluationData.trustScore === 'Medium'
							? 'bg-yellow-500'
							: 'bg-gray-200'} transition-all duration-300"
					></div>
					<div class="mt-1 text-center">
						<span
							class="text-xs font-medium {evaluationData.trustScore === 'Medium'
								? 'text-yellow-600'
								: 'text-gray-500'}">Medium</span
						>
					</div>
				</div>

				<!-- High Trust Bar -->
				<div class="flex-1">
					<div
						class="h-2 rounded-full {evaluationData.trustScore === 'High'
							? 'bg-green-500'
							: 'bg-gray-200'} transition-all duration-300"
					></div>
					<div class="mt-1 text-center">
						<span
							class="text-xs font-medium {evaluationData.trustScore === 'High'
								? 'text-green-600'
								: 'text-gray-500'}">High</span
						>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="space-y-4 border-t border-gray-100 pt-4">
		<!-- Rationale Section -->
		<div class="rounded-lg bg-gray-50 p-4">
			<div class="mb-3 flex items-center space-x-2">
				<Brain class="h-5 w-5 text-purple-600" />
				<h5 class="font-medium text-gray-900">Analysis Rationale</h5>
			</div>
			<p class="text-sm leading-relaxed text-gray-700">{evaluationData.rationale}</p>
		</div>

		<!-- Detailed Analysis Toggle -->
		{#if evaluationData.detailedAnalysis}
			<div class="rounded-lg border border-blue-200 bg-blue-50 p-4">
				<button
					class="flex w-full items-center justify-between text-left"
					onclick={() => (showDetailedAnalysis = !showDetailedAnalysis)}
				>
					<div class="flex items-center space-x-2">
						<Brain class="h-5 w-5 text-blue-600" />
						<h5 class="font-medium text-gray-900">Detailed Analysis</h5>
					</div>
					<span class="text-sm font-medium text-blue-600">
						{showDetailedAnalysis ? 'Hide' : 'Show'} Details
					</span>
				</button>

				{#if showDetailedAnalysis}
					<div class="mt-4 space-y-4">
						<div class="rounded-lg border border-gray-200 bg-white p-4">
							<p class="text-sm leading-relaxed text-gray-700">{evaluationData.detailedAnalysis}</p>
						</div>
					</div>
				{/if}
			</div>
		{/if}
		{#if visualizationData && visualizationData.length > 0}
			<div class="rounded-lg border border-amber-200 bg-amber-50 p-4">
				<button
					class="flex w-full items-center justify-between text-left"
					onclick={() => (showVisualizations = !showVisualizations)}
				>
					<div class="flex items-center space-x-2">
						<ChartColumn class="h-5 w-5 text-blue-600" />
						<h5 class="font-medium text-gray-900">Data Visualizations</h5>
					</div>
					<span class="text-sm font-medium text-blue-600">
						{showVisualizations ? 'Hide' : 'Show'} Visualizations
					</span>
				</button>
				<!-- Data Visualizations -->
				{#if showVisualizations}
					<DataVisualizationCarousel
						visualizations={visualizationData as VisualizationData[]}
						showIndicators={true}
						showNavigation={true}
						autoPlay={false}
					/>
				{/if}
			</div>
		{/if}
	</div>
</div>
