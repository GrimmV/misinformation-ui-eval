<script lang="ts">
	import type { Feature } from './Features.svelte';

	type BinCategory = 'low' | 'elevated' | 'high' | 'negative' | 'neutral' | 'positive';

	interface Props {
		feature: string;
		class: string;
		grid_values: number[];
		average: number[];
		title?: string;
		features?: Record<string, Feature>;
	}

	interface BinnedData {
		category: BinCategory;
		averageValue: number;
		count: number;
	}

	let {
		feature,
		class: classLabel,
		grid_values,
		average,
		title = 'Partial Dependence Plot',
		features = {}
	}: Props = $props();

	// Check if feature range spans negative to positive
	function spansZero(featureData: Feature): boolean {
		return featureData.min < 0 && featureData.max > 0;
	}

	// Map a numeric value to a bin category
	function valueToBin(value: number, featureData: Feature): BinCategory {
		if (spansZero(featureData)) {
			// Negative-to-positive scale
			if (value < -0.1) return 'negative';
			if (value > 0.1) return 'positive';
			return 'neutral';
		} else {
			// Positive-only scale
			const range = featureData.max - featureData.min;
			if (range === 0) return 'low';
			const normalized = (value - featureData.min) / range;
			if (normalized < 0.33) return 'low';
			if (normalized < 0.67) return 'elevated';
			return 'high';
		}
	}

	// Get bin categories for a feature
	function getBinCategories(featureData: Feature): BinCategory[] {
		if (spansZero(featureData)) {
			return ['negative', 'neutral', 'positive'];
		} else {
			return ['low', 'elevated', 'high'];
		}
	}

	// Categorize and aggregate data into bins
	const binnedData = $derived(() => {
		const featureData = features[feature];
		if (!featureData || !grid_values.length || !average.length) return null;

		const bins: Record<BinCategory, number[]> = {
			low: [],
			elevated: [],
			high: [],
			negative: [],
			neutral: [],
			positive: []
		};

		// Group values by bin
		for (let i = 0; i < grid_values.length && i < average.length; i++) {
			const bin = valueToBin(grid_values[i], featureData);
			bins[bin].push(average[i]);
		}

		// Calculate averages for each bin
		const binCategories = getBinCategories(featureData);
		const result: BinnedData[] = [];

		for (const category of binCategories) {
			const values = bins[category];
			if (values.length > 0) {
				const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
				// Scale to percentage if needed
				const scaledAvg = avg <= 1.001 ? avg * 100 : avg;
				result.push({
					category,
					averageValue: scaledAvg,
					count: values.length
				});
			}
		}

		return result;
	});

	// Determine effect strength based on percentage
	function getEffectStrength(percentage: number): 'strong' | 'normal' | 'low' {
		if (percentage > 45) return 'strong';
		if (percentage > 30) return 'normal';
		return 'low';
	}

	// Get impact label based on strength
	function getImpactLabel(strength: 'strong' | 'normal' | 'low'): string {
		if (strength === 'strong') return 'Strong impact';
		if (strength === 'normal') return 'Normal impact';
		return 'Low impact';
	}

	// Get color based on effect strength
	function getBarColor(strength: 'strong' | 'normal' | 'low'): string {
		if (strength === 'strong') return 'bg-red-600';
		if (strength === 'normal') return 'bg-orange-400';
		return 'bg-yellow-200';
	}

	const classStyles = $derived(() => {
		if (classLabel === 'True') {
			return {
				badge: 'border border-emerald-200 bg-emerald-50 text-emerald-700'
			};
		}

		return {
			badge: 'border border-rose-200 bg-rose-50 text-rose-700'
		};
	});

	// Calculate max value for bar scaling
	const maxBarValue = $derived(() => {
		if (!binnedData()) return 100;
		return Math.max(...binnedData()!.map(b => b.averageValue), 100);
	});

	// Helper function to format feature names
	function formatFeatureName(feature: string): string {
		return feature
			.split('_')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	// Format bin label for display
	function formatBinLabel(bin: BinCategory): string {
		return bin.charAt(0).toUpperCase() + bin.slice(1);
	}

	// Determine which bin the current feature value falls into
	const currentFeatureBin = $derived(() => {
		const featureData = features[feature];
		if (!featureData) return null;
		return valueToBin(featureData.value, featureData);
	});

	// Check if a bar should be highlighted
	function isHighlightedBar(binCategory: BinCategory): boolean {
		return currentFeatureBin() === binCategory;
	}
</script>

<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
	<div class="mb-3 flex items-center justify-between">
		<div>
			<h3 class="text-sm font-semibold text-gray-900">{title}</h3>
			<p class="text-xs text-gray-500">{formatFeatureName(feature)}</p>
		</div>
		<span class={`rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-wide ${classStyles().badge}`}>
			Class: {classLabel}
		</span>
	</div>

	<!-- Simplified Bar Chart -->
	{#if binnedData() && binnedData()!.length > 0}
		<div class="space-y-3">
			{#each binnedData()! as bin}
				{@const strength = getEffectStrength(bin.averageValue)}
				{@const barWidth = (bin.averageValue / maxBarValue()) * 100}
				{@const isHighlighted = isHighlightedBar(bin.category)}
				<div class="space-y-1">
					<div class="flex items-center justify-between text-xs">
						<span class="font-medium text-gray-700">{formatBinLabel(bin.category)}</span>
						<span class="font-medium text-gray-600">{getImpactLabel(strength)}</span>
					</div>
					<div class="relative h-6 w-full rounded bg-gray-100 {isHighlighted ? 'ring-4 ring-blue-500' : ''} overflow-hidden">
						<div 
							class="h-full {getBarColor(strength)} transition-all duration-300"
							style="width: {Math.min(barWidth, 100)}%"
							title="{formatBinLabel(bin.category)}: {getImpactLabel(strength)}{isHighlighted ? ' (Current feature value)' : ''}"
						></div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="flex items-center justify-center py-8">
			<span class="text-sm text-gray-500">Unable to process partial dependence data</span>
		</div>
	{/if}
	
	<!-- Description -->
	<div class="mt-3 pt-3 border-t border-gray-100">
		<p class="text-xs text-gray-600 leading-relaxed">
			<strong>Purpose:</strong> Shows how different value ranges of a feature affect the model's prediction on average. 
			<strong>How to read:</strong> Each bar represents a value category (Low/High or Negative/Positive). 
			The impact estimates how often the value category is associated with the prediction class.
		</p>
	</div>
</div>
