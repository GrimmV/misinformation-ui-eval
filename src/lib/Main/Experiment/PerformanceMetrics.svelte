<script lang="ts">
	import { Target, TrendingUp, CheckCircle, AlertCircle } from 'lucide-svelte';

	interface Props {
		accuracy: number;
		f1_score: number;
		precision: number;
		recall: number;
		title?: string;
		modelName?: string;
	}

	let {
		accuracy,
		f1_score,
		precision,
		recall,
		title = 'Model Performance',
		modelName = 'Model'
	}: Props = $props();

	// Calculate overall performance grade
	let performanceGrade = $derived(() => {
		const avgScore = (accuracy + f1_score + precision + recall) / 4;
		if (avgScore >= 0.9)
			return {
				grade: 'A',
				color: 'text-green-600',
				bgColor: 'bg-green-50',
				borderColor: 'border-green-200'
			};
		if (avgScore >= 0.8)
			return {
				grade: 'B',
				color: 'text-blue-600',
				bgColor: 'bg-blue-50',
				borderColor: 'border-blue-200'
			};
		if (avgScore >= 0.7)
			return {
				grade: 'C',
				color: 'text-yellow-600',
				bgColor: 'bg-yellow-50',
				borderColor: 'border-yellow-200'
			};
		if (avgScore >= 0.6)
			return {
				grade: 'D',
				color: 'text-orange-600',
				bgColor: 'bg-orange-50',
				borderColor: 'border-orange-200'
			};
		return {
			grade: 'F',
			color: 'text-red-600',
			bgColor: 'bg-red-50',
			borderColor: 'border-red-200'
		};
	});

	// Format percentage
	function formatPercentage(value: number): string {
		return (value * 100).toFixed(1) + '%';
	}

	// Get color based on score
	function getScoreColor(score: number): string {
		if (score >= 0.9) return 'text-green-600';
		if (score >= 0.8) return 'text-blue-600';
		if (score >= 0.7) return 'text-yellow-600';
		if (score >= 0.6) return 'text-orange-600';
		return 'text-red-600';
	}

	// Get background color based on score
	function getScoreBgColor(score: number): string {
		if (score >= 0.9) return 'bg-green-50';
		if (score >= 0.8) return 'bg-blue-50';
		if (score >= 0.7) return 'bg-yellow-50';
		if (score >= 0.6) return 'bg-orange-50';
		return 'bg-red-50';
	}

	// Get border color based on score
	function getScoreBorderColor(score: number): string {
		if (score >= 0.9) return 'border-green-200';
		if (score >= 0.8) return 'border-blue-200';
		if (score >= 0.7) return 'border-yellow-200';
		if (score >= 0.6) return 'border-orange-200';
		return 'border-red-200';
	}

	// Get icon based on score
	function getScoreIcon(score: number) {
		if (score >= 0.8) return CheckCircle;
		if (score >= 0.6) return AlertCircle;
		return AlertCircle;
	}
</script>

<div class="rounded-lg border border-gray-200 bg-white p-3">
	<!-- Compact Metrics Grid -->
	<div class="grid grid-cols-2 gap-3">
		<!-- Accuracy -->
		<div class="rounded border {getScoreBorderColor(accuracy)} {getScoreBgColor(accuracy)} p-2"
            title="Correct predictions of total predictions">
			<div class="flex items-center justify-between mb-1">
				<span class="text-xs font-medium text-gray-700">Accuracy</span>
			</div>
			<div class="text-lg font-bold {getScoreColor(accuracy)}">
				{formatPercentage(accuracy)}
			</div>
		</div>

		<!-- F1 Score -->
		<div class="rounded border {getScoreBorderColor(f1_score)} {getScoreBgColor(f1_score)} p-2"
        title="Combination of precision and recall">
			<div class="flex items-center justify-between mb-1">
				<span class="text-xs font-medium text-gray-700">F1 Score</span>
			</div>
			<div class="text-lg font-bold {getScoreColor(f1_score)}">
				{formatPercentage(f1_score)}
			</div>
		</div>

		<!-- Precision -->
		<div class="rounded border {getScoreBorderColor(precision)} {getScoreBgColor(precision)} p-2"
        title="Correct predictions of positive predictions">
			<div class="flex items-center justify-between mb-1">
				<span class="text-xs font-medium text-gray-700">Precision</span>
			</div>
			<div class="text-lg font-bold {getScoreColor(precision)}">
				{formatPercentage(precision)}
			</div>
		</div>

		<!-- Recall -->
		<div class="rounded border {getScoreBorderColor(recall)} {getScoreBgColor(recall)} p-2"
        title="Correct predictions of actual positives">
			<div class="flex items-center justify-between mb-1">
				<span class="text-xs font-medium text-gray-700">Recall</span>
			</div>
			<div class="text-lg font-bold {getScoreColor(recall)}">
				{formatPercentage(recall)}
			</div>
		</div>
	</div>
</div>
