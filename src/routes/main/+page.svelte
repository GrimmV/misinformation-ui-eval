<script lang="ts">
	import { MainIntro, PrepTimeline, MainCompletion, PostAnalysisContainer } from '$lib';
	import { onMount } from 'svelte';

	let step = $state(1);
	let postIds = $state<number[]>([]);

	function handleStepComplete() {
		step++;
	}

	function handlePrepComplete(selectedPostIds: number[]) {
		postIds = selectedPostIds;
		step++;
	}

	function handleStudyComplete() {
		console.log('Study completed!');
		// You can add logic here to save final results, redirect, etc.
		alert('Thank you for completing the study!');
		try {
			localStorage.removeItem('mainStep');
			localStorage.removeItem('mainPostIds');
		} catch {}
	}

	onMount(() => {
		try {
			const savedStep = localStorage.getItem('mainStep');
			if (savedStep !== null) {
				const parsedStep = parseInt(savedStep, 10);
				if (!Number.isNaN(parsedStep)) {
					step = parsedStep;
				}
			}
			const savedPostIds = localStorage.getItem('mainPostIds');
			if (savedPostIds) {
				const parsedIds = JSON.parse(savedPostIds);
				if (Array.isArray(parsedIds)) {
					postIds = parsedIds as number[];
				}
			}
			// Safety: if we have advanced past step 1 but no postIds, reset to step 1
			if (step > 1 && (!Array.isArray(postIds) || postIds.length === 0)) {
				step = 1;
			}
		} catch {}
	});

	$effect(() => {
		try {
			localStorage.setItem('mainStep', String(step));
		} catch {}
	});

	$effect(() => {
		try {
			localStorage.setItem('mainPostIds', JSON.stringify(postIds));
		} catch {}
	});
</script>

<div class="min-h-screen bg-gray-100 pt-4">
	{#if step === 1}
		<PrepTimeline onComplete={(postIds) => handlePrepComplete(postIds)} />
	{:else if step === 2}
		<PostAnalysisContainer postIds={postIds.slice(0, 2)} onComplete={handleStepComplete} showAssistant={false} />
	{:else if step === 3}
		<PostAnalysisContainer postIds={postIds.slice(2, 4)} onComplete={handleStepComplete} showAssistant={true} />
	{:else if step === 4}
		<PostAnalysisContainer postIds={postIds.slice(4, 6)} onComplete={handleStepComplete} showAssistant={false} />
	{:else if step === 5}
		<PostAnalysisContainer postIds={postIds.slice(6, 8)} onComplete={handleStepComplete} showAssistant={true} />
	{:else if step === 6}
		<MainCompletion 
			onComplete={handleStudyComplete}
		/>
	{/if}
</div>
