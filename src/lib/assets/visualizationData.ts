export interface VisualizationData {
	title: string;
	description: string;
	extended_description: string;
	data: object;
}

export interface PostVisualizationData {
	id: number;
	visualizations: VisualizationData[];
}