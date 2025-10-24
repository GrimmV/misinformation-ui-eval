<script lang="ts">
	interface Props {
		onContinue?: () => void;
		quizResults?: {
			score: number;
			correctAnswers: number;
			totalQuestions: number;
		};
	}

	let { onContinue, quizResults }: Props = $props();
</script>

<div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
	<div class="text-center mb-8">
		<div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
			<svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
			</svg>
		</div>
		<h1 class="text-4xl font-bold text-gray-900 mb-4">Preparation Complete!</h1>
		<p class="text-xl text-gray-600">You've successfully completed the preparation phase.</p>
	</div>

	<div class="space-y-8">
		<!-- Quiz Results Summary -->
		{#if quizResults}
			<div class="bg-green-50 rounded-lg p-6">
				<h2 class="text-2xl font-semibold text-green-900 mb-4 flex items-center">
					<svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
					</svg>
					Your Quiz Results
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div class="text-center bg-white rounded-lg p-4">
						<div class="text-3xl font-bold text-green-600 mb-2">{quizResults.score}%</div>
						<div class="text-sm text-gray-600">Overall Score</div>
					</div>
					<div class="text-center bg-white rounded-lg p-4">
						<div class="text-3xl font-bold text-blue-600 mb-2">{quizResults.correctAnswers}</div>
						<div class="text-sm text-gray-600">Correct Answers</div>
					</div>
					<div class="text-center bg-white rounded-lg p-4">
						<div class="text-3xl font-bold text-purple-600 mb-2">{quizResults.totalQuestions}</div>
						<div class="text-sm text-gray-600">Total Questions</div>
					</div>
				</div>
			</div>
		{/if}

		<!-- What's Next -->
		<div class="bg-blue-50 rounded-lg p-6">
			<h2 class="text-2xl font-semibold text-blue-900 mb-4 flex items-center">
				<svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
				</svg>
				What's Next?
			</h2>
			<div class="space-y-4">
				<div class="flex items-start">
					<div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
						<span class="text-blue-600 font-semibold">1</span>
					</div>
					<div>
						<h3 class="font-semibold text-blue-900">Main Experiment</h3>
						<p class="text-gray-700">You'll now proceed to the main experiment where you'll interact with the fake news detection system.</p>
					</div>
				</div>
				<div class="flex items-start">
					<div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
						<span class="text-blue-600 font-semibold">2</span>
					</div>
					<div>
						<h3 class="font-semibold text-blue-900">Real-World Scenarios</h3>
						<p class="text-gray-700">You'll be presented with news articles and asked to determine if they're real or fake using the system.</p>
					</div>
				</div>
				<div class="flex items-start">
					<div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
						<span class="text-blue-600 font-semibold">3</span>
					</div>
					<div>
						<h3 class="font-semibold text-blue-900">Your Feedback</h3>
						<p class="text-gray-700">Your interactions and decisions will help us understand how people use AI systems for fact-checking.</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Important Reminders -->
		<div class="bg-yellow-50 rounded-lg p-6">
			<h2 class="text-2xl font-semibold text-yellow-900 mb-4 flex items-center">
				<svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
				</svg>
				Important Reminders
			</h2>
			<ul class="space-y-2 text-gray-700">
				<li class="flex items-start">
					<svg class="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
					</svg>
					Use the knowledge you gained from the preparation quiz
				</li>
				<li class="flex items-start">
					<svg class="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
					</svg>
					Take your time to analyze each article carefully
				</li>
				<li class="flex items-start">
					<svg class="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
					</svg>
					Your honest responses are valuable for our research
				</li>
			</ul>
		</div>

		<!-- Continue Button -->
		<div class="text-center pt-6">
			<button 
				onclick={onContinue}
				class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center mx-auto"
			>
				<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
				</svg>
				Continue to Main Experiment
			</button>
		</div>
	</div>
</div>
