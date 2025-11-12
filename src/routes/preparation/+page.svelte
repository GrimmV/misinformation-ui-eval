<script lang="ts">
	import {
		PreparationQuiz,
		PreparationInstructions,
		PreparationCompletion,
		PreparationQuizIntro
	} from '$lib';
	import type { QuizResults } from '$lib';
	import {
		quizQuestionsGeneral,
		quizQuestionsFeatures,
		type QuizQuestion
	} from '$lib/assets/quizData';
	import { goto } from '$app/navigation';
	import DerivedFeatureImage from '$lib/assets/images/DerivedFeatures.png';
	import EvaluationAssistantImage from '$lib/assets/images/EvaluationAssistant.png';
	import PostExampleImage from '$lib/assets/images/PostExample.jpg';
	import { onMount } from 'svelte';
	
	let { data } = $props();

	const username = data?.user?.username;

	let step = $state(1);
	let quizResults: QuizResults | undefined = $state(undefined);

	function handleStepComplete() {
		step++;
	}

	function handleQuizComplete(results: QuizResults) {
		console.log('Quiz completed!', results);
		quizResults = results;
		handleStepComplete();
	}

	function handleContinueToExperiment() {
		// Navigate to main experiment or handle the transition
		console.log('Continuing to main experiment...');
		// You can add navigation logic here, e.g., goto('/main')
		goto('/main');
	}

	const quizIntroItems = [
		{
			description:
				'You will be presented with posts that are flagged by the platform if they are deemed to be misinformation.',
			imageSrc: PostExampleImage,
			alt: 'Post Example',
			width: 200
		},
		{
			description:
				'To make the flagging more transparent, semantic features are extracted from the post:',
			imageSrc: DerivedFeatureImage,
			alt: 'Derived Features',
			width: 200
		},
		{
			description:
				'Although it might be helpful to provide such automized flagging, it can also be wrong and thus misleading. It is the burden of the user to assess the flag. In this experiment, we provide an assistant that will help you to build trust or distrust in the flag.',
			imageSrc: EvaluationAssistantImage,
			alt: 'Evaluation Assistant',
			width: 200
		}
	];
	onMount(() => {
		const saved =
			typeof localStorage !== 'undefined' ? localStorage.getItem('preparationStep') : null;
		if (saved !== null) {
			const parsed = parseInt(saved, 10);
			if (!Number.isNaN(parsed)) {
				step = parsed;
			}
		}
	});

	$effect(() => {
		try {
			localStorage.setItem('preparationStep', String(step));
		} catch {}
	});
</script>

<div class="min-h-screen bg-gray-100 py-12">
	{#if step === 1}
		<PreparationInstructions onComplete={handleStepComplete} {username} />
	{:else if step === 2}
		<PreparationQuizIntro
			title="Understanding the Experiment (Part 1/2)"
			description="Let's first understand the scenario of the experiment "
			onComplete={handleStepComplete} {username}
			items={quizIntroItems}
		/>
	{:else if step === 3}
		<PreparationQuiz
			description="Learn how the experiment works (Quiz 1/2)"
			onQuizComplete={handleQuizComplete} {username}
			quizQuestions={quizQuestionsGeneral as QuizQuestion[]}
		/>
	{:else if step === 4}
		<PreparationQuizIntro
			title="Semantic Features (Part 2/2)"
			description="As you learned, semantic features are extracted from each post that are used to classify it. Now, you will get to know these features a bit more and assign them to statements."
			onComplete={handleStepComplete} {username}
		/>
	{:else if step === 5}
		<PreparationQuiz
			description="Learn the semantic features extracted from each post (Quiz 2/2)"
			onQuizComplete={handleQuizComplete} {username}
			quizQuestions={quizQuestionsFeatures as QuizQuestion[]}
		/>
	{:else if step === 6}
		<PreparationCompletion onContinue={handleContinueToExperiment} {quizResults} {username} />
	{/if}
</div>
