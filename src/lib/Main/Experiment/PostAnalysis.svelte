<script lang="ts">
	import SocialMediaPost from './SocialMediaPost.svelte';
	import EvaluationAssistant from './EvaluationAssistant.svelte';
	import { getEvaluationDataById } from '$lib';
	import type { SocialMediaPostData } from '$lib';
	import type { EvaluationData } from '$lib';
	import { onMount } from 'svelte';
	import Features from './Features.svelte';
	import DataVisualizationGrid from './DataVisualizationGrid.svelte';
	interface Props {
		post: SocialMediaPostData;
		postId: number;	
		showAssistant?: boolean;
	}

	let {
		post,
		postId,
		showAssistant = false,
	}: Props = $props();

	// State for showing visualizations
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
				{#if showAssistant}
				<EvaluationAssistant
						modelPrediction={!post.isFakeNews as boolean}
						evaluationData={evaluationData}
					/>
				{:else}
					<DataVisualizationGrid visualizations={evaluationData.visualizations.visualizations} modelPrediction={!post.isFakeNews as boolean}/>
				{/if}
			{:else}
				<div class="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
					<div class="text-gray-500">
						<p class="text-sm">No analysis data available for this post.</p>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
