<script setup>
import {
  PhArrowRight,
  PhCheck,
  PhClockCounterClockwise,
  PhDatabase,
  PhEye,
  PhFileLock,
  PhKey,
  PhLockSimple,
  PhShieldCheck,
} from '@phosphor-icons/vue'
import Button from '../global/button.vue'
import GlobalFooter from '../global/global-footer.vue'
import GlobalHeader from '../header/global-header.vue'
import SectionCta from '../sections/section-cta.vue'
import SectionFaq from '../sections/section-faq.vue'

if (typeof document !== 'undefined') {
  document.title = 'Security | Remi'
}

const controlPromises = [
  {
    title: 'You choose the access',
    description: 'Remi only works with the tools, sources, and permission scopes you connect.',
    icon: PhDatabase,
  },
  {
    title: 'Important actions need authority',
    description: 'A direct request, your review, or a standing approval must exist before Remi acts.',
    icon: PhShieldCheck,
  },
  {
    title: 'You can change your mind',
    description: 'Limit or revoke connections and standing permissions anytime.',
    icon: PhClockCounterClockwise,
  },
  {
    title: 'You can see what happened',
    description: 'Important work keeps its source, approval, and execution record attached.',
    icon: PhEye,
  },
]

const authoritySteps = [
  {
    number: '01',
    title: 'Connect',
    description: 'You choose the source and the permissions Remi receives.',
  },
  {
    number: '02',
    title: 'Prepare',
    description: 'Remi reads, organizes, checks, or drafts the work inside those boundaries.',
  },
  {
    number: '03',
    title: 'Authorize',
    description: 'Your request, review, or standing approval defines exactly what can happen next.',
  },
  {
    number: '04',
    title: 'Act',
    description: 'The connected provider performs only the action covered by that authority.',
  },
  {
    number: '05',
    title: 'Record',
    description: 'The source, approval, and result stay available so the work can be checked later.',
  },
]

const safeguardRows = [
  {
    area: 'Encryption',
    detail: 'Data is protected in transit. Sensitive credentials and stored secrets are encrypted at rest.',
    remi: 'Messages, job notes, invoices, receipts, and connected-app data move through encrypted channels.',
    icon: PhLockSimple,
  },
  {
    area: 'Workspace separation',
    detail: 'Authentication, access controls, and tenant boundaries separate one workspace from another.',
    remi: 'Remi uses the identity and permissions attached to your workspace instead of treating every connection alike.',
    icon: PhKey,
  },
  {
    area: 'AI provider handling',
    detail: 'Customer content is not used to train generalized AI models unless you separately agree in writing.',
    remi: 'We route the context needed for the task and require providers to honor available no-training commitments.',
    icon: PhFileLock,
  },
  {
    area: 'Monitoring and records',
    detail: 'Production systems are monitored for availability, errors, abuse signals, and unusual behavior.',
    remi: 'Important actions create records that help us trace what was requested, approved, and executed.',
    icon: PhEye,
  },
  {
    area: 'Retention and deletion',
    detail: 'Retention varies by data type, workspace settings, and applicable agreements.',
    remi: 'You can revoke connected access and request deletion. Limited records may remain in backups, logs, billing, or audit systems.',
    icon: PhFileLock,
  },
]

const reviewItems = [
  'What Remi can access',
  'How your data is protected',
  'When Remi needs your approval',
  'How to change or revoke access',
]

const securityLinks = [
  { label: 'Privacy policy', href: 'https://remi.new/privacy' },
  { label: 'Terms of service', href: 'https://remi.new/terms' },
  { label: 'Report a security issue', href: 'mailto:ops@remi.new?subject=Security%20issue' },
]
</script>

<template>
  <div class="min-h-svh bg-background text-foreground">
    <GlobalHeader theme="light" />

    <main>
      <section
        class="px-6 pb-4 pt-[calc(var(--header-height)+4rem)] md:pb-8 md:pt-[calc(var(--header-height)+5rem)]"
        data-security-hero
      >
        <div class="mx-auto grid w-full max-w-(--content-width) gap-12 md:grid-cols-[1.08fr_0.92fr]">
          <div class="flex flex-col items-center gap-6 py-12 text-center md:items-start md:text-left">
            <p class="flex items-center gap-4 text-xs font-medium leading-none text-muted-foreground">
              <span class="uppercase text-foreground">Security</span>
              <span class="tracking-tight">Built around your control.</span>
            </p>
            <h1 class="max-w-[19ch] text-5xl font-normal leading-none tracking-tight text-balance md:text-6xl lg:text-7xl">
              You decide what Remi can see, prepare, and do.
            </h1>
            <p class="max-w-xl text-lg leading-normal text-balance text-muted-foreground">
              Remi starts by asking. You choose the connections, approve important actions, and decide when Remi has
              earned more responsibility.
            </p>
          </div>

          <figure
            class="h-auto w-full overflow-hidden rounded-3xl bg-muted aspect-2/1 md:h-full md:aspect-auto"
            aria-hidden="true"
          />
        </div>
      </section>

      <section class="px-6 py-20" aria-label="Your controls" data-security-controls>
        <div class="mx-auto grid w-full max-w-(--content-width) gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
          <article v-for="control in controlPromises" :key="control.title" class="flex flex-col items-start gap-6">
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

      <section class="scroll-mt-24 px-6 py-12" aria-labelledby="security-authority-title" data-security-authority>
        <div class="mx-auto grid w-full max-w-(--content-width) gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <div class="rounded-3xl bg-foreground p-8 text-background md:p-10">
            <div class="flex h-full min-h-120 flex-col justify-between gap-12">
              <div class="flex flex-col gap-5">
                <PhShieldCheck class="size-6 text-background" weight="fill" aria-hidden="true" />
                <h2 id="security-authority-title" class="max-w-[13ch] text-4xl font-normal leading-none tracking-tight text-balance">
                  You stay in control of every important action.
                </h2>
              </div>
              <p class="max-w-md text-base leading-normal text-pretty text-background/80">
                Permission is not a blanket switch. Remi moves through a visible chain from connected source to
                authorized action, with the result kept on the record.
              </p>
            </div>
          </div>

          <ol class="overflow-hidden rounded-3xl border border-border bg-background px-6 md:px-8">
            <li
              v-for="step in authoritySteps"
              :key="step.number"
              class="grid grid-cols-[3rem_1fr] gap-4 border-b border-border py-6 last:border-b-0"
            >
              <span class="text-sm tabular-nums text-foreground/35">{{ step.number }}</span>
              <div class="grid gap-2 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <h3 class="text-base font-medium leading-tight tracking-tight">{{ step.title }}</h3>
                <p class="max-w-lg text-sm leading-normal text-pretty text-foreground/55">{{ step.description }}</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section class="px-6 py-20 md:py-28" aria-labelledby="security-safeguards-title" data-security-safeguards>
        <div class="mx-auto flex w-full max-w-(--content-width) flex-col gap-12">
          <div class="flex max-w-4xl flex-col items-start gap-5">
            <h2 id="security-safeguards-title" class="max-w-[18ch] text-5xl font-normal leading-none tracking-tight text-balance">
              Built to protect your business data.
            </h2>
            <p class="max-w-xl text-base leading-normal text-pretty text-foreground/50">
              We use narrow access, encryption, workspace separation, and monitoring to protect the data Remi handles.
            </p>
          </div>

          <div class="overflow-hidden rounded-3xl border border-border bg-background">
            <div class="hidden grid-cols-[0.7fr_1fr_1fr] border-b border-border text-sm font-medium text-foreground md:grid">
              <div class="px-6 py-5">Protection</div>
              <div class="px-6 py-5">What we do</div>
              <div class="px-6 py-5">What it means for you</div>
            </div>

            <div>
              <article
                v-for="row in safeguardRows"
                :key="row.area"
                class="grid gap-4 border-b border-border px-6 py-6 last:border-b-0 md:grid-cols-[0.7fr_1fr_1fr] md:gap-0 md:px-0 md:py-0"
              >
                <h3 class="flex items-center gap-3 text-base font-medium leading-tight text-foreground md:px-6 md:py-6">
                  <component :is="row.icon" class="size-4 shrink-0 text-foreground/55" weight="regular" aria-hidden="true" />
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
        <div class="mx-auto grid w-full max-w-(--content-width) overflow-hidden rounded-3xl bg-foreground text-background lg:grid-cols-[1.1fr_0.9fr]">
          <div class="flex flex-col justify-between gap-12 p-8 md:p-10 lg:p-12">
            <h2 id="security-review-title" class="max-w-[13ch] text-5xl font-normal leading-none tracking-tight text-balance">
              Need the security details?
            </h2>

            <Button
              href="/start"
              size="default"
              variant="white"
              class="w-fit"
              data-marketing-cta="security_ask_remi"
              data-marketing-destination="linq"
            >
              <span class="inline-flex items-center gap-2">
                <span>Ask Remi about Security</span>
                <PhArrowRight class="size-4" weight="bold" aria-hidden="true" />
              </span>
            </Button>
          </div>

          <div class="flex flex-col justify-between gap-8 p-8 md:p-10 lg:p-12">
            <div>
              <span class="block">Ask Remi about security.</span>
              <span class="block text-background/50">
                Remi can explain what access is needed, how your data is handled, and when your approval is required.
              </span>
            </div>

            <ul class="grid gap-2">
              <li v-for="item in reviewItems" :key="item" class="flex items-start gap-3 text-base leading-snug text-background">
                <PhCheck class="mt-0.5 size-4 shrink-0 text-background" weight="bold" aria-hidden="true" />
                <span>{{ item }}</span>
              </li>
            </ul>

            <nav class="flex flex-wrap gap-x-5 gap-y-2 border-t border-background/15 pt-6" aria-label="Security resources">
              <a
                v-for="link in securityLinks"
                :key="link.label"
                :href="link.href"
                class="text-sm text-background/55 transition-colors hover:text-background"
              >
                {{ link.label }}
              </a>
            </nav>
          </div>
        </div>
      </section>

      <SectionFaq type="security" />

      <SectionCta />
    </main>

    <GlobalFooter />
  </div>
</template>
