<script setup>
import {
  PhArrowRight,
  PhCheck,
  PhCloudSlash,
  PhClockCounterClockwise,
  PhDatabase,
  PhEye,
  PhFileLock,
  PhKey,
  PhLockSimple,
  PhShieldCheck,
  PhSiren,
} from '@phosphor-icons/vue'
import { cn } from '../../lib/cn'
import Button from '../global/button.vue'
import GlobalFooter from '../global/global-footer.vue'
import GlobalHeader from '../header/global-header.vue'
import SectionCta from '../sections/section-cta.vue'
import SectionFaq from '../sections/section-faq.vue'
import SectionSecurityPrinciples from '../sections/section-security-principles.vue'

if (typeof document !== 'undefined') {
  document.title = 'Security | Remi'
}

const securityControls = [
  {
    title: 'Limited data access',
    description: 'Remi only works from the sources you connect and the permissions you grant.',
    icon: PhDatabase,
  },
  {
    title: 'No data training',
    description: 'Your business data is not sold, shared for advertising, or used to train AI models.',
    icon: PhCloudSlash,
  },
  {
    title: 'Your records stay yours',
    description: 'Drafts, receipts, source trails, and work history stay tied to your business.',
    icon: PhFileLock,
  },
  {
    title: 'Approval before action',
    description: 'Customer-facing work is prepared for review before anything important leaves.',
    icon: PhShieldCheck,
  },
]

const safeguardRows = [
  {
    area: 'Encryption',
    detail: 'Data is protected in transit and sensitive stored data is encrypted at rest.',
    remi: 'Messages, job notes, invoices, receipts, and connected-app data are handled through encrypted channels.',
    icon: PhLockSimple,
  },
  {
    area: 'Access boundaries',
    detail: 'Remi follows least-privilege access and works only through the permissions your workspace grants.',
    remi: 'Integrations are scoped to the work Remi needs to prepare, remember, or bring back for approval.',
    icon: PhKey,
  },
  {
    area: 'Human review',
    detail: 'High-stakes customer communication is designed around review, approval, and a visible source trail.',
    remi: 'Remi drafts the follow-up and shows the context. You decide what goes out.',
    icon: PhShieldCheck,
  },
  {
    area: 'Monitoring',
    detail: 'Production systems are monitored for availability, errors, and unusual behavior.',
    remi: 'The goal is boring reliability: catch the issue before it becomes your issue.',
    icon: PhEye,
  },
  {
    area: 'Data lifecycle',
    detail: 'Customer data is handled under clear retention, deletion, and access-request processes.',
    remi: 'When your business no longer needs something, it should not live forever by accident.',
    icon: PhFileLock,
  },
]

const reviewItems = [
  'Architecture and data-flow overview',
  'AI provider and subprocessors summary',
  'Encryption, access, and retention details',
  'Security questionnaire support',
]
</script>

<template>
  <div class="min-h-svh bg-background text-foreground">
    <GlobalHeader theme="light" />

    <main>
      <section class="px-6 pb-4 pt-[calc(var(--header-height)+4rem)] md:pb-8 md:pt-[calc(var(--header-height)+5rem)]"
        data-security-hero>
        <div class="mx-auto grid w-full max-w-(--content-width) md:grid-cols-2 gap-12">
          <div class="flex flex-col items-center md:items-start text-center md:text-left gap-6 py-12">
            <p class="text-xs font-medium leading-none text-muted-foreground flex items-center gap-4">
              <span class="uppercase text-foreground">Security</span>
              <span class="tracking-tight">Always on. Always secure.</span>
            </p>
            <h1
              class="max-w-[32ch] text-5xl md:text-6xl font-normal leading-none tracking-tight text-balance lg:text-7xl mb-4">
              Secure by design, careful by default.
            </h1>
            <p class="max-w-2xl text-lg leading-normal text-balance text-muted-foreground">
              Remi can see sensitive business details. We keep that access narrow, logged, and approval-first.
            </p>
          </div>

          <figure class="w-full aspect-2/1 md:aspect-auto h-auto md:h-full bg-muted rounded-3xl overflow-hidden">
          </figure>
        </div>

      </section>

      <section class="px-6 py-20" aria-label="Security controls" data-security-controls>
        <div class="mx-auto grid w-full max-w-(--content-width) gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
          <article v-for="control in securityControls" :key="control.title" class="flex flex-col items-start gap-6">
            <component :is="control.icon" class="size-5 text-foreground" weight="regular" aria-hidden="true" />
            <div class="flex flex-col gap-3">
              <h2 class="text-base font-medium leading-tight tracking-tight text-balance text-foreground">
                {{ control.title }}
              </h2>
              <p class="text-sm leading-normal text-pretty text-foreground/55">
                {{ control.description }}
              </p>
            </div>
          </article>
        </div>
      </section>

      <SectionSecurityPrinciples id="security-principles" />

      <section class="px-6 py-20 md:py-28" aria-labelledby="security-safeguards-title" data-security-safeguards>
        <div class="mx-auto flex w-full max-w-(--content-width) flex-col gap-12">
          <div class="flex max-w-4xl flex-col items-start gap-5">
            <h2 id="security-safeguards-title"
              class="max-w-[20ch] text-5xl font-normal leading-none tracking-tight text-balance">
              Safeguards for every connection, draft, and action.
            </h2>
            <p class="max-w-md text-base leading-normal text-pretty text-foreground/50">
              Remi keeps access narrow, sources visible, and important work ready for review before it leaves.
            </p>
          </div>

          <div class="overflow-hidden rounded-3xl border border-border bg-background">
            <div
              class="hidden grid-cols-[0.7fr_1fr_1fr] border-b border-border text-sm font-medium text-foreground md:grid">
              <div class="px-6 py-5">Area</div>
              <div class="px-6 py-5">Control</div>
              <div class="px-6 py-5">What it means in Remi</div>
            </div>

            <div>
              <article v-for="row in safeguardRows" :key="row.area"
                class="grid gap-4 border-b border-border px-6 py-6 last:border-b-0 md:grid-cols-[0.7fr_1fr_1fr] md:gap-0 md:px-0 md:py-0">
                <h3 class="flex items-center gap-3 text-base font-medium leading-tight text-foreground md:px-6 md:py-6">
                  <component :is="row.icon" class="size-4 shrink-0 text-foreground/55" weight="regular"
                    aria-hidden="true" />
                  <span>{{ row.area }}</span>
                </h3>
                <p class="text-sm leading-normal text-pretty text-foreground/50 md:px-6 md:py-6">
                  {{ row.detail }}
                </p>
                <p class="text-sm leading-normal text-pretty text-foreground/70 md:px-6 md:py-6">
                  {{ row.remi }}
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="px-6 py-8" aria-labelledby="security-review-title" data-security-review>
        <div
          class="mx-auto grid w-full max-w-(--content-width) overflow-hidden rounded-3xl bg-foreground text-background lg:grid-cols-[1.1fr_0.9fr]">
          <div class="flex flex-col justify-between gap-12 p-8 md:p-10 lg:p-12">
            <h2 id="security-review-title"
              class="max-w-[13ch] text-5xl font-normal leading-none tracking-tight text-balance">
              Serious about security?
            </h2>


            <Button href="/start" size="default" variant="white" class="w-fit"
              data-marketing-cta="security_text_remi" data-marketing-destination="linq">
              <span class="inline-flex items-center gap-2">
                <span>Text Remi</span>
                <PhArrowRight class="size-4" weight="bold" aria-hidden="true" />
              </span>
            </Button>
          </div>

          <div class="flex flex-col justify-between gap-4 p-8 md:p-10 lg:p-12">
            <div class="mb-4">
              <span class="block">Ask about security</span>
              <span class="block text-background/50">We'll help you understand what Remi can access, where data moves,
                how approvals work, and how your team can keep control.</span>
            </div>
            <ul class="grid gap-2">
              <li v-for="item in reviewItems" :key="item"
                class="flex items-start gap-3 text-base leading-snug text-background">
                <PhCheck class="mt-0.5 size-4 shrink-0 text-background" weight="bold" aria-hidden="true" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <SectionFaq type="security" />

      <SectionCta />
    </main>

    <GlobalFooter />
  </div>
</template>
