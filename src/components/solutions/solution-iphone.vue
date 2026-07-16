<script setup>
import {
  PhCaretLeft,
  PhCaretRight,
  PhMagnifyingGlass,
  PhMicrophone,
  PhPlus,
} from '@phosphor-icons/vue'
import SiteIcon from '../global/site-icon.vue'

defineProps({
  messages: {
    type: Array,
    default: () => [],
  },
  time: {
    type: String,
    default: '09:42',
  },
})

const quickActions = {
  notes: {
    label: 'Add to Notes',
    iconSrc: '/images/app-logos/ios-notes-icon.png',
  },
  reminders: {
    label: 'Add to Reminders',
    iconSrc: '/images/app-logos/ios-reminders-icon.png',
  },
}
</script>

<template>
  <div
    class="relative w-full -mb-0.5 flex flex-col items-center justify-start [--screen-radius:3.75em] [--bezel-inset:0.5em] [--bezel-radius:calc(var(--screen-radius)+var(--bezel-inset))] [--frame-inset:0.35em] [--frame-radius:calc(var(--screen-radius)+var(--bezel-inset)+var(--frame-inset))]"
    data-solution-iphone>

    <div
      class="relative w-[26em] mx-auto rounded-t-(--frame-radius) bg-neutral-100 px-(--frame-inset) pt-(--frame-inset) text-[clamp(0.625em,0.125em+2.2222vw,1.125em)] shadow-[0_0_var(--frame-inset)_0_inset_rgba(0,0,0,0.8)] md:text-[clamp(0.925em,1.925vw,1em)]"
      data-iphone-frame>

      <div
        class="absolute top-0 left-0 h-full w-full *:bg-linear-[180deg,var(--color-neutral-400)_0%,var(--color-neutral-100)_20%,var(--color-neutral-400)_70%,var(--color-neutral-200)_90%,var(--color-neutral-400)_100%] *:shadow-[0.125em_0_0.15em_-0.05em_inset_rgba(255,255,255,0.75),-0.05em_0_0.1em_-0.05em_inset_rgba(0,0,0,05)]"
        data-iphone-buttons>
        <div class="absolute top-[20%] left-0 h-[4%] w-[0.25em] -translate-x-full" />
        <div class="absolute top-[30%] left-0 h-[8%] w-[0.25em] -translate-x-full" />
        <div class="absolute top-[40%] left-0 h-[8%] w-[0.25em] -translate-x-full" />
        <div class="absolute top-[32%] right-0 h-[12%] w-[0.25em] translate-x-full rotate-180" />
      </div>

      <div
        class="absolute top-(--frame-radius) left-0 z-0 h-[calc(var(--frame-inset)*1.5)] w-full bg-linear-to-b from-neutral-900/20 to-neutral-900/10" />
      <div
        class="absolute bottom-(--frame-radius) left-0 z-0 h-[calc(var(--frame-inset)*1.5)] w-full bg-linear-to-b from-neutral-900/20 to-neutral-900/10" />

      <div
        class="relative z-1 w-full rounded-t-(--bezel-radius) bg-neutral-900 px-(--bezel-inset) pt-(--bezel-inset) shadow-[0_0_calc(var(--frame-inset)/4)_0_rgba(0,0,0,1)]"
        data-iphone-bezel>
        <div
          class="relative z-1 min-h-[20em] pb-12 w-full overflow-hidden rounded-t-(--screen-radius) bg-white shadow-[0_0_0.125em_0_inset_rgba(0,0,0,0.5)]"
          data-iphone-screen-wrap>
          <div class="relative flex h-full w-full flex-col" data-iphone-screen>
            <div class="grid h-auto w-full grid-cols-3 p-[0.6em]" data-iphone-screen-header>
              <div class="flex h-full w-full items-center justify-center">
                <div class="text-[0.9em] font-medium text-neutral-900">{{ time }}</div>
              </div>

              <div
                class="flex h-[2em] w-full shrink-0 items-center justify-end self-center justify-self-center rounded-full bg-neutral-900 p-[5%]">
                <div class="flex h-full aspect-square items-center justify-center rounded-full bg-white/5">
                  <div
                    class="flex size-2/3 items-center justify-center rounded-full bg-linear-to-b from-blue-500/10 to-blue-500/0 shadow-[0_0_0.25em_0_inset_color-mix(in_srgb,var(--color-blue-500)_20%,transparent)]">
                    <div
                      class="flex size-2/3 items-center justify-center rounded-full bg-linear-to-t from-blue-500/10 to-neutral-900 shadow-[0_0_0.25em_0_inset_color-mix(in_srgb,var(--color-blue-500)_20%,transparent)]" />
                  </div>
                </div>
              </div>
              <div />
            </div>

            <div class="grid w-full grid-cols-3 px-[1em] py-[0.5em]" data-message-thread-header>
              <div
                class="flex items-center justify-center gap-[0.25em] self-start justify-self-start rounded-full bg-neutral-500/10 py-[0.5em] pr-[0.5em] pl-[0.5em] shadow-[0_0_2em_0_rgba(0,0,0,0.15),1px_1px_1px_0_inset_rgba(255,255,255,0.8),-1px_-1px_1px_0_inset_rgba(255,255,255,0.8)] backdrop-blur-md">
                <PhCaretLeft class="size-[1em] text-neutral-900" weight="bold" aria-hidden="true" />
                <span
                  class="rounded-full bg-neutral-900 px-[0.5em] py-[0.25em] text-[0.75em] font-medium leading-none text-white">12</span>
              </div>

              <div class="flex flex-col items-center justify-center">
                <div
                  class="relative z-2 aspect-square w-[4em] overflow-hidden rounded-full bg-linear-to-b from-neutral-900 to-neutral-800 shadow-[0_0.15em_0.2em_0_rgba(0,0,0,0.1)]"
                  data-message-thread-header-avatar>
                  <SiteIcon class="absolute inset-0 m-auto size-[2em] text-white" />
                </div>
                <div
                  class="relative z-1 mt-[-0.2em] flex items-center gap-[0.25em] rounded-full bg-neutral-500/10 py-[0.1em] pr-[0.4em] pl-[0.6em] text-[1em] font-medium text-neutral-900 shadow-[0_0_2em_0_rgba(0,0,0,0.15),1px_1px_1px_0_inset_rgba(255,255,255,0.8),-1px_-1px_1px_0_inset_rgba(255,255,255,0.8)] backdrop-blur-md"
                  data-message-thread-header-name>
                  <span class="m-0 p-0 text-[1em] font-semibold">Remi</span>
                  <PhCaretRight class="size-[0.75em] translate-y-[0.05em] text-neutral-900/40" weight="bold"
                    aria-hidden="true" />
                </div>
              </div>
              <div />
            </div>

            <ol
              class="flex w-full flex-1 list-none flex-col overflow-hidden py-[1em] mask-y-from-[calc(100%-1em)] mask-y-to-100%"
              aria-label="Example conversation with Remi" data-message-thread>
              <li
                class="flex w-full items-center justify-center gap-[0.25em] px-[1em] text-[0.675em] text-neutral-900/40"
                data-message-date>
                <span class="font-medium">Today</span>
                <span class="font-normal">{{ time }}</span>
              </li>

              <li v-for="(message, index) in messages" :key="`${message.variant}-${index}-${message.text}`"
                class="mt-[0.65em] flex w-full flex-col px-[1em]" :data-message-bubble="message.variant"
                :data-message-side="message.variant">
                <div class="flex w-full" :class="message.variant === 'incoming' ? 'justify-start' : 'justify-end'">
                  <div
                    class="relative inline-block max-w-[78%] rounded-[1.25em] px-[0.875em] text-[0.9em] leading-tight tracking-tight before:absolute before:bottom-0 before:z-0 before:h-[1.25em] before:w-[1.25em] before:content-[''] after:absolute after:bottom-0 after:z-1 after:h-[1.25em] after:w-[0.7em] after:bg-white after:content-['']"
                    :class="message.variant === 'incoming'
                      ? 'mr-[25%] bg-neutral-200 py-[0.75em] text-neutral-900 before:left-[-0.45em] before:rounded-br-[0.95em] before:bg-neutral-200 after:left-[-0.7em] after:rounded-br-[0.7em]'
                      : 'ml-[25%] bg-blue-400 bg-fixed py-[0.5em] text-white before:right-[-0.5em] before:rounded-bl-[0.95em] before:bg-blue-400 before:bg-fixed after:right-[-0.7em] after:rounded-bl-[0.7em]'">
                    {{ message.text }}
                  </div>
                </div>

                <div v-if="message.variant === 'incoming' && message.quickActions.length"
                  class="mt-[0.5em] flex flex-wrap items-center gap-[0.35em] pl-[0.25em]">
                  <span v-for="action in message.quickActions" :key="action"
                    class="inline-flex max-w-full items-center gap-[0.35em] rounded-full bg-neutral-200 py-[0.35em] pr-[0.75em] pl-[0.45em] text-[0.75em] font-medium leading-none tracking-tight text-neutral-800">
                    <img :src="quickActions[action].iconSrc" alt="" draggable="false"
                      class="size-[1.25em] shrink-0 rounded-[0.25em]" aria-hidden="true">
                    <span class="truncate">{{ quickActions[action].label }}</span>
                  </span>
                </div>

                <div v-if="message.documentPreview" class="mt-[0.75em] flex w-full"
                  :class="message.variant === 'incoming' ? 'justify-start' : 'justify-end'" role="img"
                  :aria-label="message.documentPreview.label" data-document-preview>
                  <div
                    class="relative flex aspect-3/4 w-[5em] items-start justify-start rounded-[0.625em] bg-white p-[0.5em] shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_0.75em_1.8em_-1.4em_rgba(0,0,0,0.45)]">
                    <div class="flex w-full flex-col items-start justify-start gap-[0.125em]">
                      <div class="h-[0.2em] w-1/2 rounded-full bg-foreground/15" />
                      <div class="h-[0.2em] w-full rounded-full bg-foreground/10" />
                      <div class="h-[0.2em] w-full rounded-full bg-foreground/10" />
                      <div class="h-[0.2em] w-3/4 rounded-full bg-foreground/10" />
                    </div>
                    <PhMagnifyingGlass
                      class="absolute top-1/2 left-1/2 size-[2em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/40 p-[0.5em] text-background"
                      weight="bold" aria-hidden="true" />
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
