<script lang="ts">
	import { getSamplePosts, type SocialMediaPostData, uploadClicks } from '$lib';
	import SocialMediaPost from './SocialMediaPost.svelte';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';

	interface Props {
		onComplete: (postIds: number[]) => void;
		username?: string;
	}

	let { onComplete, username }: Props = $props();

	const maxSelectedPosts = 6;
	
	// State for selected posts
	let selectedPosts = $state<Set<number>>(new Set());
	let posts = $state<SocialMediaPostData[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);
	
	// Load posts on mount
	onMount(async () => {
		try {
			loading = true;
			error = null;
			const fetchedPosts = await getSamplePosts() || [];
			
			// Filter out posts with invalid IDs and add fallback IDs if needed
			posts = fetchedPosts
				.filter(post => post && typeof post === 'object')
				.map((post, index) => ({
					...post,
					id: post.id || index + 1 // Use array index + 1 as fallback ID
				}))
				.filter((post, index, array) => 
					// Remove duplicates by checking if this is the first occurrence of this ID
					array.findIndex(p => p.id === post.id) === index
				);
				
			console.log('Loaded posts:', posts);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to load posts';
			console.error('Error loading posts:', err);
		} finally {
			loading = false;
		}
	});
	
	// Toggle post selection
	function togglePostSelection(postId: number) {
		if (selectedPosts.has(postId)) {
			selectedPosts.delete(postId);
		} else {
			selectedPosts.add(postId);
		}
		selectedPosts = new Set(selectedPosts); // Trigger reactivity
	}
	
	// Handle continue button click
	function handleContinue() {
		if (selectedPosts.size >= maxSelectedPosts) {
			console.log('Selected posts:', Array.from(selectedPosts));
			uploadClicks({
				action: 'prep_timeline',
				username: username ?? '',
				datetime: new Date(),
				content: {
					selectedPosts: Array.from(selectedPosts)
				}
			});
			onComplete(Array.from(selectedPosts));
		}
	}
</script>

<div class="max-w-2xl mx-auto space-y-4">
    <h1 class="text-2xl font-bold text-gray-900 mb-4">Preparation Phase</h1>
    
    <!-- Instructions -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h2 class="text-lg font-semibold text-blue-900 mb-2">Instructions</h2>
        <p class="text-blue-800 text-sm leading-relaxed">
            Please select <strong>at least {maxSelectedPosts} posts</strong> that you believe are <strong>NOT aligned</strong> with the "Potential Misinformation" flag. 
            I.e. posts that are either not flagged but should be, or flagged but should not be. In the next steps, you will examine six of these posts in more detail.
        </p>
    </div>
    
    <!-- Selection counter -->
    <div class="flex items-center justify-between mb-4">
        <div class="text-sm text-gray-600">
            Selected: <span class="font-semibold text-blue-600">{selectedPosts.size}/{maxSelectedPosts}</span> posts
        </div>
        <button 
            class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            disabled={selectedPosts.size < maxSelectedPosts}
            onclick={handleContinue}
        >
            Continue
        </button>
    </div>
	{#if loading}
		<div class="text-center py-8">
			<div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
			<p class="text-gray-500">Loading posts...</p>
		</div>
	{:else if error}
		<div class="text-center py-8">
			<div class="text-red-600 mb-4">
				<h3 class="text-lg font-medium">Error Loading Posts</h3>
				<p class="text-sm">{error}</p>
			</div>
		</div>
	{:else}
		{#each posts as post}
			<div 
				class="relative cursor-pointer transition-all duration-200 hover:shadow-md {selectedPosts.has(post.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''}"
				role="button"
				tabindex="0"
				aria-label="Select post {post.id} by {post.name}"
				onclick={() => togglePostSelection(post.id)}
				onkeydown={(e) => e.key === 'Enter' || e.key === ' ' ? togglePostSelection(post.id) : null}
			>
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
				<!-- Selection indicator -->
				{#if selectedPosts.has(post.id)}
					<div class="absolute top-2 right-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
						✓
					</div>
				{/if}
			</div>
		{/each}
	{/if}
</div>
