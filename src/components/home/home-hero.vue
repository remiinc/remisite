<script setup>
import Button from '../global/button.vue'
import { Shader, VideoTexture } from 'shaders/vue'

const emit = defineEmits(['book-demo'])
</script>

<template>
  <section class="relative w-full md:min-h-[calc(80svh-(--spacing(18)))] grid grid-rows-1 grid-cols-1 px-4 md:py-4">
    <div class="w-full max-w-[1400px] px-0 mx-auto grid grid-cols-1 md:grid-cols-5 gap-4">
      <div
        class="bg-cyan-100 w-full min-h-160 p-8 rounded-4xl relative isolate flex flex-col items-start justify-between gap-2 overflow-hidden text-left select-none md:col-span-3">
        <h1 class="relative z-1 max-w-[20ch] text-5xl lg:text-6xl font-normal tracking-tight text-balance text-foreground">
          The last operations hire you'll ever need
        </h1>
        <div class="flex items-center justify-start gap-2">
          <Button>Book a Demo</Button>
          <Button variant="secondary">Pricing</Button>
        </div>
      </div>
      <div class="bg-cyan-100 w-full min-h-80 rounded-4xl relative isolate overflow-hidden select-none md:col-span-2">
        <Shader class="absolute inset-0 h-full w-full" disable-telemetry>
          <VideoTexture url="/videos/remi-imessage-animation-1.mp4" />
        </Shader>

      </div>
    </div>
  </section>
</template>
