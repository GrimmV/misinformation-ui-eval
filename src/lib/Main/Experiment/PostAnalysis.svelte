<script lang="ts">
	import { ChevronDown, ChevronUp, ChartColumn } from 'lucide-svelte';
	import SocialMediaPost from './SocialMediaPost.svelte';
	import EvaluationAssistant from './EvaluationAssistant.svelte';
	import DataVisualizationCarousel from './DataVisualizationCarousel.svelte';
	import type { SocialMediaPostData } from '$lib';
	import type { EvaluationData } from '$lib';
	import type { VisualizationData } from '$lib';

	interface Props {
		post: SocialMediaPostData;
		evaluationData: EvaluationData;
		visualizationData: VisualizationData[];
		showVisualizations?: boolean;
	}

	let {
		post,
		evaluationData,
		visualizationData,
		showVisualizations = false
	}: Props = $props();

	// State for showing visualizations
	let showDataVisualizations = $state(false);
</script>

<div class="max-w-7xl mx-auto space-y-6">
	<!-- Main Content Row -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		<!-- Social Media Post -->
		<div class="space-y-4">
			<h2 class="text-lg font-semibold text-gray-900">Social Media Post</h2>
			<SocialMediaPost
				name={post.name}
				profileImage={post.profileImage}
				date={post.date}
				content={post.content}
				likes={post.likes}
				comments={post.comments}
				shares={post.shares}
				isPotentialMisinformation={post.isFakeNews}
			/>
		</div>

		<!-- Evaluation Assistant -->
		<div class="space-y-4">
			<h2 class="text-lg font-semibold text-gray-900">AI Analysis</h2>
			<EvaluationAssistant
				modelPrediction={!post.isFakeNews as boolean}
				evaluationData={evaluationData}
				visualizationData={visualizationData}
			/>
		</div>
	</div>

	<!-- Data Visualizations Section -->
	{#if showVisualizations}
		<div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
			<!-- Section Header -->
			<div class="flex items-center justify-between mb-6">
				<div class="flex items-center space-x-3">
					<div class="p-2 bg-indigo-100 rounded-lg">
						<ChartColumn class="w-6 h-6 text-indigo-600" />
					</div>
					<div>
						<h3 class="text-lg font-semibold text-gray-900">Detailed Data Analysis</h3>
						<p class="text-sm text-gray-500">Interactive visualizations and metrics</p>
					</div>
				</div>
				<button
					class="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors"
					onclick={() => showDataVisualizations = !showDataVisualizations}
				>
					<span class="text-sm font-medium">
						{showDataVisualizations ? 'Hide' : 'Show'} Visualizations
					</span>
					{#if showDataVisualizations}
						<ChevronUp class="w-4 h-4" />
					{:else}
						<ChevronDown class="w-4 h-4" />
					{/if}
				</button>
			</div>

			<!-- Visualizations Content -->
			{#if showDataVisualizations}
				<div class="space-y-4">
					<div class="bg-white rounded-lg p-4 border border-gray-200">
						<p class="text-sm text-gray-700 leading-relaxed mb-4">
							The following visualizations provide detailed insights into the content analysis, 
							including trust score distributions, bias detection trends, and source credibility metrics. 
							Use the navigation arrows to explore different data perspectives.
						</p>
					</div>
					
					<DataVisualizationCarousel
						visualizations={visualizationData as VisualizationData[]}
						showIndicators={true}
						showNavigation={true}
						autoPlay={false}
					/>
				</div>
			{/if}
		</div>
	{/if}
</div>
