<script lang="ts">
  import { Check, X } from "lucide-svelte";

  interface Props {
    question: string;
    explanation: string;
    questionPos: number;
    options: string[];
    correctAnswer: number; // Index of the correct answer (0-based)
    isAnswered: boolean; // Whether the question has been answered
    onCorrectAnswer: () => void; // Callback for when correct answer is selected
    onNextQuestion?: () => void; // Callback for when next question is selected
    onPreviousQuestion?: () => void; // Callback for when previous question is selected
  }

  let {
    question,
    explanation,
    questionPos,
    options,
    correctAnswer,
    onCorrectAnswer,
    onNextQuestion,
    onPreviousQuestion,
    isAnswered,
  }: Props = $props();

  let selectedAnswer = $state<number | null>(null);
  let isEvaluated = $state(false);
  let showFeedback = $state(false);

  // Computed values for better maintainability
  const isCorrectAnswer = $derived(selectedAnswer === correctAnswer);

  // Handle the isAnswered prop change
  // We'll handle this in the template instead to avoid lifecycle issues

  function selectAnswer(index: number) {
    if (isEvaluated) return; // Prevent selection after evaluation

    selectedAnswer = index;
    isEvaluated = true;
    showFeedback = true;

    // Check if the answer is correct
    if (index === correctAnswer) {
      // Call the parent's callback if provided
      onCorrectAnswer?.();
    }
  }

  // Helper function to get option styling classes
  function getOptionClasses(index: number) {
    const baseClasses =
      "w-full text-left p-4 rounded-lg border-2 transition-all duration-200";
    const cursorClasses = isEvaluated
      ? "cursor-not-allowed"
      : "cursor-pointer hover:shadow-md";

    if (!isEvaluated) {
      return `${baseClasses} border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-700 ${cursorClasses}`;
    }

    // Evaluated state
    if (index === correctAnswer && index === selectedAnswer) {
      return `${baseClasses} border-green-500 bg-green-50 text-green-900 ${cursorClasses}`;
    }

    if (index === selectedAnswer) {
      return `${baseClasses} border-red-500 bg-red-50 text-red-900 ${cursorClasses}`;
    }

    return `${baseClasses} border-gray-200 bg-gray-50 text-gray-600 ${cursorClasses}`;
  }

  // Helper function to get icon for option
  function getOptionIcon(index: number) {
    if (!isEvaluated) return null;

    if (index === correctAnswer && index === selectedAnswer) {
      return { component: Check, classes: "w-5 h-5 text-green-600" };
    }

    if (index === selectedAnswer && index !== correctAnswer) {
      return { component: X, classes: "w-5 h-5 text-red-600" };
    }

    return null;
  }

  // Reset function to reset quiz state
  export function reset() {
    selectedAnswer = null;
    isEvaluated = false;
    showFeedback = false;
  }

  function handleNextQuestion() {
    reset();
    onNextQuestion?.();
  }
</script>

<div class="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
  <h2 class="text-xl font-semibold text-gray-900 mb-6">{question}</h2>

  <div class="space-y-3 mb-6">
    {#each options as option, index}
      {@const iconData = getOptionIcon(index)}
      {@const isCorrectOption = index === correctAnswer}
      {@const isSelectedOption = index === selectedAnswer}
      <button
        onclick={() => selectAnswer(index)}
        disabled={isEvaluated || isAnswered}
        class={getOptionClasses(index)}
      >
        <div class="flex items-center justify-between">
          <span class="font-medium">{option}</span>
          {#if isAnswered && isCorrectOption}
            <Check class="w-5 h-5 text-green-600" />
          {:else if iconData}
            {@const IconComponent = iconData.component}
            <IconComponent class={iconData.classes} />
          {/if}
        </div>
      </button>
    {/each}
  </div>

  {#if showFeedback}
    <div class="mb-4">
      {#if isCorrectAnswer}
        <div
          class="flex flex-col items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg"
        >
          <div class="flex items-center space-x-2">
            <Check class="w-5 h-5 text-green-600" />
            <span class="text-green-800 font-medium">Correct! Well done!</span>
          </div>
          <span class="text-green-800 font-medium text-sm">{explanation}</span>
        </div>
      {:else}
        <div
          class="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg"
        >
          <X class="w-5 h-5 text-red-600" />
          <span class="text-red-800 font-medium">Incorrect. Retry.</span>
        </div>
      {/if}
    </div>
  {/if}

  <div class="flex justify-around">
    {#if questionPos > 0}
      <div class="flex justify-center">
        <button
          onclick={onPreviousQuestion}
          class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Previous
        </button>
      </div>
    {/if}
    {#if isEvaluated}
      {#if !isCorrectAnswer}
        <div class="flex justify-center">
          <button
            onclick={reset}
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      {:else}
        <div class="flex justify-center">
          <button
            onclick={handleNextQuestion}
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Next Question
          </button>
        </div>
      {/if}
    {/if}
  </div>
</div>
