<script lang="ts">
	import type { Feature } from './Features.svelte';

	interface ShapValue {
		feature_value: number;
		shap_value: number;
	}

	interface Props {
		values: Record<string, ShapValue>;
		title?: string;
		maxWidth?: number;
		features?: Record<string, Feature>;
	}


	type Direction = 'push' | 'pull_back' | 'no_effect';
	type Strength = 'Strong' | 'Moderate' | 'Weak' | 'Ignore';

	interface ProcessedFeature {
		feature: string;
		shap_value: number;
		direction: Direction;
		strength: Strength;
		label: string;
		color: string;
		tendency: string;
	}

	let { values, title = "Feature Impact", maxWidth = 300, features = {} }: Props = $props();

	
	console.log('features', features);

	// Helper function to format feature names
	function formatFeatureName(feature: string): string {
		return feature
			.split('_')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	// Calculate median of an array
	function median(arr: number[]): number {
		const sorted = [...arr].sort((a, b) => a - b);
		const mid = Math.floor(sorted.length / 2);
		return sorted.length % 2 === 0
			? (sorted[mid - 1] + sorted[mid]) / 2
			: sorted[mid];
	}

	// Determine direction based on sign
	function getDirection(shapValue: number): Direction {
		if (shapValue > 0) return 'push';
		if (shapValue < 0) return 'pull_back';
		return 'no_effect';
	}

	// Determine absolute strength based on thresholds
	function getAbsoluteStrength(absValue: number): Strength {
		if (absValue >= 0.10) return 'Strong';
		if (absValue >= 0.04) return 'Moderate';
		if (absValue >= 0.01) return 'Weak';
		return 'Ignore';
	}

	// Upgrade strength by one level (capped at Strong)
	function upgradeStrength(strength: Strength): Strength {
		if (strength === 'Weak') return 'Moderate';
		if (strength === 'Moderate') return 'Strong';
		return strength; // Already Strong or Ignore
	}

	// Process features according to specification
	let processedFeatures = $derived(() => {
		// Access features to ensure reactivity
		const featuresData = features || {};
		
		// Step 1: Collect all absolute values
		const absValues = Object.values(values).map(v => Math.abs(v.shap_value));
		
		// Step 2: Compute max_abs and median_abs
		const maxAbs = absValues.length > 0 ? Math.max(...absValues) : 0;
		const medianAbs = absValues.length > 0 ? median(absValues) : 0;

		// Step 3-6: Process each feature
		const processed: ProcessedFeature[] = [];

		for (const [feature, data] of Object.entries(values)) {
			const shapValue = data.shap_value;
			const absValue = Math.abs(shapValue);

			// Step 3: Direction mapping
			const direction = getDirection(shapValue);

			// Step 4: Absolute strength mapping
			let strength = getAbsoluteStrength(absValue);

			// Step 5: Relative adjustment rule
			if (absValue >= 0.5 * maxAbs && strength !== 'Ignore') {
				strength = upgradeStrength(strength);
			}

			// Step 6: Feature inclusion rule
			if (absValue >= 0.01 && strength !== 'Ignore') {
				// Step 7-8: Create label and color
				let label: string;
				let color: string;

				if (direction === 'push') {
					if (strength === 'Strong') label = 'Strong push';
					else if (strength === 'Moderate') label = 'Moderate push';
					else label = 'Weak push';
					color = 'text-green-600';
				} else if (direction === 'pull_back') {
					if (strength === 'Strong') label = 'Strong pull back';
					else if (strength === 'Moderate') label = 'Moderate pull back';
					else label = 'Weak pull back';
					color = 'text-red-600';
				} else {
					label = 'Little effect';
					color = 'text-gray-500';
				}

				// Calculate value tendency from feature metadata
				// Try exact match first, then try case-insensitive match
				let featureData: Feature | undefined = featuresData[feature];
				if (!featureData) {
					// Try to find by case-insensitive key match
					const lowerFeature = feature.toLowerCase();
					const found = Object.entries(featuresData).find(([key]) => 
						key.toLowerCase() === lowerFeature
					);
					if (found) {
						featureData = found[1];
					}
				}
				
				let tendency = '';
				if (featureData) {
					try {
						tendency = getValueTendency(featureData);
					} catch (e) {
						console.warn('Error calculating tendency for feature', feature, e);
					}
				}

				processed.push({
					feature,
					shap_value: shapValue,
					direction,
					strength,
					label,
					color,
					tendency
				});
			}
		}

		// Sort by absolute SHAP value (descending)
		return processed.sort((a, b) => Math.abs(b.shap_value) - Math.abs(a.shap_value));
	});

	// Get direction indicator (emoji)
	function getDirectionIndicator(direction: Direction): string {
		if (direction === 'push') return '🟢';
		if (direction === 'pull_back') return '🔴';
		return '⚪';
	}

	// Check if feature range spans negative to positive
	function spansZero(feature: Feature): boolean {
		return feature.min < 0 && feature.max > 0;
	}

	// Determine value tendency based on feature value and range
	function getValueTendency(feature: Feature): string {
		if (spansZero(feature)) {
			// Negative-to-positive scale: negative, neutral (close to 0), positive
			// Use threshold of 0.1 for "close to 0"
			if (feature.value < -0.1) return 'negative';
			if (feature.value > 0.1) return 'positive';
			return 'neutral';
		} else {
			// Positive-only scale: low, elevated, high
			// Normalize relative to the feature's range
			const range = feature.max - feature.min;
			if (range === 0) return 'low';
			
			const normalized = (feature.value - feature.min) / range;
			if (normalized < 0.33) return 'low';
			if (normalized < 0.67) return 'elevated';
			return 'high';
		}
	}
</script>

<div class="bg-white rounded-lg border border-gray-200 p-3">
	<div class="space-y-2">
		{#each processedFeatures() as { feature, label, color, direction, tendency }}
			<div class="flex items-center space-x-2">
				<div class="flex-1 text-sm font-medium text-gray-700">
					{formatFeatureName(feature)}<span class="text-gray-500 font-normal">({tendency})</span>
				</div>
				<div class="flex items-center space-x-2">
					<span class="text-base">{getDirectionIndicator(direction)}</span>
					<span class="text-sm {color} font-medium">
						{label}
					</span>
				</div>
			</div>
		{/each}
	</div>
	
	<!-- Description -->
	<div class="mt-3 pt-3 border-t border-gray-100">
		<p class="text-xs text-gray-600 leading-relaxed">
			<strong>Purpose:</strong> Shows how each feature influences the model's decision for this specific instance. 
			<strong>How to read:</strong> Green indicators (🟢) show features that push toward the prediction, red (🔴) show features that pull against it. 
			The strength (Strong/Moderate/Weak) indicates the magnitude of influence. Features are sorted by impact.
		</p>
	</div>
</div>
