// place files you want to import through the `$lib` alias in this folder.
export { default as Navigation } from './Navigation.svelte';
export { default as PreparationQuiz } from './Preparation/Quiz.svelte';
export { default as PreparationInstructions } from './Preparation/Instructions.svelte';
export { default as PreparationCompletion } from './Preparation/Completion.svelte';
export { default as MainIntro } from './Main/Intro.svelte';
export { default as MainExperiment } from './Main/Experiment.svelte';
export { default as MainCompletion } from './Main/Completion.svelte';
export { default as SocialMediaPost } from './Main/Experiment/SocialMediaPost.svelte';
export { default as PrepTimeline } from './Main/Experiment/PrepTimeline.svelte';
export { default as EvaluationAssistant } from './Main/Experiment/EvaluationAssistant.svelte';
export { default as DataVisualizationCarousel } from './Main/Experiment/DataVisualizationCarousel.svelte';
export { default as PostAnalysis } from './Main/Experiment/PostAnalysis.svelte';
export { default as PostAnalysisContainer } from './Main/Experiment/PostAnalysisContainer.svelte';
export { default as ShapBarChart } from './Main/Experiment/ShapBarChart.svelte';
export { default as FeatureDistribution } from './Main/Experiment/FeatureDistribution.svelte';
export { default as PerformanceMetrics } from './Main/Experiment/PerformanceMetrics.svelte';
export { default as ConfusionMatrix } from './Main/Experiment/ConfusionMatrix.svelte';
export { default as GlobalFeatureImportance } from './Main/Experiment/GlobalFeatureImportance.svelte';
export { default as PartialDependencePlot } from './Main/Experiment/PartialDependencePlot.svelte';
export { default as Heatmap } from './Main/Experiment/Heatmap.svelte';
export type { QuizResults } from './Preparation/Quiz.svelte';
export type { ExperimentResults } from './Main/Experiment.svelte';
export { 
	samplePosts, 
	getSamplePosts, 
	getSamplePostsSync,
	getPostsByCategory,
	getFakeNewsPosts,
	getRealNewsPosts,
	getRandomPosts,
	getPostsStats
} from './assets/postsData';
export type { SocialMediaPost as SocialMediaPostData } from './assets/postsData';
export { 
	evaluationData, 
	getEvaluationDataById,
	fetchEvaluationDataFromApi,
	getEvaluationDataByTrustScore
} from './assets/evaluationData';
export type { EvaluationData } from './assets/evaluationData';
export type { VisualizationData, PostVisualizationData } from './assets/visualizationData';
