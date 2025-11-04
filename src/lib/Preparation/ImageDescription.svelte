<script lang="ts">
  interface Props {
    description: string;
    imageSrc: string;
    alt?: string;
    width?: number;
  }

  let { description, imageSrc, alt, width }: Props = $props();
</script>

<div class="space-y-4 flex flex-col items-center">
  <p class="text-base text-gray-700">{description}</p>
  <img src={imageSrc} alt={alt ?? ''} class="h-auto rounded-md shadow max-w-[600px]" />
</div>


