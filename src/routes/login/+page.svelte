<script lang="ts">

    import Login from '$lib/Login/Login.svelte';

    let { form } = $props();

    // Ensure form is null instead of undefined when not provided
    form = form ?? null;

</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <Login {form} />
</div>