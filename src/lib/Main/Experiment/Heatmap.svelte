<script lang="ts">
	import type { Feature } from './Features.svelte';

	interface Props {
		markdownTable: string;
		title?: string;
		features: Record<string, Feature>;
	}

	type BinCategory = 'low' | 'elevated' | 'high' | 'negative' | 'neutral' | 'positive';

	interface BinMapping {
		category: BinCategory;
		min: number;
		max: number;
	}

	let { 
		markdownTable, 
		title = 'Feature Interaction Heatmap',
		features
	}: Props = $props();

	// Check if feature range spans negative to positive
	function spansZero(feature: Feature): boolean {
		return feature.min < 0 && feature.max > 0;
	}

	// Get bin categories for a feature
	function getBinCategories(feature: Feature): BinCategory[] {
		if (spansZero(feature)) {
			return ['negative', 'neutral', 'positive'];
		} else {
			return ['low', 'elevated', 'high'];
		}
	}

	// Map a numeric value to a bin category
	function valueToBin(value: number, feature: Feature): BinCategory {
		if (spansZero(feature)) {
			// Negative-to-positive scale
			if (value < -0.25) return 'negative';
			if (value > 0.25) return 'positive';
			return 'neutral';
		} else {
			// Positive-only scale
			const range = feature.max - feature.min;
			if (range === 0) return 'low';
			const normalized = (value - feature.min) / range;
			if (normalized < 0.33) return 'low';
			if (normalized < 0.67) return 'elevated';
			return 'high';
		}
	}

	// Parse range string (e.g., "0.00–0.20") to get midpoint
	function parseRangeMidpoint(rangeStr: string): number {
		const parts = rangeStr.split(/[–-]/).map(p => parseFloat(p.trim()));
		if (parts.length === 2) {
			return (parts[0] + parts[1]) / 2;
		}
		return parseFloat(rangeStr) || 0;
	}

	// Parse feature names from header cell (format: "feature1 ↓ \\ feature2→")
	function parseFeatureNames(headerCell: string): { feature1: string; feature2: string } | null {
		// Try multiple patterns to handle variations
		// Pattern 1: "feature1 ↓ \\ feature2→" (with double backslash)
		let match = headerCell.match(/^(.+?)\s*↓\s*\\\\\s*(.+?)\s*→/);
		if (match) {
			return {
				feature1: match[1].trim(),
				feature2: match[2].trim()
			};
		}
		
		// Pattern 2: "feature1 ↓ \ feature2→" (with single backslash)
		match = headerCell.match(/^(.+?)\s*↓\s*\\\s*(.+?)\s*→/);
		if (match) {
			return {
				feature1: match[1].trim(),
				feature2: match[2].trim()
			};
		}
		
		// Pattern 3: More flexible - just look for ↓ and → with text before/after
		match = headerCell.match(/^(.+?)\s*↓[^→]*→\s*(.+?)$/);
		if (match) {
			return {
				feature1: match[1].trim(),
				feature2: match[2].trim()
			};
		}
		
		// Pattern 4: Split by ↓ and → if they exist
		if (headerCell.includes('↓') && headerCell.includes('→')) {
			const parts = headerCell.split(/↓|→/);
			if (parts.length >= 2) {
				return {
					feature1: parts[0].trim(),
					feature2: parts[parts.length - 1].trim()
				};
			}
		}
		
		console.warn('Failed to parse feature names from:', headerCell);
		return null;
	}

	// Parse the markdown table and convert to 3x3 categorical grid
	let categoricalData = $derived(() => {
		const lines = markdownTable.trim().split('\n');
		if (lines.length < 3) return null;

		const headerLine = lines[0];
		const dataLines = lines.slice(2); // Skip separator line

		// Parse headers
		const headerCells = headerLine.split('|').map(h => h.trim()).filter(h => h);
		
		// Extract feature names from first cell
		const firstCell = headerCells[0] || '';
		console.log('First header cell:', firstCell);
		const featureNames = parseFeatureNames(firstCell);
		if (!featureNames) {
			console.warn('Failed to parse feature names. Header cells:', headerCells);
			return null;
		}
		console.log('Parsed feature names:', featureNames);

		const headers = headerCells.slice(1);

		// Parse data rows
		const rows = dataLines.map(line => {
			const cells = line.split('|').map(c => c.trim()).filter(c => c);
			return {
				label: cells[0],
				values: cells.slice(1).map(v => parseInt(v) || 0)
			};
		});

		// Get feature data from features prop using the extracted names
		// Try exact match first, then case-insensitive match
		let feature1 = features[featureNames.feature1];
		let feature2 = features[featureNames.feature2];
		
		// If not found, try case-insensitive match
		if (!feature1) {
			const found1 = Object.keys(features).find(key => 
				key.toLowerCase() === featureNames.feature1.toLowerCase()
			);
			if (found1) feature1 = features[found1];
		}
		
		if (!feature2) {
			const found2 = Object.keys(features).find(key => 
				key.toLowerCase() === featureNames.feature2.toLowerCase()
			);
			if (found2) feature2 = features[found2];
		}

		if (!feature1 || !feature2) {
			console.warn('Features not found:', {
				feature1Name: featureNames.feature1,
				feature2Name: featureNames.feature2,
				availableFeatures: Object.keys(features)
			});
			return null;
		}

		const feature1Bins = getBinCategories(feature1);
		const feature2Bins = getBinCategories(feature2);

		// Create 3x3 grid by aggregating data
		const grid: Record<string, Record<string, number>> = {};
		
		// Initialize grid
		for (const bin1 of feature1Bins) {
			grid[bin1] = {};
			for (const bin2 of feature2Bins) {
				grid[bin1][bin2] = 0;
			}
		}

		// Map numeric ranges to categorical bins and aggregate
		for (const row of rows) {
			const rowMidpoint = parseRangeMidpoint(row.label);
			const rowBin = valueToBin(rowMidpoint, feature1);

			for (let i = 0; i < headers.length && i < row.values.length; i++) {
				const colMidpoint = parseRangeMidpoint(headers[i]);
				const colBin = valueToBin(colMidpoint, feature2);
				grid[rowBin][colBin] += row.values[i];
			}
		}

		// Determine which bins the current feature values fall into
		const feature1CurrentBin = valueToBin(feature1.value, feature1);
		const feature2CurrentBin = valueToBin(feature2.value, feature2);

		return {
			feature1Bins,
			feature2Bins,
			grid,
			feature1Name: featureNames.feature1,
			feature2Name: featureNames.feature2,
			feature1CurrentBin,
			feature2CurrentBin
		};
	});

	// Calculate statistics
	let totalCount = $derived(() => {
		const data = categoricalData();
		if (!data) return 0;
		return Object.values(data.grid).reduce((sum, row) => 
			sum + Object.values(row).reduce((rowSum, val) => rowSum + val, 0), 0
		);
	});

	let maxValue = $derived(() => {
		const data = categoricalData();
		if (!data) return 0;
		return Math.max(...Object.values(data.grid).flatMap(row => Object.values(row)));
	});

	// Get color intensity based on value
	function getCellColor(value: number): string {
		if (maxValue() === 0) return 'bg-gray-100';
		const intensity = value / maxValue();
		if (intensity >= 0.8) return 'bg-red-600';
		if (intensity >= 0.6) return 'bg-red-500';
		if (intensity >= 0.4) return 'bg-orange-400';
		if (intensity >= 0.2) return 'bg-yellow-400';
		return 'bg-yellow-200';
	}

	// Get text color based on background
	function getTextColor(value: number): string {
		if (maxValue() === 0) return 'text-gray-500';
		const intensity = value / maxValue();
		return intensity >= 0.4 ? 'text-white' : 'text-gray-700';
	}

	// Format percentage
	function formatPercentage(value: number): string {
		if (totalCount() === 0) return '0%';
		return ((value / totalCount()) * 100).toFixed(1) + '%';
	}

	// Format bin label for display
	function formatBinLabel(bin: BinCategory): string {
		return bin.charAt(0).toUpperCase() + bin.slice(1);
	}

	// Format feature name (convert snake_case to Title Case)
	function formatFeatureName(feature: string): string {
		return feature
			.split('_')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	// Check if a cell should be highlighted (contains current feature values)
	function isHighlightedCell(rowBin: BinCategory, colBin: BinCategory): boolean {
		const data = categoricalData();
		if (!data) return false;
		return rowBin === data.feature1CurrentBin && colBin === data.feature2CurrentBin;
	}
</script>

<div class="rounded-lg border border-gray-200 bg-white p-3">
	<!-- Simplified 3x3 Categorical Heatmap -->
	{#if categoricalData()}
		<div class="flex items-start gap-2">
			<!-- Left side: Feature 1 name (y-axis outer label) -->
			<div class="flex flex-col justify-center pt-8">
				<div class="text-sm font-semibold text-gray-700 -rotate-90 whitespace-nowrap">
					{formatFeatureName(categoricalData()?.feature1Name || '')}
				</div>
			</div>

			<div class="flex-1 overflow-x-auto">
				<!-- Top: Feature 2 name (x-axis outer label) -->
				<div class="text-center mb-2">
					<div class="text-sm font-semibold text-gray-700">
						{formatFeatureName(categoricalData()?.feature2Name || '')}
					</div>
				</div>

				<table class="w-full text-xs">
					<!-- Header -->
					<thead>
						<tr class="border-b border-gray-200">
							<th class="w-20 p-2 text-left font-medium text-gray-600"></th>
							{#each categoricalData()?.feature2Bins || [] as bin}
								<th class="p-2 text-center font-medium text-gray-600">
									{formatBinLabel(bin)}
								</th>
							{/each}
						</tr>
					</thead>

					<!-- Data Rows -->
					<tbody>
						{#each categoricalData()?.feature1Bins || [] as rowBin}
							<tr class="border-b border-gray-100 last:border-b-0">
								<!-- Row Label -->
								<td class="p-2 font-medium text-gray-700 text-right align-middle">
									{formatBinLabel(rowBin)}
								</td>

								<!-- Data Cells -->
								{#each categoricalData()?.feature2Bins || [] as colBin}
									{@const value = categoricalData()?.grid[rowBin]?.[colBin] || 0}
									{@const isHighlighted = isHighlightedCell(rowBin, colBin)}
									<td class="p-1">
										<div 
											class="rounded text-center py-1 {getCellColor(value)} {getTextColor(value)} {isHighlighted ? 'ring-4 ring-blue-500 shadow-lg' : ''}"
											title="Percentage: {formatPercentage(value)}{isHighlighted ? ' (Current feature values)' : ''}"
										>
											<div class="text-sm font-medium">
												{formatPercentage(value)}
											</div>
										</div>
									</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{:else}
		<div class="flex items-center justify-center py-8">
			<span class="text-sm text-gray-500">Unable to parse heatmap labels</span>
		</div>
	{/if}

	<!-- Legend -->
	<div class="mt-2 pt-2 border-t border-gray-100">
		<div class="flex items-center justify-center space-x-4 text-xs">
			<div class="flex items-center space-x-1">
				<div class="w-2 h-2 bg-yellow-200 rounded"></div>
				<span class="text-gray-500">Low</span>
			</div>
			<div class="flex items-center space-x-1">
				<div class="w-2 h-2 bg-orange-400 rounded"></div>
				<span class="text-gray-500">Medium</span>
			</div>
			<div class="flex items-center space-x-1">
				<div class="w-2 h-2 bg-red-500 rounded"></div>
				<span class="text-gray-500">High</span>
			</div>
		</div>
	</div>
	
	<!-- Description -->
	<div class="mt-3 pt-3 border-t border-gray-100">
		<p class="text-xs text-gray-600 leading-relaxed">
			<strong>Purpose:</strong> Reveals how two features are commonly occuring historically. This can indicatehow well the combination of feature values is known to the model.
			<strong>How to read:</strong> Each cell shows the percentage of instances where both features fall into specific value ranges (e.g., Low/High). 
			Darker colors indicate more frequent combinations. The feature names on the axes identify which features are being compared.
		</p>
	</div>
</div>
