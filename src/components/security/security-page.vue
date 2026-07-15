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

      <section class="px-6 py-12" aria-labelledby="security-operations-title" data-security-operations>
        <div class="mx-auto grid w-full max-w-(--content-width) gap-4 md:grid-cols-3">
          <article class="flex min-h-80 flex-col justify-between rounded-3xl bg-muted p-7">
            <PhClockCounterClockwise class="size-6 text-foreground/60" weight="regular" aria-hidden="true" />
            <div class="flex flex-col gap-3">
              <h2 id="security-operations-title" class="text-2xl font-normal leading-tight tracking-tight">
                Monitored while you work.
              </h2>
              <p class="text-sm leading-normal text-pretty text-foreground/50">
                Production systems are watched for errors, downtime, and unusual patterns so customer work does not
                quietly stall.
              </p>
            </div>
          </article>

          <article class="flex min-h-80 flex-col justify-between rounded-3xl bg-muted p-7">
            <PhSiren class="size-6 text-foreground/60" weight="regular" aria-hidden="true" />
            <div class="flex flex-col gap-3">
              <h3 class="text-2xl font-normal leading-tight tracking-tight">
                Ready when something breaks.
              </h3>
              <p class="text-sm leading-normal text-pretty text-foreground/50">
                Incident response is handled with defined ownership, communication paths, and follow-up so problems
                get resolved cleanly.
              </p>
            </div>
          </article>

          <article class="flex min-h-80 flex-col justify-between rounded-3xl bg-muted p-7">
            <PhFileLock class="size-6 text-foreground/60" weight="regular" aria-hidden="true" />
            <div class="flex flex-col gap-3">
              <h3 class="text-2xl font-normal leading-tight tracking-tight">
                Prepared for review.
              </h3>
              <p class="text-sm leading-normal text-pretty text-foreground/50">
                If your team needs details for vendor review, we can walk through the architecture, data handling,
                and controls that matter.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section class="px-6 py-20 md:py-28" aria-labelledby="security-review-title" data-security-review>
        <div
          class="mx-auto grid w-full max-w-(--content-width) overflow-hidden rounded-3xl bg-foreground text-background lg:grid-cols-[1.1fr_0.9fr]">
          <div class="flex min-h-120 flex-col justify-between gap-12 p-8 md:p-10 lg:p-12">
            <div class="flex flex-col gap-5">
              <p class="text-sm font-medium leading-none text-background/45">
                Security review
              </p>
              <h2 id="security-review-title"
                class="max-w-[13ch] text-5xl font-normal leading-none tracking-tight text-balance">
                Need the careful version?
              </h2>
            </div>

            <p class="max-w-xl text-lg leading-normal text-pretty text-background/55">
              Send the questions. We will help with the practical details: what Remi can access, where data moves,
              how approvals work, and how your team can keep control.
            </p>
          </div>

          <div
            class="flex flex-col justify-between gap-10 border-t border-background/10 p-8 md:p-10 lg:border-l lg:border-t-0 lg:p-12">
            <ul class="grid gap-4">
              <li v-for="item in reviewItems" :key="item"
                class="flex items-start gap-3 text-base leading-snug text-background/75">
                <PhCheck class="mt-0.5 size-4 shrink-0 text-background" weight="bold" aria-hidden="true" />
                <span>{{ item }}</span>
              </li>
            </ul>

            <a :class="cn(
              'inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-background px-5 text-sm font-medium leading-none text-foreground transition-opacity duration-200 hover:opacity-90',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/60 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground'
            )" href="mailto:security@remi.new">
              <span>Contact security</span>
              <PhArrowRight class="size-4" weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section class="px-6 py-12" aria-labelledby="security-demo-title" data-security-demo-cta>
        <div class="mx-auto flex w-full max-w-(--content-width) flex-col items-start justify-between gap-10 rounded-3xl bg-muted p-8 md:p-10 lg:flex-row lg:items-end lg:p-12">
          <div class="flex max-w-2xl flex-col gap-4">
            <h2 id="security-demo-title" class="text-4xl font-normal leading-none tracking-tight text-balance text-foreground md:text-5xl">
              Serious about security?
            </h2>
            <p class="text-lg leading-normal text-pretty text-foreground/55">
              Book a demo to see Remi in action.
            </p>
          </div>

          <Button href="/qualify" size="lg">
            <span class="inline-flex items-center gap-2">
              <span>Book a demo</span>
              <PhArrowRight class="size-4" weight="bold" aria-hidden="true" />
            </span>
          </Button>
        </div>
      </section>

      <SectionCta />
    </main>

    <GlobalFooter />
  </div>
</template>
