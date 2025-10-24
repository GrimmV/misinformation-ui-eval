<script lang="ts">
	import { MainIntro, MainExperiment, MainCompletion, type ExperimentResults } from '$lib';

	let step = $state(1);
	let experimentResults: ExperimentResults | undefined = $state(undefined);

	function handleStepComplete() {
		step++;
	}

	function handleExperimentComplete(results: ExperimentResults) {
		console.log('Experiment completed!', results);
		experimentResults = results;
		handleStepComplete();
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
		<MainExperiment onComplete={handleExperimentComplete} />
	{:else if step === 3}
		<MainCompletion 
			onComplete={handleStudyComplete} 
			{experimentResults} 
		/>
	{/if}
</div>
