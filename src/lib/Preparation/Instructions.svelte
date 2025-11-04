<script lang="ts">
	interface Props {
		onComplete?: () => void;
	}

	let { onComplete }: Props = $props();
</script>

<div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
	<div class="text-center mb-8">
		<h1 class="text-4xl font-bold text-gray-900 mb-4">Introduction to the Study</h1>
		<p class="text-xl text-gray-600">Welcome, and thank you for participating in this study.</p>
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
				The goal of this experiment is to explore how users can interact with AI systems that inform the spread of misinformation.
			</p>
		</div>

		<!-- Study Structure -->
		<div class="bg-green-50 rounded-lg p-6">
			<h2 class="text-2xl font-semibold text-green-900 mb-4 flex items-center">
				<svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
				</svg>
				Study Structure
			</h2>
			<p class="text-gray-700 mb-4 leading-relaxed">
				The study consists of three main parts and will take about 45 minutes in total:
			</p>
			<div class="space-y-4">
				<div class="flex items-start">
					<div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
						<span class="text-green-600 font-semibold">1</span>
					</div>
					<div>
						<h3 class="font-semibold text-green-900 mb-1">Introductory Quizzes</h3>
						<p class="text-gray-700">You will begin with a few short quizzes to make sure you understand the general setting and task structure.</p>
					</div>
				</div>
				<div class="flex items-start">
					<div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
						<span class="text-green-600 font-semibold">2</span>
					</div>
					<div>
						<h3 class="font-semibold text-green-900 mb-1">Main Experiment</h3>
						<p class="text-gray-700 mb-2">You will browse a timeline of political social media posts that have been automatically flagged by the platform as potential misinformation.</p>
						<ul class="list-disc list-inside text-gray-700 space-y-1 ml-4">
							<li>First, you will decide for several posts whether you believe the platform's flag is correct or incorrect.</li>
							<li>Afterwards, you will analyze each selected post in more detail with the help of LLM-based support. Two different approaches for this assistance will be tested during the study.</li>
						</ul>
					</div>
				</div>
				<div class="flex items-start">
					<div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
						<span class="text-green-600 font-semibold">3</span>
					</div>
					<div>
						<h3 class="font-semibold text-green-900 mb-1">Short Surveys</h3>
						<p class="text-gray-700">Between analysis sections, you will answer short questionnaires about your impressions and experience.</p>
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
			<p class="text-gray-700 leading-relaxed">
				Please take your time to carefully read the information presented on each screen. There are no right or wrong answers — we are interested in your honest assessments and thoughts.
			</p>
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
				Continue
			</button>
		</div>
	</div>
</div>
