<script lang="ts">
	import { samplePosts } from '$lib';
	import SocialMediaPost from './SocialMediaPost.svelte';
	import { toast } from 'svelte-sonner';

	interface Props {
		onComplete: () => void;
	}

	let { onComplete }: Props = $props();
	
	// State for selected posts
	let selectedPosts = $state<Set<number>>(new Set());
	
	// Toggle post selection
	function togglePostSelection(postId: number) {
		if (selectedPosts.has(postId)) {
			selectedPosts.delete(postId);
		} else if (selectedPosts.size < 5) {
			selectedPosts.add(postId);
		} else {
			toast.info('You have already selected 5 posts. Please remove another post to select a new one.', {
				duration: 4000,
				description: 'Click on a selected post to deselect it first.'
			});
		}
		selectedPosts = new Set(selectedPosts); // Trigger reactivity
	}
	
	// Handle continue button click
	function handleContinue() {
		if (selectedPosts.size === 5) {
			console.log('Selected posts:', Array.from(selectedPosts));
			onComplete();
		}
	}
</script>

<div class="max-w-2xl mx-auto space-y-4">
    <h1 class="text-2xl font-bold text-gray-900 mb-4">Preparation Phase</h1>
    
    <!-- Instructions -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h2 class="text-lg font-semibold text-blue-900 mb-2">Instructions</h2>
        <p class="text-blue-800 text-sm leading-relaxed">
            Please select <strong>exactly 5 posts</strong> that you believe are <strong>NOT aligned</strong> with the "Potential Misinformation" flag. 
            I.e. posts that are either not flagged but should be, or flagged but should not be.
        </p>
    </div>
    
    <!-- Selection counter -->
    <div class="flex items-center justify-between mb-4">
        <div class="text-sm text-gray-600">
            Selected: <span class="font-semibold text-blue-600">{selectedPosts.size}/5</span> posts
        </div>
        <button 
            class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            disabled={selectedPosts.size !== 5}
            onclick={handleContinue}
        >
            Continue
        </button>
    </div>
	{#each samplePosts as post (post.id)}
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
</div>
