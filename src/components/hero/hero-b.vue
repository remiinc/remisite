<script setup>
import { gsap } from 'gsap'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Button from '../global/button.vue'
import ProductAssurances from '../global/product-assurances.vue'

const heroMediaRef = ref(null)
let heroMediaRevealContext = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !heroMediaRef.value) return

  const tiles = [...heroMediaRef.value.children]

  heroMediaRevealContext = gsap.context(() => {
    gsap.fromTo(tiles, {
      autoAlpha: 0,
      clipPath: 'inset(10% round 0.25rem)',
      willChange: 'clip-path, opacity',
    }, {
      autoAlpha: 1,
      clipPath: 'inset(0% round 1rem)',
      delay: 0.2,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.08,
      onComplete: () => gsap.set(tiles, { clearProps: 'willChange' }),
    })
  }, heroMediaRef.value)
})

onBeforeUnmount(() => {
  heroMediaRevealContext?.revert()
})
</script>

<template>
  <section class="hero-b lg:h-(--hero-height) w-full bg-foreground px-6 pt-24 text-background grid">
    <div class="hero-b__container mx-auto w-full h-full max-w-(--content-width) flex flex-col">
      <div class="grid lg:grid-cols-[3fr_4fr] gap-x-16 w-full flex-1">

        <div class="min-h-full flex flex-col items-start justify-center text-left py-16">
          <span
            class="text-xs font-medium uppercase px-[0.875em] pt-[0.625em] pb-[0.5em] rounded-sm leading-none bg-background/10 mb-6">
            Office manager by text
          </span>

          <h1 class="headline-h2 max-w-[20ch] text-balance">
            <span class="block">Grow your business.</span>
            <span class="block">Let Remi handle the admin.</span>
          </h1>

          <p
            class="mt-6 max-w-[40ch] text-base leading-relaxed tracking-[-0.015em] text-background/70 text-balance">
            For owners who work the job and the desk, Remi watches your inbox, invoices, and customers, then speaks up
            before something slips.
          </p>

          <div class="mt-12 flex w-full items-center gap-3">
            <Button href="/start" variant="white" size="lg" class="w-46 sm:w-52"
              data-marketing-cta="hero_text_remi" data-marketing-destination="guided">
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

        <div class="grid place-items-center py-12 lg:py-4">
          <figure ref="heroMediaRef"
            class="w-full aspect-4/3 lg:aspect-square grid grid-cols-10 grid-rows-10 gap-1 *:bg-background/10 *:[clip-path:inset(0%_0%_0%_0%_round_1rem)] *:overflow-hidden *:grid [&_img]:object-cover [&_img]:w-full [&_img]:h-full">
            <div class="col-start-2 col-span-5 row-start-1 row-span-3">
              <img src="/images/solutions/plumbing-cover@2x.webp"
                alt="Plumbing professional standing with a tool belt inside a home">
            </div>
            <div class="col-start-7 col-span-4 row-start-2 row-span-3">
              <img src="/images/solutions/roofing-cover@2x.webp"
                alt="Roofing professional measuring shingles while secured with a safety harness">
            </div>
            <div class="col-start-1 col-span-3 row-start-4 row-span-3">
              <img src="/images/solutions/cleaning-cover@2x.webp"
                alt="Cleaning professional washing floor-to-ceiling windows">
            </div>
            <div class="col-start-4 col-span-4 row-start-5 row-span-6">
              <img src="/images/solutions/construction-cover@2x.webp"
                alt="Construction crew reviewing plans at a timber-framed jobsite">
            </div>
            <div class="col-start-2 col-span-2 row-start-7 row-span-3">
              <img src="/images/solutions/marketing-agency-cover@2x.webp"
                alt="Marketing professional reviewing documents with a colleague">
            </div>
            <div class="col-start-8 col-span-3 row-start-6 row-span-4">
              <img src="/images/solutions/home-remodeling-cover@2x.webp"
                alt="Remodeling professional sanding a newly finished ceiling">
            </div>
          </figure>
        </div>

      </div>

      <div class="w-full py-8 flex items-center border-t border-background/5">
        <ProductAssurances />
      </div>

    </div>
  </section>
</template>

<style scoped>
.hero-b__container {
  opacity: 0;
  translate: 0 1.25rem;
  animation: hero-b-enter 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
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
