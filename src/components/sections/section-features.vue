<script setup>
import { cn } from '../../lib/cn.js'
import { trackMarketingCta } from '../../lib/analytics.js'
import Button from '../global/button.vue'
import SectionSecurityPrinciples from './section-security-principles.vue'
import { PhCheck, PhNumberCircleOne, PhNumberCircleTwo, PhNumberCircleThree, PhNumberCircleFour } from '@phosphor-icons/vue';

const scrollToSolutions = (event) => {
  const target = document.getElementById('solutions')
  if (!target) return
  event.preventDefault()
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })
  if (window.history?.replaceState) {
    window.history.replaceState(null, '', '#solutions')
  }
}

const featureMessages = [
  { text: 'Three invoices are overdue. 💸', sender: 'remi', x: '58%', y: '15%', rotation: '-1.5deg' },
  { text: 'What needs me today?', sender: 'user', x: '25%', y: '25%', rotation: '2deg' },
  { text: 'The signed estimate is attached. 📎', sender: 'remi', x: '50%', y: '35%', rotation: '-2deg' },
  { text: 'Draft the follow-up.', sender: 'user', x: '72%', y: '45%', rotation: '1deg' },
  { text: 'Tomorrow has a 2:30 opening. 📅', sender: 'remi', x: '42%', y: '55%', rotation: '1.5deg' },
  { text: 'Put that in writing.', sender: 'user', x: '72%', y: '65%', rotation: '-2deg' },
  { text: 'The change order is still waiting. 👀', sender: 'remi', x: '48%', y: '75%', rotation: '2deg' },
  { text: 'Remind me Friday.', sender: 'user', x: '33%', y: '85%', rotation: '-1deg' },
]
</script>

<template>
  <!-- Features - Get Started -->
  <section id="features" :class="cn('w-full scroll-mt-24 px-6 py-16')" data-section-features>
    <div class="section-container mx-auto w-full max-w-(--content-width)">
      <div class="section-layout w-full grid lg:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-12">
        <div class="section-visual w-full min-h-120 h-full bg-muted rounded-3xl order-1 lg:order-2 overflow-hidden">
          <img src="/images/features/home-feature-01@2x.jpg" alt="Remi" class="w-full h-full object-cover" />
        </div>
        <div class="section-content w-full py-4 flex flex-col justify-center order-2 lg:order-1">
          <div class="flex flex-col flex-1">
            <h2 class="text-3xl lg:text-4xl font-normal tracking-tight text-balance mb-6">
              Text Remi and hire a teammate that onboards herself and works 24/7.
            </h2>
            <p class="max-w-lg text-sm lg:text-base font-normal leading-normal text-pretty text-muted-foreground mb-8">
              Remi connects to and learns from your email, calendar, and all the tools you already use. Remi finds tasks
              to work on and starts tackling them with your approval.
            </p>
            <ul class="flex flex-col mb-8 divide-y divide-border">
              <li class="flex items-start gap-2 text-sm text-foreground py-2">
                <span class="size-[1lh] shrink-0 flex items-center justify-center">
                  <PhNumberCircleOne class="size-full" weight="fill" />
                </span>
                <span>Text Remi to get started</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-foreground py-2">
                <span class="size-[1lh] shrink-0 flex items-center justify-center">
                  <PhNumberCircleTwo class="size-full" weight="fill" />
                </span>
                <span>Connect all the tools you already use</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-foreground py-2">
                <span class="size-[1lh] shrink-0 flex items-center justify-center">
                  <PhNumberCircleThree class="size-full" weight="fill" />
                </span>
                <span>Remi gets oriented and identifies tasks</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-foreground py-2">
                <span class="size-[1lh] shrink-0 flex items-center justify-center">
                  <PhNumberCircleFour class="size-full" weight="fill" />
                </span>
                <span>Watch the work begin</span>
              </li>
            </ul>
            <div class="flex flex-wrap gap-3 mt-auto">
              <Button href="/start" variant="primary" size="sm"
                @click="trackMarketingCta('features_text_remi', 'linq')">
                <div class="flex items-center gap-2"><img src="/images/app-logos/ios-messages-icon.svg" alt="Google"
                    class="size-3" /><span>Text Remi</span></div>
              </Button>
              <Button variant="secondary" size="sm">
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features - How it Works -->
  <section id="features" :class="cn('w-full scroll-mt-24 px-6 py-16')" data-section-features>
    <div class="section-container mx-auto w-full max-w-(--content-width)">
      <div class="section-layout w-full grid lg:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-12">
        <div
          class="section-visual relative w-full min-h-120 h-full bg-muted rounded-3xl overflow-hidden text-[clamp(0.875rem,1.5vw,1.25rem)]">
          <img src="/images/features/home-feature-02@2x.jpg" alt="Remi"
            class="absolute inset-0 w-full h-full object-cover" />

          <div class="absolute inset-0 z-10 flex items-center justify-center">
            <div
              v-for="message in featureMessages"
              :key="message.text"
              class="absolute"
              :style="{
                left: message.x,
                top: message.y,
                transform: `translate(-50%, -50%) rotate(${message.rotation})`,
              }"
            >
              <div
                :class="cn(
                  'relative inline-block w-fit px-[0.875em] py-[0.5em] text-sm md:text-base leading-tight tracking-tight',
                  message.sender === 'user'
                    ? 'rounded-l-[1.25em] rounded-tr-[1.25em] rounded-br-[0.25em] bg-blue-400 text-white'
                    : 'rounded-r-[1.25em] rounded-tl-[1.25em] rounded-bl-[0.25em] bg-background/95 text-foreground backdrop-blur-sm',
                )"
              >
                {{ message.text }}
              </div>
            </div>
          </div>
        </div>
        <div class="section-content w-full py-4 flex flex-col justify-center">
          <div class="flex flex-col flex-1">
            <h2 class="text-3xl lg:text-4xl font-normal tracking-tight text-balance mb-6">
              Do the jobs you love. Remi does the ones you dont.
            </h2>
            <p class="max-w-lg text-sm lg:text-base font-normal leading-normal text-pretty text-muted-foreground mb-8">
              Remi watches your email, calendar, messages, and tools to chase overdue invoices,
              follow up on quotes, and remember what every client agreed to.
            </p>
            <ul class="flex flex-col gap-2 mb-8">
              <li class="flex items-start gap-2 text-sm text-foreground">
                <span class="size-[1lh] shrink-0 flex items-center justify-center">
                  <PhCheck class="size-3/4" weight="bold" />
                </span>
                <span>Takes the busywork off your plate</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-foreground">
                <span class="size-[1lh] shrink-0 flex items-center justify-center">
                  <PhCheck class="size-3/4" weight="bold" />
                </span>
                <span>Speaks up when something needs doing</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-foreground">
                <span class="size-[1lh] shrink-0 flex items-center justify-center">
                  <PhCheck class="size-3/4" weight="bold" />
                </span>
                <span>Waits for your OK before acting</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-foreground">
                <span class="size-[1lh] shrink-0 flex items-center justify-center">
                  <PhCheck class="size-3/4" weight="bold" />
                </span>
                <span>Keeps your logins and data locked to you</span>
              </li>
            </ul>
            <div class="flex flex-wrap gap-3 mt-auto">
              <Button href="/#solutions" variant="secondary" size="sm" @click="scrollToSolutions">
                See solutions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="w-full px-6 pt-20 pb-0" data-section-security-intro>
    <span class="mx-auto flex w-full max-w-(--content-width) items-center gap-6">
      <h2 class="inline text-4xl font-normal leading-[1em] tracking-tight text-balance text-foreground">
        <span>How we think about security</span>
        <span class="h-[1em] inline-flex items-center"><Button href="/security" variant="secondary" size="sm"
            class="relative left-[0.75em] top-[-0.333em]">Learn more</Button></span>
      </h2>
    </span>
  </section>
  <SectionSecurityPrinciples />
</template>
