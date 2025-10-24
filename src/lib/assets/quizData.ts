export interface QuizQuestion {
	id: number;
	question: string;
	options: string[];
	correctAnswer: number; // Index of correct answer (0-based)
	explanation?: string; // Optional explanation for the answer
}

export const quizQuestions: QuizQuestion[] = [
	{
		id: 1,
		question: "What is the capital of France?",
		options: ["London", "Berlin", "Paris"],
		correctAnswer: 2,
		explanation: "Paris is the capital and largest city of France."
	},
	{
		id: 2,
		question: "Which planet is known as the Red Planet?",
		options: ["Venus", "Mars", "Jupiter"],
		correctAnswer: 1,
		explanation: "Mars is called the Red Planet due to iron oxide on its surface."
	},
	{
		id: 3,
		question: "What is the largest mammal in the world?",
		options: ["African Elephant", "Blue Whale", "Giraffe"],
		correctAnswer: 1,
		explanation: "The blue whale is the largest mammal and animal on Earth."
	},
	{
		id: 4,
		question: "Which programming language is known for its use in web development?",
		options: ["Python", "JavaScript", "C++"],
		correctAnswer: 1,
		explanation: "JavaScript is widely used for both frontend and backend web development."
	},
	{
		id: 5,
		question: "What is the smallest country in the world?",
		options: ["Monaco", "Vatican City", "San Marino"],
		correctAnswer: 1,
		explanation: "Vatican City is the smallest country by both area and population."
	}
];

export const getQuizStats = (questions: QuizQuestion[]) => {
	return {
		totalQuestions: questions.length,
		categories: [...new Set(questions.map(q => q.question.split(' ')[0]))], // Simple category extraction
		difficulty: 'Mixed' // Could be enhanced with difficulty levels
	};
};
