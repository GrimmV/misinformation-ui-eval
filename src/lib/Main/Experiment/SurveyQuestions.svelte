<script lang="ts">
	import { surveyQuestions } from '$lib/assets/surveyQuestions';
	import { ClipboardList, CheckCircle2, Target, Shield, Brain, ArrowRight } from 'lucide-svelte';

	interface Props {
		onComplete?: (responses: SurveyResponses) => void;
	}

	let { onComplete }: Props = $props();

	// Likert scale options with color gradients
	const likertScale = [
		{ value: 1, label: 'Strongly Disagree', color: 'red', bgColor: 'bg-red-50', borderColor: 'border-red-300', textColor: 'text-red-700' },
		{ value: 2, label: 'Disagree', color: 'orange', bgColor: 'bg-orange-50', borderColor: 'border-orange-300', textColor: 'text-orange-700' },
		{ value: 3, label: 'Neutral', color: 'gray', bgColor: 'bg-gray-50', borderColor: 'border-gray-300', textColor: 'text-gray-700' },
		{ value: 4, label: 'Agree', color: 'blue', bgColor: 'bg-blue-50', borderColor: 'border-blue-300', textColor: 'text-blue-700' },
		{ value: 5, label: 'Strongly Agree', color: 'green', bgColor: 'bg-green-50', borderColor: 'border-green-300', textColor: 'text-green-700' }
	];

	// Category labels with icons
	const categoryLabels: Record<string, { label: string; icon: any }> = {
		suitability: { label: 'Suitability', icon: Target },
		trust: { label: 'Trust', icon: Shield },
		'cognitive load': { label: 'Cognitive Load', icon: Brain }
	};

	// Initialize responses object
	let responses = $state<SurveyResponses>({});
	let focusedQuestion = $state<{ category: string; index: number } | null>(null);

	// Calculate total questions
	let totalQuestions = $derived(
		Object.values(surveyQuestions).reduce((sum, questions) => sum + questions.length, 0)
	);

	// Calculate answered questions
	let answeredQuestions = $derived(
		Object.values(responses).reduce(
			(sum, categoryResponses) =>
				sum + Object.values(categoryResponses).filter((r) => r !== null).length,
			0
		)
	);

	// Initialize all responses to null
	$effect(() => {
		const initialResponses: SurveyResponses = {};
		Object.entries(surveyQuestions).forEach(([category, questions]) => {
			initialResponses[category] = {};
			questions.forEach((_, index) => {
				initialResponses[category][index] = null;
			});
		});
		responses = initialResponses;
	});

	// Check if all questions are answered
	let allAnswered = $derived(
		Object.values(responses).every((categoryResponses) =>
			Object.values(categoryResponses).every((response) => response !== null)
		)
	);

	// Progress percentage
	let progress = $derived(Math.round((answeredQuestions / totalQuestions) * 100));

	// Handle response change
	function handleResponseChange(category: string, questionIndex: number, value: number) {
		if (!responses[category]) {
			responses[category] = {};
		}
		responses[category][questionIndex] = value;
		responses = { ...responses }; // Trigger reactivity
	}

	// Handle form submission
	function handleSubmit() {
		if (allAnswered && onComplete) {
			onComplete(responses);
		}
	}

	// Export type for responses
	export type SurveyResponses = Record<string, Record<number, number | null>>;
</script>

<div class="mx-auto mb-4 max-w-4xl rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
	<!-- Header with Progress -->
	<div class="mb-4 space-y-3">
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-3">
				<div class="rounded-lg bg-blue-100 p-2">
					<ClipboardList class="h-5 w-5 text-blue-600" />
				</div>
				<div>
					<h3 class="text-base font-semibold text-gray-900">Survey Questions</h3>
					<p class="text-xs text-gray-500">Rate each statement using the scale below</p>
				</div>
			</div>
			{#if allAnswered}
				<div class="flex items-center space-x-2 text-green-600">
					<CheckCircle2 class="h-5 w-5" />
					<span class="text-sm font-medium">Complete</span>
				</div>
			{/if}
		</div>

		<!-- Progress Bar -->
		<div class="space-y-1">
			<div class="flex items-center justify-between text-xs text-gray-600">
				<span class="font-medium">Progress</span>
				<span class="font-semibold">{answeredQuestions} / {totalQuestions} questions</span>
			</div>
			<div class="h-2 w-full overflow-hidden rounded-full bg-gray-200">
				<div
					class="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out"
					style="width: {progress}%"
				></div>
			</div>
		</div>
	</div>

	<!-- Sticky Likert Scale Legend -->
	<div
		class="sticky top-0 z-10 mb-4 rounded-lg border border-gray-200 bg-gradient-to-r from-red-50 via-gray-50 to-green-50 p-3 shadow-sm backdrop-blur-sm"
	>
		<div class="flex flex-wrap items-center justify-center gap-2">
			{#each likertScale as option}
				<div
					class="flex items-center space-x-1.5 rounded-lg border-2 {option.borderColor} {option.bgColor} px-3 py-1.5 shadow-sm"
				>
					<span class="text-sm font-bold {option.textColor}">{option.value}</span>
					<span class="text-xs font-medium {option.textColor}">{option.label}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- Questions by Category -->
	<div class="space-y-4">
		{#each Object.entries(surveyQuestions) as [category, questions]}
			<div class="space-y-3">
				<!-- Category Header with Icon -->
				<div class="flex items-center space-x-2 border-b-2 border-gray-200 pb-2">
					{#if categoryLabels[category]?.icon}
						{@const CategoryIcon = categoryLabels[category].icon}
						<CategoryIcon class="h-5 w-5 text-blue-600" />
					{/if}
					<h4 class="text-base font-bold text-gray-900">
						{categoryLabels[category]?.label || category}
					</h4>
					<span class="text-xs text-gray-500">({questions.length} questions)</span>
				</div>

				<!-- Questions -->
				<div class="space-y-2">
					{#each questions as question, questionIndex}
						{@const currentValue = responses[category]?.[questionIndex]}
						{@const isEven = questionIndex % 2 === 0}
						<div
							class="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md {isEven
								? 'bg-white'
								: 'bg-gray-50/50'}"
						>
							<!-- Question Text -->
							<div class="mb-3 flex items-start gap-2">
								<span class="flex-shrink-0 text-sm font-bold text-blue-600"
									>{questionIndex + 1}.</span
								>
								<p class="flex-1 text-sm font-medium leading-relaxed text-gray-900">
									{question}
								</p>
							</div>

							<!-- Likert Scale Buttons -->
							<div class="flex flex-wrap items-center gap-2">
								{#each likertScale as option}
									{@const isSelected = currentValue === option.value}
									<button
										type="button"
										class="min-w-[70px] rounded-lg border-2 px-3 py-2 text-xs font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 {isSelected
											? `${option.borderColor} ${option.bgColor} ${option.textColor} shadow-md scale-105`
											: 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'}"
										onclick={() => handleResponseChange(category, questionIndex, option.value)}
										onfocus={() => (focusedQuestion = { category, index: questionIndex })}
										title={option.label}
										aria-label="{option.label}"
									>
										<div class="flex flex-col items-center gap-0.5">
											<span class="text-base font-bold leading-none">{option.value}</span>
											<span class="text-[10px] leading-tight">{option.label.split(' ')[0]}</span>
										</div>
									</button>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<!-- Submit Button -->
	{#if allAnswered}
		<div class="mt-6 flex justify-end border-t border-gray-200 pt-4">
			<button
				type="button"
				class="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
				onclick={handleSubmit}
			>
				<span>Submit Survey</span>
				<ArrowRight class="h-4 w-4" />
			</button>
		</div>
	{/if}
</div>