<script lang="ts">
    import { PreparationQuiz, PreparationInstructions, PreparationCompletion } from "$lib";
    import type { QuizResults } from "$lib";
    import { goto } from "$app/navigation";
    let step = $state(1);
    let quizResults: QuizResults | undefined = $state(undefined);
  
    function handleStepComplete() {
      step++;
    }
  
    function handleQuizComplete(results: QuizResults) {
      console.log("Quiz completed!", results);
      quizResults = results;
      handleStepComplete();
    }
  
    function handleContinueToExperiment() {
      // Navigate to main experiment or handle the transition
      console.log("Continuing to main experiment...");
      // You can add navigation logic here, e.g., goto('/main')
      goto('/main');
    }
  </script>
  
  <div class="min-h-screen bg-gray-100 py-12">
    {#if step === 1}
      <PreparationInstructions onComplete={handleStepComplete} />
    {:else if step === 2}
      <PreparationQuiz onQuizComplete={handleQuizComplete} />
    {:else if step === 3}
      <PreparationCompletion 
        onContinue={handleContinueToExperiment} 
        {quizResults} 
      />
    {/if}
  </div>
  