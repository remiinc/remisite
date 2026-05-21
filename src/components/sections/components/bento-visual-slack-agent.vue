<script setup>
import {
  PhCloudArrowDown,
  PhDotsThreeVertical,
  PhInfo,
  PhShareFat,
} from '@phosphor-icons/vue'
import { cn } from '../../../lib/cn'
import { BentoMessageRow } from '../../global/visuals-library.vue'
import IconAcrobatPdf from '../../misc/icon-acrobat-pdf.vue'
</script>

<template>
    <div
      class="w-full flex flex-col gap-[1.5em] p-[3em] bg-background rounded-tl-3xl"
    >
      <BentoMessageRow author="Lisa" time="4:21 PM" avatar-enabled avatar-src="/images/avatars/person-avatar-001.png">
        Thanks
        <span :class="cn(
          'relative px-1 font-medium text-blue-400',
          'before:content-[\'\'] before:absolute before:left-[0.05em] before:right-1 before:top-[-0.1em] before:bottom-[-0.2em]',
          'before:z-0 before:rounded-sm before:bg-blue-400 before:opacity-20'
        )">
          Remi
        </span>
        can you turn that into a shareable brief too?
      </BentoMessageRow>
      <BentoMessageRow author="Mark" time="4:22 PM" avatar-enabled avatar-src="/images/avatars/person-avatar-002.png">
        Make it a PDF please!
      </BentoMessageRow>
      <BentoMessageRow author="Remi" time="4:22 PM" avatar-enabled avatar-src="/images/avatars/remi-black.jpg">
        <div class="flex flex-col gap-[0.25em]">
          <span>You got it!</span>
          <span
            class="relative p-[0.25em] rounded-[0.75em] border border-foreground/10 flex items-center justify-center gap-[0.25em]"
          >
            <IconAcrobatPdf class-name="size-[2.75em] shrink-0" />
            <span class="flex flex-col gap-[0.5em] pl-[0.25em] pr-[1em]">
              <span class="text-[0.925em] text-foreground leading-none">competitive-analysis.pdf</span>
              <span class="text-[0.75em] text-foreground/50 leading-none">
                View <span class="font-medium">PDF</span> in Slack
              </span>
            </span>
            <span class="hidden md:flex items-center justify-center h-full pr-[0.4em]">
              <span :class="cn(
                'flex gap-[0.125em] p-[0.125em] rounded-[0.375em] border border-foreground/10 shadow-[0_1px_1px_0_color-mix(in_oklch,var(--color-foreground)_5%,transparent)]',
                '[&_div]:p-[0.25em] [&_div]:rounded-[0.25em] [&_div]:bg-foreground/0 [&_div]:hover:bg-foreground/5 [&_div]:transition-all'
              )">
                <div>
                  <PhCloudArrowDown />
                </div>
                <div>
                  <PhShareFat />
                </div>
                <div>
                  <PhInfo />
                </div>
                <div>
                  <PhDotsThreeVertical />
                </div>
              </span>
            </span>
          </span>
        </div>
      </BentoMessageRow>
    </div>
</template>
