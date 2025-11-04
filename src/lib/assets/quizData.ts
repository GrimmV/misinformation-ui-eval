export interface QuizQuestion {
	id: number;
	question: string;
	options: string[];
	correctAnswer: number; // Index of correct answer (0-based)
	explanation?: string; // Optional explanation for the answer
}

export const quizQuestionsGeneral: QuizQuestion[] = [
	{
		id: 1,
		question: "Who is responsible for classifying or flagging posts as misinformation?",
		options: ["The users themselves", "Independent fact-checkers", "The social media platform"],
		correctAnswer: 2,
		explanation: "Posts are typically classified or flagged as misinformation by the social media platform based on automated models or fact-checking partnerships."
	},
	{
		id: 2,
		question: "On what basis are posts classified as misinformation?",
		options: ["Randomly", "Based on semantic features extracted from the post", "According to the number of likes or shares"],
		correctAnswer: 1,
		explanation: "Posts are analyzed and classified based on semantic features such as emotional tone, exaggeration, or bias detected in the text."
	},
	{
		id: 3,
		question: "What is the role of the assistant in this system?",
		options: ["To automatically remove flagged posts", "To help users judge whether a flag is trustworthy", "To rewrite the post in a neutral tone"],
		correctAnswer: 1,
		explanation: "The assistant helps users assess the trustworthiness of the platform’s flag by providing explanations and evidence supporting or questioning the classification."
	}	
];

export const quizQuestionsFeatures: QuizQuestion[] = [
	{
		id: 1,
		question: "Which statement shows strong 'Us vs. Them' language?",
		options: [
			"We should work together to find a solution that benefits everyone.",
			"They’re ruining our country while we’re the only ones fighting for truth.",
			"This topic has many sides and needs balanced discussion."
		],
		correctAnswer: 1,
		explanation: "‘They’re ruining our country...’ frames opponents as a threatening out-group, showing strong 'Us vs. Them' language."
	},
	{
		id: 2,
		question: "Which statement shows exaggerated certainty?",
		options: [
			"It’s possible that this trend could continue if nothing changes.",
			"Scientists suggest there may be a link, but more data is needed.",
			"This proves once and for all that the system is rigged — no doubt about it!"
		],
		correctAnswer: 2,
		explanation: "The claim 'This proves once and for all...' expresses complete certainty without room for nuance, showing exaggerated certainty."
	},
	{
		id: 3,
		question: "Which statement shows low source quality?",
		options: [
			"According to a peer-reviewed study published in Nature, results confirm the trend.",
			"Experts say something big might be happening soon.",
			"Several verified sources confirmed the findings independently."
		],
		correctAnswer: 1,
		explanation: "‘Experts say...’ without specific attribution or evidence demonstrates vague sourcing, reflecting low source quality."
	},
	{
		id: 4,
		question: "Which statement shows strong victim-villain framing?",
		options: [
			"Hardworking citizens are being betrayed by corrupt elites taking everything for themselves.",
			"The issue affects people differently depending on their circumstances.",
			"Policymakers are debating several options to address the problem."
		],
		correctAnswer: 0,
		explanation: "The first statement portrays a clear moral struggle between 'good citizens' and 'corrupt elites,' typical of victim-villain framing."
	},
	{
		id: 5,
		question: "Which statement shows strong black-and-white language?",
		options: [
			"Either you’re with us, or you’re part of the problem.",
			"There are several valid perspectives on this issue.",
			"People hold mixed feelings about this complex situation."
		],
		correctAnswer: 0,
		explanation: "The phrase 'Either you’re with us, or you’re part of the problem' reduces complexity to two opposing sides, showing black-and-white language."
	},
	{
		id: 6,
		question: "Which statement shows strong dehumanization?",
		options: [
			"Those people are nothing but parasites draining our society.",
			"Some individuals disagree with our position.",
			"We should treat everyone fairly, even if they have different views."
		],
		correctAnswer: 0,
		explanation: "Labeling a group as 'parasites' strips them of humanity, showing dehumanizing language."
	},
	{
		id: 7,
		question: "Which statement shows strong emotionality?",
		options: [
			"This makes me furious — how could anyone allow such injustice?",
			"Some policies have mixed outcomes depending on context.",
			"The results appear statistically significant across groups."
		],
		correctAnswer: 0,
		explanation: "The first statement expresses intense anger, demonstrating strong emotionality."
	},
	{
		id: 8,
		question: "Which statement shows high reading difficulty?",
		options: [
			"The policy’s multidimensional repercussions necessitate extensive systemic reform.",
			"New rules will change things a lot.",
			"People are discussing ways to improve the system."
		],
		correctAnswer: 0,
		explanation: "Complex vocabulary and structure in the first option indicate high reading difficulty."
	},
	{
		id: 9,
		question: "Which statement has a negative sentiment?",
		options: [
			"This initiative has completely failed and disappointed everyone.",
			"The new project offers promising opportunities.",
			"Results were neutral and require further evaluation."
		],
		correctAnswer: 0,
		explanation: "Words like 'failed' and 'disappointed' express clear negativity, indicating negative sentiment."
	},
	{
		id: 10,
		question: "Which statement shows strong polarization?",
		options: [
			"Anyone who disagrees with this idea is an enemy of progress.",
			"There are valid arguments on both sides of the debate.",
			"We should look for common ground between differing opinions."
		],
		correctAnswer: 0,
		explanation: "‘Anyone who disagrees is an enemy...’ polarizes opinions into opposing extremes, showing strong polarization."
	}	
];