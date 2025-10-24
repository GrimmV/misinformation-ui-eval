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
}

export const samplePosts: SocialMediaPost[] = [
	{
		id: 1,
		name: "Sarah Johnson",
		profileImage: "https://picsum.photos/100/100?random=1",
		date: "2 hours ago",
		content: "Just finished reading an amazing article about climate change solutions. It's inspiring to see so many innovative approaches being developed worldwide! 🌱 #ClimateAction #Sustainability",
		likes: 127,
		comments: 23,
		shares: 8,
		isFakeNews: false,
		category: "environment"
	},
	{
		id: 2,
		name: "Mike Chen",
		profileImage: "https://picsum.photos/100/100?random=2",
		date: "4 hours ago",
		content: "BREAKING: Scientists discover new planet that could support life! This is huge news for space exploration. The discovery was made using advanced telescope technology.",
		likes: 89,
		comments: 45,
		shares: 34,
		isFakeNews: true,
		category: "science"
	},
	{
		id: 3,
		name: "Emma Rodriguez",
		profileImage: "https://picsum.photos/100/100?random=3",
		date: "6 hours ago",
		content: "Had the most amazing dinner at the new restaurant downtown. The chef's innovative approach to fusion cuisine is absolutely incredible! 🍽️ #Foodie #LocalEats",
		likes: 56,
		comments: 12,
		shares: 3,
		isFakeNews: false,
		category: "lifestyle"
	},
	{
		id: 4,
		name: "David Thompson",
		profileImage: "https://picsum.photos/100/100?random=4",
		date: "8 hours ago",
		content: "URGENT: Stock market crash predicted for next week! Financial experts warn of massive losses. Share this to warn your friends and family!",
		likes: 234,
		comments: 67,
		shares: 156,
		isFakeNews: true,
		category: "finance"
	},
	{
		id: 5,
		name: "Lisa Park",
		profileImage: "https://picsum.photos/100/100?random=5",
		date: "10 hours ago",
		content: "Beautiful sunset from my evening walk. Sometimes the simple moments are the most precious. Nature never fails to amaze me! 🌅 #Gratitude #Nature",
		likes: 78,
		comments: 15,
		shares: 7,
		isFakeNews: false,
		category: "lifestyle"
	},
	{
		id: 6,
		name: "Alex Martinez",
		profileImage: "https://picsum.photos/100/100?random=6",
		date: "12 hours ago",
		content: "New study shows that drinking 8 glasses of water daily can reverse aging! Scientists confirm this breakthrough discovery. Share if you want to stay young!",
		likes: 189,
		comments: 89,
		shares: 234,
		isFakeNews: true,
		category: "health"
	},
	{
		id: 7,
		name: "Jennifer Lee",
		profileImage: "https://picsum.photos/100/100?random=7",
		date: "1 day ago",
		content: "Attended an incredible tech conference today. The discussions about AI ethics and responsible development were thought-provoking. Excited about the future of technology! 🤖 #TechConference #AI",
		likes: 95,
		comments: 28,
		shares: 12,
		isFakeNews: false,
		category: "technology"
	},
	{
		id: 8,
		name: "Robert Wilson",
		profileImage: "https://picsum.photos/100/100?random=8",
		date: "1 day ago",
		content: "SHOCKING: Local politician caught in major corruption scandal! Hidden camera footage reveals everything. This will change everything!",
		likes: 312,
		comments: 145,
		shares: 278,
		isFakeNews: true,
		category: "politics"
	},
	{
		id: 9,
		name: "Maria Garcia",
		profileImage: "https://picsum.photos/100/100?random=9",
		date: "2 days ago",
		content: "Volunteered at the local animal shelter today. These amazing animals deserve all the love and care in the world. Consider adopting if you can! 🐕 #AdoptDontShop #Volunteer",
		likes: 143,
		comments: 34,
		shares: 19,
		isFakeNews: false,
		category: "lifestyle"
	},
	{
		id: 10,
		name: "Kevin Brown",
		profileImage: "https://picsum.photos/100/100?random=10",
		date: "2 days ago",
		content: "EXCLUSIVE: Celebrity couple secretly divorcing! Sources close to the family reveal shocking details. You won't believe what happened behind closed doors!",
		likes: 456,
		comments: 234,
		shares: 567,
		isFakeNews: true,
		category: "entertainment"
	},
	{
		id: 11,
		name: "Amanda Taylor",
		profileImage: "https://picsum.photos/100/100?random=11",
		date: "3 days ago",
		content: "Just completed my first marathon! The training was tough but crossing that finish line was the most incredible feeling. Never give up on your dreams! 🏃‍♀️ #Marathon #Achievement",
		likes: 267,
		comments: 78,
		shares: 45,
		isFakeNews: false,
		category: "lifestyle"
	},
	{
		id: 12,
		name: "Chris Anderson",
		profileImage: "https://picsum.photos/100/100?random=12",
		date: "3 days ago",
		content: "Viral video shows UFO landing in downtown area! Multiple witnesses confirm the sighting. Government trying to cover it up!",
		likes: 189,
		comments: 123,
		shares: 89,
		isFakeNews: true,
		category: "conspiracy"
	}
];

export const getPostsByCategory = (category: string): SocialMediaPost[] => {
	return samplePosts.filter(post => post.category === category);
};

export const getFakeNewsPosts = (): SocialMediaPost[] => {
	return samplePosts.filter(post => post.isFakeNews === true);
};

export const getRealNewsPosts = (): SocialMediaPost[] => {
	return samplePosts.filter(post => post.isFakeNews === false);
};

export const getRandomPosts = (count: number): SocialMediaPost[] => {
	const shuffled = [...samplePosts].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
};

export const getPostsStats = () => {
	return {
		totalPosts: samplePosts.length,
		fakeNewsCount: getFakeNewsPosts().length,
		realNewsCount: getRealNewsPosts().length,
		categories: [...new Set(samplePosts.map(post => post.category))],
		averageLikes: Math.round(samplePosts.reduce((sum, post) => sum + post.likes, 0) / samplePosts.length),
		averageComments: Math.round(samplePosts.reduce((sum, post) => sum + post.comments, 0) / samplePosts.length),
		averageShares: Math.round(samplePosts.reduce((sum, post) => sum + post.shares, 0) / samplePosts.length)
	};
};
