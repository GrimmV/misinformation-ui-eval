<script lang="ts">
	import { Info } from 'lucide-svelte';

	export interface Feature{
		description: string;
		max: number;
		min: number;
		value: number;
	};

	interface Props {
		features: Record<string, Feature>;
	}

	let { features }: Props = $props();
	
	// Format feature name
	function formatFeatureName(name: string): string {
		return name
			.split('_')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	// Calculate percentage for progress bar
	function getPercentage(feature: Feature): number {
		const range = feature.max - feature.min;
		if (range === 0) return 0;
		return ((feature.value - feature.min) / range) * 100;
	}

	// Get color based on feature type and value
	function getColor(feature: Feature, featureName: string): string {
		const percentage = getPercentage(feature);
		
		// Continuous features (0 to 1)
		if (percentage < 33) return 'bg-blue-300';
		if (percentage < 67) return 'bg-blue-400';
		return 'bg-blue-500';
	}

	// Format value display
	function formatValue(value: number): string {
		return Number(value.toFixed(2)).toString();
	}

	// Handle tooltip positioning
	function handleTooltipPosition(tooltip: HTMLElement, card: HTMLElement) {
		const cardRect = card.getBoundingClientRect();
		const spacing = 8; // ml-2 = 0.5rem = 8px
		
		tooltip.style.left = `${cardRect.right + spacing}px`;
		tooltip.style.top = `${cardRect.top}px`;
	}
</script>

<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm w-full overflow-y-hidden">
	<div class="mb-3">
		<h3 class="text-base font-semibold text-gray-900">Derived Features</h3>
	</div>

	<!-- Grid container: 3 features per row on large screens -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
		{#each Object.entries(features) as [featureName, feature]}
			<div 
				class="group relative w-full rounded-lg border border-gray-100 bg-gray-50 p-3 transition-all hover:border-gray-200 hover:shadow-sm"
				role="presentation"
				onmouseenter={(e) => {
					const card = e.currentTarget;
					const tooltip = card.querySelector('[data-tooltip]') as HTMLElement;
					if (tooltip) {
						handleTooltipPosition(tooltip, card);
					}
				}}
			>
				<!-- Feature Header -->
				<div class="w-full">
					<div class="space-y-2">
						<div class="flex items-center justify-between">
							<h4 class="text-xs font-medium text-gray-900 leading-tight">
								{formatFeatureName(featureName)}
							</h4>
							<Info class="h-3 w-3 text-gray-400 transition-colors group-hover:text-blue-500 flex-shrink-0" />
						</div>
						
						<!-- Progress Bar -->
						<div class="relative h-1.5 bg-gray-200 rounded-full overflow-hidden">
							<div
								class="h-full {getColor(feature, featureName)} transition-all duration-300"
								style="width: {getPercentage(feature)}%"
							></div>
						</div>
						
						<!-- Value and Range -->
						<div class="flex items-center justify-between">
							<span class="text-xs font-mono font-semibold text-gray-700">
								{formatValue(feature.value)}
							</span>
							<span class="text-xs text-gray-500">
								{feature.min}–{feature.max}
							</span>
						</div>
					</div>
				</div>

				<!-- Feature Description (Tooltip on Hover) -->
				<div 
					data-tooltip
					class="fixed w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none"
				>
					<div class="flex items-start space-x-2">
						<Info class="h-3 w-3 text-blue-400 mt-0.5 flex-shrink-0" />
						<p class="leading-relaxed">{feature.description}</p>
					</div>
					<!-- Tooltip Arrow -->
					<div class="absolute left-0 top-4 -ml-1 w-2 h-2 bg-gray-900 rotate-45"></div>
				</div>
			</div>
		{/each}
	</div>
</div>
