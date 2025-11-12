<script lang="ts">
  import { usernames } from "$lib/services/usernames";

  type LoginFormState = {
    username?: string;
    wrongUsername?: boolean;
  } | null;

  export let form: LoginFormState = null;

  let username = form?.username ?? "";
  let wrongUsername = form?.wrongUsername ?? false;

  $: if (form?.username !== undefined && form.username !== username) {
    username = form.username;
  }

  $: if (form?.wrongUsername !== undefined) {
    wrongUsername = form.wrongUsername;
  }

  function handleSubmit(event: Event) {
    const trimmedUsername = username.trim();

    username = trimmedUsername;

    const success = usernames.includes(trimmedUsername);

    const info = {
      action: "login",
      content: {
        success
      },
      username: trimmedUsername
    };

    console.debug("login", info);

    if (!success) {
      wrongUsername = true;
      event.preventDefault();
      return;
    }

    wrongUsername = false;
  }

</script>

<div class="min-h-screen bg-slate-50 flex items-center justify-center py-16">
  <form
    method="POST"
    class="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl ring-1 ring-slate-900/5 space-y-8"
    on:submit={handleSubmit}
  >
    <header class="space-y-2 text-center">
      <h1 class="text-2xl font-semibold text-slate-900">Welcome</h1>
      <p class="text-sm text-slate-500">
        Enter your participant username to enter the study.
      </p>
    </header>

    <fieldset class="space-y-2">
      <label class="block text-left text-sm font-medium text-slate-700" for="username">
        Username
      </label>
      <input
        id="username"
        class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
        type="text"
        name="username"
        placeholder="your username (case sensitive)"
        autocomplete="username"
        bind:value={username}
      />
      {#if wrongUsername}
        <p class="text-sm font-medium text-red-600">Username not recognized. Please try again.</p>
      {/if}
    </fieldset>

    <button
      type="submit"
      class="inline-flex w-full items-center justify-center rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
    >
      Sign in
    </button>

    <p class="text-center text-xs text-slate-400">
      Contact the study coordinator if you need help with your credentials.
    </p>
  </form>
</div>
