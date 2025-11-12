<script lang="ts">
	import { ChevronLeft, ChevronRight, Circle } from 'lucide-svelte';
	import DataVisualization from './DataVisualization.svelte';
	import type { VisualizationData } from '$lib';

	interface Props {
		visualizations: VisualizationData[];
		username?: string;
	}

	let { visualizations, username }: Props = $props();

	console.log(visualizations);

	// State
	let currentIndex = $state(0);
	let isTransitioning = $state(false);

	// Computed values
	let currentVisualization = $derived(visualizations[currentIndex] as VisualizationData);
	let hasNext = $derived(currentIndex < visualizations.length - 1);
	let hasPrevious = $derived(currentIndex > 0);

	// Navigation functions
	function nextVisualization() {
		if (isTransitioning) return;
		if (hasNext) {
			isTransitioning = true;
			currentIndex++;
			setTimeout(() => (isTransitioning = false), 300);
		}
	}

	function previousVisualization() {
		if (isTransitioning) return;
		if (hasPrevious) {
			isTransitioning = true;
			currentIndex--;
			setTimeout(() => (isTransitioning = false), 300);
		}
	}

	function goToVisualization(index: number) {
		if (isTransitioning || index === currentIndex) return;
		isTransitioning = true;
		currentIndex = index;
		setTimeout(() => (isTransitioning = false), 300);
	}
</script>

<div class="mx-auto mb-4 max-w-4xl rounded-lg bg-amber-50 p-6">
	<!-- Header -->
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h2 class="text-xl font-semibold text-gray-900">Detailed Insights</h2>
			<p class="text-sm text-gray-500">Interactive visualizations and insights</p>
		</div>
		<div class="flex items-center space-x-2 text-sm text-gray-500">
			<span>{currentIndex + 1} of {visualizations.length}</span>
		</div>
	</div>

	<!-- Carousel Container -->
	<div class="relative">
		<!-- Navigation Arrows -->
		<button
			class="absolute top-1/2 left-0 z-10 -translate-x-4 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 shadow-lg transition-all duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
			onclick={previousVisualization}
			disabled={!hasPrevious}
			aria-label="Previous visualization"
		>
			<ChevronLeft class="h-5 w-5 text-gray-600" />
		</button>

		<button
			class="absolute top-1/2 right-0 z-10 translate-x-4 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 shadow-lg transition-all duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
			onclick={nextVisualization}
			disabled={!hasNext}
			aria-label="Next visualization"
		>
			<ChevronRight class="h-5 w-5 text-gray-600" />
		</button>

		<!-- Visualization Container -->
		<div class="relative overflow-hidden">
			<div
				class="transition-transform duration-300 ease-in-out {isTransitioning
					? 'opacity-50'
					: 'opacity-100'}"
				style="transform: translateX(calc(50% - 200px - {currentIndex * 400}px))"
			>
				<div class="flex pr-16 pl-16">
					{#each visualizations as visualization, index (index)}
						<div class="w-96 flex-shrink-0 px-2">
							<button
								class="cursor-pointer transition-all duration-300 {index === currentIndex
									? 'scale-105 shadow-lg'
									: 'scale-95 opacity-70 hover:opacity-90'}"
								onclick={() => goToVisualization(index)}
								tabindex="0"
								aria-label="Focus on {visualization.title}"
							>
								<DataVisualization
									title={visualization.title}
									context={visualization.context}
									action={visualization.action}
									description={visualization.description}
									extended_description={visualization.extended_description}
									data={visualization.data}
									username={username ?? ''}
								/>
							</button>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Indicators -->
		{#if visualizations.length > 1}
			<div class="mt-6 flex justify-center space-x-2">
				{#each visualizations as _, index (index)}
					<button
						class="rounded-full p-1 transition-all duration-200 hover:bg-gray-100"
						onclick={() => goToVisualization(index)}
						aria-label="Go to visualization {index + 1}"
					>
						<Circle
							class="h-3 w-3 {index === currentIndex
								? 'fill-current text-blue-600'
								: 'text-gray-300'}"
						/>
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>
