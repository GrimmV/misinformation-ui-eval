<script lang="ts">

    import Login from '$lib/Login/Login.svelte';

    let { form } = $props();

</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <Login {form} />
</div>