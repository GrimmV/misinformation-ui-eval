// API service for fetching data from Flask endpoints
import type { PostVisualizationData } from '$lib/assets/visualizationData';

import { PUBLIC_BASE_URL as BASE_URL, PUBLIC_PORT as PORT, PUBLIC_API_ENDPOINT_POSTS as API_ENDPOINT_POSTS, PUBLIC_API_ENDPOINT_EVALS as API_ENDPOINT_EVALS, PUBLIC_API_ENDPOINT_CHAT as API_ENDPOINT_CHAT } from "$env/static/public";

// Build full API URL
function buildApiUrl(endpoint: string): string {
	return `${BASE_URL}${PORT}${endpoint}`;
}

// Generic API error class
export class ApiError extends Error {
	constructor(
		message: string,
		public status?: number,
		public response?: Response
	) {
		super(message);
		this.name = 'ApiError';
	}
}

// Generic fetch wrapper with error handling
async function apiRequest<T>(
	url: string,
	options: RequestInit = {}
): Promise<T> {
	try {
		const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				...options.headers,
			},
			...options,
		});

		if (!response.ok) {
			throw new ApiError(
				`API request failed: ${response.status} ${response.statusText}`,
				response.status,
				response
			);
		}

		return await response.json();
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
}

// Posts API
export interface SocialMediaPost {
	id: number;
	name: string;
	profileImage: string;
	date: string;
	content: string;
	likes: number;
	comments: number;
	shares: number;
	isFakeNews?: boolean;
	category?: string;
	features?: object[];
}

export async function fetchPosts(): Promise<SocialMediaPost[]> {
	const url = buildApiUrl(API_ENDPOINT_POSTS);
	return apiRequest<SocialMediaPost[]>(url);
}

// Evaluation Data API
export interface EvaluationData {
	id: number;
	trustScore: 'Low' | 'High';
	rationale: string;
	detailedAnalysis: string;
	visualizations: PostVisualizationData;
}

export async function fetchEvaluationData(postIds: number[]): Promise<EvaluationData[]> {
	const url = buildApiUrl(API_ENDPOINT_EVALS);
	return apiRequest<EvaluationData[]>(url, {
		method: 'POST',
		body: JSON.stringify({ datapoint_ids: postIds }),
	});
}

// OpenAI API
export interface OpenAIResponse {
	response: string;
}

export async function fetchOpenAI(prompt: string): Promise<OpenAIResponse> {
	const url = buildApiUrl(API_ENDPOINT_CHAT);
	return apiRequest<OpenAIResponse>(url, {
		method: 'POST',
		body: JSON.stringify({ prompt: prompt }),
	});
}

// Cache for storing fetched data
class DataCache {
	private postsCache: SocialMediaPost[] | null = null;
	private evaluationCache = new Map<string, EvaluationData[]>();
	private postsCacheTime: number | null = null;
	private evaluationCacheTime = new Map<string, number>();
	
	// Cache TTL in milliseconds (5 minutes)
	private readonly CACHE_TTL = 5 * 60 * 1000;

	private isCacheValid(timestamp: number | null): boolean {
		if (!timestamp) return false;
		return Date.now() - timestamp < this.CACHE_TTL;
	}

	async getPosts(): Promise<SocialMediaPost[]> {
		if (this.postsCache && this.isCacheValid(this.postsCacheTime)) {
			return this.postsCache;
		}

		this.postsCache = await fetchPosts();
		this.postsCacheTime = Date.now();
		return this.postsCache;
	}

	async getEvaluationData(postIds: number[]): Promise<EvaluationData[]> {
		const cacheKey = postIds.sort().join(',');
		
		if (this.evaluationCache.has(cacheKey) && 
			this.isCacheValid(this.evaluationCacheTime.get(cacheKey) || null)) {
			return this.evaluationCache.get(cacheKey)!;
		}

		const data = await fetchEvaluationData(postIds);
		this.evaluationCache.set(cacheKey, data);
		this.evaluationCacheTime.set(cacheKey, Date.now());
		return data;
	}

	clearCache(): void {
		this.postsCache = null;
		this.postsCacheTime = null;
		this.evaluationCache.clear();
		this.evaluationCacheTime.clear();
	}
}

// Export singleton cache instance
export const dataCache = new DataCache();

// Convenience functions that use the cache
export const getPosts = () => dataCache.getPosts();
export const getEvaluationData = (postIds: number[]) => dataCache.getEvaluationData(postIds);
export const clearCache = () => dataCache.clearCache();
