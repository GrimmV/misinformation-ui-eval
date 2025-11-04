<script lang="ts">
	import { ChartColumn, Eye } from 'lucide-svelte';
	import ShapBarChart from './ShapBarChart.svelte';
	import FeatureDistribution from './FeatureDistribution.svelte';
	import PerformanceMetrics from './PerformanceMetrics.svelte';
	import ConfusionMatrix from './ConfusionMatrix.svelte';
	import GlobalFeatureImportance from './GlobalFeatureImportance.svelte';
	import PartialDependencePlot from './PartialDependencePlot.svelte';
	import Heatmap from './Heatmap.svelte';

	interface Props {
		title: string;
		description: string;
		data: any;
	}

	let { title, description, data }: Props = $props();

	// hover/focus popover state
	let open = $state(false);
	let btnEl: HTMLButtonElement | null = null;

	// viewport coordinates of button's top-left
	let anchorTop = $state(0);
	let anchorLeft = $state(0);

	const panelId = $derived(`viz-${title.replace(/\s+/g, '-').toLowerCase()}`);

	function positionToButton() {
		if (!btnEl) return;
		const r = btnEl.getBoundingClientRect();
		anchorTop = r.top + 50;
		anchorLeft = r.left;
	}

	function openPopover() {
		positionToButton();
		open = true;
	}

	function closePopover() {
		open = false;
	}

	function toggleForTouch() {
		// touch/click fallback
		if (open) closePopover();
		else openPopover();
	}

	// keep in place on resize/scroll
	function handleWindowChange() {
		if (open) positionToButton();
	}

	// keyboard escape
	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closePopover();
	}

	// Move an element to document.body to avoid clipping by parent overflow/transform
	function portal(node: HTMLElement) {
		const originalParent = node.parentNode as (Node | null);
		const placeholder = document.createComment('portal-placeholder');
		if (originalParent) {
			originalParent.insertBefore(placeholder, node);
		}
		document.body.appendChild(node);
		return {
			destroy() {
				if (node.parentNode === document.body) {
					document.body.removeChild(node);
				}
				if (originalParent && placeholder.parentNode === originalParent) {
					placeholder.parentNode.removeChild(placeholder);
				}
			}
		};
	}
</script>

<svelte:window onscroll={handleWindowChange} onresize={handleWindowChange} />

<div class="h-fit w-fit rounded-lg border border-gray-200 bg-white p-2 shadow-sm mt-4">
	<!-- Header -->
	<div class="flex items-center space-x-3 mb-2 justify-center">
		<div class="rounded-lg bg-purple-100 p-2">
			<ChartColumn class="h-6 w-6 text-purple-600" />
		</div>
		<div>
			<h3 class="text-lg font-semibold text-gray-900">{title}</h3>
			<!-- <p class="text-sm text-gray-500">Explanations</p> -->
		</div>
	</div>

	<!-- Description -->
	<div class="p-2">
		<p class="text-sm leading-relaxed text-gray-700 text-justify">{description}</p>

		<!-- Hover to reveal visualization -->
		<div class="mt-4 flex items-center justify-between">
			<button
				bind:this={btnEl}
				type="button"
				class="inline-flex items-center justify-center space-x-2 rounded-md border w-full border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
				aria-controls={panelId}
				aria-expanded={open}
				aria-haspopup="dialog"
				onmouseenter={openPopover}
				onmouseleave={(e) => {
					// if moving into the panel, don't close here; panel handles its own leave
					const related = (e as MouseEvent).relatedTarget as Node | null;
					if (!related || !(related as HTMLElement).closest?.(`#${panelId}`)) {
						closePopover();
					}
				}}
				onfocus={openPopover}
				onblur={(e) => {
					const related = (e as FocusEvent).relatedTarget as Node | null;
					if (!related || !(related as HTMLElement).closest?.(`#${panelId}`)) {
						closePopover();
					}
				}}
				onclick={(e) => { e.preventDefault(); toggleForTouch(); }}
				onkeydown={onKeydown}
			>
				<Eye class="h-4 w-4 text-gray-600" />
				<span>Preview visualization</span>
			</button>
		</div>
	</div>
</div>

<!-- Fixed-position hover panel rendered at viewport, not clipped by parents -->

{#if open}
	<div
		id={panelId}
		role="dialog"
		aria-label="Visualization preview"
		tabindex="-1"
		class="fixed z-[9999] max-w-[min(560px,92vw)] rounded-lg border border-gray-200 bg-white shadow-xl"
		style="
			top: {anchorTop}px;
			left: {anchorLeft}px;
			transform: translate(-8px, -8px) translate(-100%, -100%);
		"
		use:portal
		onmouseenter={() => (open = true)}
		onmouseleave={closePopover}
		onkeydown={onKeydown}
	>

		<!-- Content -->
		<div class="p-3">
			<div class="w-[420px] max-w-full">
				{#if title === 'individual feature importance'}
					<ShapBarChart values={data.values} />
				{:else if title === 'feature distribution'}
					<FeatureDistribution counts={data.counts} edges={data.edges} featureName="placeholder" />
				{:else if title === 'performance metrics'}
					<PerformanceMetrics
						accuracy={data.accuracy}
						f1_score={data.f1_score}
						precision={data.precision}
						recall={data.recall}
					/>
				{:else if title === 'confusion matrix'}
					<ConfusionMatrix matrix={data.confusion} />
				{:else if title === 'global feature importance'}
					<GlobalFeatureImportance values={data.values} />
				{:else if title === 'partial dependence plot'}
					<PartialDependencePlot
						feature={data.feature}
						class={data.class}
						grid_values={data.grid_values}
						average={data.average}
					/>
				{:else if title === 'feature distribution 2D'}
					<Heatmap markdownTable={data} />
				{/if}
			</div>
		</div>
	</div>
{/if}
