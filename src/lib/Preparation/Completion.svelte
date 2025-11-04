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
		<p class="text-xl text-gray-600">Great. Now you are ready to start the experiment.</p>
	</div>

	<div class="space-y-8">
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
						<p class="text-gray-700">You'll be presented with political posts from the last 2 years and asked to determine if they're real or fake using the system.</p>
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
				<div class="flex items-start">
					<div>
						<h3 class="font-semibold text-blue-900">Keep in mind: There are no right or wrong answers - give us you honest assessment.</h3>
					</div>
				</div>
			</div>
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
				Start the Experiment
			</button>
		</div>
	</div>
</div>
