<script setup>
import { PhCheck } from '@phosphor-icons/vue';

defineProps({
  catalog: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="w-full px-6 py-16" data-solution-use-case-catalog>
    <div class="mx-auto flex w-full max-w-(--content-width) flex-col gap-16">
      <header class="flex max-w-4xl flex-col gap-0.5">
        <p class="text-xs font-medium leading-none text-muted-foreground flex items-center gap-4 mb-6"><span
            class="uppercase text-foreground">Use Cases</span><span class="text-sm font-normal tracking-tight">{{ catalog.title }}</span></p>
        <p class="max-w-2xl text-3xl lg:text-4xl leading-[1.125em] text-pretty text-foreground">
          {{ catalog.description }}
        </p>
      </header>

      <div class="">
        <section v-for="category in catalog.categories" :key="category.title" class="flex flex-col gap-6 py-8"
          :data-solution-use-case-category="category.title">
          <h3 class="w-full text-xl font-medium leading-tight text-foreground">
            {{ category.title }}
          </h3>

          <ul class="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
            <li v-for="item in category.items" :key="item.title"
              class="flex flex-col gap-y-12 items-stretch justify-between p-4 md:p-6 rounded-xl bg-muted">
              <h4 class="text-sm font-medium leading-tight tracking-tight text-balance">
                {{ item.title }}
              </h4>
              <p class="text-sm text-pretty leading-tight text-muted-foreground/75">
                {{ item.description }}
              </p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </section>
</template>
