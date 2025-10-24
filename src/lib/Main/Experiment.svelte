<script lang="ts">
	interface Props {
		onComplete?: (results: ExperimentResults) => void;
	}

	export interface ExperimentResults {
		totalArticles: number;
		correctDecisions: number;
		accuracy: number;
		decisions: ArticleDecision[];
	}

	interface ArticleDecision {
		articleId: number;
		articleTitle: string;
		userDecision: 'real' | 'fake';
		actualLabel: 'real' | 'fake';
		isCorrect: boolean;
		confidence: number;
		timeSpent: number;
		reasoning: string;
	}

	let { onComplete }: Props = $props();

	// Placeholder data - replace with actual experiment logic
	let currentArticleIndex = $state(0);
	let experimentResults: ArticleDecision[] = $state([]);
	let isExperimentComplete = $state(false);
	let articleStartTime = $state(Date.now());

	// Mock articles for demonstration
	const mockArticles = [
		{
			id: 1,
			title: "Scientists Discover New Species of Butterfly in Amazon Rainforest",
			content: "A team of researchers from the University of São Paulo has announced the discovery of a previously unknown species of butterfly in the Amazon rainforest. The new species, named Morpho amazonensis, was found during a three-year expedition...",
			actualLabel: 'real' as const,
			aiPrediction: 'real' as const,
			aiConfidence: 0.87,
			aiReasoning: "The article contains specific scientific details, proper citations, and follows journalistic standards typical of legitimate science reporting."
		},
		{
			id: 2,
			title: "BREAKING: Local Man Discovers Secret Government Alien Base",
			content: "John Smith, a 45-year-old plumber from Springfield, claims to have discovered a secret government facility housing extraterrestrial beings. According to Smith, he stumbled upon the base while hiking in the woods behind his house...",
			actualLabel: 'fake' as const,
			aiPrediction: 'fake' as const,
			aiConfidence: 0.92,
			aiReasoning: "Contains typical conspiracy theory elements, lacks credible sources, and uses sensationalist language common in fake news."
		},
		{
			id: 3,
			title: "New Study Shows Coffee May Reduce Risk of Heart Disease",
			content: "A comprehensive study published in the Journal of the American Heart Association suggests that moderate coffee consumption may be associated with a reduced risk of cardiovascular disease. The research, conducted over 10 years with 500,000 participants...",
			actualLabel: 'real' as const,
			aiPrediction: 'real' as const,
			aiConfidence: 0.91,
			aiReasoning: "Well-structured scientific reporting with proper study citations, peer-reviewed journal reference, and balanced presentation of findings."
		}
	];

	const currentArticle = $derived(mockArticles[currentArticleIndex]);
	const progress = $derived(((currentArticleIndex + 1) / mockArticles.length) * 100);
	const correctDecisions = $derived(experimentResults.filter(r => r.isCorrect).length);
	const accuracy = $derived(Math.round((correctDecisions / experimentResults.length) * 100));

	let userDecision = $state<'real' | 'fake' | null>(null);
	let confidence = $state(50);
	let reasoning = $state('');

	function handleDecision(decision: 'real' | 'fake') {
		userDecision = decision;
	}

	function submitDecision() {
		if (userDecision === null) return;

		const timeSpent = Date.now() - articleStartTime;
		const isCorrect = userDecision === currentArticle.actualLabel;
		
		const result: ArticleDecision = {
			articleId: currentArticle.id,
			articleTitle: currentArticle.title,
			userDecision,
			actualLabel: currentArticle.actualLabel,
			isCorrect,
			confidence,
			timeSpent,
			reasoning
		};

		experimentResults = [...experimentResults, result];

		if (currentArticleIndex < mockArticles.length - 1) {
			currentArticleIndex++;
			userDecision = null;
			confidence = 50;
			reasoning = '';
			articleStartTime = Date.now();
		} else {
			completeExperiment();
		}
	}

	function completeExperiment() {
		isExperimentComplete = true;
		const results: ExperimentResults = {
			totalArticles: mockArticles.length,
			correctDecisions,
			accuracy,
			decisions: experimentResults
		};
		onComplete?.(results);
	}
</script>

<div class="max-w-4xl mx-auto">
	{#if !isExperimentComplete}
		<!-- Progress Header -->
		<div class="bg-white rounded-lg shadow-lg p-6 mb-6">
			<div class="flex items-center justify-between mb-4">
				<h1 class="text-2xl font-bold text-gray-900">Experiment in Progress</h1>
				<div class="flex items-center space-x-4">
					<span class="text-sm text-gray-600">
						Article {currentArticleIndex + 1} of {mockArticles.length}
					</span>
					<div class="w-32 bg-gray-200 rounded-full h-2">
						<div 
							class="bg-blue-600 h-2 rounded-full transition-all duration-300"
							style="width: {progress}%"
						></div>
					</div>
				</div>
			</div>
		</div>

		<!-- Article Content -->
		<div class="bg-white rounded-lg shadow-lg p-8 mb-6">
			<h2 class="text-2xl font-bold text-gray-900 mb-6">{currentArticle.title}</h2>
			<div class="prose max-w-none text-gray-700 leading-relaxed">
				<p>{currentArticle.content}</p>
			</div>
		</div>

		<!-- AI Analysis -->
		<div class="bg-blue-50 rounded-lg p-6 mb-6">
			<h3 class="text-lg font-semibold text-blue-900 mb-4 flex items-center">
				<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
				</svg>
				AI Analysis
			</h3>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<p class="text-sm text-gray-600 mb-1">Prediction</p>
					<div class="flex items-center space-x-2">
						<span class="px-3 py-1 rounded-full text-sm font-medium {currentArticle.aiPrediction === 'real' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
							{currentArticle.aiPrediction === 'real' ? 'Real News' : 'Fake News'}
						</span>
						<span class="text-sm text-gray-600">({Math.round(currentArticle.aiConfidence * 100)}% confidence)</span>
					</div>
				</div>
				<div>
					<p class="text-sm text-gray-600 mb-1">Reasoning</p>
					<p class="text-sm text-gray-700">{currentArticle.aiReasoning}</p>
				</div>
			</div>
		</div>

		<!-- User Decision -->
		<div class="bg-white rounded-lg shadow-lg p-6 mb-6">
			<h3 class="text-lg font-semibold text-gray-900 mb-4">Your Decision</h3>
			
			<!-- Decision Buttons -->
			<div class="flex space-x-4 mb-6">
				<button
					onclick={() => handleDecision('real')}
					class="flex-1 p-4 border-2 rounded-lg transition-colors {userDecision === 'real' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-300 hover:border-green-300'}"
				>
					<div class="text-center">
						<svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
						<div class="font-semibold">Real News</div>
					</div>
				</button>
				<button
					onclick={() => handleDecision('fake')}
					class="flex-1 p-4 border-2 rounded-lg transition-colors {userDecision === 'fake' ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-300 hover:border-red-300'}"
				>
					<div class="text-center">
						<svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
						</svg>
						<div class="font-semibold">Fake News</div>
					</div>
				</button>
			</div>

			<!-- Confidence Level -->
			<div class="mb-6">
				<label for="confidence-slider" class="block text-sm font-medium text-gray-700 mb-2">
					Confidence Level: {confidence}%
				</label>
				<input
					id="confidence-slider"
					type="range"
					min="0"
					max="100"
					bind:value={confidence}
					class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
				/>
				<div class="flex justify-between text-xs text-gray-500 mt-1">
					<span>Not confident</span>
					<span>Very confident</span>
				</div>
			</div>

			<!-- Reasoning -->
			<div class="mb-6">
				<label for="reasoning-textarea" class="block text-sm font-medium text-gray-700 mb-2">
					Your Reasoning (optional)
				</label>
				<textarea
					id="reasoning-textarea"
					bind:value={reasoning}
					placeholder="Explain your decision..."
					class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					rows="3"
				></textarea>
			</div>

			<!-- Submit Button -->
			<button
				onclick={submitDecision}
				disabled={userDecision === null}
				class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
			>
				{currentArticleIndex < mockArticles.length - 1 ? 'Next Article' : 'Complete Experiment'}
			</button>
		</div>
	{/if}
</div>
