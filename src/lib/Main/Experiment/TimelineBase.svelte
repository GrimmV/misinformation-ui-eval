<script lang="ts">
	import { samplePosts, type SocialMediaPostData } from '$lib';
	import SocialMediaPost from './SocialMediaPost.svelte';

	interface Props {
		posts?: SocialMediaPostData[];
	}

	let { posts = samplePosts }: Props = $props();
</script>

<div class="max-w-2xl mx-auto space-y-4">
    <h1 class="text-2xl font-bold text-gray-900 mb-4">Timeline</h1>
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
</div>
