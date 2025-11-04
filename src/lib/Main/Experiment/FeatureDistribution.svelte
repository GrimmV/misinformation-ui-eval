<script lang="ts">
	import { BarChart3, TrendingUp } from 'lucide-svelte';

	interface Props {
		counts: number[];
		edges: number[];
		title?: string;
		featureName?: string;
	}

	let { counts, edges, title = "Feature Distribution", featureName = "Feature" }: Props = $props();

	// Calculate statistics
	let totalCount = $derived(() => {
		if (!counts || counts.length === 0) return 0;
		return counts.reduce((sum, count) => sum + count, 0);
	});
	
	let maxCount = $derived(() => {
		if (!counts || counts.length === 0) return 0;
		return Math.max(...counts);
	});

	// Create bar chart data
	let barData = $derived(() => {
		if (!counts || !edges || counts.length === 0) return [];
		return counts.map((count, index) => ({
			binStart: edges[index],
			binEnd: edges[index + 1],
			count: count,
			percentage: totalCount() > 0 ? (count / totalCount()) * 100 : 0,
			barHeight: maxCount() > 0 ? (count / maxCount()) * 100 : 0
		}));
	});

	// Helper function to format numbers
	function formatNumber(value: number): string {
		return value.toFixed(1);
	}

	// Helper function to get bar color based on count
	function getBarColor(count: number, maxCount: number): string {
		const intensity = maxCount > 0 ? count / maxCount : 0;
		if (intensity > 0.7) return 'bg-blue-600';
		if (intensity > 0.4) return 'bg-blue-500';
		if (intensity > 0.2) return 'bg-blue-400';
		return 'bg-blue-300';
	}
</script>

<div class="bg-white rounded-lg border border-gray-200 p-3">
	<!-- Bar Chart -->
	<div class="space-y-2">
		{#each barData() as { binStart, binEnd, count, barHeight }, index}
			<div class="flex items-center space-x-2">
				<!-- Range Label -->
				<div class="w-16 text-xs font-medium text-gray-700 text-right">
					{formatNumber(binStart)}-{formatNumber(binEnd)}
				</div>
				
				<!-- Bar -->
				<div class="flex-1 relative h-4 bg-gray-100 rounded overflow-hidden">
					<div 
						class="h-full {getBarColor(count, maxCount())} transition-all duration-200"
						style="width: {barHeight}%"
						title="Count: {count}, Percentage: {formatNumber((count / totalCount()) * 100)}%"
					></div>
					
					<!-- Bar Value -->
					{#if count > 0 && barHeight > 20}
						<div class="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
							{formatNumber((count / totalCount()) * 100)}%
						</div>
					{/if}
				</div>
				
				<!-- Count and Percentage -->
				<div class="w-12 text-right">
					<div class="text-xs font-medium text-gray-700">{formatNumber((count / totalCount()) * 100)}%</div>
				</div>
			</div>
		{/each}
	</div>
</div>
