<script lang="ts">
	import { ChevronLeft, ChevronRight, Circle } from 'lucide-svelte';
	import DataVisualization from './DataVisualization.svelte';
	import type { VisualizationData } from '$lib';

	interface Props {
		visualizations: VisualizationData[];
		showIndicators?: boolean;
		showNavigation?: boolean;
		autoPlay?: boolean;
		autoPlayInterval?: number;
	}

	let {
		visualizations,
		showIndicators = true,
		showNavigation = true,
		autoPlay = false,
		autoPlayInterval = 5000
	}: Props = $props();

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
			setTimeout(() => isTransitioning = false, 300);
		} else if (autoPlay) {
			// Loop to first
			isTransitioning = true;
			currentIndex = 0;
			setTimeout(() => isTransitioning = false, 300);
		}
	}

	function previousVisualization() {
		if (isTransitioning) return;
		if (hasPrevious) {
			isTransitioning = true;
			currentIndex--;
			setTimeout(() => isTransitioning = false, 300);
		} else if (autoPlay) {
			// Loop to last
			isTransitioning = true;
			currentIndex = visualizations.length - 1;
			setTimeout(() => isTransitioning = false, 300);
		}
	}

	function goToVisualization(index: number) {
		if (isTransitioning || index === currentIndex) return;
		isTransitioning = true;
		currentIndex = index;
		setTimeout(() => isTransitioning = false, 300);
	}

	// Auto-play functionality
	let autoPlayTimer: NodeJS.Timeout | null = null;

	$effect(() => {
		if (autoPlay) {
			autoPlayTimer = setInterval(() => {
				nextVisualization();
			}, autoPlayInterval);
		} else if (autoPlayTimer) {
			clearInterval(autoPlayTimer);
			autoPlayTimer = null;
		}

		return () => {
			if (autoPlayTimer) {
				clearInterval(autoPlayTimer);
			}
		};
	});
</script>

<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4 max-w-4xl mx-auto">
	<!-- Header -->
	<div class="flex items-center justify-between mb-6">
		<div>
			<h2 class="text-xl font-semibold text-gray-900">Data Analysis Dashboard</h2>
			<p class="text-sm text-gray-500">Interactive visualizations and insights</p>
		</div>
		<div class="flex items-center space-x-2 text-sm text-gray-500">
			<span>{currentIndex + 1} of {visualizations.length}</span>
		</div>
	</div>

	<!-- Carousel Container -->
	<div class="relative">
		<!-- Navigation Arrows -->
		{#if showNavigation}
			<button
				class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
				onclick={previousVisualization}
				disabled={!hasPrevious && !autoPlay}
				aria-label="Previous visualization"
			>
				<ChevronLeft class="w-5 h-5 text-gray-600" />
			</button>

			<button
				class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
				onclick={nextVisualization}
				disabled={!hasNext && !autoPlay}
				aria-label="Next visualization"
			>
				<ChevronRight class="w-5 h-5 text-gray-600" />
			</button>
		{/if}

		<!-- Visualization Container -->
		<div class="relative overflow-hidden">
			<div 
				class="transition-transform duration-300 ease-in-out {isTransitioning ? 'opacity-50' : 'opacity-100'}"
				style="transform: translateX(calc(50% - 200px - {currentIndex * 400}px))"
			>
				<div class="flex pl-16 pr-16">
					{#each visualizations as visualization, index (index)}
						<div class="w-96 flex-shrink-0 px-2">
							<button 
								class="transition-all duration-300 cursor-pointer {index === currentIndex ? 'scale-105 shadow-lg' : 'scale-95 opacity-70 hover:opacity-90'}"
								onclick={() => goToVisualization(index)}
								tabindex="0"
								aria-label="Focus on {visualization.title}"
							>
								<DataVisualization
									title={visualization.title}
									description={visualization.description}
									data={visualization.data}
									chartType={visualization.chartType}
									showValues={visualization.showValues}
									height={visualization.height}
								/>
							</button>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Indicators -->
		{#if showIndicators && visualizations.length > 1}
			<div class="flex justify-center space-x-2 mt-6">
				{#each visualizations as _, index (index)}
					<button
						class="p-1 rounded-full transition-all duration-200 hover:bg-gray-100"
						onclick={() => goToVisualization(index)}
						aria-label="Go to visualization {index + 1}"
					>
						<Circle 
							class="w-3 h-3 {index === currentIndex ? 'text-blue-600 fill-current' : 'text-gray-300'}" 
						/>
					</button>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Navigation Info -->
	<div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
		<div class="text-xs text-gray-500">
			{#if autoPlay}
				<span class="inline-flex items-center space-x-1">
					<div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
					<span>Auto-playing</span>
				</span>
			{/if}
		</div>
		<div class="flex items-center space-x-4 text-xs text-gray-500">
			<span>Use arrows to navigate</span>
			{#if visualizations.length > 1}
				<span>•</span>
				<span>Click any chart to focus</span>
				<span>•</span>
				<span>Click dots to jump</span>
			{/if}
		</div>
	</div>
</div>
