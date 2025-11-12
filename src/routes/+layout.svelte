<script lang="ts">
import favicon from '$lib/assets/favicon.svg';
import '../app.css';
import { Toaster } from 'svelte-sonner';

let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
	{@render children?.()}
</main>

<Toaster />
