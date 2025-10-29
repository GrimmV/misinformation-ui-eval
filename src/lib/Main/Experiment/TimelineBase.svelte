<script lang="ts">
	import { getSamplePosts, type SocialMediaPostData } from '$lib';
	import SocialMediaPost from './SocialMediaPost.svelte';
	import { onMount } from 'svelte';

	interface Props {
		posts?: SocialMediaPostData[];
	}

	let { posts = [] }: Props = $props();
	let loading = $state(true);
	let error = $state<string | null>(null);

	// Load posts if not provided
	onMount(async () => {
		if (posts.length === 0) {
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
			} catch (err) {
				error = err instanceof Error ? err.message : 'Failed to load posts';
				console.error('Error loading posts:', err);
			} finally {
				loading = false;
			}
		} else {
			loading = false;
		}
	});
</script>

<div class="max-w-2xl mx-auto space-y-4">
    <h1 class="text-2xl font-bold text-gray-900 mb-4">Timeline</h1>
	
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
		{#each posts as post (post.id)}
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
		{/each}
	{/if}
</div>
