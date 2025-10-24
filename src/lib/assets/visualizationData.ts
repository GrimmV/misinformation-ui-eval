export interface VisualizationData {
	title: string;
	description: string;
	data: Array<{
		label: string;
		value: number;
		color?: string;
	}>;
	chartType?: 'bar' | 'line';
	showValues?: boolean;
	height?: number;
}

export interface PostVisualizationData {
	id: number;
	visualizations: VisualizationData[];
}

export const visualizationData: PostVisualizationData[] = [
	{
		id: 1,
		visualizations: [
			{
				title: 'Trust Score Distribution',
				description: 'This chart shows how trust scores are distributed across different content types. Higher scores indicate more reliable content.',
				data: [
					{ label: 'News Articles', value: 85, color: '#3B82F6' },
					{ label: 'Social Posts', value: 45, color: '#EF4444' },
					{ label: 'Blog Posts', value: 72, color: '#10B981' },
					{ label: 'Forum Posts', value: 38, color: '#F59E0B' },
					{ label: 'Official Sources', value: 91, color: '#8B5CF6' }
				],
				chartType: 'bar',
				showValues: true,
				height: 200
			},
			{
				title: 'Source Credibility Analysis',
				description: 'Analysis of source credibility across different platforms and content types, showing which sources are most reliable.',
				data: [
					{ label: 'Academic', value: 92, color: '#10B981' },
					{ label: 'Government', value: 88, color: '#3B82F6' },
					{ label: 'News Media', value: 75, color: '#F59E0B' },
					{ label: 'Social Media', value: 25, color: '#EF4444' },
					{ label: 'Blogs', value: 40, color: '#8B5CF6' }
				],
				chartType: 'bar',
				showValues: true,
				height: 200
			}
		]
	},
	{
		id: 2,
		visualizations: [
			{
				title: 'Bias Detection Trends',
				description: 'This line chart tracks the progression of bias indicators over time, helping identify patterns in content reliability.',
				data: [
					{ label: 'Week 1', value: 20, color: '#3B82F6' },
					{ label: 'Week 2', value: 35, color: '#10B981' },
					{ label: 'Week 3', value: 50, color: '#F59E0B' },
					{ label: 'Week 4', value: 65, color: '#EF4444' },
					{ label: 'Week 5', value: 45, color: '#8B5CF6' }
				],
				chartType: 'line',
				showValues: true,
				height: 200
			},
			{
				title: 'Content Reliability Metrics',
				description: 'Comprehensive analysis of content reliability factors including fact-checking, source verification, and bias indicators.',
				data: [
					{ label: 'Fact-Checked', value: 60, color: '#10B981' },
					{ label: 'Source Verified', value: 45, color: '#3B82F6' },
					{ label: 'Bias Detected', value: 70, color: '#EF4444' },
					{ label: 'Recent Sources', value: 35, color: '#F59E0B' },
					{ label: 'Cross-Referenced', value: 25, color: '#8B5CF6' }
				],
				chartType: 'bar',
				showValues: true,
				height: 200
			}
		]
	},
	{
		id: 3,
		visualizations: [
			{
				title: 'Misinformation Indicators',
				description: 'Analysis of key indicators that suggest potential misinformation, including emotional language and unverified claims.',
				data: [
					{ label: 'Emotional Language', value: 85, color: '#EF4444' },
					{ label: 'Unverified Claims', value: 90, color: '#F59E0B' },
					{ label: 'Absence of Sources', value: 95, color: '#8B5CF6' },
					{ label: 'Sensational Headlines', value: 80, color: '#3B82F6' },
					{ label: 'Conspiracy Elements', value: 70, color: '#10B981' }
				],
				chartType: 'bar',
				showValues: true,
				height: 200
			},
			{
				title: 'Trust Score Over Time',
				description: 'Historical analysis showing how trust scores have changed over time for similar content types.',
				data: [
					{ label: 'Jan', value: 15, color: '#EF4444' },
					{ label: 'Feb', value: 25, color: '#F59E0B' },
					{ label: 'Mar', value: 35, color: '#8B5CF6' },
					{ label: 'Apr', value: 20, color: '#3B82F6' },
					{ label: 'May', value: 10, color: '#10B981' }
				],
				chartType: 'line',
				showValues: true,
				height: 200
			}
		]
	},
	{
		id: 4,
		visualizations: [
			{
				title: 'Fabrication Indicators',
				description: 'Critical analysis of content that appears to be completely fabricated or heavily distorted from original sources.',
				data: [
					{ label: 'Fabricated Content', value: 95, color: '#EF4444' },
					{ label: 'Manipulated Images', value: 85, color: '#F59E0B' },
					{ label: 'False Attribution', value: 90, color: '#8B5CF6' },
					{ label: 'Out-of-Context Quotes', value: 80, color: '#3B82F6' },
					{ label: 'Impossible Claims', value: 100, color: '#10B981' }
				],
				chartType: 'bar',
				showValues: true,
				height: 200
			},
			{
				title: 'Harm Potential Assessment',
				description: 'Evaluation of potential harm that could result from sharing this type of content.',
				data: [
					{ label: 'Public Health Risk', value: 90, color: '#EF4444' },
					{ label: 'Social Division', value: 85, color: '#F59E0B' },
					{ label: 'Economic Impact', value: 70, color: '#8B5CF6' },
					{ label: 'Political Manipulation', value: 95, color: '#3B82F6' },
					{ label: 'Personal Safety', value: 60, color: '#10B981' }
				],
				chartType: 'bar',
				showValues: true,
				height: 200
			}
		]
	},
	{
		id: 5,
		visualizations: [
			{
				title: 'Journalistic Standards Compliance',
				description: 'Assessment of how well the content adheres to established journalistic standards and ethical guidelines.',
				data: [
					{ label: 'Fact Verification', value: 95, color: '#10B981' },
					{ label: 'Source Attribution', value: 90, color: '#3B82F6' },
					{ label: 'Balanced Reporting', value: 85, color: '#F59E0B' },
					{ label: 'Editorial Independence', value: 88, color: '#8B5CF6' },
					{ label: 'Correction Policy', value: 92, color: '#EF4444' }
				],
				chartType: 'bar',
				showValues: true,
				height: 200
			},
			{
				title: 'Expert Verification Network',
				description: 'Analysis of expert verification and peer review processes applied to this content.',
				data: [
					{ label: 'Subject Matter Experts', value: 90, color: '#10B981' },
					{ label: 'Peer Review', value: 85, color: '#3B82F6' },
					{ label: 'Fact-Checking Organizations', value: 88, color: '#F59E0B' },
					{ label: 'Academic Review', value: 92, color: '#8B5CF6' },
					{ label: 'Independent Verification', value: 87, color: '#EF4444' }
				],
				chartType: 'line',
				showValues: true,
				height: 200
			}
		]
	},
	{
		id: 6,
		visualizations: [
			{
				title: 'Mixed Reliability Analysis',
				description: 'Analysis of content that shows mixed signals between reliable and questionable elements.',
				data: [
					{ label: 'Reliable Elements', value: 60, color: '#10B981' },
					{ label: 'Questionable Claims', value: 40, color: '#EF4444' },
					{ label: 'Verified Sources', value: 55, color: '#3B82F6' },
					{ label: 'Unverified Claims', value: 45, color: '#F59E0B' },
					{ label: 'Neutral Language', value: 70, color: '#8B5CF6' }
				],
				chartType: 'bar',
				showValues: true,
				height: 200
			},
			{
				title: 'Source Diversity Index',
				description: 'Assessment of source diversity and the range of perspectives represented in the content.',
				data: [
					{ label: 'Primary Sources', value: 30, color: '#10B981' },
					{ label: 'Secondary Sources', value: 50, color: '#3B82F6' },
					{ label: 'Expert Opinions', value: 40, color: '#F59E0B' },
					{ label: 'User Generated', value: 20, color: '#8B5CF6' },
					{ label: 'Official Statements', value: 35, color: '#EF4444' }
				],
				chartType: 'line',
				showValues: true,
				height: 200
			}
		]
	},
	{
		id: 7,
		visualizations: [
			{
				title: 'Warning Signs Analysis',
				description: 'Comprehensive analysis of warning signs that indicate potential misinformation or unreliable content.',
				data: [
					{ label: 'Unsubstantiated Claims', value: 90, color: '#EF4444' },
					{ label: 'Misleading Language', value: 85, color: '#F59E0B' },
					{ label: 'Questionable Sources', value: 95, color: '#8B5CF6' },
					{ label: 'Contradictory Facts', value: 80, color: '#3B82F6' },
					{ label: 'Emotional Manipulation', value: 88, color: '#10B981' }
				],
				chartType: 'bar',
				showValues: true,
				height: 200
			},
			{
				title: 'Credibility Decline Over Time',
				description: 'Historical tracking of how credibility scores have declined for similar content patterns.',
				data: [
					{ label: 'Q1', value: 40, color: '#10B981' },
					{ label: 'Q2', value: 30, color: '#3B82F6' },
					{ label: 'Q3', value: 20, color: '#F59E0B' },
					{ label: 'Q4', value: 15, color: '#8B5CF6' },
					{ label: 'Current', value: 10, color: '#EF4444' }
				],
				chartType: 'line',
				showValues: true,
				height: 200
			}
		]
	},
	{
		id: 8,
		visualizations: [
			{
				title: 'Deception Tactics Detection',
				description: 'Analysis of specific deception tactics used in this content to mislead readers.',
				data: [
					{ label: 'False Attribution', value: 95, color: '#EF4444' },
					{ label: 'Out-of-Context Quotes', value: 90, color: '#F59E0B' },
					{ label: 'Manipulated Statistics', value: 85, color: '#8B5CF6' },
					{ label: 'Fabricated Evidence', value: 100, color: '#3B82F6' },
					{ label: 'Emotional Triggers', value: 88, color: '#10B981' }
				],
				chartType: 'bar',
				showValues: true,
				height: 200
			},
			{
				title: 'Harm Severity Assessment',
				description: 'Evaluation of the severity of potential harm that could result from this content.',
				data: [
					{ label: 'Immediate Risk', value: 90, color: '#EF4444' },
					{ label: 'Long-term Impact', value: 85, color: '#F59E0B' },
					{ label: 'Viral Potential', value: 95, color: '#8B5CF6' },
					{ label: 'Target Demographics', value: 80, color: '#3B82F6' },
					{ label: 'Correction Difficulty', value: 88, color: '#10B981' }
				],
				chartType: 'line',
				showValues: true,
				height: 200
			}
		]
	},
	{
		id: 9,
		visualizations: [
			{
				title: 'Excellence Indicators',
				description: 'Analysis of indicators that demonstrate exceptional journalistic quality and content integrity.',
				data: [
					{ label: 'Comprehensive Sourcing', value: 95, color: '#10B981' },
					{ label: 'Balanced Perspective', value: 90, color: '#3B82F6' },
					{ label: 'Fact Verification', value: 98, color: '#F59E0B' },
					{ label: 'Transparency', value: 92, color: '#8B5CF6' },
					{ label: 'Ethical Standards', value: 96, color: '#EF4444' }
				],
				chartType: 'bar',
				showValues: true,
				height: 200
			},
			{
				title: 'Verification Network Strength',
				description: 'Assessment of the strength and reliability of the verification network supporting this content.',
				data: [
					{ label: 'Peer Review', value: 95, color: '#10B981' },
					{ label: 'Expert Validation', value: 92, color: '#3B82F6' },
					{ label: 'Fact-Checking', value: 98, color: '#F59E0B' },
					{ label: 'Cross-Verification', value: 90, color: '#8B5CF6' },
					{ label: 'Independent Sources', value: 88, color: '#EF4444' }
				],
				chartType: 'line',
				showValues: true,
				height: 200
			}
		]
	},
	{
		id: 10,
		visualizations: [
			{
				title: 'Balanced Reporting Analysis',
				description: 'Evaluation of how well the content maintains balance and objectivity in its reporting approach.',
				data: [
					{ label: 'Objective Language', value: 70, color: '#10B981' },
					{ label: 'Multiple Perspectives', value: 65, color: '#3B82F6' },
					{ label: 'Neutral Tone', value: 75, color: '#F59E0B' },
					{ label: 'Factual Presentation', value: 68, color: '#8B5CF6' },
					{ label: 'Source Diversity', value: 60, color: '#EF4444' }
				],
				chartType: 'bar',
				showValues: true,
				height: 200
			},
			{
				title: 'Improvement Opportunities',
				description: 'Analysis of areas where the content could be improved to meet higher journalistic standards.',
				data: [
					{ label: 'Better Sourcing', value: 80, color: '#EF4444' },
					{ label: 'More Verification', value: 75, color: '#F59E0B' },
					{ label: 'Clearer Attribution', value: 70, color: '#8B5CF6' },
					{ label: 'Reduced Bias', value: 65, color: '#3B82F6' },
					{ label: 'Enhanced Context', value: 85, color: '#10B981' }
				],
				chartType: 'line',
				showValues: true,
				height: 200
			}
		]
	}
];

// Helper function to get visualization data by post ID
export function getVisualizationDataById(postId: number): PostVisualizationData | undefined {
	return visualizationData.find(data => data.id === postId);
}

// Helper function to get all visualization data
export function getAllVisualizationData(): PostVisualizationData[] {
	return visualizationData;
}
