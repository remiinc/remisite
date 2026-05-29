<script setup>
import { Shader, FilmGrain, Swirl } from 'shaders/vue'
</script>

<template>
  <div class="flex size-full min-h-0 items-center justify-center overflow-hidden pt-8 relative">
    <Shader class="absolute inset-0 h-full w-full" disable-telemetry>
      <FilmGrain :strength="0.5" :bias="0.4" :displacement="0.3" :animated="true">
        <Swirl color-a="oklch(0.98 0.024 259.597)" color-b="oklch(0.858 0.07 259.597)" color-space="oklch" :speed="0.5"
          :detail="1.35" :blend="50" />
      </FilmGrain>
    </Shader>
    <div
      class="phone relative w-[25em] max-w-full shrink-0 h-full min-h-0 flex flex-col items-center justify-start [--thread-background:var(--color-black)] [--radius:4.5em] text-[clamp(0.75em,1vw,0.875em)]">
      <div
        class="absolute w-full z-0 aspect-1/2 [--padding-2:0.25em] p-(--padding-2) rounded-[calc(var(--radius)+var(--padding-2))] bg-neutral-700 shadow-[0_0_0_0.125em_color-mix(in_oklch,var(--color-black)_5%,transparent)_inset]">
        <div
          class="flex flex-col [--padding-1:0.055em] p-(--padding-1) rounded-[calc(var(--radius)+var(--padding-1))] bg-neutral-600 h-full">
          <div
            class="bg-(--thread-background) rounded-(--radius) shadow-[0_0_1px_2px_color-mix(in_oklch,var(--color-black)_40%,transparent)_inset,0_0_10px_0_color-mix(in_oklch,var(--color-white)_60%,transparent)_inset] h-full">
          </div>
        </div>
      </div>
      <div class="w-full relative z-1 flex flex-col h-full">
        <div class="w-full flex items-center justify-center pt-[1.5em]">
          <div class="w-[8em] rounded-full bg-neutral-900 flex p-[0.5em]">
            <div class="flex items-center justify-end flex-1">
              <div
                class="size-[0.75em] rounded-full bg-neutral-50/10 shadow-[0_0_0_0.25em_color-mix(in_oklch,var(--color-white)_5%,transparent)]">
              </div>
            </div>
          </div>
        </div>
        <div class="overflow-y-auto scrollbar-none flex-1 h-full mask-y-from-90% mask-y-to-100% min-h-0">
          <div
            class="imessage-thread flex w-full flex-col gap-[0.125em] rounded-[1.75em] text-[clamp(0.875em,1.1vw,1em)] leading-[1.25em] tracking-normal py-[3em] px-[2em]">
            <p class="text-center text-[0.75em] text-neutral-300/50"><span class="font-medium">Today</span> 14:40</p>
            <p class="message-bubble from-them">
              Maya from Northstar just booked Thursday’s migration call. 📅
            </p>
            <p class="message-bubble from-them no-tail">
              It’s mostly HubSpot cleanup, SSO, and import mapping. Christian has the freshest context. <br /><br /> Do you want me to route it to him?
            </p>
            <p class="message-bubble from-me my-[0.75em]!">
              Yeah, route it to him and keep me optional.
            </p>
            <p class="message-bubble from-them">
              On it. I moved the invite, added Christian, and sent Maya a quick note. ✅
            </p>
            <p class="message-bubble from-them no-tail">
              I also pulled the last migration doc, open risks, and their seat-count change into the prep notes. 📎
            </p>
            <p class="message-bubble from-them no-tail">
              One flag: Maya asked about API limits last time. Christian already has the answer from Catalyst. ⚠️
            </p>
            <p class="message-bubble from-them no-tail">
              He has the full brief now. 📝
            </p>
            <p class="message-bubble from-them no-tail">
              I’ll bring you back in only if they need pricing approval. 💸
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-bubble {
  border-radius: 1.15em;
  line-height: 1.25;
  margin: 0.25em 0;
  max-width: 78%;
  padding: 0.5em 0.875em;
  position: relative;
  width: fit-content;
  word-wrap: break-word;
}

.message-bubble::before,
.message-bubble::after {
  bottom: -0.1em;
  content: '';
  height: 1em;
  position: absolute;
}

.from-me {
  align-self: flex-end;
  background-color: #248bf5;
  color: #fff;
}

.from-me::before {
  border-bottom-left-radius: 0.8em 0.7em;
  border-right: 1em solid #248bf5;
  right: -0.35em;
  transform: translate(0, -0.1em);
}

.from-me::after {
  background-color: var(--thread-background);
  border-bottom-left-radius: 0.5em;
  right: -40px;
  transform: translate(-30px, -2px);
  width: 10px;
}

.from-them {
  align-self: flex-start;
  background-color: color-mix(in oklch, var(--color-white) 30%, var(--thread-background));
  color: #fff;
}

.from-them::before {
  border-bottom-right-radius: 0.8em 0.7em;
  border-left: 1em solid color-mix(in oklch, var(--color-white) 30%, var(--thread-background));
  left: -0.35em;
  transform: translate(0, -0.1em);
}

.from-them::after {
  background-color: var(--thread-background);
  border-bottom-right-radius: 0.5em;
  left: 20px;
  transform: translate(-30px, -2px);
  width: 10px;
}

.no-tail::before {
  display: none;
}
</style>
