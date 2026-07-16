<script setup>
import { PhArrowRight, PhCheck } from '@phosphor-icons/vue'
import { cn } from '../../lib/cn.js'
import Button from '../global/button.vue'
import SiteLogo from '../global/site-logo.vue'
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

    <div class="grid gap-y-4 lg:grid-cols-3">
      <article :class="cn(
        'relative flex flex-col justify-between overflow-hidden rounded-2xl py-8 lg:mr-2',
        'order-last lg:order-first',
        'shadow-[0_0_0_1px_var(--color-border)]',
      )">
        <div class="flex flex-col gap-6 px-8">
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-3">
              <div class="size-8 overflow-hidden rounded-full bg-foreground/10">
                <img src="/images/avatars/person-avatar-003.png" alt="Human hire" class="size-full object-cover">
              </div>
              <h3 class="text-base font-medium">Human hire</h3>
            </div>
            <span class="text-sm text-foreground/40">
              Excellent idea. Just make room for payroll, onboarding, management and sick days.
            </span>
          </div>

          <div class="flex flex-col gap-4">
            <div class="flex flex-wrap items-end gap-x-4 gap-y-2">
              <p class="flex items-end gap-2">
                <span class="inline-flex items-end gap-2 text-foreground group-has-[#pricing-annually:checked]:hidden">
                  <span class="text-5xl font-normal leading-none tracking-tight line-through decoration-2">$5k</span>
                  <span class="text-sm leading-[2em] text-foreground/40">/month</span>
                </span>
                <span class="hidden items-end gap-2 text-foreground group-has-[#pricing-annually:checked]:inline-flex">
                  <span class="text-5xl font-normal leading-none tracking-tight line-through decoration-2">$60k</span>
                  <span class="text-sm leading-[2em] text-foreground/40">/year</span>
                </span>
              </p>
            </div>
          </div>

          <ul class="grid gap-3">
            <li class="flex gap-3 text-sm leading-snug">
              <PhCheck class="mt-0.5 size-4 shrink-0" weight="regular" aria-hidden="true" />
              <span>Worth it, if you can afford it.</span>
            </li>
            <li class="flex gap-3 text-sm leading-snug">
              <PhCheck class="mt-0.5 size-4 shrink-0" weight="regular" aria-hidden="true" />
              <span>Needs onboarding before they know where the job details live</span>
            </li>
            <li class="flex gap-3 text-sm leading-snug">
              <PhCheck class="mt-0.5 size-4 shrink-0" weight="regular" aria-hidden="true" />
              <span>Works the hours you pay for, not whenever a quote goes quiet</span>
            </li>
            <li class="flex gap-3 text-sm leading-snug">
              <PhCheck class="mt-0.5 size-4 shrink-0" weight="regular" aria-hidden="true" />
              <span>Still needs you to explain the customer, invoice, and promise</span>
            </li>
            <li class="flex gap-3 text-sm leading-snug">
              <PhCheck class="mt-0.5 size-4 shrink-0" weight="regular" aria-hidden="true" />
              <span>Comes with payroll, tools, taxes, and meetings about the work</span>
            </li>
          </ul>
        </div>
      </article>

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
                <span>Watches overdue invoices, quiet estimates, and missed follow-ups</span>
              </li>
              <li class="flex gap-3 text-sm leading-snug">
                <PhCheck class="mt-0.5 size-4 shrink-0" weight="regular" aria-hidden="true" />
                <span>Drafts replies and next steps for approval</span>
              </li>
              <li class="flex gap-3 text-sm leading-snug">
                <PhCheck class="mt-0.5 size-4 shrink-0" weight="regular" aria-hidden="true" />
                <span>Keeps receipts attached to the work Remi prepares</span>
              </li>
              <li class="flex gap-3 text-sm leading-snug">
                <PhCheck class="mt-0.5 size-4 shrink-0" weight="regular" aria-hidden="true" />
                <span>Works across the everyday tools your business already uses</span>
              </li>
            </ul>
          </div>

          <Button href="https://remi.new/login" class="mt-12 w-full" size="lg">
            <span class="inline-flex items-center gap-2">
              <span>Get Remi Pro</span>
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
                For busier teams with more open loops, more customers, and more work in motion.
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
                <span>More monthly work capacity for heavier follow-through</span>
              </li>
              <li class="flex gap-3 text-sm leading-snug">
                <PhCheck class="mt-0.5 size-4 shrink-0" weight="regular" aria-hidden="true" />
                <span>Better fit for teams with multiple active jobs or accounts</span>
              </li>
              <li class="flex gap-3 text-sm leading-snug">
                <PhCheck class="mt-0.5 size-4 shrink-0" weight="regular" aria-hidden="true" />
                <span>Same approval-first workflow and receipt trail</span>
              </li>
              <li class="flex gap-3 text-sm leading-snug">
                <PhCheck class="mt-0.5 size-4 shrink-0" weight="regular" aria-hidden="true" />
                <span>Capacity add-ons persist until used when a busy month spikes</span>
              </li>
            </ul>
          </div>

          <Button href="https://remi.new/login" class="mt-12 w-full" size="lg">
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
