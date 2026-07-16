<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import Button from '../global/button.vue'
import GlobalHeader from '../header/global-header.vue'
import GlobalFooter from '../global/global-footer.vue'
import TextRemiQr from './text-remi-qr.vue'
import {
  REMI_TEXT_HREF,
  REMI_TEXT_NUMBER_DISPLAY,
  isAppleDevice,
} from '../../lib/start-contact'

let openMessagesTimer = null

onMounted(() => {
  if (!isAppleDevice()) {
    return
  }

  openMessagesTimer = window.setTimeout(() => {
    window.location.assign(REMI_TEXT_HREF)
  }, 300)
})

onBeforeUnmount(() => {
  if (openMessagesTimer) {
    window.clearTimeout(openMessagesTimer)
  }
})
</script>

<template>
  <div class="min-h-svh bg-background text-foreground">
    <GlobalHeader theme="light" />

    <main class="flex min-h-svh items-center overflow-x-clip px-6" data-start-page>
      <section
        class="mx-auto grid min-w-0 w-full min-h-svh pt-[calc(var(--header-height)+2rem)] pb-20 max-w-(--content-width) items-center gap-14 md:grid-cols-2 md:gap-20 lg:gap-28"
        aria-labelledby="start-title">
        <div class="w-full flex flex-col items-center py-12 gap-8">
          <p class="text-xs font-medium leading-none text-muted-foreground flex items-center gap-4"><span
              class="uppercase text-foreground">Get Started</span><span class="text-sm tracking-tight font-normal">Text
              Remi to get started</span></p>
          <h1 id="start-title"
            class="max-w-[20ch] text-5xl lg:text-6xl font-normal leading-[1em] tracking-tight text-balance text-center">
            You can just text <a :href="REMI_TEXT_HREF" :aria-label="`Text Remi at ${REMI_TEXT_NUMBER_DISPLAY}`"
              class="text-foreground hover:text-blue-500 transition-colors underline decoration-foreground/10 hover:decoration-blue-500 decoration-1 underline-offset-10 whitespace-nowrap"
              style="text-decoration-skip-ink: none;">{{ REMI_TEXT_NUMBER_DISPLAY }}</a> to get started.
          </h1>
          <p class="mt-8 max-w-lg text-base leading-normal text-pretty text-muted-foreground sm:text-lg text-center">
            Scan the code or open Messages to get started. Remi will ask you a few questions, learn how you work, and
            help you get set up.
          </p>
          <Button :href="REMI_TEXT_HREF" size="lg" class="mt-8"
            :aria-label="`Open Messages to text Remi at ${REMI_TEXT_NUMBER_DISPLAY}`">
            <span class="flex items-center gap-2.5">
              <img src="/images/app-logos/ios-messages-icon.svg" alt="" class="size-5 shrink-0" aria-hidden="true">
              Open Messages
            </span>
          </Button>
        </div>

        <figure
          class="relative overflow-hidden rounded-3xl h-full min-h-140 mx-auto flex min-w-0 w-full flex-col items-center justify-between gap-5 py-12 px-8  text-background text-center">
          <img src="/images/features/start-feature-01@2x.webp" class="absolute inset-0 w-full h-full object-cover z-0">

          <h2
            class="relative z-1 text-3xl md:text-4xl max-w-[20ch] font-normal leading-none tracking-tight text-balance">
            Your new
            hire is one text away.</h2>

          <div class="relative z-1 w-full flex flex-col items-center justify-center gap-4">
            <TextRemiQr role="img" :aria-label="`QR code to text Remi at ${REMI_TEXT_NUMBER_DISPLAY}`"
              class="block size-full max-w-60 rounded-xl bg-black/20 backdrop-blur-md" />
            <figcaption class="text-sm">
              Scan the QR code to text Remi
            </figcaption>
          </div>
        </figure>
      </section>
    </main>

    <GlobalFooter />
  </div>
</template>
