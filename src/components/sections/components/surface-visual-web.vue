<script setup>
import HomeSliderUiFiles from '../../home/slider-ui/home-slider-ui-files.vue'
import { Shader, FilmGrain, Swirl } from 'shaders/vue'
</script>

<template>
  <div class="w-full aspect-4/3 md:aspect-square rounded-[2em] bg-muted flex items-center justify-start overflow-hidden pl-[2em] py-[2em] text-[1.25em]">
    <div class="relative z-10 w-full max-w-none shrink-0 h-full">
      <HomeSliderUiFiles class="mx-0!" />
    </div>
  </div>
</template>
