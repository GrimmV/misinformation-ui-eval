<script lang="ts">
	import { ChartColumn, TrendingUp, Info } from 'lucide-svelte';

	interface DataPoint {
		label: string;
		value: number;
		color?: string;
	}

	interface Props {
		title?: string;
		description?: string;
		data?: DataPoint[];
		chartType?: 'bar' | 'line';
		showValues?: boolean;
		maxValue?: number;
		height?: number;
	}

	let {
		title = "Data Analysis",
		description = "This visualization shows the distribution of values across different categories.",
		data = [
			{ label: "Category A", value: 85, color: "#3B82F6" },
			{ label: "Category B", value: 72, color: "#10B981" },
			{ label: "Category C", value: 45, color: "#F59E0B" },
			{ label: "Category D", value: 38, color: "#EF4444" },
			{ label: "Category E", value: 91, color: "#8B5CF6" }
		],
		chartType = 'bar',
		showValues = true,
		maxValue,
		height = 200
	}: Props = $props();

	// Computed values
	let maxDataValue = $derived(maxValue || Math.max(...data.map(d => d.value)));
	let normalizedData = $derived(data.map(d => ({
		...d,
		percentage: (d.value / maxDataValue) * 100
	})));

	// State for showing description
	let showDescription = $state(false);
</script>

<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4 h-fit w-fit">
	<!-- Header -->
    <div class="flex items-center space-x-3">
        <div class="p-2 bg-purple-100 rounded-lg">
            {#if chartType === 'bar'}
                <ChartColumn class="w-6 h-6 text-purple-600" />
            {:else}
                <TrendingUp class="w-6 h-6 text-purple-600" />
            {/if}
        </div>
        <div>
            <h3 class="text-lg font-semibold text-gray-900">{title}</h3>
            <p class="text-sm text-gray-500">Data visualization</p>
        </div>
    </div>

	<!-- Chart Container -->
	<div class="mb-4">
		<div class="relative" style="height: {height}px;">
			{#if chartType === 'bar'}
				<!-- Bar Chart -->
				<div class="flex items-end justify-between h-full space-x-2">
					{#each normalizedData as item, index (index)}
						<div class="flex-1 flex flex-col items-center">
							<!-- Bar -->
							<div 
								class="w-full rounded-t-lg transition-all duration-500 hover:opacity-80"
								style="height: {item.percentage}%; background-color: {item.color || '#3B82F6'}; min-height: 4px;"
							></div>
							<!-- Label -->
							<div class="mt-2 text-xs text-gray-600 text-center leading-tight">
								{item.label}
							</div>
							<!-- Value -->
							{#if showValues}
								<div class="text-xs font-medium text-gray-700 mt-1">
									{item.value}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{:else}
				<!-- Line Chart -->
				<div class="relative h-full">
					<!-- Grid lines -->
					<div class="absolute inset-0 flex flex-col justify-between">
						{#each Array(5) as _, i}
							<div class="border-t border-gray-100"></div>
						{/each}
					</div>
					
					<!-- Line and points -->
					<svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
						<!-- Line path -->
						<path
							d="M {normalizedData.map((item, i) => `${(i / (normalizedData.length - 1)) * 100},${100 - item.percentage}`).join(' L ')}"
							stroke="#3B82F6"
							stroke-width="2"
							fill="none"
							class="transition-all duration-500"
						/>
						
						<!-- Data points -->
						{#each normalizedData as item, i}
							<circle
								cx={(i / (normalizedData.length - 1)) * 100}
								cy={100 - item.percentage}
								r="3"
								fill={item.color || '#3B82F6'}
								class="transition-all duration-500 hover:r-4"
							/>
						{/each}
					</svg>
					
					<!-- Labels -->
					<div class="absolute bottom-0 left-0 right-0 flex justify-between">
						{#each normalizedData as item, i}
							<div class="text-xs text-gray-600 text-center">
								{item.label}
								{#if showValues}
									<div class="font-medium text-gray-700">{item.value}</div>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- Description -->
    <div class="bg-gray-50 rounded-lg p-4 border-t border-gray-100">
        <div class="flex items-center space-x-2 mb-2">
            <Info class="w-4 h-4 text-gray-600" />
            <h5 class="font-medium text-gray-900 text-sm">Description</h5>
        </div>
        <p class="text-sm text-gray-700 leading-relaxed">{description}</p>
    </div>
</div>
