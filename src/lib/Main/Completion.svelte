<script lang="ts">
	import type { ExperimentResults } from './Experiment.svelte';

	interface Props {
		onComplete?: () => void;
		experimentResults?: ExperimentResults;
	}

	let { onComplete, experimentResults }: Props = $props();
</script>

<div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
	<div class="text-center mb-8">
		<div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
			<svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
			</svg>
		</div>
		<h1 class="text-4xl font-bold text-gray-900 mb-4">Experiment Complete!</h1>
		<p class="text-xl text-gray-600">Thank you for participating in our research study.</p>
	</div>

	<div class="space-y-8">
		<!-- Experiment Results Summary -->
		{#if experimentResults}
			<div class="bg-green-50 rounded-lg p-6">
				<h2 class="text-2xl font-semibold text-green-900 mb-4 flex items-center">
					<svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
					</svg>
					Your Performance Summary
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div class="text-center bg-white rounded-lg p-4">
						<div class="text-3xl font-bold text-green-600 mb-2">{experimentResults.accuracy}%</div>
						<div class="text-sm text-gray-600">Accuracy</div>
					</div>
					<div class="text-center bg-white rounded-lg p-4">
						<div class="text-3xl font-bold text-blue-600 mb-2">{experimentResults.correctDecisions}</div>
						<div class="text-sm text-gray-600">Correct Decisions</div>
					</div>
					<div class="text-center bg-white rounded-lg p-4">
						<div class="text-3xl font-bold text-purple-600 mb-2">{experimentResults.totalArticles}</div>
						<div class="text-sm text-gray-600">Total Articles</div>
					</div>
				</div>
			</div>
		{/if}

		<!-- What We Learned -->
		<div class="bg-blue-50 rounded-lg p-6">
			<h2 class="text-2xl font-semibold text-blue-900 mb-4 flex items-center">
				<svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
				</svg>
				What We Learned
			</h2>
			<div class="space-y-4">
				<div class="flex items-start">
					<div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
						<span class="text-blue-600 font-semibold">1</span>
					</div>
					<div>
						<h3 class="font-semibold text-blue-900">Human-AI Collaboration</h3>
						<p class="text-gray-700">Your responses help us understand how people interact with AI systems for fact-checking.</p>
					</div>
				</div>
				<div class="flex items-start">
					<div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
						<span class="text-blue-600 font-semibold">2</span>
					</div>
					<div>
						<h3 class="font-semibold text-blue-900">Decision-Making Patterns</h3>
						<p class="text-gray-700">We can analyze how different people approach the challenge of identifying fake news.</p>
					</div>
				</div>
				<div class="flex items-start">
					<div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
						<span class="text-blue-600 font-semibold">3</span>
					</div>
					<div>
						<h3 class="font-semibold text-blue-900">System Improvement</h3>
						<p class="text-gray-700">Your feedback will help us improve AI systems for better fake news detection.</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Research Impact -->
		<div class="bg-purple-50 rounded-lg p-6">
			<h2 class="text-2xl font-semibold text-purple-900 mb-4 flex items-center">
				<svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
				</svg>
				Research Impact
			</h2>
			<p class="text-gray-700 leading-relaxed mb-4">
				Your participation contributes to important research on human-AI interaction in the context of misinformation detection. 
				This work has the potential to:
			</p>
			<ul class="space-y-2 text-gray-700">
				<li class="flex items-start">
					<svg class="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
					</svg>
					Improve AI systems for better fake news detection
				</li>
				<li class="flex items-start">
					<svg class="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
					</svg>
					Develop better tools for journalists and fact-checkers
				</li>
				<li class="flex items-start">
					<svg class="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
					</svg>
					Enhance public understanding of misinformation
				</li>
				<li class="flex items-start">
					<svg class="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
					</svg>
					Inform policy decisions about digital literacy
				</li>
			</ul>
		</div>

		<!-- Next Steps -->
		<div class="bg-yellow-50 rounded-lg p-6">
			<h2 class="text-2xl font-semibold text-yellow-900 mb-4 flex items-center">
				<svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
				</svg>
				What Happens Next?
			</h2>
			<div class="space-y-3 text-gray-700">
				<p>• Your responses will be anonymized and analyzed as part of our research dataset</p>
				<p>• Results may be published in academic papers or presented at conferences</p>
				<p>• If you provided contact information, we may reach out for follow-up studies</p>
				<p>• You can learn more about our research findings on our website</p>
			</div>
		</div>

		<!-- Thank You -->
		<div class="text-center pt-6">
			<div class="mb-6">
				<h3 class="text-2xl font-semibold text-gray-900 mb-2">Thank You!</h3>
				<p class="text-gray-600">Your participation is invaluable to our research.</p>
			</div>
			<button 
				onclick={onComplete}
				class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center mx-auto"
			>
				<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
				</svg>
				Complete Study
			</button>
		</div>
	</div>
</div>
