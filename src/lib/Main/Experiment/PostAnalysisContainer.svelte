<script lang="ts">
	import PostAnalysis from './PostAnalysis.svelte';
	import { samplePosts, getEvaluationDataById, getVisualizationDataById } from '$lib';
	import type { SocialMediaPostData } from '$lib';
	import type { EvaluationData } from '$lib';
    import type { VisualizationData } from '$lib';
	interface Props {
        onComplete: () => void;
		postIds?: number[];
	}

	let { postIds = [1, 2, 3, 4, 5], onComplete }: Props = $props();

	// State
	let selectedPostId = $state<number | null>(postIds[0]);

	// Computed values
	let selectedPost = $derived(
		selectedPostId ? samplePosts.find((p) => p.id === selectedPostId) : null
	);

	// Navigation function
	function selectPost(postId: number) {
		selectedPostId = postId;
	}
</script>

<div class="mx-auto flex max-w-7xl flex-col items-center justify-center space-y-6 my-6">
	<!-- Post Selection -->
	<div class="flex flex-wrap gap-3">
		{#each postIds as postId}
			<button
				class="rounded-lg border bg-white px-4 py-2 transition-all duration-200 hover:cursor-pointer {selectedPostId ===
				postId
					? 'border-blue-500 bg-blue-50 text-blue-700'
					: 'border-gray-200 text-gray-700 hover:border-gray-300'}"
				onclick={() => selectPost(postId)}
			>
				Post #{postId}
			</button>
		{/each}
	</div>

	<!-- Post Analysis Content -->
	{#if selectedPost && selectedPostId}
		<PostAnalysis
			post={selectedPost as SocialMediaPostData}
			evaluationData={getEvaluationDataById(selectedPostId as number) as EvaluationData}
            visualizationData={getVisualizationDataById(selectedPostId as number)?.visualizations as VisualizationData[]}
		/>
	{:else}
		<div class="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
			<div class="text-gray-500">
				<h3 class="mb-2 text-lg font-medium text-gray-900">Select a Post</h3>
				<p class="text-sm">Choose a post from the list above to view its analysis.</p>
			</div>
		</div>
	{/if}
</div>
