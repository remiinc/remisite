<script setup>
import { PhCaretLeft, PhMicrophone, PhPlus } from '@phosphor-icons/vue'
import { computed } from 'vue'
import SiteIcon from './site-icon.vue'

const props = defineProps({
  fluid: {
    type: Boolean,
    default: false,
  },
  fontSize: {
    type: Number,
    default: 1,
    validator: value => Number.isFinite(value) && value > 0,
  },
  messages: {
    type: Array,
    default: () => [{
      direction: 'incoming',
      text: "Hi, I'm Remi. Text me anything you need off your plate — I'll handle the busywork so you can keep moving. 👋",
    }],
    validator: messages => Array.isArray(messages) && messages.every(message => (
      ['incoming', 'outgoing'].includes(message?.direction)
      && typeof message?.text === 'string'
    )),
  },
  showAvatarRow: {
    type: Boolean,
    default: true,
  },
  showBackButton: {
    type: Boolean,
    default: true,
  },
  showInputBar: {
    type: Boolean,
    default: true,
  },
  theme: {
    type: String,
    default: 'light',
    validator: value => ['light', 'dark'].includes(value),
  },
})

const screenFontSize = computed(() => {
  const multiplier = props.fontSize

  return `clamp(${0.5 * multiplier}rem, ${4 * multiplier}cqw, ${multiplier}rem)`
})
</script>

<template>
  <div class="static-iphone relative z-1 mx-auto w-full @container"
    :class="{
      'static-iphone--fluid': fluid,
      'static-iphone--dark': theme === 'dark',
    }" :style="{ '--iphone-screen-font-size': screenFontSize }" data-static-iphone>
    <div
      class="w-full [--screen-radius:3.75em] [--bezel-inset:0.5em] [--bezel-radius:calc(var(--screen-radius)+var(--bezel-inset))] [--frame-inset:0.35em] [--frame-radius:calc(var(--screen-radius)+var(--bezel-inset)+var(--frame-inset))]">
      <div class="mx-auto flex w-full items-center justify-center">
        <div
          class="static-iphone__frame relative w-full rounded-(--frame-radius) bg-(--iphone-frame-background) p-(--frame-inset) shadow-[0_0_var(--frame-inset)_0_inset_rgba(0,0,0,0.8)]"
          data-iphone-frame>
          <div
            class="absolute left-0 top-0 h-full w-full"
            data-iphone-buttons>
            <div class="absolute left-0 top-[20%] h-[4%] w-[0.25em] -translate-x-full"></div>
            <div class="absolute left-0 top-[30%] h-[8%] w-[0.25em] -translate-x-full"></div>
            <div class="absolute left-0 top-[40%] h-[8%] w-[0.25em] -translate-x-full"></div>
            <div class="absolute right-0 top-[32%] h-[12%] w-[0.25em] translate-x-full rotate-180"></div>
          </div>
          <div
            class="absolute left-0 top-(--frame-radius) z-0 h-[calc(var(--frame-inset)*1.5)] w-full"
            data-iphone-frame-band>
          </div>
          <div
            class="absolute bottom-(--frame-radius) left-0 z-0 h-[calc(var(--frame-inset)*1.5)] w-full"
            data-iphone-frame-band>
          </div>

          <div
            class="relative z-1 w-full rounded-(--bezel-radius) bg-(--iphone-bezel-background) p-(--bezel-inset) shadow-[0_0_calc(var(--frame-inset)/4)_0_rgba(0,0,0,1)]"
            data-iphone-bezel>
            <div
              class="relative z-1 aspect-1/2 w-full overflow-hidden rounded-(--screen-radius) bg-(--iphone-background) shadow-[0_0_0.125em_0_inset_rgba(0,0,0,0.5)]"
              data-iphone-screen-wrap>
              <div class="relative flex h-full w-full flex-col" data-iphone-screen>
                <div class="grid h-auto w-full grid-cols-3 p-[0.6em]" data-iphone-screen-header>
                  <div class="flex h-full w-full items-center justify-center">
                    <div class="text-[0.9em] font-medium text-(--iphone-foreground)">09:42</div>
                  </div>
                  <div
                    class="flex h-[2em] w-full shrink-0 items-center justify-end self-center justify-self-center rounded-full bg-(--iphone-notch-background) p-[5%]">
                    <div class="flex h-full aspect-square items-center justify-center rounded-full bg-white/5">
                      <div
                        class="flex size-2/3 items-center justify-center rounded-full bg-linear-to-b from-blue-500/10 to-blue-500/0 shadow-[0_0_0.25em_0_inset_color-mix(in_srgb,var(--color-blue-500)_20%,transparent)]">
                        <div
                          class="flex size-2/3 items-center justify-center rounded-full bg-linear-to-t from-blue-500/10 to-(--iphone-notch-background) shadow-[0_0_0.25em_0_inset_color-mix(in_srgb,var(--color-blue-500)_20%,transparent)]">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>

                <div v-if="showBackButton || showAvatarRow" class="grid w-full grid-cols-3 px-[1em] py-[0.5em]"
                  data-message-thread-header>
                  <div v-if="showBackButton"
                    class="flex items-center gap-[0.25em] self-start justify-self-start rounded-full bg-(--iphone-control-background) py-[0.5em] pl-[0.5em] pr-[0.5em] shadow-(--iphone-control-shadow) backdrop-blur-md">
                    <PhCaretLeft class="size-[1em] text-(--iphone-foreground)" weight="bold" aria-hidden="true" />
                  </div>
                  <div v-else></div>
                  <div v-if="showAvatarRow" class="flex flex-col items-center justify-center">
                    <div
                      class="relative z-2 flex aspect-square w-[3.5em] items-center justify-center overflow-hidden rounded-full bg-(--iphone-foreground) shadow-[0_0.15em_0.2em_0_rgba(0,0,0,0.1)]"
                      data-message-thread-header-avatar>
                      <SiteIcon class="w-1/2 text-(--iphone-background)" />
                    </div>
                    <div
                      class="relative z-1 mt-[-0.125em] flex items-center justify-center gap-[0.25em] rounded-full bg-(--iphone-soft-control-background) px-[0.625em] py-[0.325em] text-[1em] font-medium leading-none tracking-tight text-(--iphone-foreground) shadow-(--iphone-control-shadow) backdrop-blur-md">
                      <span>Remi</span>
                    </div>
                  </div>
                  <div></div>
                </div>

                <ol
                  class="flex w-full flex-1 list-none flex-col overflow-hidden py-[1em] mask-y-from-[calc(100%-1em)] mask-y-to-100%"
                  aria-label="Example conversation with Remi" data-message-thread>
                  <li class="mb-[0.8em] flex w-full justify-center px-[1em]">
                    <p class="text-[0.75em] font-medium leading-none tracking-tight text-(--iphone-muted-foreground)">Today 09:42</p>
                  </li>

                  <li v-for="(message, index) in messages" :key="message.id ?? `${message.direction}-${index}-${message.text}`"
                    class="mt-[0.65em] flex w-full flex-col px-[1em]" :data-message-direction="message.direction">
                    <div class="flex w-full"
                      :class="message.direction === 'incoming' ? 'justify-start' : 'justify-end'">
                      <div
                        class="relative inline-block max-w-[78%] whitespace-pre-line rounded-[1.25em] px-[0.875em] text-[0.9em] leading-tight tracking-tight before:absolute before:bottom-0 before:z-0 before:h-[1.25em] before:w-[1.25em] before:content-[''] after:absolute after:bottom-0 after:z-1 after:h-[1.25em] after:w-[0.7em] after:bg-(--iphone-background) after:content-['']"
                        :class="message.direction === 'incoming'
                          ? 'mr-[25%] bg-(--iphone-message-background) py-[0.75em] text-(--iphone-foreground) before:left-[-0.45em] before:rounded-br-[0.95em] before:bg-(--iphone-message-background) after:left-[-0.7em] after:rounded-br-[0.7em]'
                          : 'ml-[25%] bg-blue-400 py-[0.5em] text-white before:right-[-0.5em] before:rounded-bl-[0.95em] before:bg-blue-400 after:right-[-0.7em] after:rounded-bl-[0.7em]'">
                        {{ message.text }}
                      </div>
                    </div>
                  </li>
                </ol>

                <div v-if="showInputBar" class="flex w-full items-stretch gap-[0.5em] px-[1.5em] pb-[2em]"
                  data-input-bar>
                  <div
                    class="flex size-[2.5em] items-center justify-center rounded-full bg-(--iphone-control-background) shadow-(--iphone-control-shadow) backdrop-blur-md">
                    <PhPlus class="size-[1em] text-(--iphone-foreground)" weight="bold" aria-hidden="true" />
                  </div>
                  <div
                    class="flex flex-1 items-center justify-center rounded-full bg-(--iphone-control-background) py-[0.5em] pl-[1.25em] pr-[1em] text-[0.875em] font-normal tracking-tight text-(--iphone-muted-foreground) shadow-(--iphone-control-shadow) backdrop-blur-md">
                    <span class="flex-1">iMessage</span>
                    <PhMicrophone class="size-[1.25em] text-(--iphone-muted-foreground)" weight="regular" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.static-iphone {
  --iphone-background: var(--color-background);
  --iphone-foreground: var(--color-foreground);
  --iphone-frame-background: color-mix(in srgb, var(--color-background) 94%, var(--color-foreground));
  --iphone-frame-edge: linear-gradient(180deg, color-mix(in srgb, var(--color-background) 72%, var(--color-foreground)) 0%, color-mix(in srgb, var(--color-background) 96%, var(--color-foreground)) 20%, color-mix(in srgb, var(--color-background) 74%, var(--color-foreground)) 70%, color-mix(in srgb, var(--color-background) 88%, var(--color-foreground)) 90%, color-mix(in srgb, var(--color-background) 72%, var(--color-foreground)) 100%);
  --iphone-button-shadow: 0.125em 0 0.15em -0.05em inset rgba(255, 255, 255, 0.75), -0.05em 0 0.1em -0.05em inset rgba(0, 0, 0, 0.5);
  --iphone-frame-band: linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 20%, transparent), color-mix(in srgb, var(--color-foreground) 10%, transparent));
  --iphone-bezel-background: var(--color-foreground);
  --iphone-notch-background: var(--color-foreground);
  --iphone-muted-foreground: color-mix(in srgb, var(--iphone-foreground) 40%, transparent);
  --iphone-control-background: color-mix(in srgb, var(--iphone-foreground) 10%, transparent);
  --iphone-control-shadow: 0 0 2em 0 rgba(0,0,0,0.15), 1px 1px 1px 0 inset rgba(255,255,255,0.8), -1px -1px 1px 0 inset rgba(255,255,255,0.8);
  --iphone-soft-control-background: color-mix(in srgb, var(--iphone-foreground) 5%, transparent);
  --iphone-message-background: color-mix(in srgb, var(--iphone-foreground) 12%, var(--iphone-background));
}

.static-iphone--dark {
  --iphone-background: color-mix(in srgb, var(--color-background) 2%, var(--color-foreground));
  --iphone-foreground: var(--color-background);
  --iphone-frame-background: color-mix(in srgb, var(--color-background) 10%, var(--color-foreground));
  --iphone-frame-edge: linear-gradient(180deg, color-mix(in srgb, var(--iphone-frame-background) 92%, black) 0%, color-mix(in srgb, var(--iphone-frame-background) 92%, var(--iphone-background)) 20%, color-mix(in srgb, var(--iphone-frame-background) 88%, black) 70%, var(--iphone-frame-background) 90%, color-mix(in srgb, var(--iphone-frame-background) 92%, black) 100%);
  --iphone-button-shadow: 0.08em 0 0.12em -0.04em inset color-mix(in srgb, var(--color-background) 18%, transparent), -0.05em 0 0.1em -0.05em inset rgba(0, 0, 0, 0.6);
  --iphone-frame-band: linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 82%, black), color-mix(in srgb, var(--color-foreground) 92%, black));
  --iphone-bezel-background: color-mix(in srgb, var(--color-foreground) 90%, black);
  --iphone-notch-background: color-mix(in srgb, var(--color-foreground) 82%, black);
  --iphone-control-shadow: 0 0 0.25em 0 rgba(0,0,0,0.1), 1px 1px 1px 0 inset rgba(255,255,255,0.2), -1px -1px 1px 0 inset rgba(255,255,255,0.2);
}

.static-iphone [data-iphone-buttons] > div {
  background: var(--iphone-frame-edge);
  box-shadow: var(--iphone-button-shadow);
}

.static-iphone [data-iphone-frame-band] {
  background: var(--iphone-frame-band);
}

.static-iphone__frame {
  font-size: clamp(0.5rem, 4cqw, 1rem);
}

.static-iphone [data-iphone-screen] {
  font-size: var(--iphone-screen-font-size);
}

.static-iphone--fluid,
.static-iphone--fluid > div,
.static-iphone--fluid > div > div,
.static-iphone--fluid [data-iphone-frame],
.static-iphone--fluid [data-iphone-bezel],
.static-iphone--fluid [data-iphone-screen-wrap] {
  height: 100%;
}

.static-iphone--fluid [data-iphone-screen-wrap] {
  aspect-ratio: auto;
}
</style>
