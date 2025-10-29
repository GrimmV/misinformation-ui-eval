<script lang="ts">
	import { ChevronDown, ChevronUp, ChartColumn } from 'lucide-svelte';
	import SocialMediaPost from './SocialMediaPost.svelte';
	import EvaluationAssistant from './EvaluationAssistant.svelte';
	import DataVisualizationCarousel from './DataVisualizationCarousel.svelte';
	import { getEvaluationDataById } from '$lib';
	import type { SocialMediaPostData } from '$lib';
	import type { EvaluationData } from '$lib';
	import { onMount } from 'svelte';
	import type { VisualizationData } from '$lib';
	import type { Feature } from './Features.svelte';
	import Features from './Features.svelte';
	interface Props {
		post: SocialMediaPostData;
		postId: number;	
		showVisualizations?: boolean;
	}

	let {
		post,
		postId,
		showVisualizations = false
	}: Props = $props();

	// State for showing visualizations
	let showDataVisualizations = $state(false);
	let evaluationData = $state<EvaluationData | null>(null);
	let loading = $state(true);
	let error = $state<string | null>(null);

	// Load evaluation data and visualizations on mount
	onMount(async () => {
		await loadAnalysisData();
	});

	// Reactive function to load analysis data when postId changes
	async function loadAnalysisData() {
		try {
			loading = true;
			error = null;
			console.log('Loading analysis data for postId:', postId);
			
			evaluationData = await getEvaluationDataById(postId) || null;
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to load analysis data';
			console.error('Error loading analysis data:', err);
		} finally {
			loading = false;
		}
	}

	// Watch for changes to postId and reload analysis data
	$effect(() => {
		if (postId) {
			console.log('postId changed, reloading analysis data:', postId);
			loadAnalysisData();
		}
	});
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
			<div class="mb-4 w-xl">
				<Features features={post.features} />
			</div>
		</div>

		<!-- Evaluation Assistant -->
		<div class="space-y-4">
			<h2 class="text-lg font-semibold text-gray-900">AI Analysis</h2>
			{#if loading}
				<div class="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
					<div class="text-gray-500">
						<div class="mb-4">
							<div class="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
						</div>
						<p class="text-sm">Loading analysis data...</p>
					</div>
				</div>
			{:else if error}
				<div class="rounded-lg border border-red-200 bg-red-50 p-8 text-center shadow-sm">
					<div class="text-red-600">
						<h3 class="mb-2 text-sm font-medium text-red-900">Error Loading Analysis</h3>
						<p class="text-xs">{error}</p>
					</div>
				</div>
			{:else if evaluationData}
				<EvaluationAssistant
					modelPrediction={!post.isFakeNews as boolean}
					evaluationData={evaluationData}
				/>
			{:else}
				<div class="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
					<div class="text-gray-500">
						<p class="text-sm">No analysis data available for this post.</p>
					</div>
				</div>
			{/if}
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
						visualizations={evaluationData?.visualizations?.visualizations as VisualizationData[]}
					/>
				</div>
			{/if}
		</div>
	{/if}
</div>
