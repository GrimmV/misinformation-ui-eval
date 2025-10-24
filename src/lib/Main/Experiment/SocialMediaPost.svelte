<script lang="ts">
	import { Heart, MessageCircle, Share, Ellipsis } from 'lucide-svelte';

	interface Props {
		name: string;
		profileImage: string;
		date: string;
		content: string;
		likes?: number;
		comments?: number;
		shares?: number;
		isPotentialMisinformation?: boolean;
	}

	let {
		name,
		profileImage,
		date,
		content,
		likes = 0,
		comments = 0,
		shares = 0,
		isPotentialMisinformation = false
	}: Props = $props();
</script>

<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 w-xl">
	<!-- Header with profile info -->
	<div class="flex items-center justify-between mb-3">
		<div class="flex items-center space-x-3">
			<img
				src={profileImage}
				alt={name}
				class="w-10 h-10 rounded-full object-cover"
			/>
			<div>
				<h3 class="font-semibold text-gray-900 text-sm">{name}</h3>
				<p class="text-xs text-gray-500">{date}</p>
				{#if isPotentialMisinformation}
					<div class="text-xs text-red-400 font-medium mt-1">
						⚠️ Potential Misinformation
					</div>
				{/if}
			</div>
		</div>
		<button class="text-gray-400 hover:text-gray-600 transition-colors">
			<Ellipsis size={16} />
		</button>
	</div>

	<!-- Post content -->
	<div class="mb-4">
		<p class="text-gray-900 text-sm leading-relaxed">{content}</p>
	</div>

	<!-- Action buttons -->
	<div class="flex items-center justify-between pt-3 border-t border-gray-100">
		<button
			class="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
			disabled
		>
			<Heart size={16} />
			<span class="text-sm">{likes}</span>
		</button>
		
		<button
			class="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
			disabled
		>
			<MessageCircle size={16} />
			<span class="text-sm">{comments}</span>
		</button>
		
		<button
			class="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
			disabled
		>
			<Share size={16} />
			<span class="text-sm">{shares}</span>
		</button>
	</div>
</div>
