<script lang="ts">
	import { MainIntro, PrepTimeline, MainCompletion, PostAnalysisContainer } from '$lib';

	let step = $state(1);

	function handleStepComplete() {
		step++;
	}

	function handleStudyComplete() {
		console.log('Study completed!');
		// You can add logic here to save final results, redirect, etc.
		alert('Thank you for completing the study!');
	}
</script>

<div class="min-h-screen bg-gray-100 py-12">
	{#if step === 1}
		<MainIntro onComplete={handleStepComplete} />
	{:else if step === 2}
		<PrepTimeline onComplete={handleStepComplete} />
	{:else if step === 3}
		<PostAnalysisContainer onComplete={handleStepComplete} />
	{:else if step === 4}
		<MainCompletion 
			onComplete={handleStudyComplete}
		/>
	{/if}
</div>
