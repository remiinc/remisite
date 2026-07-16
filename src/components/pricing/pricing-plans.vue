<script setup>
import { PhArrowRight, PhCheck } from '@phosphor-icons/vue'
import { cn } from '../../lib/cn.js'
import { getOnboardingEntry } from '../../lib/acquisition.js'
import Button from '../global/button.vue'
import SiteLogo from '../global/site-logo.vue'

const googleEntry = getOnboardingEntry('google')
const googleEntryHref = googleEntry.href || 'https://remi.new/login'
</script>

<template>
  <div class="group mx-auto w-full max-w-(--content-width)" aria-label="Pricing plans" data-pricing-plans>
    <fieldset class="mb-5 flex justify-end" aria-label="Billing cycle">
      <legend class="sr-only">Billing cycle</legend>
      <div class="inline-flex rounded-full bg-muted p-0.5 text-xs font-medium leading-none text-muted-foreground">
        <input id="pricing-monthly" class="peer/monthly sr-only" type="radio" name="pricing-billing">
        <label for="pricing-monthly"
          class="shrink-0 cursor-pointer rounded-full flex items-center gap-2 px-3 py-1.5 transition-colors peer-checked/monthly:bg-background peer-checked/monthly:text-foreground peer-checked/monthly:shadow-[0_0_0_1px_var(--color-border)]">
          Monthly
        </label>
        <input id="pricing-annually" class="peer/annually sr-only" type="radio" name="pricing-billing" checked>
        <label for="pricing-annually"
          class="shrink-0 cursor-pointer rounded-full pl-3 pr-1.5 flex items-center gap-2 py-1.5 transition-colors peer-checked/annually:bg-background peer-checked/annually:text-foreground peer-checked/annually:shadow-[0_0_0_1px_var(--color-border)]">
          <span>Annually</span>
          <span class="rounded-full bg-foreground px-2 py-1 text-xs text-background">Save 20%</span>
        </label>
      </div>
    </fieldset>

    <div class="grid gap-y-4 lg:grid-cols-2">
      <article :class="cn(
        'relative flex flex-col justify-between overflow-hidden rounded-2xl py-8 lg:rounded-r-none',
        'bg-muted text-foreground',
      )">
        <div class="flex h-full flex-col justify-between gap-8 px-8 lg:border-r lg:border-foreground/8">
          <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-3">
              <div class="flex items-center gap-1">
                <div class="flex h-8 items-center justify-center">
                  <SiteLogo class="h-4 w-auto" />
                </div>
                <h3 class="flex items-center justify-center rounded-full bg-foreground px-3 py-1.5 text-base leading-none text-background">
                  Pro
                </h3>
              </div>
              <span class="text-sm text-foreground/40">
                For individuals or small owner-run teams ready to hand Remi the daily chase list.
              </span>
            </div>

            <div class="flex flex-col gap-4">
              <div class="flex flex-wrap items-end gap-x-4 gap-y-2">
                <p class="flex items-end gap-2">
                  <span class="text-5xl font-normal leading-none tracking-tight group-has-[#pricing-annually:checked]:hidden">$119</span>
                  <span class="hidden text-5xl font-normal leading-none tracking-tight group-has-[#pricing-annually:checked]:inline">$99</span>
                  <span class="text-sm leading-[2em] text-foreground/40">/month</span>
                </p>
              </div>
            </div>

            <ul class="grid gap-3">
              <li class="flex gap-3 text-sm leading-snug">
                <PhCheck class="mt-0.5 size-4 shrink-0" weight="regular" aria-hidden="true" />
                <span>Learns how your business works across email, calendar, messages, and connected tools</span>
              </li>
              <li class="flex gap-3 text-sm leading-snug">
                <PhCheck class="mt-0.5 size-4 shrink-0" weight="regular" aria-hidden="true" />
                <span>Finds work without waiting to be asked and moves it forward</span>
              </li>
              <li class="flex gap-3 text-sm leading-snug">
                <PhCheck class="mt-0.5 size-4 shrink-0" weight="regular" aria-hidden="true" />
                <span>Handles follow-ups, quotes, invoices, scheduling, and customer records</span>
              </li>
              <li class="flex gap-3 text-sm leading-snug">
                <PhCheck class="mt-0.5 size-4 shrink-0" weight="regular" aria-hidden="true" />
                <span>Brings you approvals, decisions, and receipts instead of another dashboard</span>
              </li>
            </ul>
          </div>

          <Button :href="googleEntryHref" class="mt-12 w-full" size="lg"
            data-marketing-cta="pricing_pro_google" data-marketing-destination="google"
            :data-attribution-state="googleEntry.attributionState">
            <span class="inline-flex items-center gap-2">
              <span>Try Remi free for 7 days</span>
              <PhArrowRight class="size-4" weight="bold" aria-hidden="true" />
            </span>
          </Button>
        </div>
      </article>

      <article :class="cn(
        'relative flex flex-col justify-between overflow-hidden rounded-2xl py-8 lg:rounded-l-none',
        'bg-muted text-foreground',
      )">
        <div class="flex h-full flex-col justify-between gap-8 px-8">
          <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-3">
              <div class="flex items-center gap-1">
                <div class="flex h-8 items-center justify-center">
                  <SiteLogo class="h-4 w-auto" />
                </div>
                <h3 class="flex items-center justify-center rounded-full bg-foreground px-3 py-1.5 text-base leading-none text-background">
                  Scale
                </h3>
              </div>
              <span class="text-sm text-foreground/40">
                Same Remi. More capacity for businesses with more jobs, customers, and work in motion.
              </span>
            </div>

            <div class="flex flex-col gap-4">
              <div class="flex flex-wrap items-end gap-x-4 gap-y-2">
                <p class="flex items-end gap-2">
                  <span class="text-5xl font-normal leading-none tracking-tight group-has-[#pricing-annually:checked]:hidden">$239</span>
                  <span class="hidden text-5xl font-normal leading-none tracking-tight group-has-[#pricing-annually:checked]:inline">$199</span>
                  <span class="text-sm leading-[2em] text-foreground/40">/month</span>
                </p>
              </div>
            </div>

            <ul class="grid gap-3">
              <li class="flex gap-3 text-sm leading-snug">
                <PhCheck class="mt-0.5 size-4 shrink-0" weight="regular" aria-hidden="true" />
                <span>Everything included in Pro</span>
              </li>
              <li class="flex gap-3 text-sm leading-snug">
                <PhCheck class="mt-0.5 size-4 shrink-0" weight="regular" aria-hidden="true" />
                <span>More monthly capacity for heavier follow-through</span>
              </li>
              <li class="flex gap-3 text-sm leading-snug">
                <PhCheck class="mt-0.5 size-4 shrink-0" weight="regular" aria-hidden="true" />
                <span>Built for more active jobs, customers, and open loops</span>
              </li>
              <li class="flex gap-3 text-sm leading-snug">
                <PhCheck class="mt-0.5 size-4 shrink-0" weight="regular" aria-hidden="true" />
                <span>Add more capacity anytime; add-ons remain until used</span>
              </li>
            </ul>
          </div>

          <Button :href="googleEntryHref" class="mt-12 w-full" size="lg"
            data-marketing-cta="pricing_scale_google" data-marketing-destination="google"
            :data-attribution-state="googleEntry.attributionState">
            <span class="inline-flex items-center gap-2">
              <span>Get Remi Scale</span>
              <PhArrowRight class="size-4" weight="bold" aria-hidden="true" />
            </span>
          </Button>
        </div>
      </article>
    </div>
  </div>
</template>
