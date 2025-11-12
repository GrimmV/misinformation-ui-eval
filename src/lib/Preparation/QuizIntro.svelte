<script lang="ts">
  import ImageDescription from './ImageDescription.svelte';
  import { uploadClicks } from '$lib';
  interface ImageDescriptionItem {
    description: string;
    imageSrc: string;
    alt?: string;
    width?: number;
  }

  interface Props {
    title: string;
    description: string;
    items?: ImageDescriptionItem[];
    onComplete?: () => void;
    username?: string;
  }

  let { title, description, items = [], onComplete, username }: Props = $props();

  const handleComplete = () => {
    onComplete?.();
    uploadClicks({
      action: 'quiz_intro',
      content: {
        title: title,
      },
      username: username ?? '',
      datetime: new Date(),
    });
  }
</script>

<div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
  <div class="text-center mb-8">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
    <p class="text-lg text-gray-700 max-w-3xl mx-auto">{description}</p>
  </div>

  {#if items.length > 0}
    <div class="space-y-8">
      {#each items as item (item.imageSrc)}
        <ImageDescription
          description={item.description}
          imageSrc={item.imageSrc}
          alt={item.alt}
          width={item.width}
        />
      {/each}
    </div>
  {/if}

  <div class="text-center pt-4">
    <button
      onclick={handleComplete}
      class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center"
    >
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
      </svg>
      Continue to Quiz
    </button>
  </div>
</div>


