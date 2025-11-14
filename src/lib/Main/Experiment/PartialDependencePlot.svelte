<script lang="ts">

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

// Chart dimensions and layout
const chartWidth = 360;
const chartHeight = 220;
const padding = 32;

// Axis configuration
const yMin = 0;
const yMax = 100;
const yTicks = [0, 25, 50, 75, 100];

const shouldScaleAverage = $derived(() => {
	if (!average.length) return false;
	const maxOriginal = Math.max(...average);
	const minOriginal = Math.min(...average);
	return minOriginal >= 0 && maxOriginal <= 1.001;
});

const scaledAverage = $derived(() => average.map(value => (shouldScaleAverage() ? value * 100 : value)));

const minValue = $derived(() => (scaledAverage().length ? Math.min(...scaledAverage()) : 0));
const maxValue = $derived(() => (scaledAverage().length ? Math.max(...scaledAverage()) : 0));
const minGrid = $derived(() => (grid_values.length ? Math.min(...grid_values) : 0));
const maxGrid = $derived(() => (grid_values.length ? Math.max(...grid_values) : 0));

const classStyles = $derived(() => {
	if (classLabel === 'True') {
		return {
			stroke: '#16a34a',
			point: '#0f766e',
			area: 'rgba(134, 239, 172, 0.35)',
			accentText: 'text-emerald-600',
			badge: 'border border-emerald-200 bg-emerald-50 text-emerald-700'
		};
	}

	return {
		stroke: '#dc2626',
		point: '#b91c1c',
		area: 'rgba(254, 202, 202, 0.45)',
		accentText: 'text-rose-600',
		badge: 'border border-rose-200 bg-rose-50 text-rose-700'
	};
});

const gridPatternId = $derived(() => {
	const safeFeature = feature.toLowerCase().replace(/[^a-z0-9]+/g, '-');
	return `pdp-grid-${safeFeature}-${classLabel.toLowerCase()}`;
});

const xSteps = $derived(() => Math.max(grid_values.length - 1, 1));

const representativeXTicks = $derived(() => {
	if (!grid_values.length) return [];
	if (grid_values.length <= 4) {
		return grid_values.map((value, index) => ({
			index,
			value
		}));
	}

	const segments = 3;
	const step = xSteps() / segments;

	return Array.from({ length: segments + 1 }, (_, i) => {
		const index = Math.round(i * step);
		return {
			index: Math.min(index, grid_values.length - 1),
			value: grid_values[Math.min(index, grid_values.length - 1)]
		};
	});
});

// Helper function to format feature names
function formatFeatureName(feature: string): string {
	return feature
		.split('_')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

function formatGridValue(value: number): string {
	return value.toFixed(3);
}

function formatImpactValue(value: number): string {
	return shouldScaleAverage() ? `${value.toFixed(1)}%` : value.toFixed(3);
}

function formatPointLabel(index: number): string {
	const values = scaledAverage();
	if (!values.length) return '';
	const value = values[index];
	return shouldScaleAverage() ? `${value.toFixed(1)}%` : value.toFixed(2);
}

function clamp(value: number, min: number, max: number) {
	return Math.min(max, Math.max(min, value));
}

function calculateX(index: number) {
	return padding + (index / xSteps()) * (chartWidth - 2 * padding);
}

function calculateY(value: number) {
	const ratio = (value - yMin) / (yMax - yMin);
	const clampedRatio = isFinite(ratio) ? clamp(ratio, 0, 1) : 0.5;
	return padding + (1 - clampedRatio) * (chartHeight - 2 * padding);
}

// Convert data point to SVG coordinates
function getPointCoordinates(index: number) {
	const values = scaledAverage();
	if (!values.length) {
		return { x: padding, y: chartHeight - padding };
}

	const x = calculateX(index);
	const y = calculateY(values[index]);
	return { x, y };
}

function getLabelOffsetY(y: number) {
	const buffer = 16;
	if (y - buffer <= padding) {
		return 14;
	}

	return -10;
}

function getPathPoints() {
	const values = scaledAverage();
	if (!grid_values.length || !values.length) {
		return [];
	}

	return grid_values.map((_, index) => getPointCoordinates(index));
}

// Generate SVG path for the line
function getPathData() {
	const points = getPathPoints();
	if (!points.length) return '';

	return points.reduce((acc, point, index) => {
		if (index === 0) return `M ${point.x} ${point.y}`;
		return `${acc} L ${point.x} ${point.y}`;
	}, '');
}

function getAreaPathData() {
	const points = getPathPoints();
	if (!points.length) return '';

	const baselineY = chartHeight - padding;
	const pathHead = points.map(point => `L ${point.x} ${point.y}`).join(' ');

	return `M ${points[0].x} ${baselineY} ${pathHead} L ${points[points.length - 1].x} ${baselineY} Z`;
}

function getClassTextColor() {
	return classStyles().accentText;
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

	<!-- Chart -->
	<div class="relative mb-4">
		<svg width={chartWidth} height={chartHeight} class="overflow-visible">
			<!-- Grid lines -->
			<defs>
				<pattern id={gridPatternId()} width="24" height="24" patternUnits="userSpaceOnUse">
					<path d="M 24 0 L 0 0 0 24" fill="none" stroke="#f1f5f9" stroke-width="1" />
				</pattern>
			</defs>

			<rect width="100%" height="100%" rx="8" fill="#f8fafc" />
			<rect
				x={padding}
				y={padding}
				width={chartWidth - 2 * padding}
				height={chartHeight - 2 * padding}
				fill={`url(#${gridPatternId()})`}
				opacity="0.35"
				rx="6"
			/>

			<!-- Axes -->
			<line
				x1={padding}
				y1={padding}
				x2={padding}
				y2={chartHeight - padding}
				stroke="#cbd5f5"
				stroke-width="1.25"
			/>
			<line
				x1={padding}
				y1={chartHeight - padding}
				x2={chartWidth - padding}
				y2={chartHeight - padding}
				stroke="#cbd5f5"
				stroke-width="1.25"
			/>

			<!-- Y-axis ticks -->
			{#each yTicks as tick}
				{@const y = calculateY(tick)}
				<line
					x1={padding - 6}
					y1={y}
					x2={chartWidth - padding}
					y2={y}
					stroke="#e2e8f0"
					stroke-width="0.75"
					stroke-dasharray="2 4"
				/>
				<!-- <text
					x={padding - 12}
					y={y + 3}
					class="text-[10px] font-medium fill-slate-500"
					text-anchor="end"
				>
					{tick}{shouldScaleAverage() ? '%' : ''}
				</text> -->
			{/each}

			<!-- X-axis ticks -->
			{#each representativeXTicks() as tick}
				{@const coords = getPointCoordinates(tick.index)}
				<line
					x1={coords.x}
					y1={chartHeight - padding}
					x2={coords.x}
					y2={chartHeight - padding + 6}
					stroke="#cbd5f5"
					stroke-width="1"
				/>
				<text
					x={coords.x}
					y={chartHeight - padding + 18}
					class="text-[10px] font-medium fill-slate-500"
					text-anchor="middle"
				>
					{formatGridValue(tick.value)}
				</text>
			{/each}

			<text
				x={padding - 24}
				y={padding - 12}
				class="text-[10px] font-semibold fill-slate-500 uppercase tracking-wide"
				text-anchor="start"
			>
				{shouldScaleAverage() ? 'Impact (%)' : 'Impact'}
			</text>

			<!-- Area under curve -->
			{#if getAreaPathData()}
				<path
					d={getAreaPathData()}
					fill={classStyles().area}
				/>
			{/if}

			<!-- Main line -->
			{#if getPathData()}
				<path
					d={getPathData()}
					fill="none"
					stroke={classStyles().stroke}
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			{/if}

			<!-- Data points + annotations -->
			{#each grid_values as _, index}
				{@const coords = getPointCoordinates(index)}
				<g>
					<circle
						cx={coords.x}
						cy={coords.y}
						r="4"
						fill="#ffffff"
						stroke={classStyles().stroke}
						stroke-width="2"
					/>
					<circle
						cx={coords.x}
						cy={coords.y}
						r="2.5"
						fill={classStyles().point}
					/>
					<text
						x={coords.x}
						y={coords.y + getLabelOffsetY(coords.y)}
						text-anchor="middle"
						class="text-[10px] font-semibold fill-slate-700"
						style="paint-order: stroke fill; stroke: rgba(255,255,255,0.9); stroke-width: 3;"
					>
						{formatPointLabel(index)}
					</text>
					<title>
						{formatFeatureName(feature)}: {formatGridValue(grid_values[index])} → {formatPointLabel(index)}
					</title>
				</g>
			{/each}
		</svg>
	</div>

	<!-- Chart Info -->
	<div class="grid grid-cols-2 gap-4 text-[11px] text-slate-600">
		<div class="space-y-1">
			<p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Feature Values</p>
			<div class="flex items-center justify-between rounded-md bg-slate-50 px-2 py-1">
				<span class="font-medium text-slate-600">Range</span>
				<span class="font-mono text-slate-500">
					{formatGridValue(minGrid())} – {formatGridValue(maxGrid())}
				</span>
			</div>
		</div>
		<div class="space-y-1">
			<p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Partial Dependence</p>
			<div class="flex items-center justify-between rounded-md bg-slate-50 px-2 py-1">
				<span class="font-medium text-slate-600">Impact</span>
				<span class={`font-mono ${getClassTextColor()}`}>
					{formatImpactValue(minValue())} – {formatImpactValue(maxValue())}
				</span>
			</div>
		</div>
	</div>
</div>
