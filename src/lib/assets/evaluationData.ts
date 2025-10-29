import { getEvaluationData, type EvaluationData as ApiEvaluationData } from '../services/api';
import type { PostVisualizationData } from './visualizationData';
export interface EvaluationData {
	id: number;
	trustScore: 'Low' | 'High';
	rationale: string;
	detailedAnalysis: string;
	visualizations: PostVisualizationData;
}

// State management for evaluation data
let evaluationCache = new Map<string, EvaluationData[]>();
let evaluationPromises = new Map<string, Promise<EvaluationData[]>>();

// Convert API evaluation data to internal format
function convertApiEvaluationData(apiData: ApiEvaluationData): EvaluationData {
	return {
		id: apiData.id,
		trustScore: apiData.trustScore,
		rationale: apiData.rationale,
		detailedAnalysis: apiData.detailedAnalysis,
		visualizations: apiData.visualizations as PostVisualizationData,
	};
}

// Fetch evaluation data from API with caching
export async function fetchEvaluationDataFromApi(postIds: number[]): Promise<EvaluationData[]> {
	const cacheKey = postIds.sort().join(',');
	
	if (evaluationCache.has(cacheKey)) {
		return evaluationCache.get(cacheKey)!;
	}

	if (evaluationPromises.has(cacheKey)) {
		return evaluationPromises.get(cacheKey)!;
	}

	const promise = getEvaluationData(postIds).then(apiData => {
		const convertedData = apiData.evaluation_data.map(convertApiEvaluationData);
		evaluationCache.set(cacheKey, convertedData);
		evaluationPromises.delete(cacheKey);
		return convertedData;
	});

	evaluationPromises.set(cacheKey, promise);
	return promise;
}

// Legacy export for backward compatibility - will be replaced by async version
export const evaluationData: EvaluationData[] = [];

// Async helper functions
export async function getEvaluationDataById(postId: number): Promise<EvaluationData | undefined> {
	console.log('postId', postId);
	const data = await fetchEvaluationDataFromApi([postId]);
	console.log('data', data);
	return data.find(item => item.id === postId);
}

export async function getEvaluationDataByTrustScore(trustScore: 'Low' | 'High', postIds?: number[]): Promise<EvaluationData[]> {
	const data = postIds ? await fetchEvaluationDataFromApi(postIds) : [];
	return data.filter(item => item.trustScore === trustScore);
}
