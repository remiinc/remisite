<script setup>
defineProps({
  integrations: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="w-full px-6 py-16 md:py-24" data-solution-integrations>
    <div class="mx-auto grid w-full max-w-(--content-width) gap-12 md:grid-cols-[1fr_3fr] md:gap-24">
      <header class="flex flex-col items-start gap-5 md:sticky md:top-[calc(var(--header-height)+2em)] md:self-start">
        <p class="text-xs font-medium leading-none text-muted-foreground flex items-center gap-4"><span
            class="uppercase text-foreground">Apps</span>
            <span class="text-sm tracking-tight">Your tools, handled</span></p>
        <h2 class="text-3xl font-normal leading-none tracking-tight text-balance md:text-4xl">
          {{ integrations.title }}
        </h2>
        <p class="text-base leading-snug text-pretty text-muted-foreground/75">
          {{ integrations.description }}
        </p>
      </header>

      <div class="min-w-0">
        <ul class="divide-y divide-border border-y border-border">
          <li v-for="tool in integrations.tools" :key="tool.key"
            class="grid gap-6 py-8 md:grid-cols-[1fr_6fr] md:gap-10 md:py-10" :data-solution-integration="tool.key">
            <div class="flex min-w-0 items-center gap-4 md:items-start">
              <img :src="tool.iconUrl" alt="" class="size-8 shrink-0 object-contain" aria-hidden="true" loading="lazy"
                decoding="async">
              <p class="sr-only">
                {{ tool.name }}
              </p>
            </div>

            <div class="flex min-w-0 flex-col gap-2">
              <h3 class="text-lg font-medium leading-tight tracking-tight text-balance">
                {{ tool.title }}
              </h3>
              <p class="max-w-2xl text-base leading-snug text-pretty text-muted-foreground/75">
                {{ tool.description }}
              </p>
            </div>
          </li>
        </ul>

        <p class="pt-5 text-sm leading-tight text-muted-foreground/60">
          3000+ more tool integrations available
        </p>
      </div>
    </div>
  </section>
</template>
