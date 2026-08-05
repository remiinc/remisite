<script setup>
import { PhArrowRight } from '@phosphor-icons/vue'
import MessageNotification from './components/message-notification.vue'

const featureCards = [
  {
    id: 'catch-every-loose-end',
    label: 'Catch Every Loose End',
    title: 'Your morning brief. Then Remi gets to work.',
    description:
      'See what needs attention, then let Remi handle the follow-through while you work.',
    imageUrl: '/images/features/feature-img-01@2x.webp',
    imageWidth: 5504,
    imageHeight: 3072,
    imagePosition: 'object-center',
    videoUrl: '/videos/feature-vids/feature-vid-01.mp4',
    messages: [
      {
        parts: [
          { text: 'Morning ' },
          { text: 'Adam', tone: 'blue' },
          { text: ', quick update before you head out.' },
        ],
      },
      {
        parts: [
          { text: 'The $2,400 ' },
          { text: 'Johnson', tone: 'blue' },
          { text: ' invoice landed overnight. I saved the receipt.' },
        ],
      },
      {
        parts: [
          { text: 'I followed up on the Miller quote. They ' },
          { text: 'approved', tone: 'green' },
          { text: ' it and want Tuesday morning.' },
        ],
      },
      {
        parts: [
          { text: 'I confirmed ' },
          { text: '9:00', tone: 'blue' },
          { text: ', added the job to your calendar, and sent the details.' },
        ],
      },
      {
        parts: [
          { text: 'Sarah', tone: 'blue' },
          { text: ' asked to move today’s visit. I handled it—she’s confirmed for 11:30.' },
        ],
      },
      'One thing needs you: approve the $650 materials order for Miller.',
      {
        parts: [
          { text: 'That’s everything.', tone: 'green' },
          { text: ' Have a good one.' },
        ],
      },
    ],
    linkHref: '/solutions/catch-every-loose-end',
  },
  {
    id: 'send-quotes-faster',
    label: 'Send Quotes Faster',
    title: 'Turn field notes into a quote before the customer follows up.',
    description:
      'Remi gathers the details and prepares the quote for review.',
    imageUrl: '/images/features/feature-img-02@2x.webp',
    imageWidth: 5504,
    imageHeight: 3072,
    imagePosition: 'object-center',
    videoUrl: '/videos/feature-vids/feature-vid-02.mp4',
    messages: [
      {
        parts: [
          { text: 'Johnson', tone: 'blue' },
          { text: ' sent the measurements and site photos.' },
        ],
      },
      {
        parts: [
          { text: 'I pulled the ' },
          { text: 'approved', tone: 'green' },
          { text: ' pricing' },
          { text: ' from the last job.' },
        ],
      },
      {
        parts: [
          { text: 'The $4,850 quote is ' },
          { text: 'drafted and ready for review.', tone: 'green' },
        ],
      },
      {
        parts: [
          { text: 'Say send it and I will deliver it to ' },
          { text: 'Johnson', tone: 'blue' },
          { text: '.' },
        ],
      },
    ],
    linkHref: '/solutions/send-quotes-faster',
    copyOnRight: true,
  },
  {
    id: 'stop-missing-follow-ups',
    label: 'Stop Missing Follow-Ups',
    title: 'Follow up before the next job goes cold.',
    description:
      'Remi catches unanswered leads and quiet quotes, then prepares the right message for your review.',
    imagePosition: 'object-center',
    videoUrl: '/videos/feature-vids/feature-vid-03.mp4',
    messages: [
      {
        parts: [
          { text: 'The ' },
          { text: 'Lee', tone: 'blue' },
          { text: ' quote has been quiet for five days.' },
        ],
      },
      'Their last concern was the start date.',
      {
        parts: [
          { text: 'October 6', tone: 'blue' },
          { text: ' is open, and the quoted equipment is still available.' },
        ],
      },
      {
        parts: [
          { text: 'The follow-up is ' },
          { text: 'drafted and ready for review.', tone: 'green' },
        ],
      },
    ],
    linkHref: '/solutions/stop-missing-follow-ups',
  },
]
</script>

<template>
  <section id="features" class="w-full scroll-mt-24 px-6 py-24 bg-foreground text-background" data-section-features-grid>
    <div class="mx-auto grid w-full max-w-(--content-width) gap-4 md:grid-cols-2">
      <div class="flex max-w-3xl flex-col items-start gap-6 col-span-full mb-12">
          <p class="text-xs font-medium leading-none uppercase text-current">Why Remi</p>
          <h2 class="headline-h2 text-balance text-current">
            The work keeps moving while you’re out working.
          </h2>
      </div>
      <article v-for="card in featureCards" :key="card.id" class="md:col-span-2" :data-feature-card="card.id">
        <div class="grid gap-4 md:min-h-120"
          :class="card.copyOnRight ? 'md:grid-cols-[4fr_3fr]' : 'md:grid-cols-[3fr_4fr]'">
          <div class="flex min-h-120 flex-col overflow-hidden rounded-[1em] bg-background/4 p-8 sm:p-10"
            :class="card.copyOnRight ? 'md:order-2' : 'md:order-1'">
            <header class="max-w-sm">
              <h2 class="headline-h4 mb-4 text-balance">
                {{ card.title }}
              </h2>
              <p class="text-base leading-relaxed tracking-[-0.015em] text-pretty text-current/50">
                {{ card.description }}
              </p>
            </header>

            <div class="relative min-h-20 flex-1" :data-feature-ui="card.id" aria-hidden="true"></div>

            <footer class="flex max-w-2xl flex-col items-start">
              <a :href="card.linkHref" :aria-label="`Explore ${card.label}`"
                class="group/link inline-flex items-center gap-2 text-sm font-medium text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-background">
                <span>Explore capability</span>
                <PhArrowRight
                  class="size-4 transition-transform group-hover/link:translate-x-1 motion-reduce:transition-none"
                  weight="regular" aria-hidden="true" />
              </a>
            </footer>
          </div>

          <div class="relative min-h-72 overflow-hidden rounded-[1em]"
            :class="card.copyOnRight ? 'md:order-1' : 'md:order-2'">
            <video v-if="card.videoUrl" class="absolute inset-0 size-full object-cover" :class="card.imagePosition"
              :poster="card.imageUrl" width="1280" height="720" autoplay muted loop playsinline preload="metadata">
              <source :src="card.videoUrl" type="video/mp4">
            </video>
            <img v-else :src="card.imageUrl" alt="" :width="card.imageWidth" :height="card.imageHeight" loading="lazy"
              decoding="async" fetchpriority="low" class="absolute inset-0 size-full object-cover"
              :class="card.imagePosition">
            <span class="absolute inset-x-0 top-0 h-2/5 bg-linear-to-b from-black/65 via-black/20 to-transparent"
              aria-hidden="true"></span>
            <div v-if="card.messages?.length" class="absolute inset-0 z-10 grid place-items-center p-6">
              <MessageNotification :messages="card.messages" />
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
