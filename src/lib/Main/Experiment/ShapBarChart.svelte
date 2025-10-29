<script lang="ts">
	import { TrendingUp, TrendingDown } from 'lucide-svelte';

	interface ShapValue {
		feature_value: number;
		shap_value: number;
	}

	interface Props {
		values: Record<string, ShapValue>;
		title?: string;
		maxWidth?: number;
	}

	let { values, title = "SHAP Feature Impact", maxWidth = 300 }: Props = $props();

	// Convert values to array and sort by absolute SHAP value
	let sortedFeatures = $derived(() => {
		const features = Object.entries(values)
			.map(([feature, data]) => ({
				feature,
				...data
			}))
			.sort((a, b) => Math.abs(b.shap_value) - Math.abs(a.shap_value));
		return features;
	});

	// Get the maximum absolute SHAP value for scaling
	let maxShapValue = $derived(() => {
		const features = sortedFeatures();
		return Math.max(...features.map(f => Math.abs(f.shap_value)));
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
	function getBarWidth(shapValue: number): number {
		const max = maxShapValue();
		return max > 0 ? (Math.abs(shapValue) / max) * 100 : 0;
	}
</script>

<div class="bg-white rounded-lg border border-gray-200 p-3">
	
	<div class="space-y-2">
		{#each sortedFeatures() as { feature, feature_value, shap_value }}
			<div class="flex items-center space-x-2">
				<div class="w-20 text-xs font-medium text-gray-700 truncate" title="{formatFeatureName(feature)}">
					{formatFeatureName(feature)}
				</div>
				
				<div class="flex-1 relative h-4 bg-gray-100 rounded overflow-hidden">
					{#if shap_value !== 0}
						<div 
							class="absolute top-0 h-full transition-all duration-200 {shap_value > 0 ? 'bg-green-400' : 'bg-red-400'}"
							style="width: {getBarWidth(shap_value)}%; {shap_value > 0 ? 'left: 0' : 'right: 0'}"
						></div>
					{/if}
					<!-- Center line -->
					<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-2 bg-gray-300"></div>
				</div>
				
				<div class="w-16 text-right">
					<span class="text-xs font-mono {shap_value > 0 ? 'text-green-600' : 'text-red-600'}">
						{shap_value > 0 ? '+' : ''}{formatValue(shap_value)}
					</span>
				</div>
			</div>
		{/each}
	</div>

	<!-- Compact Legend -->
	<div class="mt-2 pt-2 border-t border-gray-100">
		<div class="flex items-center justify-center space-x-4 text-xs">
			<div class="flex items-center space-x-1">
				<div class="w-2 h-2 bg-green-400 rounded"></div>
				<span class="text-gray-500">+ Positive Impact</span>
			</div>
			<div class="flex items-center space-x-1">
				<div class="w-2 h-2 bg-red-400 rounded"></div>
				<span class="text-gray-500">- Negative Impact</span>
			</div>
		</div>
	</div>
</div>
