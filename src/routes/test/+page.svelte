<script lang="ts">
	import { EvaluationAssistant, DataVisualizationCarousel, PostAnalysis, PostAnalysisContainer } from '$lib';
	import { samplePosts, type SocialMediaPost } from '$lib';
</script>

<div class="min-h-screen bg-gray-100 flex items-top justify-center">
    <!-- <EvaluationAssistant 
    trustScore={75}
    rationale="This post contains several red flags that suggest it may be misleading. The language is emotionally charged and uses absolute statements without credible sources. The claims made are not backed by verifiable evidence."
    changeMyMindClue="Consider checking the original source of this information. Look for official statements from recognized institutions or fact-checking organizations that have investigated these claims."
    postContent="This is a test post"
    showDetails={false}
    /> -->
    <PostAnalysisContainer postIds={[1, 2, 3, 4, 5]} />
</div>
