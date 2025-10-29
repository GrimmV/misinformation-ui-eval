import { getPosts, type SocialMediaPost as ApiSocialMediaPost } from '../services/api';

export interface SocialMediaPost {
	id: number;
	name: string;
	profileImage: string;
	date: string;
	content: string;
	likes: number;
	comments: number;
	shares: number;
	isFakeNews?: boolean; // For fake news detection experiments
	category?: string; // News, entertainment, politics, etc.
	features?: object[]; // Additional features from API
}

// State management for posts
let postsCache: SocialMediaPost[] = [];
let postsPromise: Promise<SocialMediaPost[]> | null = null;

// Convert API post to internal post format
function convertApiPost(apiPost: ApiSocialMediaPost): SocialMediaPost {
	return {
		id: apiPost.id,
		name: apiPost.name,
		profileImage: apiPost.profileImage,
		date: apiPost.date,
		content: apiPost.content,
		likes: apiPost.likes,
		comments: apiPost.comments,
		shares: apiPost.shares,
		isFakeNews: apiPost.isFakeNews,
		category: apiPost.category,
		features: apiPost.features || [],
	};
}

// Fetch posts from API with caching
export async function fetchPostsFromApi(): Promise<SocialMediaPost[]> {
	console.log('postsCache', postsCache);
	if (postsCache.length > 0) {
		return postsCache;
	}

	if (postsPromise) {
		return postsPromise;
	}

	postsPromise = getPosts().then(apiPosts => {
		console.log('apiPosts', apiPosts);
		// Handle both direct array response and wrapped response
		const rawPosts = Array.isArray(apiPosts) ? apiPosts : (apiPosts as any)?.posts || [];
		
		// Filter out invalid posts and ensure all have valid IDs
		const validPosts = rawPosts
			.filter((post: any) => post && typeof post === 'object')
			.map((post: any, index: number) => ({
				...convertApiPost(post),
				id: post.id || index + 1 // Use array index + 1 as fallback ID
			}))
			.filter((post: SocialMediaPost, index: number, array: SocialMediaPost[]) => 
				// Remove duplicates by checking if this is the first occurrence of this ID
				array.findIndex((p: SocialMediaPost) => p.id === post.id) === index
			);
			
		postsCache = validPosts;
		postsPromise = null;
		return postsCache;
	});

	return postsPromise;
}

// Get posts (async)
export async function getSamplePosts(): Promise<SocialMediaPost[]> {
	const result = await fetchPostsFromApi();
	return result || [];
}

// Synchronous access to cached posts (for backward compatibility)
export function getSamplePostsSync(): SocialMediaPost[] {
	if (postsCache.length === 0) {
		throw new Error('Posts not loaded yet. Use getSamplePosts() or await fetchPostsFromApi() first.');
	}
	return postsCache;
}

// Legacy export for backward compatibility - will be replaced by async version
export const samplePosts: SocialMediaPost[] = [];

// Async helper functions
export async function getPostsByCategory(category: string): Promise<SocialMediaPost[]> {
	const posts = await getSamplePosts();
	return posts.filter(post => post.category === category);
}

export async function getFakeNewsPosts(): Promise<SocialMediaPost[]> {
	const posts = await getSamplePosts();
	return posts.filter(post => post.isFakeNews === true);
}

export async function getRealNewsPosts(): Promise<SocialMediaPost[]> {
	const posts = await getSamplePosts();
	return posts.filter(post => post.isFakeNews === false);
}

export async function getRandomPosts(count: number): Promise<SocialMediaPost[]> {
	const posts = await getSamplePosts();
	const shuffled = [...posts].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
}

export async function getPostsStats() {
	const posts = await getSamplePosts();
	return {
		totalPosts: posts.length,
		fakeNewsCount: posts.filter(post => post.isFakeNews === true).length,
		realNewsCount: posts.filter(post => post.isFakeNews === false).length,
		categories: [...new Set(posts.map(post => post.category))],
		averageLikes: Math.round(posts.reduce((sum, post) => sum + post.likes, 0) / posts.length),
		averageComments: Math.round(posts.reduce((sum, post) => sum + post.comments, 0) / posts.length),
		averageShares: Math.round(posts.reduce((sum, post) => sum + post.shares, 0) / posts.length)
	};
}

// Synchronous helper functions (for backward compatibility - requires posts to be loaded first)
export function getPostsByCategorySync(category: string): SocialMediaPost[] {
	const posts = getSamplePostsSync();
	return posts.filter(post => post.category === category);
}

export function getFakeNewsPostsSync(): SocialMediaPost[] {
	const posts = getSamplePostsSync();
	return posts.filter(post => post.isFakeNews === true);
}

export function getRealNewsPostsSync(): SocialMediaPost[] {
	const posts = getSamplePostsSync();
	return posts.filter(post => post.isFakeNews === false);
}

export function getRandomPostsSync(count: number): SocialMediaPost[] {
	const posts = getSamplePostsSync();
	const shuffled = [...posts].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
}

export function getPostsStatsSync() {
	const posts = getSamplePostsSync();
	return {
		totalPosts: posts.length,
		fakeNewsCount: posts.filter(post => post.isFakeNews === true).length,
		realNewsCount: posts.filter(post => post.isFakeNews === false).length,
		categories: [...new Set(posts.map(post => post.category))],
		averageLikes: Math.round(posts.reduce((sum, post) => sum + post.likes, 0) / posts.length),
		averageComments: Math.round(posts.reduce((sum, post) => sum + post.comments, 0) / posts.length),
		averageShares: Math.round(posts.reduce((sum, post) => sum + post.shares, 0) / posts.length)
	};
}
