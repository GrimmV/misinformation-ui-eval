<script lang="ts">
	import { TrendingUp, BarChart3 } from 'lucide-svelte';

	interface Props {
		values: Record<string, number>;
		title?: string;
	}

	let { 
		values, 
		title = 'Global Feature Importance' 
	}: Props = $props();

	// Convert values to array and sort by importance
	let sortedFeatures = $derived(() => {
		const features = Object.entries(values)
			.map(([feature, importance]) => ({
				feature,
				importance
			}))
			.sort((a, b) => b.importance - a.importance);
		return features;
	});

	// Get the maximum importance for scaling
	let maxImportance = $derived(() => {
		const features = sortedFeatures();
		return Math.max(...features.map(f => f.importance));
	});

	// Helper function to format feature names
	function formatFeatureName(feature: string): string {
		return feature
			.split('_')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	// Helper function to format values
	function formatValue(value: number): string {
		return value.toFixed(3);
	}

	// Helper function to get bar width percentage
	function getBarWidth(importance: number): number {
		const max = maxImportance();
		return max > 0 ? (importance / max) * 100 : 0;
	}

	// Get color based on importance level
	function getBarColor(importance: number): string {
		const max = maxImportance();
		const ratio = max > 0 ? importance / max : 0;
		if (ratio >= 0.8) return 'bg-blue-600';
		if (ratio >= 0.6) return 'bg-blue-500';
		if (ratio >= 0.4) return 'bg-blue-400';
		if (ratio >= 0.2) return 'bg-blue-300';
		return 'bg-blue-200';
	}
</script>

<div class="rounded-lg border border-gray-200 bg-white p-3">
	<!-- Feature Importance Bars -->
	<div class="space-y-2">
		{#each sortedFeatures() as { feature, importance }}
			<div class="flex items-center space-x-2">
				<!-- Feature Name -->
				<div class="w-24 text-xs font-medium text-gray-700 truncate" title="{formatFeatureName(feature)}">
					{formatFeatureName(feature)}
				</div>
				
				<!-- Bar -->
				<div class="flex-1 relative h-4 bg-gray-100 rounded overflow-hidden">
					<div 
						class="h-full {getBarColor(importance)} transition-all duration-200"
						style="width: {getBarWidth(importance)}%"
						title="Importance: {formatValue(importance)}"
					></div>
					
					<!-- Bar Value -->
					{#if getBarWidth(importance) > 30}
						<div class="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
							{formatValue(importance)}
						</div>
					{/if}
				</div>
				
				<!-- Importance Value -->
				<div class="w-12 text-right">
					<span class="text-xs font-mono text-gray-700">
						{formatValue(importance)}
					</span>
				</div>
			</div>
		{/each}
	</div>

	<!-- Legend -->
	<div class="mt-2 pt-2 border-t border-gray-100">
		<div class="flex items-center justify-center space-x-4 text-xs">
			<div class="flex items-center space-x-1">
				<div class="w-2 h-2 bg-blue-200 rounded"></div>
				<span class="text-gray-500">Low</span>
			</div>
			<div class="flex items-center space-x-1">
				<div class="w-2 h-2 bg-blue-400 rounded"></div>
				<span class="text-gray-500">Medium</span>
			</div>
			<div class="flex items-center space-x-1">
				<div class="w-2 h-2 bg-blue-600 rounded"></div>
				<span class="text-gray-500">High</span>
			</div>
		</div>
	</div>
</div>
