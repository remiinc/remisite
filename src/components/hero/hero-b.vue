<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Button from '../global/button.vue'
import ProductAssurances from '../global/product-assurances.vue'
import StaticIphone from '../global/static-iphone.vue'

const PARALLAX_LEVELS = {
  1: 0,
  2: -4,
  3: -8,
  4: -16,
  5: -32,
}

const heroMessages = [
  {
    id: 'remi-morning-heads-up',
    direction: 'incoming',
    delay: 350,
    text: "Morning Charlie 👋 Mark Puckett's $6,850 final is 20 days late. Matched that Lowe's receipt to Whitaker too",
  },
  {
    id: 'charlie-file-and-nudge',
    direction: 'outgoing',
    delay: 2200,
    text: 'nice catch. file it + keep the text friendly',
  },
  {
    id: 'puckett-invoice-review',
    direction: 'incoming',
    delay: 1800,
    component: 'invoice-review',
    demo: true,
    card: {
      customerName: 'Mark Puckett',
      daysOverdue: 20,
      dueDate: 'July 8',
      invoiceNumber: 'SI-1058',
      originalTotal: '$16,250',
      outstandingBalance: '$6,850',
      projectName: 'Puckett kitchen',
    },
  },
  {
    id: 'remi-sent',
    direction: 'incoming',
    delay: 5400,
    text: "Sent 👍 I'll watch for his reply",
  },
  {
    id: 'remi-next-thing',
    direction: 'incoming',
    delay: 1900,
    text: 'Also, Bill Caudill just sent the bathroom pics',
  },
  {
    id: 'caudill-bathroom-photos',
    direction: 'incoming',
    delay: 900,
    component: 'photo-stack',
    photos: [
      {
        src: '/images/demo/bill-caudill-bathroom/01-wide.jpg',
        alt: 'Bill Caudill bathroom before remodeling',
      },
      {
        src: '/images/demo/bill-caudill-bathroom/02-tub.jpg',
        alt: 'Dated tub surround and fixtures in Bill Caudill bathroom',
      },
      {
        src: '/images/demo/bill-caudill-bathroom/03-vanity.jpg',
        alt: 'Existing vanity and worn floor in Bill Caudill bathroom',
      },
      {
        src: '/images/demo/bill-caudill-bathroom/04-floor.jpg',
        alt: 'Worn bathroom floor and tub before remodeling',
      },
    ],
  },
  {
    id: 'charlie-voice-note',
    direction: 'outgoing',
    delay: 1700,
    component: 'voice-message',
    duration: '0:12',
  },
  {
    id: 'remi-check-materials',
    direction: 'incoming',
    delay: 2100,
    text: "Got it. I'll double-check the cost of those materials",
  },
  {
    id: 'remi-quote-ready',
    direction: 'incoming',
    delay: 2500,
    text: "OK, quote's ready. Came to $21,800",
  },
  {
    id: 'caudill-quote-review',
    direction: 'incoming',
    delay: 900,
    component: 'quote-review',
    card: {
      customerName: 'Bill Caudill',
      projectName: 'Bathroom remodel',
      quoteNumber: '2026-1043',
      title: 'Caudill bathroom quote',
      total: '$21,800',
    },
  },
  {
    id: 'charlie-send-quote',
    direction: 'outgoing',
    delay: 2100,
    text: 'looks good send it',
  },
  {
    id: 'remi-quote-sent',
    direction: 'incoming',
    delay: 1600,
    text: "Sent 👍 I'll let you know when Bill replies",
  },
]

const heroMediaRef = ref(null)
const heroCollageMedia = typeof window !== 'undefined'
  ? window.matchMedia('(min-width: 640px)')
  : null
const showHeroCollage = ref(heroCollageMedia?.matches ?? false)
let heroMediaRevealContext = null
let motionLoadCancelled = false

const syncHeroCollage = (event) => {
  showHeroCollage.value = event.matches
}

onMounted(async () => {
  heroCollageMedia?.addEventListener('change', syncHeroCollage)
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const mobileViewport = window.matchMedia('(max-width: 767px)').matches
  if (reducedMotion || mobileViewport || !heroMediaRef.value) return

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ])
  if (motionLoadCancelled || !heroMediaRef.value) return

  gsap.registerPlugin(ScrollTrigger)

  const tiles = [...heroMediaRef.value.querySelectorAll('[data-hero-media-item]')]
  const parallaxItems = [...heroMediaRef.value.querySelectorAll('[data-hero-parallax]')]

  heroMediaRevealContext = gsap.context(() => {
    let parallaxActive = false
    const setParallaxLayer = (active) => {
      parallaxActive = active
      gsap.set(parallaxItems, active
        ? { willChange: 'transform' }
        : { clearProps: 'willChange' })
    }

    gsap.fromTo(tiles, {
      autoAlpha: 0,
      clipPath: 'inset(10% round 0.5cqw)',
      willChange: 'clip-path, opacity, transform',
    }, {
      autoAlpha: 1,
      clipPath: 'inset(0% round 1.5cqw)',
      delay: 0.2,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.08,
      onComplete: () => setParallaxLayer(parallaxActive),
    })

    const parallaxTimeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: heroMediaRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onEnter: () => setParallaxLayer(true),
        onEnterBack: () => setParallaxLayer(true),
        onLeave: () => setParallaxLayer(false),
        onLeaveBack: () => setParallaxLayer(false),
      },
    })

    parallaxItems.forEach((item) => {
      const distance = PARALLAX_LEVELS[Number(item.dataset.heroParallax)]
      if (!distance) return

      parallaxTimeline.fromTo(item, {
        y: -distance,
        force3D: true,
      }, {
        y: distance,
        force3D: true,
        duration: 1,
      }, 0)
    })
  }, heroMediaRef.value)
})

onBeforeUnmount(() => {
  heroCollageMedia?.removeEventListener('change', syncHeroCollage)
  motionLoadCancelled = true
  heroMediaRevealContext?.revert()
})
</script>

<template>
  <section class="hero-b grid w-full bg-foreground px-4 pt-16 text-background sm:px-6 sm:pt-24 lg:h-(--hero-height)">
    <div class="hero-b__container mx-auto w-full h-full max-w-(--content-width) flex flex-col">
      <div class="grid lg:grid-cols-[3fr_4fr] gap-x-16 w-full flex-1 overflow-hidden min-w-0">

        <div class="flex min-h-full flex-col items-center justify-center px-0 py-10 text-center sm:px-4 sm:py-16 lg:items-start lg:px-0 lg:text-left">
          <h1 class="headline-h2 sm:headline-h1 lg:headline-h2 max-w-[20ch] sm:max-lg:max-w-[34ch] text-balance">
            <span class="block">A teammate that helps you win</span>
            <span class="block">more work and keep jobs on track.</span>
          </h1>

          <p class="mt-6 max-w-[52ch] lg:max-w-[40ch] text-base leading-relaxed tracking-[-0.015em] text-background/70 text-balance">
            Remi brings your customers, jobs, and payments together, so your business runs as well as the work you do.
          </p>

          <div class="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-12 lg:justify-start">
            <Button href="/start" variant="white" size="lg" data-marketing-cta="hero_text_remi"
              data-marketing-destination="guided">
              <span class="flex items-center gap-2.5">
                <img src="/images/app-logos/ios-messages-icon.svg" alt="" class="size-5 shrink-0" aria-hidden="true">
                <span>Text Remi</span>
              </span>
            </Button>

            <Button href="/pricing" size="lg" variant="translucent">
              View Pricing
            </Button>
          </div>
        </div>

        <div class="mx-auto grid w-full min-w-0 place-items-center pb-10 pt-2 sm:py-8 lg:py-0">
          <figure ref="heroMediaRef"
            class="grid aspect-2/3 w-full grid-cols-32 grid-rows-32 gap-2 sm:aspect-square [&_img]:h-full [&_img]:w-full [&_img]:object-cover">
            <!-- Left -->
            <div v-if="showHeroCollage" class="hero-b__media-tile hidden sm:grid col-start-5 col-span-9 row-start-1 row-span-6" data-hero-media-item
              data-hero-parallax="3">
              <img src="/images/solutions/marketing-agency-cover@2x.webp"
                alt="Marketing professional reviewing documents with a colleague" width="1600" height="1000"
                decoding="async" fetchpriority="low">
            </div>
            <div v-if="showHeroCollage" class="hero-b__media-tile hidden sm:grid col-start-1 col-span-11 row-start-7 row-span-12" data-hero-media-item
              data-hero-parallax="2">
              <img src="/images/solutions/plumbing-cover@2x.webp"
                alt="Plumbing professional standing with a tool belt inside a home" width="1600" height="1000"
                decoding="async" fetchpriority="low">
            </div>
            <div v-if="showHeroCollage" class="hero-b__media-tile hidden sm:grid col-start-3 col-span-9 row-start-17 row-span-12" data-hero-media-item
              data-hero-parallax="5">
              <img src="/images/solutions/home-remodeling-cover@2x.webp"
                alt="Remodeling professional sanding a newly finished ceiling" width="1600" height="1000"
                decoding="async" fetchpriority="low">
            </div>
            <!-- Center -->
            <div class="col-start-5 col-span-24 row-start-1 row-span-32 z-10 sm:col-start-10 sm:col-span-15 sm:row-start-2 sm:row-span-30" data-hero-parallax="1">
              <StaticIphone autoplay fluid theme="dark" class="h-full" :font-size="1.075" :loop-delay="6500"
                :messages="heroMessages" />
            </div>
            <!-- Right -->
            <div v-if="showHeroCollage" class="hero-b__media-tile hidden sm:grid col-start-22 col-span-12 row-start-4 row-span-16 z-2" data-hero-media-item
              data-hero-parallax="2">
              <img src="/images/misc/contractor-001@2x.webp"
                alt="Cleaning professional washing floor-to-ceiling windows" width="800" height="1200"
                decoding="async" fetchpriority="low">
            </div>
            <div v-if="showHeroCollage" class="hero-b__media-tile hidden sm:grid col-start-25 col-span-8 row-start-16 row-span-10 z-3" data-hero-media-item
              data-hero-parallax="4">
              <img src="/images/misc/contractor-002@2x.webp"
                alt="Construction crew reviewing plans at a timber-framed jobsite" width="800" height="1200"
                decoding="async" fetchpriority="low">
            </div>
            <div v-if="showHeroCollage" class="hero-b__media-tile hidden sm:grid col-start-20 col-span-10 row-start-22 row-span-8 z-1" data-hero-media-item
            data-hero-parallax="3">
              <img src="/images/solutions/plumbing-cover@2x.webp"
                alt="Plumbing professional standing with a tool belt inside a home" width="1600" height="1000"
                decoding="async" fetchpriority="low">
            </div>
          </figure>
        </div>

      </div>

      <div class="flex w-full items-center justify-center border-t border-background/5 py-8 lg:justify-start">
        <ProductAssurances />
      </div>

    </div>
  </section>
</template>

<style scoped>
.hero-b__media-tile {
  display: none;
  overflow: hidden;
  background: color-mix(in srgb, var(--color-background) 10%, transparent);
  clip-path: inset(0 round 1.5cqw);
}

@media (min-width: 640px) {
  .hero-b__media-tile {
    display: grid;
  }
}

.hero-b__container {
  opacity: 0;
  translate: 0 1.25rem;
  animation: hero-b-enter 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
  container-type: inline-size;
}

@keyframes hero-b-enter {
  to {
    opacity: 1;
    translate: 0 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-b__container {
    opacity: 1;
    translate: none;
    animation: none;
  }
}
</style>
