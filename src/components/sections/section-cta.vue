<script setup>
import { PhCaretLeft, PhMicrophone, PhPlus } from '@phosphor-icons/vue'
import Button from '../global/button.vue'
import SiteIcon from '../global/site-icon.vue'
</script>

<template>
  <section id="get-started" class="scroll-mt-24 px-6 py-24" data-section-cta>
    <div
      class="relative mx-auto grid w-full max-w-(--content-width) overflow-hidden rounded-[2em] bg-foreground text-background md:grid-cols-2 lg:grid-cols-[3fr_2fr] lg:items-center">
      <img src="/images/backgrounds/cta-background.jpg" alt="" width="1600" height="1067" loading="lazy"
        decoding="async" fetchpriority="low" class="absolute inset-0 size-full object-cover" aria-hidden="true">
      <div class="relative z-1 flex pt-24 pb-8 md:py-12 px-8 lg:px-12 flex-col items-center justify-center gap-8 text-center">
        <h2 class="inline-block text-5xl lg:text-6xl font-normal tracking-tight text-balance max-w-[20ch]">
          Let Remi keep the day moving.
        </h2>
        <div
          class="relative z-1 flex flex-wrap justify-center md:justify-start gap-3">
          <Button href="/start" variant="white" size="lg"
            data-marketing-cta="closing_text_remi" data-marketing-destination="linq">
            <span class="flex items-center gap-2.5">
              <img src="/images/app-logos/ios-messages-icon.svg" alt="" class="size-5 shrink-0" aria-hidden="true">
              <span>Text Remi</span>
            </span>
          </Button>
        </div>
      </div>

      <div class="w-full flex flex-col items-center justify-start overflow-hidden px-8 pt-12 max-h-[32em]">
        <div class="relative z-1 mx-auto w-full max-w-[24em]" data-static-iphone>
          <div
            class="w-full [--screen-radius:3.75em] [--bezel-inset:0.5em] [--bezel-radius:calc(var(--screen-radius)+var(--bezel-inset))] [--frame-inset:0.35em] [--frame-radius:calc(var(--screen-radius)+var(--bezel-inset)+var(--frame-inset))]">
            <div class="mx-auto flex w-full items-center justify-center">
              <div
                class="relative w-full bg-neutral-100 p-(--frame-inset) rounded-(--frame-radius) shadow-[0_0_var(--frame-inset)_0_inset_rgba(0,0,0,0.8)] sm:text-[clamp(0.875em,1.5vw,0.925em)] md:text-[clamp(0.75em,1.75vw,1em)]"
                data-iphone-frame>
                <div
                  class="absolute left-0 top-0 h-full w-full *:bg-linear-[180deg,var(--color-neutral-400)_0%,var(--color-neutral-100)_20%,var(--color-neutral-400)_70%,var(--color-neutral-200)_90%,var(--color-neutral-400)_100%] *:shadow-[0.125em_0_0.15em_-0.05em_inset_rgba(255,255,255,0.75),-0.05em_0_0.1em_-0.05em_inset_rgba(0,0,0,05)]"
                  data-iphone-buttons>
                  <div class="absolute left-0 top-[20%] h-[4%] w-[0.25em] -translate-x-full"></div>
                  <div class="absolute left-0 top-[30%] h-[8%] w-[0.25em] -translate-x-full"></div>
                  <div class="absolute left-0 top-[40%] h-[8%] w-[0.25em] -translate-x-full"></div>
                  <div class="absolute right-0 top-[32%] h-[12%] w-[0.25em] translate-x-full rotate-180"></div>
                </div>
                <div
                  class="absolute left-0 top-(--frame-radius) z-0 h-[calc(var(--frame-inset)*1.5)] w-full bg-linear-to-b from-neutral-900/20 to-neutral-900/10">
                </div>
                <div
                  class="absolute bottom-(--frame-radius) left-0 z-0 h-[calc(var(--frame-inset)*1.5)] w-full bg-linear-to-b from-neutral-900/20 to-neutral-900/10">
                </div>

                <div
                  class="relative z-1 w-full rounded-(--bezel-radius) bg-neutral-900 p-(--bezel-inset) shadow-[0_0_calc(var(--frame-inset)/4)_0_rgba(0,0,0,1)]"
                  data-iphone-bezel>
                  <div
                    class="relative z-1 aspect-1/2 w-full overflow-hidden rounded-(--screen-radius) bg-white shadow-[0_0_0.125em_0_inset_rgba(0,0,0,0.5)]"
                    data-iphone-screen-wrap>
                    <div class="relative flex h-full w-full flex-col" data-iphone-screen>
                      <div class="grid h-auto w-full grid-cols-3 p-[0.6em]" data-iphone-screen-header>
                        <div class="flex h-full w-full items-center justify-center">
                          <div class="text-[0.9em] font-medium text-neutral-900">09:42</div>
                        </div>
                        <div
                          class="flex h-[2em] w-full shrink-0 items-center justify-end self-center justify-self-center rounded-full bg-neutral-900 p-[5%]">
                          <div class="flex h-full aspect-square items-center justify-center rounded-full bg-white/5">
                            <div
                              class="flex size-2/3 items-center justify-center rounded-full bg-linear-to-b from-blue-500/10 to-blue-500/0 shadow-[0_0_0.25em_0_inset_color-mix(in_srgb,var(--color-blue-500)_20%,transparent)]">
                              <div
                                class="flex size-2/3 items-center justify-center rounded-full bg-linear-to-t from-blue-500/10 to-neutral-900 shadow-[0_0_0.25em_0_inset_color-mix(in_srgb,var(--color-blue-500)_20%,transparent)]">
                              </div>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>

                      <div class="grid w-full grid-cols-3 px-[1em] py-[0.5em]" data-message-thread-header>
                        <div
                          class="flex items-center gap-[0.25em] self-start justify-self-start rounded-full bg-neutral-500/10 py-[0.5em] pl-[0.5em] pr-[0.5em] shadow-[0_0_2em_0_rgba(0,0,0,0.15),1px_1px_1px_0_inset_rgba(255,255,255,0.8),-1px_-1px_1px_0_inset_rgba(255,255,255,0.8)] backdrop-blur-md">
                          <PhCaretLeft class="size-[1em] text-neutral-900" weight="bold" aria-hidden="true" />
                        </div>
                        <div class="flex flex-col items-center justify-center">
                          <div
                            class="relative z-2 aspect-square w-[3.5em] overflow-hidden rounded-full bg-linear-to-b from-neutral-900 to-neutral-800 shadow-[0_0.15em_0.2em_0_rgba(0,0,0,0.1)] flex items-center justify-center"
                            data-message-thread-header-avatar>
                            <SiteIcon class="w-1/2 text-background" />
                          </div>
                          <div
                            class="relative z-1 mt-[-0.125em] flex items-center justify-center gap-[0.25em] rounded-full bg-neutral-500/5 px-[0.7em] py-[0.2em] text-[1em] font-medium leading-none tracking-tight text-neutral-900 shadow-[0_0_2em_0_rgba(0,0,0,0.15),1px_1px_1px_0_inset_rgba(255,255,255,0.8),-1px_-1px_1px_0_inset_rgba(255,255,255,0.8)] backdrop-blur-md">
                            <span>Remi</span>
                          </div>
                        </div>
                        <div></div>
                      </div>

                      <div
                        class="flex w-full flex-1 flex-col overflow-hidden py-[1em] mask-y-from-[calc(100%-1em)] mask-y-to-100%"
                        data-message-thread>
                        <div class="mb-[0.8em] flex w-full justify-center px-[1em]">
                          <p class="text-[0.75em] font-medium leading-none tracking-tight text-neutral-900/40">Today
                            09:42</p>
                        </div>

                        <div class="mt-[0.65em] flex w-full flex-col px-[1em]">
                          <div class="flex w-full justify-start">
                            <div
                              class="relative mr-[25%] inline-block max-w-[78%] rounded-[1.25em] bg-neutral-200 px-[0.875em] py-[0.75em] text-[0.9em] leading-tight tracking-tight text-neutral-900 before:absolute before:bottom-0 before:left-[-0.45em] before:z-0 before:h-[1.25em] before:w-[1.25em] before:rounded-br-[0.95em] before:bg-neutral-200 before:content-[''] after:absolute after:bottom-0 after:left-[-0.7em] after:z-1 after:h-[1.25em] after:w-[0.7em] after:rounded-br-[0.7em] after:bg-white after:content-['']">
                              Hi, I'm Remi. Text me anything you need off your plate — I'll handle the busywork so you can keep moving. 👋
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="flex w-full items-stretch gap-[0.5em] px-[1.5em] pb-[2em]" data-input-bar>
                        <div
                          class="flex size-[2.5em] items-center justify-center rounded-full bg-neutral-500/10 shadow-[0_0_2em_0_rgba(0,0,0,0.1),1px_1px_1px_0_inset_rgba(255,255,255,0.8),-1px_-1px_1px_0_inset_rgba(255,255,255,0.8)] backdrop-blur-md">
                          <PhPlus class="size-[1em] text-neutral-900" weight="bold" aria-hidden="true" />
                        </div>
                        <div
                          class="flex flex-1 items-center justify-center rounded-full bg-neutral-500/10 py-[0.5em] pl-[1.25em] pr-[1em] text-[0.875em] font-normal tracking-tight text-neutral-900/40 shadow-[0_0_2em_0_rgba(0,0,0,0.1),1px_1px_1px_0_inset_rgba(255,255,255,0.8),-1px_-1px_1px_0_inset_rgba(255,255,255,0.8)] backdrop-blur-md">
                          <span class="flex-1">iMessage</span>
                          <PhMicrophone class="size-[1.25em] text-neutral-900/40" weight="regular" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
