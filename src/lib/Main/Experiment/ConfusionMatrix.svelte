<script lang="ts">
	import { Grid3X3 } from 'lucide-svelte';

	interface Props {
		matrix: number[][];
		labels?: string[];
	}

	let { 
		matrix, 
		labels = ['Class 0', 'Class 1', 'Class 2'], 
	}: Props = $props();

	// Helper function to format numbers
	function formatNumber(value: number): string {
		return value.toFixed(2);
	}

	// Get color intensity based on value
	function getCellColor(value: number): string {
		const intensity = Math.min(value, 1);
		if (intensity >= 0.8) return 'bg-green-600';
		if (intensity >= 0.6) return 'bg-green-500';
		if (intensity >= 0.4) return 'bg-green-400';
		if (intensity >= 0.2) return 'bg-green-300';
		return 'bg-green-200';
	}

	// Get text color based on background
	function getTextColor(value: number): string {
		return value >= 0.4 ? 'text-white' : 'text-gray-700';
	}
</script>

<div class="rounded-lg border border-gray-200 bg-white p-3">
	<!-- Matrix -->
	<div class="space-y-1">
		<!-- Header Row -->
		<div class="flex">
			<div class="w-16"></div> <!-- Empty corner -->
			{#each labels as label, i}
				<div class="flex-1 text-center">
					<span class="text-xs font-medium text-gray-600">Predicted</span>
					<div class="text-xs text-gray-500">{label}</div>
				</div>
			{/each}
		</div>

		<!-- Matrix Rows -->
		{#each matrix as row, rowIndex}
			<div class="flex">
				<!-- Actual Label -->
				<div class="w-16 flex flex-col justify-center">
					<span class="text-xs font-medium text-gray-600">Actual</span>
					<div class="text-xs text-gray-500">{labels[rowIndex]}</div>
				</div>

				<!-- Matrix Cells -->
				{#each row as value, colIndex}
					<div class="flex-1 p-1">
						<div 
							class="rounded text-center py-1 {getCellColor(value)} {getTextColor(value)}"
							title="Actual: {labels[rowIndex]}, Predicted: {labels[colIndex]}, Value: {formatNumber(value)}"
						>
							<span class="text-xs font-mono font-medium">
								{formatNumber(value)}
							</span>
						</div>
					</div>
				{/each}
			</div>
		{/each}
	</div>

	<!-- Legend -->
	<div class="mt-2 pt-2 border-t border-gray-100">
		<div class="flex items-center justify-center space-x-4 text-xs">
			<div class="flex items-center space-x-1">
				<div class="w-2 h-2 bg-green-200 rounded"></div>
				<span class="text-gray-500">Low</span>
			</div>
			<div class="flex items-center space-x-1">
				<div class="w-2 h-2 bg-green-400 rounded"></div>
				<span class="text-gray-500">Medium</span>
			</div>
			<div class="flex items-center space-x-1">
				<div class="w-2 h-2 bg-green-600 rounded"></div>
				<span class="text-gray-500">High</span>
			</div>
		</div>
	</div>
</div>
