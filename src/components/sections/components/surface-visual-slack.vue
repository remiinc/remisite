<script setup>
import { BentoMessageRow } from '../../global/visuals-library.vue'
import { cn } from '../../../lib/cn'
import { Shader, FilmGrain, Swirl } from 'shaders/vue'
</script>

<template>
  <div class="flex flex-col size-full min-h-0 items-center justify-center overflow-hidden relative p-2">
    <Shader class="absolute inset-0 h-full w-full" disable-telemetry>
      <FilmGrain :strength="0.5" :bias="0.4" :displacement="0.3" :animated="true">
        <Swirl color-a="oklch(0.995 0.05 85)" color-b="oklch(0.925 0.2 100)" color-space="oklch" :speed="1"
          :detail="1.5" :blend="30" />
      </FilmGrain>
    </Shader>
    <div
      class="relative z-1 flex flex-col p-[0.5em] items-center justify-center bg-white rounded-3xl w-full max-w-[25em]">
      <div
        class="flex w-full flex-col items-stretch justify-center gap-[1.15em] rounded-3xl text-[clamp(0.75em,1vw,0.875em)] p-[1em] text-foreground  flex-1">
        <BentoMessageRow author="Jordan" time="9:14 AM" avatar-enabled avatar-src="/images/avatars/person-avatar-003.png">
          <span :class="cn(
            'relative px-1 font-medium text-blue-400',
            'before:content-[\'\'] before:absolute before:left-[0.05em] before:right-1 before:top-[-0.1em] before:bottom-[-0.2em]',
            'before:z-0 before:rounded-sm before:bg-blue-400 before:opacity-20'
          )">
            @Remi
          </span>can you prep the renewal brief for Northstar before tomorrow?
        </BentoMessageRow>
        <BentoMessageRow author="Evan" time="9:15 AM" avatar-enabled avatar-src="/images/avatars/person-avatar-004.png">
          Include the migration concerns from last week and the new seat count from finance.
        </BentoMessageRow>
        <BentoMessageRow author="Remi" time="9:15 AM" avatar-enabled avatar-src="/images/avatars/remi-black.jpg">
          On it. I’ll pull the notes, update the numbers, and post the brief here when it’s ready.
        </BentoMessageRow>
      </div>
    </div>
  </div>
</template>
