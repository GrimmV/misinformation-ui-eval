// API configuration
export const API_CONFIG = {
	baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost',
	port: parseInt(import.meta.env.VITE_API_PORT || '5000'),
} as const;

export const API_ENDPOINTS = {
	posts: '/api/v1/posts',
	evaluationData: '/api/v1/evaluation_data',
} as const;
