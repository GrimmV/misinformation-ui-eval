<script lang="ts">
	import { TrendingUp, Activity } from 'lucide-svelte';

	interface Props {
		feature: string;
		class: string;
		grid_values: number[];
		average: number[];
		title?: string;
	}

	let { 
		feature, 
		class: classLabel, 
		grid_values, 
		average, 
		title = 'Partial Dependence Plot' 
	}: Props = $props();

	// Calculate chart dimensions and scaling
	let chartWidth = 300;
	let chartHeight = 150;
	let padding = 20;

	// Get min/max values for scaling
	let minValue = $derived(() => Math.min(...average));
	let maxValue = $derived(() => Math.max(...average));
	let minGrid = $derived(() => Math.min(...grid_values));
	let maxGrid = $derived(() => Math.max(...grid_values));

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

	// Convert data point to SVG coordinates
	function getPointCoordinates(index: number) {
		const x = padding + (index / (grid_values.length - 1)) * (chartWidth - 2 * padding);
		const y = padding + (1 - (average[index] - minValue()) / (maxValue() - minValue())) * (chartHeight - 2 * padding);
		return { x, y };
	}

	// Generate SVG path for the line
	function getPathData() {
		if (grid_values.length === 0 || average.length === 0) return '';
		
		const points = grid_values.map((_, index) => getPointCoordinates(index));
		let path = `M ${points[0].x} ${points[0].y}`;
		
		for (let i = 1; i < points.length; i++) {
			path += ` L ${points[i].x} ${points[i].y}`;
		}
		
		return path;
	}

	// Get color based on class
	function getClassColor(): string {
		return classLabel === 'True' ? 'text-green-600' : 'text-red-600';
	}

	function getLineColor(): string {
		return classLabel === 'True' ? 'stroke-green-500' : 'stroke-red-500';
	}

	function getFillColor(): string {
		return classLabel === 'True' ? 'fill-green-100' : 'fill-red-100';
	}
</script>

<div class="rounded-lg border border-gray-200 bg-white p-3">
	<!-- Chart -->
	<div class="mb-3">
		<svg width={chartWidth} height={chartHeight} class="overflow-visible">
			<!-- Grid lines -->
			<defs>
				<pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
					<path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" stroke-width="0.5"/>
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#grid)" />
			
			<!-- Area under curve -->
			<path 
				d="{getPathData()} L {chartWidth - padding} {chartHeight - padding} L {padding} {chartHeight - padding} Z"
				fill="{getFillColor()}"
				opacity="0.3"
			/>
			
			<!-- Main line -->
			<path 
				d="{getPathData()}"
				fill="none"
				stroke="{getLineColor()}"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			
			<!-- Data points -->
			{#each grid_values as _, index}
				{@const coords = getPointCoordinates(index)}
				<circle 
					cx={coords.x} 
					cy={coords.y} 
					r="3" 
					fill="{getLineColor().replace('stroke-', '')}"
					class="hover:r-4 transition-all"
				>
					<title>
						{formatFeatureName(feature)}: {formatValue(grid_values[index])} → {formatValue(average[index])}
					</title>
				</circle>
			{/each}
			
			<!-- Axes -->
			<line x1={padding} y1={padding} x2={padding} y2={chartHeight - padding} stroke="#6b7280" stroke-width="1"/>
			<line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#6b7280" stroke-width="1"/>
		</svg>
	</div>

	<!-- Chart Info -->
	<div class="space-y-1 text-xs">
		<div class="flex items-center justify-between">
			<span class="font-medium text-gray-700">
				{formatFeatureName(feature)}
			</span>
			<span class="font-mono {getClassColor()}">
				Class: {classLabel}
			</span>
		</div>
		
		<div class="flex items-center justify-between text-gray-500">
			<span>Range: {formatValue(minGrid())} - {formatValue(maxGrid())}</span>
			<span>Impact: {formatValue(minValue())} - {formatValue(maxValue())}</span>
		</div>
	</div>

	<!-- Legend -->
	<div class="mt-2 pt-2 border-t border-gray-100">
		<div class="flex items-center justify-center space-x-4 text-xs">
			<div class="flex items-center space-x-1">
				<div class="w-2 h-2 bg-red-500 rounded"></div>
				<span class="text-gray-500">False Class</span>
			</div>
			<div class="flex items-center space-x-1">
				<div class="w-2 h-2 bg-green-500 rounded"></div>
				<span class="text-gray-500">True Class</span>
			</div>
		</div>
	</div>
</div>
