<script lang="ts">
	interface Props {
		onComplete?: () => void;
	}

	let { onComplete }: Props = $props();
</script>

<div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
	<div class="text-center mb-8">
		<div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
			<svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
			</svg>
		</div>
		<h1 class="text-4xl font-bold text-gray-900 mb-4">Main Experiment</h1>
		<p class="text-xl text-gray-600">Now it's time to put your knowledge to the test!</p>
	</div>

	<div class="space-y-8">
		<!-- Experiment Overview -->
		<div class="bg-blue-50 rounded-lg p-6">
			<h2 class="text-2xl font-semibold text-blue-900 mb-4 flex items-center">
				<svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
				</svg>
				What You'll Be Doing
			</h2>
			<p class="text-gray-700 leading-relaxed mb-4">
				In this experiment, you'll be presented with real news articles and asked to determine whether they are genuine or fake news. 
				You'll use a machine learning system to help you make these decisions.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="bg-white rounded-lg p-4">
					<h3 class="font-semibold text-blue-900 mb-2">📰 News Articles</h3>
					<p class="text-sm text-gray-700">You'll see various news articles with different topics and sources</p>
				</div>
				<div class="bg-white rounded-lg p-4">
					<h3 class="font-semibold text-blue-900 mb-2">🤖 AI Assistance</h3>
					<p class="text-sm text-gray-700">The system will provide predictions and explanations to help you decide</p>
				</div>
			</div>
		</div>

		<!-- How It Works -->
		<div class="bg-green-50 rounded-lg p-6">
			<h2 class="text-2xl font-semibold text-green-900 mb-4 flex items-center">
				<svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
				</svg>
				How the Experiment Works
			</h2>
			<div class="space-y-4">
				<div class="flex items-start">
					<div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
						<span class="text-green-600 font-semibold">1</span>
					</div>
					<div>
						<h3 class="font-semibold text-green-900">Read the Article</h3>
						<p class="text-gray-700">Carefully read through the news article presented to you</p>
					</div>
				</div>
				<div class="flex items-start">
					<div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
						<span class="text-green-600 font-semibold">2</span>
					</div>
					<div>
						<h3 class="font-semibold text-green-900">Review AI Analysis</h3>
						<p class="text-gray-700">Examine the machine learning system's prediction and reasoning</p>
					</div>
				</div>
				<div class="flex items-start">
					<div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
						<span class="text-green-600 font-semibold">3</span>
					</div>
					<div>
						<h3 class="font-semibold text-green-900">Make Your Decision</h3>
						<p class="text-gray-700">Decide whether the article is real or fake news based on all available information</p>
					</div>
				</div>
				<div class="flex items-start">
					<div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
						<span class="text-green-600 font-semibold">4</span>
					</div>
					<div>
						<h3 class="font-semibold text-green-900">Provide Feedback</h3>
						<p class="text-gray-700">Share your confidence level and reasoning for your decision</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Important Guidelines -->
		<div class="bg-yellow-50 rounded-lg p-6">
			<h2 class="text-2xl font-semibold text-yellow-900 mb-4 flex items-center">
				<svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
				</svg>
				Important Guidelines
			</h2>
			<ul class="space-y-2 text-gray-700">
				<li class="flex items-start">
					<svg class="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
					</svg>
					Take your time to carefully analyze each article
				</li>
				<li class="flex items-start">
					<svg class="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
					</svg>
					Consider both the AI's analysis and your own judgment
				</li>
				<li class="flex items-start">
					<svg class="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
					</svg>
					There are no right or wrong answers - we want your honest assessment
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
				Start the Experiment
			</button>
		</div>
	</div>
</div>
