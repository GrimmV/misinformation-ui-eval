export interface EvaluationData {
	id: number;
	trustScore: 'No' | 'Low' | 'Medium' | 'High';
	rationale: string;
	detailedAnalysis: string;
}

export const evaluationData: EvaluationData[] = [
	{
		id: 1,
		trustScore: 'High',
		rationale: 'This post demonstrates high credibility with clear sourcing, factual language, and verifiable claims. The content is well-structured and presents information objectively without emotional manipulation.',
		detailedAnalysis: 'Detailed analysis: Emotional language score: 2.1/10 (low), Absolute statements: 1.8/10 (low), Source credibility: 9.2/10 (high), Factual accuracy: 9.5/10 (high), Bias indicators: 1.3/10 (low). Multiple verifiable sources found. Recent sources: Yes. Cross-referenced with official institutions.'
	},
	{
		id: 2,
		trustScore: 'Medium',
		rationale: 'This post presents mixed signals. While it contains some factual elements, there are concerns about source reliability and potential bias. The language is generally neutral but lacks comprehensive verification.',
		detailedAnalysis: 'Detailed analysis: Emotional language score: 4.7/10 (medium), Absolute statements: 5.2/10 (medium), Source credibility: 6.1/10 (medium), Factual accuracy: 6.8/10 (medium), Bias indicators: 5.9/10 (medium). Some verifiable sources found. Recent sources: Mixed. Limited cross-verification available.'
	},
	{
		id: 3,
		trustScore: 'Low',
		rationale: 'This post shows several warning signs including unverified claims, emotionally charged language, and questionable sources. The content lacks proper attribution and contains elements that suggest potential misinformation.',
		detailedAnalysis: 'Detailed analysis: Emotional language score: 7.8/10 (high), Absolute statements: 8.1/10 (high), Source credibility: 2.9/10 (low), Factual accuracy: 3.4/10 (low), Bias indicators: 8.2/10 (high). No verifiable sources found. Recent sources: No. Claims cannot be independently verified.'
	},
	{
		id: 4,
		trustScore: 'No',
		rationale: 'This post exhibits clear characteristics of misinformation with fabricated claims, manipulative language, and complete absence of credible sources. The content is designed to mislead and should not be trusted.',
		detailedAnalysis: 'Detailed analysis: Emotional language score: 9.4/10 (very high), Absolute statements: 9.7/10 (very high), Source credibility: 0.2/10 (none), Factual accuracy: 0.8/10 (none), Bias indicators: 9.8/10 (very high). No verifiable sources found. Recent sources: No. Content appears to be fabricated or heavily distorted.'
	},
	{
		id: 5,
		trustScore: 'High',
		rationale: 'This post demonstrates excellent journalistic standards with multiple credible sources, balanced reporting, and clear fact-checking. The information is presented objectively and can be independently verified.',
		detailedAnalysis: 'Detailed analysis: Emotional language score: 1.5/10 (very low), Absolute statements: 2.3/10 (low), Source credibility: 9.7/10 (very high), Factual accuracy: 9.8/10 (very high), Bias indicators: 0.9/10 (very low). Multiple authoritative sources cited. Recent sources: Yes. Verified by multiple fact-checking organizations.'
	},
	{
		id: 6,
		trustScore: 'Medium',
		rationale: 'This post contains a mix of reliable and questionable elements. While some claims appear factual, others lack proper verification. The overall presentation is somewhat balanced but could benefit from better sourcing.',
		detailedAnalysis: 'Detailed analysis: Emotional language score: 5.1/10 (medium), Absolute statements: 4.8/10 (medium), Source credibility: 5.7/10 (medium), Factual accuracy: 6.2/10 (medium), Bias indicators: 6.1/10 (medium). Some sources verified, others questionable. Recent sources: Partially. Mixed reliability across claims.'
	},
	{
		id: 7,
		trustScore: 'Low',
		rationale: 'This post raises significant concerns about accuracy and reliability. The content contains unsubstantiated claims, uses misleading language, and relies on questionable sources that cannot be independently verified.',
		detailedAnalysis: 'Detailed analysis: Emotional language score: 8.2/10 (high), Absolute statements: 7.9/10 (high), Source credibility: 1.8/10 (very low), Factual accuracy: 2.1/10 (very low), Bias indicators: 8.7/10 (high). No credible sources found. Recent sources: No. Claims contradict established facts.'
	},
	{
		id: 8,
		trustScore: 'No',
		rationale: 'This post is clearly designed to spread misinformation with completely fabricated content, manipulative tactics, and zero credible sources. It represents a deliberate attempt to deceive readers.',
		detailedAnalysis: 'Detailed analysis: Emotional language score: 9.6/10 (very high), Absolute statements: 9.9/10 (very high), Source credibility: 0.1/10 (none), Factual accuracy: 0.3/10 (none), Bias indicators: 9.9/10 (very high). No verifiable sources found. Recent sources: No. Content is demonstrably false and potentially harmful.'
	},
	{
		id: 9,
		trustScore: 'High',
		rationale: 'This post exemplifies trustworthy content with comprehensive sourcing, balanced perspective, and verifiable information. The author demonstrates journalistic integrity and provides multiple avenues for verification.',
		detailedAnalysis: 'Detailed analysis: Emotional language score: 1.2/10 (very low), Absolute statements: 1.9/10 (low), Source credibility: 9.8/10 (very high), Factual accuracy: 9.9/10 (very high), Bias indicators: 0.7/10 (very low). Extensive source documentation. Recent sources: Yes. Peer-reviewed and fact-checked.'
	},
	{
		id: 10,
		trustScore: 'Medium',
		rationale: 'This post presents a reasonable attempt at balanced reporting but falls short in some areas. While the core information appears accurate, the presentation could be more objective and better sourced.',
		detailedAnalysis: 'Detailed analysis: Emotional language score: 4.3/10 (medium), Absolute statements: 5.5/10 (medium), Source credibility: 6.8/10 (medium), Factual accuracy: 7.1/10 (medium), Bias indicators: 5.2/10 (medium). Some reliable sources, some questionable. Recent sources: Mostly. Generally accurate but needs better verification.'
	}
];

// Helper function to get evaluation data by post ID
export function getEvaluationDataById(postId: number): EvaluationData | undefined {
	return evaluationData.find(data => data.id === postId);
}

// Helper function to get evaluation data by index
export function getEvaluationData(index: number): EvaluationData {
	return evaluationData[index % evaluationData.length];
}

// Helper function to get evaluation data by trust score
export function getEvaluationDataByTrustScore(trustScore: 'No' | 'Low' | 'Medium' | 'High'): EvaluationData[] {
	return evaluationData.filter(data => data.trustScore === trustScore);
}
