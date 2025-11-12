<script lang="ts">
	import QuizQuestion from './QuizQuestion.svelte';
	import type { QuizQuestion as QuizQuestionType } from '$lib/assets/quizData';

	interface Props {
		onQuizComplete?: (results: QuizResults) => void;
		quizQuestions: QuizQuestionType[];
		description: string;
		username?: string;
	}

	export interface QuizResults {
		totalQuestions: number;
		correctAnswers: number;
		score: number;
		answers: AnswerResult[];
	}

	interface AnswerResult {
		questionId: number;
		question: string;
		selectedAnswer: number;
		correctAnswer: number;
		isCorrect: boolean;
		timeSpent: number;
	}

	let { 
		onQuizComplete,
		quizQuestions,
		description,
		username
	}: Props = $props();

	let currentQuestionIndex = $state(0);
	let quizResults: AnswerResult[] = $state([]);
	let isQuizComplete = $state(false);
	let questionStartTime = $state(Date.now());

	const currentQuestion = $derived(quizQuestions[currentQuestionIndex]);
	const progress = $derived(((currentQuestionIndex + 1) / quizQuestions.length) * 100);
	const correctAnswers = $derived(quizResults.filter(r => r.isCorrect).length);
	const score = $derived(Math.round((correctAnswers / quizQuestions.length) * 100));
	const isAnswered = $derived(quizResults.find(r => r.questionId === currentQuestion.id)?.isCorrect !== undefined);

	function handleCorrectAnswer() {
		const timeSpent = Date.now() - questionStartTime;
		const result: AnswerResult = {
			questionId: currentQuestion.id,
			question: currentQuestion.question,
			selectedAnswer: currentQuestion.correctAnswer,
			correctAnswer: currentQuestion.correctAnswer,
			isCorrect: true,
			timeSpent
		};
		
		quizResults = [...quizResults, result];
	}

	function nextQuestion() {
		if (currentQuestionIndex < quizQuestions.length - 1) {
			currentQuestionIndex++;
			questionStartTime = Date.now();
		} else {
			completeQuiz();
		}
	}

	function completeQuiz() {
		isQuizComplete = true;
		const results: QuizResults = {
			totalQuestions: quizQuestions.length,
			correctAnswers,
			score,
			answers: quizResults
		};
		onQuizComplete?.(results);
	}
</script>

<div class="max-w-xl mx-auto">
	
	<!-- Header Section -->
	<div class="text-center mb-12">
		<h1 class="text-5xl font-bold text-gray-900 mb-6">Preparation</h1>
		<p class="text-xl text-gray-600 max-w-3xl mx-auto">
			{description}
		</p>
	</div>
	{#if !isQuizComplete}
		<!-- Quiz Header -->
		<div class="bg-white rounded-lg shadow-lg p-6 mb-6">
			<div class="flex items-center justify-around mb-4">
				<h1 class="text-2xl font-bold text-gray-900">Quiz</h1>
				<div class="flex items-center space-x-4">
					<span class="text-sm text-gray-600">
						Question {currentQuestionIndex + 1} of {quizQuestions.length}
					</span>
					<div class="w-32 bg-gray-200 rounded-full h-2">
						<div 
							class="bg-blue-600 h-2 rounded-full transition-all duration-300"
							style="width: {progress}%"
						></div>
					</div>
				</div>
			</div>
		</div>

		<!-- Current Question -->
		<QuizQuestion
			quizId={quizQuestions.length}
			questionId={currentQuestionIndex}
			question={currentQuestion.question}
			explanation={currentQuestion.explanation || ''}
			options={currentQuestion.options}
			correctAnswer={currentQuestion.correctAnswer}
			isAnswered={isAnswered}
			onCorrectAnswer={() => handleCorrectAnswer()}
			onNextQuestion={() => nextQuestion()}
			{username}
		/>
	{/if}
</div>
