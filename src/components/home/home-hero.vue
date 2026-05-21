<script setup>
import Button from '../global/button.vue'
import { Shader, Godrays, Fog, Swirl, ChromaticAberration } from 'shaders/vue'

const emit = defineEmits(['book-demo'])
</script>

<template>
  <section class="relative w-full min-h-[clamp(800px,100svh,100svh)] grid grid-rows-1 grid-cols-1 md:py-4">
    <div class="absolute inset-0 h-full w-full mask-b-from-0% mask-b-to-100%">
      <Shader class="absolute inset-0 h-full w-full" disable-telemetry>
        <ChromaticAberration :strength="1">
          <Swirl color-a="oklch(0.99 0.2 259.597)" color-b="oklch(0.8 0.2 259.597)" color-space="oklch" :speed="1"
            :detail="1.5" :blend="50" />
          <Fog :animated="true" :speed="0.5" :color-a="'oklch(1 0 0)'"
            :color-b="'oklch(1 0 0/0)'" :mouse-influence="0.5" />
          <Godrays :animated="true" :center="{ x: 0.5, y: -1 }" :density="0.25" :intensity="1" :spotty="0.1" :speed="2"
            rayColor="oklch(0.95 0.3 259.597)" />
        </ChromaticAberration>
      </Shader>
    </div>
    <div class="w-full max-w-[1400px] px-6 pb-24 mx-auto flex flex-col items-center justify-end text-center gap-8">
      <h1
        class="relative z-1 max-w-[20ch] text-[clamp(3.5rem,8vw,5.5rem)] leading-[1em] font-normal tracking-[-0.03em] text-balance text-foreground select-none">
        The last operations hire you'll ever need
      </h1>
      <p class="relative z-1 max-w-[48ch] text-base leading-normal tracking-tight text-muted-foreground">
        AI-powered operations assistant that learns how your business runs and gets work done for you.
      </p>
      <div class="relative z-1 flex items-center justify-start gap-2">
        <Button>Book a Demo</Button>
        <Button variant="secondary">Pricing</Button>
      </div>
    </div>
  </section>
</template>
