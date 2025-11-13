<script lang="ts">
	import PostAnalysis from './PostAnalysis.svelte';
	import { getSamplePosts } from '$lib';
	import type { SocialMediaPostData } from '$lib';
	import { onMount } from 'svelte';
	import { CircleCheck, Flag } from 'lucide-svelte';
	import { uploadClicks } from '$lib';

	interface Props {
		postIds: number[];
		onComplete: () => void;
		showAssistant: boolean;
		username?: string;
	}

	let { postIds, onComplete, showAssistant = false, username }: Props = $props();

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
	let selectedPost = $derived(selectedPostId ? posts.find((p) => p.id === selectedPostId) : null);

	// Load posts on mount
	onMount(async () => {
		await loadPosts();
	});

	// Reactive function to load posts when postIds change
	async function loadPosts() {
		try {
			loading = true;
			error = null;
			const fetchedPosts = (await getSamplePosts()) || [];

			// Filter out posts with invalid IDs and add fallback IDs if needed
			posts = fetchedPosts.filter((post) => postIds.includes(post.id));
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
			loadPosts();
		}
	});

	// Decision / navigation state
	let confirmOpen: 'misinfo' | 'not' | null = $state(null);
	let confirmNotes = $state<{ misinfo: string; not: string }>({
		misinfo: '',
		not: ''
	});
	let confirmError = $state<string | null>(null);

	// Navigation function (disabled via UI; kept for clarity)
	function selectPost(postId: number) {
		selectedPostId = postId;
	}

	function getCurrentIndex() {
		return selectedPostId ? postIds.findIndex((id) => id === selectedPostId) : -1;
	}

	function goToNextOrComplete() {
		const currentIndex = getCurrentIndex();
		if (currentIndex === -1) return;
		const isLast = currentIndex === postIds.length - 1;
		if (isLast) {
			onComplete();
		} else {
			selectedPostId = postIds[currentIndex + 1];
		}
	}

	function requestConfirm(kind: 'misinfo' | 'not') {
		confirmOpen = kind;
		confirmError = null;
		confirmNotes[kind] = '';
	}

	function cancelConfirm() {
		confirmOpen = null;
		confirmError = null;
	}

	function confirmDecision() {
		if (!confirmOpen) return;
		const note = confirmNotes[confirmOpen]?.trim();
		if (!note) {
			confirmError = 'Please briefly explain your decision before confirming.';
			return;
		}
		uploadClicks({
			action: 'analysis_decision',
			username: username ?? '',
			datetime: new Date(),
			content: {
				postId: selectedPostId,
				kind: confirmOpen,
				note: note
			}
		});
		confirmOpen = null;
		confirmError = null;
		goToNextOrComplete();
	}
</script>

<div class="mx-auto mb-6 flex max-w-7xl flex-col items-center justify-center">
	{#if loading}
		<!-- Loading State -->
		<div class="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
			<div class="text-gray-500">
				<div class="mb-4">
					<div
						class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"
					></div>
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
				<p class="mb-4 text-sm">{error}</p>
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
		<div class="mb-4 flex flex-wrap gap-3">
			{#each postIds as postId}
				<div
					class="rounded-lg border bg-white px-4 py-2 transition-all duration-200 {selectedPostId ===
					postId
						? 'border-blue-500 bg-blue-50 text-blue-700'
						: 'border-gray-200 text-gray-700'} disabled:cursor-not-allowed disabled:opacity-60"
				>
					Post #{postId}
				</div>
			{/each}
		</div>

		<!-- Decision Buttons with Confirmation Popovers -->
		<div class="mb-6 flex w-full max-w-3xl flex-col items-center justify-center gap-3 sm:flex-row">
			<h2 class="text-lg font-semibold text-gray-900">Your choice:</h2>
			<div>
				<button
					onclick={() => requestConfirm('not')}
					class="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800 shadow-sm hover:cursor-pointer hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none sm:w-auto"
				>
					<CircleCheck class="mr-2 h-5 w-5 text-green-600" />
					The post is not misinformation
				</button>
				{#if confirmOpen === 'not'}
					<div
						class="absolute z-20 mt-2 w-72 rounded-md border border-gray-200 bg-white p-4 shadow-lg sm:w-80"
					>
						<p class="mb-3 text-sm text-gray-800">
							Confirm your choice: I think that this post is <span class="font-semibold"
								>not misinformation</span
							>
						</p>
						<label class="mb-2 block text-xs font-medium text-gray-600" for="confirm-note-not"
							>Reason for your decision</label
						>
						<textarea
							id="confirm-note-not"
							class="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
							rows="3"
							placeholder="Add a short note about why you believe this post is not misinformation..."
							bind:value={confirmNotes.not}
							oninput={() => (confirmError = null)}
						></textarea>
						{#if confirmError}
							<p class="mb-2 text-xs text-red-600">{confirmError}</p>
						{/if}
						<div class="flex justify-end gap-2">
							<button
								class="rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
								onclick={cancelConfirm}>Cancel</button
							>
							<button
								class="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
								onclick={confirmDecision}
								disabled={!confirmNotes.not.trim()}
							>
								Confirm
							</button>
						</div>
					</div>
				{/if}
			</div>

			<div>
				<button
					onclick={() => requestConfirm('misinfo')}
					class="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800 shadow-sm hover:cursor-pointer hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none sm:w-auto"
				>
					<Flag class="mr-2 h-5 w-5 text-red-600" />
					The post is misinformation
				</button>
				{#if confirmOpen === 'misinfo'}
					<div
						class="absolute z-20 mt-2 w-72 rounded-md border border-gray-200 bg-white p-4 shadow-lg sm:w-80"
					>
						<p class="mb-3 text-sm text-gray-800">
							Confirm your choice: I think that this post <span class="font-semibold"
								>is misinformation</span
							>
						</p>
						<label class="mb-2 block text-xs font-medium text-gray-600" for="confirm-note-misinfo"
							>Reason for your decision</label
						>
						<textarea
							id="confirm-note-misinfo"
							class="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
							rows="3"
							placeholder="Add a short note about why you believe this post is misinformation..."
							bind:value={confirmNotes.misinfo}
							oninput={() => (confirmError = null)}
						></textarea>
						{#if confirmError}
							<p class="mb-2 text-xs text-red-600">{confirmError}</p>
						{/if}
						<div class="flex justify-end gap-2">
							<button
								class="rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
								onclick={cancelConfirm}>Cancel</button
							>
							<button
								class="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
								onclick={confirmDecision}
								disabled={!confirmNotes.misinfo.trim()}
							>
								Confirm
							</button>
						</div>
					</div>
				{/if}
			</div>
		</div>

		<!-- Post Analysis Content -->
		{#if selectedPost && selectedPostId}
			<PostAnalysis
				post={selectedPost as SocialMediaPostData}
				postId={selectedPostId}
				{showAssistant}
				{username}
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
