<script setup>
import { cn } from '../../lib/cn.js'
import Button from '../global/button.vue'
import { PhShield, PhLockSimple, PhHouseSimple, PhCheck, PhNumberCircleOne, PhNumberCircleTwo, PhNumberCircleThree, PhNumberCircleFour, PhPlugs, PhDeviceMobile } from '@phosphor-icons/vue';
import { getOnboardingEntry } from '../../lib/acquisition.js'
import { trackOnboardingCta } from '../../lib/analytics.js'

const linqEntry = getOnboardingEntry('linq')
const googleEntry = getOnboardingEntry('google')
</script>

<template>
  <!-- Features - Get Started -->
  <section id="features" :class="cn('w-full scroll-mt-24 px-6 py-16')" data-section-features>
    <div class="section-container mx-auto w-full max-w-(--content-width)">
      <div class="section-layout w-full grid lg:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-12">
        <div class="section-visual w-full min-h-120 h-full bg-muted rounded-3xl order-1 lg:order-2"></div>
        <div class="section-content w-full py-4 flex flex-col justify-center order-2 lg:order-1">
          <div class="flex flex-col flex-1">
            <h2 class="text-3xl lg:text-4xl font-normal tracking-tight text-balance mb-6">
              Text Remi and hire a teammate that onboards herself and works 24/7.
            </h2>
            <p class="max-w-lg text-sm lg:text-base font-normal leading-normal text-pretty text-muted-foreground mb-8">
              Remi connects to and learns from your email, calendar, and all the tools you already use. Remi finds tasks to work on and starts tackling them with your approval.
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
              <Button :href="linqEntry.href" variant="primary" size="sm"
                :aria-disabled="!linqEntry.available"
                :data-destination-state="linqEntry.available ? 'available' : 'unavailable'"
                @click="trackOnboardingCta($event, linqEntry, 'features_text_remi')">
                <div class="flex items-center gap-2"><img src="/images/app-logos/ios-messages-icon.svg" alt="Google"
                    class="size-3" /><span>{{ linqEntry.available ? 'Text Remi' : 'Text Remi unavailable' }}</span></div>
              </Button>
              <Button :href="googleEntry.href" variant="secondary" size="sm"
                :aria-disabled="!googleEntry.available"
                :data-destination-state="googleEntry.available ? 'available' : 'unavailable'"
                @click="trackOnboardingCta($event, googleEntry, 'features_signup_gmail')">
                <div class="flex items-center gap-2"><img src="/images/app-logos/gmail.svg" alt="Google"
                    class="size-3" /><span>{{ googleEntry.available ? 'Sign up with Gmail' : 'Gmail signup unavailable' }}</span></div>
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
        <div class="section-visual w-full min-h-120 h-full bg-muted rounded-3xl"></div>
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
              <Button variant="secondary" size="sm">
                Learn more about security
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features - Security -->
  <section id="features-security" :class="cn('w-full scroll-mt-24 px-6 py-16')" data-section-security>
    <div class="section-container mx-auto w-full max-w-(--content-width)">
      <div class="section-layout w-full grid md:grid-cols-3 gap-x-8 gap-y-12">
        <div class="flex flex-col gap-4">
          <PhShield class="size-4 text-foreground" weight="fill" />
          <h3 class="text-lg font-normal tracking-tight text-balance">
            Your keys stay locked up
          </h3>
          <p class="text-sm font-normal leading-normal text-pretty text-muted-foreground">
            Every login Remi holds is encrypted and locked to your business. Remi grabs a key only when it needs
            it, then puts it back. You never have to see or paste one.
          </p>
        </div>
        <div class="flex flex-col gap-4">
          <PhLockSimple class="size-4 text-foreground" weight="fill" />
          <h3 class="text-lg font-normal tracking-tight text-balance">
            Your passwords stay with you
          </h3>
          <p class="text-sm font-normal leading-normal text-pretty text-muted-foreground">
            When Remi has to sign into a website for you, you type the password &mdash; not Remi. We only hold the
            "already signed in" pass, never the password itself.
          </p>
        </div>
        <div class="flex flex-col gap-4">
          <PhHouseSimple class="size-4 text-foreground" weight="fill" />
          <h3 class="text-lg font-normal tracking-tight text-balance">
            Never sold, never used to train AI
          </h3>
          <p class="text-sm font-normal leading-normal text-pretty text-muted-foreground">
            Your data is yours. We don't sell it or share it. The AI services that read it are contractually barred
            from training on what they see.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
