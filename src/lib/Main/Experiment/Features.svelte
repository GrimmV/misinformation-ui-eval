<script lang="ts">
	import { Info } from 'lucide-svelte';

	export interface Feature {
		description: string;
		max: number;
		min: number;
		value: number;
	}

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

	// Check if range spans negative to positive
	function spansZero(feature: Feature): boolean {
		return feature.min < 0 && feature.max > 0;
	}

	// Calculate zero position percentage
	function getZeroPosition(feature: Feature): number {
		const range = feature.max - feature.min;
		if (range === 0) return 0;
		return ((0 - feature.min) / range) * 100;
	}

	// Calculate percentage for progress bar
	function getPercentage(feature: Feature): number {
		const range = feature.max - feature.min;
		if (range === 0) return 0;
		return ((feature.value - feature.min) / range) * 100;
	}

	// Get bar style string for spans-zero case
	function getBarStyleString(feature: Feature): string {
		const zeroPos = getZeroPosition(feature);
		const valuePos = getPercentage(feature);

		if (feature.value < 0) {
			// Red bar growing left from zero
			const width = zeroPos - valuePos;
			return `width: ${width}%; right: ${100 - zeroPos}%; background-color: #ef4444;`;
		} else {
			// Blue bar growing right from zero
			const width = Math.abs(valuePos - zeroPos);
			return `width: ${width}%; left: ${zeroPos}%; background-color: #3b82f6;`;
		}
	}

	// Get color based on feature type and value (for non-spans-zero case)
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

<div class="w-full overflow-y-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
	<div class="mb-3">
		<h3 class="text-base font-semibold text-gray-900">Derived Features</h3>
	</div>

	<!-- Grid container: 3 features per row on large screens -->
	<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
							<h4 class="text-xs leading-tight font-medium text-gray-900">
								{formatFeatureName(featureName)}
							</h4>
							<Info
								class="h-3 w-3 flex-shrink-0 text-gray-400 transition-colors group-hover:text-blue-500"
							/>
						</div>

						<!-- Progress Bar -->
						<div class="relative h-1.5 overflow-hidden rounded-full bg-gray-200">
							<!-- Zero indicator line -->
							<div
								class="absolute top-0 z-10 h-full w-0.5 bg-gray-400"
								style="left: {getZeroPosition(feature)}%"
							></div>
							{#if spansZero(feature)}
								<!-- Value bar (red if negative, blue if positive) -->
								<div
									class="absolute top-0 h-full transition-all duration-300"
									style={getBarStyleString(feature)}
								></div>
							{:else}
								<!-- Standard bar for non-spans-zero ranges -->
								<div
									class="h-full {getColor(feature, featureName)} transition-all duration-300"
									style="width: {getPercentage(feature)}%"
								></div>
							{/if}
						</div>

						<!-- Value and Range -->
						<div class="flex items-center justify-between">
							<span class="font-mono text-xs font-semibold text-gray-700">
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
					class="pointer-events-none invisible fixed z-50 w-64 rounded-lg bg-gray-900 p-3 text-xs text-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100"
				>
					<div class="flex items-start space-x-2">
						<Info class="mt-0.5 h-3 w-3 flex-shrink-0 text-blue-400" />
						<p class="leading-relaxed">{feature.description}</p>
					</div>
					<!-- Tooltip Arrow -->
					<div class="absolute top-4 left-0 -ml-1 h-2 w-2 rotate-45 bg-gray-900"></div>
				</div>
			</div>
		{/each}
	</div>
</div>
