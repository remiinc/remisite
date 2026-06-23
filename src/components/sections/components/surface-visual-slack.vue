<script setup>
import { BentoMessageRow } from '../../global/visuals-library.vue'
import { cn } from '../../../lib/cn'
</script>

<template>
  <div class="w-full aspect-4/3 md:aspect-square rounded-[2em] bg-muted flex items-center justify-center overflow-hidden p-[2em]">
    <div class="relative z-1 flex flex-col p-[0.5em] items-center justify-center bg-background rounded-3xl w-full">
      <div class="flex w-full flex-col items-stretch justify-center gap-[1.15em] rounded-3xl text-[0.875em] p-[1em] text-foreground flex-1">
        <BentoMessageRow author="Jordan" time="9:14 AM" avatar-enabled avatar-src="/images/avatars/person-avatar-003.png">
          <span :class="cn(
            'relative px-1 font-medium text-blue-400',
            'before:content-[\'\'] before:absolute before:left-[0.05em] before:right-1 before:top-[-0.1em] before:bottom-[-0.2em]',
            'before:z-0 before:rounded-sm before:bg-blue-400 before:opacity-20'
          )">
            @Remi
          </span>can you prep the renewal brief for Northstar before tomorrow?
        </BentoMessageRow>
        <BentoMessageRow author="Evan" time="9:15 AM" avatar-enabled avatar-src="/images/avatars/person-avatar-004.png" class="flex md:hidden lg:flex">
          Include the migration concerns from last week and the new seat count from finance.
        </BentoMessageRow>
        <BentoMessageRow author="Remi" time="9:15 AM" avatar-enabled avatar-src="/images/avatars/remi-black.jpg">
          On it. I’ll pull the notes, update the numbers, and post the brief here when it’s ready.
        </BentoMessageRow>
      </div>
    </div>
  </div>
</template>
