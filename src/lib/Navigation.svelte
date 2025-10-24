<script lang="ts">
	import { House, Info, Settings, Activity } from 'lucide-svelte';
</script>

<nav class="bg-white shadow-lg">
	<div class="max-w-7xl mx-auto px-4">
		<div class="flex justify-between h-16">
			<div class="flex items-center space-x-4">
				<a href="/" class="flex items-center">
					<House class="w-8 h-8 text-blue-600" />
					<span class="ml-2 text-xl font-bold">My App</span>
				</a>
			</div>
			<div class="flex items-center space-x-4">
				<a href="/" class="px-4 py-2 rounded-md text-sm font-medium transition-colors text-gray-700 hover:bg-gray-100">
					Home
				</a>
				<a href="/preparation" class="px-4 py-2 rounded-md text-sm font-medium transition-colors text-gray-700 hover:bg-gray-100">
					Preparation
				</a>
				<a href="/main" class="px-4 py-2 rounded-md text-sm font-medium transition-colors text-gray-700 hover:bg-gray-100">
					Main
				</a>
			</div>
		</div>
	</div>
</nav>
