export interface VisualizationData {
	title: string;
	description: string;
	data: object;
}

export interface PostVisualizationData {
	id: number;
	visualizations: VisualizationData[];
}