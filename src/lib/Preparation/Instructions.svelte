<script lang="ts">
	interface Props {
		onComplete?: () => void;
	}

	let { onComplete }: Props = $props();
</script>

<div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
	<div class="text-center mb-8">
		<h1 class="text-4xl font-bold text-gray-900 mb-4">Welcome to the Preparation Phase</h1>
		<p class="text-xl text-gray-600">Let's get you ready for the experiment!</p>
	</div>

	<div class="space-y-8">
		<!-- Goal Section -->
		<div class="bg-blue-50 rounded-lg p-6">
			<h2 class="text-2xl font-semibold text-blue-900 mb-4 flex items-center">
				<svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
				</svg>
				Experiment Goal
			</h2>
			<p class="text-gray-700 leading-relaxed">
				This experiment is designed to study how people interact with machine learning models for fake news detection. 
				Your participation will help us understand the effectiveness of different approaches to identifying misinformation.
			</p>
		</div>

		<!-- How the Quiz Works -->
		<div class="bg-green-50 rounded-lg p-6">
			<h2 class="text-2xl font-semibold text-green-900 mb-4 flex items-center">
				<svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
				</svg>
				How the Quiz Works
			</h2>
			<div class="space-y-4">
				<div class="flex items-start">
					<div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
						<span class="text-green-600 font-semibold">1</span>
					</div>
					<div>
						<h3 class="font-semibold text-green-900">Answer Questions</h3>
						<p class="text-gray-700">You'll be presented with multiple-choice questions about fake news detection concepts.</p>
					</div>
				</div>
				<div class="flex items-start">
					<div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
						<span class="text-green-600 font-semibold">2</span>
					</div>
					<div>
						<h3 class="font-semibold text-green-900">Learn from Explanations</h3>
						<p class="text-gray-700">After each question, you'll receive detailed explanations to help you understand the concepts better.</p>
					</div>
				</div>
				<div class="flex items-start">
					<div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
						<span class="text-green-600 font-semibold">3</span>
					</div>
					<div>
						<h3 class="font-semibold text-green-900">Track Your Progress</h3>
						<p class="text-gray-700">You can navigate between questions and see your progress through the quiz.</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Important Notes -->
		<div class="bg-yellow-50 rounded-lg p-6">
			<h2 class="text-2xl font-semibold text-yellow-900 mb-4 flex items-center">
				<svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
				</svg>
				Important Notes
			</h2>
			<ul class="space-y-2 text-gray-700">
				<li class="flex items-start">
					<svg class="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
					</svg>
					Take your time to read each question carefully
				</li>
				<li class="flex items-start">
					<svg class="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
					</svg>
					There are no time limits, so don't rush
				</li>
				<li class="flex items-start">
					<svg class="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
					</svg>
					Your responses will be used for research purposes only
				</li>
			</ul>
		</div>

		<!-- Ready to Start -->
		<div class="text-center pt-6">
			<button 
				onclick={onComplete}
				class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center mx-auto"
			>
				<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
				</svg>
				Start the Preparation Quiz
			</button>
		</div>
	</div>
</div>
