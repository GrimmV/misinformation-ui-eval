<script lang="ts">
	import { Grid3X3, TrendingUp } from 'lucide-svelte';

	interface Props {
		markdownTable: string;
		title?: string;
	}

	let { 
		markdownTable, 
		title = 'Feature Interaction Heatmap' 
	}: Props = $props();

	// Parse the markdown table
	let parsedData = $derived(() => {
		const lines = markdownTable.trim().split('\n');
		console.log('Parsing lines:', lines);
		
		if (lines.length < 3) return null;

		// Extract headers (first line)
		const headerLine = lines[0];
		const dataLines = lines.slice(2); // Skip separator line

		// Parse headers - extract the range values from the header
		const headerCells = headerLine.split('|').map(h => h.trim()).filter(h => h);
		console.log('Header cells:', headerCells);
		const headers = headerCells.slice(1); // Remove the first cell (empty or row label)
		console.log('Headers:', headers);

		// Parse data rows
		const rows = dataLines.map(line => {
			const cells = line.split('|').map(c => c.trim()).filter(c => c);
			console.log('Row cells:', cells);
			
			return {
				label: cells[0], // Row label (e.g., "0.00–0.20")
				values: cells.slice(1).map(v => parseInt(v) || 0) // Data values
			};
		});

		console.log('Parsed data:', { headers, rows });
		return { headers, rows };
	});

	// Calculate statistics
	let totalCount = $derived(() => {
		const data = parsedData();
		if (!data) return 0;
		return data.rows.reduce((sum, row) => 
			sum + row.values.reduce((rowSum, val) => rowSum + val, 0), 0
		);
	});

	let maxValue = $derived(() => {
		const data = parsedData();
		if (!data) return 0;
		return Math.max(...data.rows.flatMap(row => row.values));
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
</script>

<div class="rounded-lg border border-gray-200 bg-white p-3">
	<!-- Heatmap Table -->
	{#if parsedData()}
		<div class="overflow-x-auto">
			<table class="w-full text-xs">
				<!-- Header -->
				<thead>
					<tr class="border-b border-gray-200">
						<th class="w-20 p-2 text-left font-medium text-gray-600"></th>
						{#each parsedData()?.headers || [] as header}
							<th class="p-2 text-center font-medium text-gray-600">
								{header}
							</th>
						{/each}
					</tr>
				</thead>

				<!-- Data Rows -->
				<tbody>
					{#each parsedData()?.rows || [] as row, rowIndex}
						<tr class="border-b border-gray-100 last:border-b-0">
							<!-- Row Label -->
							<td class="p-2 font-medium text-gray-700 text-right">
								{row.label}
							</td>

							<!-- Data Cells -->
							{#each row.values as value, colIndex}
								<td class="p-1">
									<div 
										class="rounded text-center py-1 {getCellColor(value)} {getTextColor(value)}"
										title="Value: {value}, Percentage: {formatPercentage(value)}"
									>
										<div class="font-mono font-medium">
											{value}
										</div>
										<div class="text-xs opacity-75">
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

		<!-- Statistics -->
		<div class="mt-3 flex items-center justify-between text-xs text-gray-500">
			<span>Total: {totalCount()} samples</span>
			<span>Max: {maxValue()} in cell</span>
		</div>
	{:else}
		<div class="flex items-center justify-center py-8">
			<span class="text-sm text-gray-500">Invalid table format</span>
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
</div>
