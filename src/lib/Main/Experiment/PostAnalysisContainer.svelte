<script lang="ts">
	import PostAnalysis from './PostAnalysis.svelte';
	import { getSamplePosts } from '$lib';
	import type { SocialMediaPostData } from '$lib';
	import { onMount } from 'svelte';

	interface Props {
		postIds: number[];
        onComplete: () => void;
	}

	let { postIds, onComplete }: Props = $props();

	console.log('postIds', postIds);

	// State
	let selectedPostId = $state<number | null>(null);
	let posts = $state<SocialMediaPostData[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);

	// Update selectedPostId when postIds change
	$effect(() => {
		if (postIds && postIds.length > 0) {
			selectedPostId = postIds[0];
		}
	});


	// Computed values
	let selectedPost = $derived(
		selectedPostId ? posts.find((p) => p.id === selectedPostId) : null
	);

	// Load posts on mount
	onMount(async () => {
		await loadPosts();
	});

	// Reactive function to load posts when postIds change
	async function loadPosts() {
		try {
			loading = true;
			error = null;
			const fetchedPosts = await getSamplePosts() || [];
			console.log('fetchedPosts', fetchedPosts);
			console.log('postIds for filtering:', postIds);
			
			// Filter out posts with invalid IDs and add fallback IDs if needed
			posts = fetchedPosts.filter(post => postIds.includes(post.id));
			console.log('filtered posts', posts);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to load posts';
			console.error('Error loading posts:', err);
		} finally {
			loading = false;
		}
	}

	// Watch for changes to postIds and reload posts
	$effect(() => {
		if (postIds && postIds.length > 0) {
			console.log('postIds changed, reloading posts:', postIds);
			loadPosts();
		}
	});

	// Navigation function
	function selectPost(postId: number) {
		selectedPostId = postId;
	}
</script>

<div class="mx-auto flex max-w-7xl flex-col items-center justify-center space-y-6 my-6">
	{#if loading}
		<!-- Loading State -->
		<div class="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
			<div class="text-gray-500">
				<div class="mb-4">
					<div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
				</div>
				<h3 class="mb-2 text-lg font-medium text-gray-900">Loading Posts...</h3>
				<p class="text-sm">Please wait while we fetch the latest data.</p>
			</div>
		</div>
	{:else if error}
		<!-- Error State -->
		<div class="rounded-lg border border-red-200 bg-red-50 p-12 text-center shadow-sm">
			<div class="text-red-600">
				<h3 class="mb-2 text-lg font-medium text-red-900">Error Loading Posts</h3>
				<p class="text-sm mb-4">{error}</p>
				<button 
					class="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
					onclick={loadPosts}
				>
					Try Again
				</button>
			</div>
		</div>
	{:else}
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
				postId={selectedPostId}
			/>
		{:else}
			<div class="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
				<div class="text-gray-500">
					<h3 class="mb-2 text-lg font-medium text-gray-900">Select a Post</h3>
					<p class="text-sm">Choose a post from the list above to view its analysis.</p>
				</div>
			</div>
		{/if}
	{/if}
</div>
