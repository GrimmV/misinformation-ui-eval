<script lang="ts">
	import {
		MainIntro,
		PrepTimeline,
		MainCompletion,
		PostAnalysisContainer,
		SurveyQuestions
	} from '$lib';
	import AIAssistantImage from '$lib/assets/images/AIAssistant.png';
	import AIDashboardImage from '$lib/assets/images/AIDashboard.png';
	import { onMount } from 'svelte';

	let { data } = $props();

	const username = data?.user?.username;

	const AiDashboardItems = [
		{
			description: `
				You have now chosen 6 posts that you will assess in the following steps.
				The first three posts will be assessed with the help of the so-called "AI Dashboard".
				You will be provided with different information about how the decision for the flag was made.
				The information is presented with AI generated text and accompanied by data visualizations (not AI generated).

				This is how it looks like:
			`,
			imageSrc: AIDashboardImage,
			alt: 'AI Dashboard Example',
			width: 200
		}
	];

	const AiAssistantItems = [
		{
			description: `
				You have finished the tasks with the AI Dashboard.
				Now, the last three posts will be assessed with the help of the so-called "AI Assistant".
				You will be provided with a trust assessment and further detailed information, including 
				the information from the AI Dashboard.
				
				This is how it looks like:
			`,
			imageSrc: AIAssistantImage,
			alt: 'AI Assistant Example',
			width: 200
		}
	];

	let step = $state(1);
	let postIds = $state<number[]>([]);

	function handleStepComplete() {
		step++;
	}

	function handlePrepComplete(selectedPostIds: number[]) {
		console.log('Selected postIds:', selectedPostIds);
		postIds = selectedPostIds;
		// shuffle postIds
		postIds = postIds.sort(() => Math.random() - 0.5);
		console.log('Shuffled postIds:', postIds);
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
		<PrepTimeline onComplete={(postIds) => handlePrepComplete(postIds)} {username} />
	{:else if step === 2}
		<MainIntro
			title="Main Experiment"
			description="You will now assess the first three posts with the help of the AI Dashboard."
			items={AiDashboardItems}
			onComplete={handleStepComplete}
			{username}
		/>
	{:else if step === 3}
		<PostAnalysisContainer
			postIds={postIds.slice(0, 3)}
			onComplete={handleStepComplete}
			showAssistant={false}
			{username}
		/>
	{:else if step === 4}
		<SurveyQuestions onComplete={handleStepComplete} {username} />
	{:else if step === 5}
		<MainIntro
			title="Main Experiment"
			description="You will now assess the last three posts with the help of the AI Assistant."
			items={AiAssistantItems}
			onComplete={handleStepComplete}
			{username}
		/>
	{:else if step === 6}
		<PostAnalysisContainer
			postIds={postIds.slice(3, 6)}
			onComplete={handleStepComplete}
			showAssistant={true}
			{username}
		/>
	{:else if step === 7}
		<SurveyQuestions onComplete={handleStepComplete} {username} />
	{:else if step === 8}
		<MainCompletion onComplete={handleStudyComplete}/>
	{/if}
</div>
