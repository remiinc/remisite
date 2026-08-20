<script setup>
import {
  PhArrowDown,
  PhArrowRight,
  PhBrain,
  PhCheck,
  PhCircle,
  PhClock,
  PhLink,
  PhSparkle,
} from '@phosphor-icons/vue'
import { onBeforeUnmount, ref } from 'vue'
import Button from '../global/button.vue'
import GlobalFooter from '../global/global-footer.vue'
import GlobalHeader from '../header/global-header.vue'

const originalTitle = typeof document !== 'undefined' ? document.title : ''

const inProgress = [
  {
    status: 'Onboarding',
    title: 'A faster first win',
    description: 'Remi should take useful work off your plate before setup starts feeling like work of its own.',
    outcome: 'Start with a real ask. Connect only what the job needs. See useful work come back sooner.',
    icon: PhSparkle,
    work: [
      'Fewer questions before the first useful result',
      'A clearer handoff from text to completed work',
      'Better starter value before every tool is connected',
    ],
  },
  {
    status: 'Memory',
    title: 'Sharper job memory',
    description: 'The right details should come back when they matter—not every stray thing you have ever said.',
    outcome: 'Names, promises, preferences, and open loops stay attached to the work they belong to.',
    icon: PhBrain,
    work: [
      'Stronger recall across separate conversations',
      'Less repetition when a job picks back up',
      'Cleaner boundaries around what gets remembered',
    ],
  },
  {
    status: 'Connections',
    title: 'More ways to hand off work',
    description: 'Remi should meet the tools already running your business without turning you into the integration department.',
    outcome: 'Connect once, hand off naturally, and know exactly what Remi did on the other side.',
    icon: PhLink,
    work: [
      'Simpler connections with fewer duplicate setups',
      'Clearer previews before work leaves Messages',
      'Receipts that show what happened and where',
    ],
  },
]

const releases = [
  {
    month: 'August 2026',
    entries: [
      {
        date: 'August 20',
        eyebrow: 'Today',
        title: 'Morning briefs are easier to read',
        updates: [
          'Morning briefs now arrive as one clean, scannable iMessage.',
          'You can connect and manage more than one Google account.',
          'New User Scout learns about you—not just your inbox.',
          'Task follow-ups no longer get stuck behind finished conversations.',
        ],
        tags: ['Messages', 'Google', 'Onboarding'],
      },
      {
        date: 'August 19',
        title: 'Remi feels more at home in Messages',
        updates: [
          'Remi can use replies, tapbacks, photos, files, voice notes, polls, and message effects.',
          'You get a quick update while Remi works on something that takes a minute.',
          'Automations stay quiet between 9 PM and 7 AM in your timezone.',
          'Tell Remi to archive an email and it can do it without asking twice.',
          'New User Scout comes back with a clear recommendation and one next step.',
        ],
        tags: ['Messages', 'Automations', 'Email'],
      },
      {
        date: 'August 18',
        title: 'Take over a browser task when Remi needs you',
        updates: [
          'Remi can hand you a live browser for a login or other human-only step, then continue when you hand it back.',
          'The Portal, onboarding, and phone sign-in got a full visual cleanup.',
          'Memory now favors a few relevant, dated facts instead of dumping everything it knows.',
          'Remi notices when you react to one of its messages.',
        ],
        tags: ['Browser', 'Portal', 'Memory'],
      },
      {
        date: 'August 17',
        title: 'Remi remembers the right context in everyday texts',
        updates: [
          'Remi checks relevant, dated memory before ordinary conversations.',
          'Browser tasks recover when a button moves or a page changes.',
          'Replies carry the message you quoted, so Remi knows what you mean.',
          'If a subscription payment needs attention, Remi texts once and confirms when it is fixed.',
        ],
        tags: ['Memory', 'Browser', 'Messages'],
      },
      {
        date: 'August 16',
        title: 'Remi can handle real browser work',
        updates: [
          'Browser sessions can stay open across approvals and multiple tabs.',
          'Remi can download files and—with your approval—upload the ones you choose.',
          'New accounts start with three useful automations ready to go.',
          'Work from connected tools stays tied to the right account and source.',
        ],
        tags: ['Browser', 'Automations', 'Connections'],
      },
      {
        date: 'August 15',
        title: 'Memory and scheduling got more dependable',
        updates: [
          'Remi keeps useful details after a conversation and can find exact wording later.',
          'Onboarding asks you to confirm your timezone before anything gets scheduled.',
          'Automations retry temporary problems quietly instead of dumping errors into Messages.',
          'Phone sign-in and onboarding recovery are more reliable.',
        ],
        tags: ['Memory', 'Scheduling', 'Reliability'],
      },
      {
        date: 'August 14',
        title: 'You can start using Remi without Google',
        updates: [
          'Skip Google and still finish setup with your phone number.',
          'Onboarding focuses on Remi’s first useful piece of work—not another long welcome.',
          'Remi shows how to turn repeat work into a simple automation.',
          'Early Access usage is treated as fair use, without a confusing credit meter.',
        ],
        tags: ['Onboarding', 'Automations', 'Early Access'],
      },
      {
        date: 'August 13',
        title: 'Connections and Messages are more reliable',
        updates: [
          'Remi confirms a new connection only after it is actually ready.',
          'Replies recover cleanly from temporary delivery problems.',
          'Messages setup works for every eligible account without a hidden manual approval.',
        ],
        tags: ['Connections', 'Messages', 'Reliability'],
      },
    ],
  },
]

const expandedEntries = ref(new Set(['August 20']))

const toggleEntry = (date) => {
  const next = new Set(expandedEntries.value)
  if (next.has(date)) next.delete(date)
  else next.add(date)
  expandedEntries.value = next
}

if (typeof document !== 'undefined') {
  const title = "What's new | Remi"
  const description = 'The latest improvements to Remi, the teammate that keeps your business moving.'
  const canonicalUrl = 'https://hireremi.ai/whats-new'

  document.title = title
  document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl)
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl)
  document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title)
  document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description)
}

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') document.title = originalTitle
})
</script>

<template>
  <div class="whats-new-page min-h-svh bg-background text-foreground">
    <GlobalHeader theme="light" />

    <main>
      <section class="relative overflow-hidden px-6 pb-20 pt-[calc(var(--header-height)+5rem)] md:pb-28 md:pt-[calc(var(--header-height)+7rem)]">
        <div class="whats-new-glow whats-new-glow--blue" aria-hidden="true"></div>
        <div class="whats-new-glow whats-new-glow--green" aria-hidden="true"></div>

        <div class="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <p class="mb-7 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.08em] text-theme-blue">
            <PhSparkle class="size-3.5" weight="fill" aria-hidden="true" />
            Changelog
          </p>
          <h1 class="headline-h1 max-w-[12ch] text-balance">Remi keeps getting better.</h1>
          <p class="mt-7 max-w-2xl text-lg leading-normal text-pretty text-muted-foreground md:text-xl">
            New ways Remi helps you win work, keep jobs moving, and get home with less admin hanging over you.
          </p>
          <Button href="#latest" size="lg" class="mt-10">
            <span class="flex items-center gap-2">
              See what shipped
              <PhArrowDown class="size-4" aria-hidden="true" />
            </span>
          </Button>
        </div>
      </section>

      <section class="px-6 pb-24 md:pb-32" aria-labelledby="in-progress-title" data-in-progress>
        <div class="mx-auto max-w-5xl">
          <div class="mb-12 max-w-3xl">
            <div class="mb-6 flex items-center gap-3">
              <span class="relative flex size-2.5" aria-hidden="true">
                <span class="absolute inline-flex size-full animate-ping rounded-full bg-theme-blue opacity-50 motion-reduce:animate-none"></span>
                <span class="relative inline-flex size-2.5 rounded-full bg-theme-blue"></span>
              </span>
              <p class="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">In the works</p>
            </div>
            <h2 id="in-progress-title" class="headline-h2 text-balance">
              What we're building now.<br>
              <span class="text-foreground/40">And what better looks like.</span>
            </h2>
          </div>

          <div class="grid gap-2 sm:gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <article class="flex min-h-144 flex-col justify-between rounded-3xl bg-foreground p-7 text-background sm:p-10 lg:row-span-2">
              <div>
                <div class="flex items-center justify-between gap-4">
                  <span class="inline-flex items-center gap-2 rounded-full bg-background/8 px-3 py-1.5 text-xs font-medium text-current/70">
                    <PhClock class="size-3.5 text-theme-blue" weight="bold" aria-hidden="true" />
                    {{ inProgress[0].status }}
                  </span>
                  <component :is="inProgress[0].icon" class="size-5 text-current/35" weight="fill" aria-hidden="true" />
                </div>

                <h3 class="headline-h3 mt-12 max-w-[10ch] text-balance">{{ inProgress[0].title }}</h3>
                <p class="mt-5 max-w-lg text-base leading-normal text-pretty text-current/55">
                  {{ inProgress[0].description }}
                </p>

                <div class="mt-10 rounded-2xl bg-background/6 p-5 sm:p-6">
                  <p class="text-xs font-medium uppercase tracking-[0.08em] text-current/40">What good looks like</p>
                  <p class="mt-3 max-w-md text-lg leading-snug text-pretty text-current/90">
                    {{ inProgress[0].outcome }}
                  </p>
                </div>
              </div>

              <div class="mt-12">
                <p class="mb-5 text-xs font-medium uppercase tracking-[0.08em] text-current/40">Working through</p>
                <ul class="divide-y divide-background/10 border-y border-background/10">
                  <li v-for="line in inProgress[0].work" :key="line" class="grid grid-cols-[auto_1fr] gap-3 py-4 text-sm leading-normal text-current/70">
                    <PhCircle class="mt-1 size-2.5 text-theme-blue" weight="fill" aria-hidden="true" />
                    {{ line }}
                  </li>
                </ul>
              </div>
            </article>

            <article v-for="item in inProgress.slice(1)" :key="item.title" class="flex min-h-72 flex-col justify-between rounded-3xl bg-muted p-7 sm:p-8">
              <div>
                <div class="flex items-center justify-between gap-4">
                  <span class="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <span class="size-1.5 rounded-full bg-theme-green" aria-hidden="true"></span>
                    {{ item.status }}
                  </span>
                  <component :is="item.icon" class="size-5 text-foreground/25" weight="fill" aria-hidden="true" />
                </div>

                <h3 class="headline-h5 mt-8 max-w-[16ch] text-balance">{{ item.title }}</h3>
                <p class="mt-3 max-w-xl text-sm leading-normal text-pretty text-foreground/50">
                  {{ item.description }}
                </p>
              </div>

              <div class="mt-10 border-t border-foreground/8 pt-5">
                <p class="text-xs font-medium uppercase tracking-[0.08em] text-foreground/35">What good looks like</p>
                <p class="mt-2 max-w-xl text-sm leading-normal text-pretty text-foreground/75">
                  {{ item.outcome }}
                </p>
                <ul class="mt-5 space-y-2.5">
                  <li v-for="line in item.work" :key="line" class="grid grid-cols-[auto_1fr] gap-2.5 text-xs leading-normal text-foreground/45">
                    <PhCheck class="mt-0.5 size-3 text-theme-green" weight="bold" aria-hidden="true" />
                    {{ line }}
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="latest" class="scroll-mt-24 px-6 pb-28 md:pb-36" aria-labelledby="latest-title">
        <div class="mx-auto max-w-5xl">
          <div class="mb-12 border-b border-foreground/10 pb-6">
            <div>
              <p class="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">Release notes</p>
              <h2 id="latest-title" class="headline-h3">Fresh off the truck.</h2>
            </div>
          </div>

          <div class="space-y-20">
            <section v-for="release in releases" :key="release.month" :aria-labelledby="`month-${release.month}`">
              <div class="grid gap-8 md:grid-cols-[11rem_1fr] md:gap-12">
                <h3 :id="`month-${release.month}`" class="text-sm font-medium text-muted-foreground md:sticky md:top-28 md:self-start">
                  {{ release.month }}
                </h3>

                <div class="divide-y divide-foreground/10 border-t border-foreground/10">
                  <article v-for="entry in release.entries" :key="entry.date" class="group">
                    <button type="button" class="release-toggle grid w-full cursor-pointer grid-cols-[1fr_auto] gap-5 py-7 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring md:grid-cols-[7rem_1fr_auto] md:gap-8 md:py-8" :aria-expanded="expandedEntries.has(entry.date)" @click="toggleEntry(entry.date)">
                      <div class="hidden md:block">
                        <p class="text-sm text-muted-foreground">{{ entry.date }}</p>
                        <p v-if="entry.eyebrow" class="mt-2 inline-flex rounded-full bg-theme-blue/10 px-2 py-1 text-[0.65rem] font-medium uppercase tracking-[0.08em] text-theme-blue">{{ entry.eyebrow }}</p>
                      </div>
                      <div class="min-w-0">
                        <p class="mb-3 text-xs text-muted-foreground md:hidden">{{ entry.date }}</p>
                        <h4 class="headline-h5 max-w-2xl text-balance transition-colors group-hover:text-theme-blue">{{ entry.title }}</h4>
                      </div>
                      <span class="release-toggle__icon mt-1 flex size-9 items-center justify-center rounded-full border border-foreground/10">
                        <PhArrowRight :class="['size-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none', expandedEntries.has(entry.date) && 'rotate-90']" aria-hidden="true" />
                      </span>
                    </button>

                    <div :class="['grid transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none', expandedEntries.has(entry.date) ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0']">
                      <div class="overflow-hidden">
                        <div class="pb-8 md:ml-[9rem]">
                          <ul class="max-w-2xl space-y-3" aria-label="Changes shipped">
                            <li v-for="update in entry.updates" :key="update" class="grid grid-cols-[auto_1fr] gap-3 text-sm leading-normal text-muted-foreground md:text-base">
                              <PhCircle class="mt-1.5 size-2.5 text-theme-blue" weight="fill" aria-hidden="true" />
                              {{ update }}
                            </li>
                          </ul>
                          <ul class="mt-6 flex flex-wrap gap-2" aria-label="Release categories">
                            <li v-for="tag in entry.tags" :key="tag" class="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium">
                              <PhCheck class="size-3 text-theme-green" weight="bold" aria-hidden="true" />
                              {{ tag }}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>

    <GlobalFooter />
  </div>
</template>

<style scoped>
.whats-new-page {
  scroll-behavior: smooth;
}

.release-toggle {
  transition: transform 140ms cubic-bezier(0.23, 1, 0.32, 1);
}

.release-toggle:active {
  transform: scale(0.99);
}

.release-toggle__icon {
  transition:
    background-color 180ms ease,
    border-color 180ms ease,
    transform 140ms cubic-bezier(0.23, 1, 0.32, 1);
}

.release-toggle:active .release-toggle__icon {
  transform: scale(0.94);
}

@media (hover: hover) and (pointer: fine) {
  .release-toggle:hover .release-toggle__icon {
    border-color: color-mix(in oklch, var(--color-theme-blue) 30%, transparent);
    background-color: color-mix(in oklch, var(--color-theme-blue) 10%, transparent);
  }
}

.whats-new-glow {
  position: absolute;
  border-radius: 999px;
  filter: blur(10px);
  opacity: 0.18;
  pointer-events: none;
}

.whats-new-glow--blue {
  top: 3rem;
  left: 10%;
  width: min(34rem, 65vw);
  height: 20rem;
  background: radial-gradient(circle, color-mix(in oklch, var(--color-theme-blue) 48%, transparent) 0%, transparent 70%);
  transform: rotate(-12deg);
}

.whats-new-glow--green {
  top: 7rem;
  right: 7%;
  width: min(30rem, 58vw);
  height: 22rem;
  background: radial-gradient(circle, color-mix(in oklch, var(--color-theme-green) 32%, transparent) 0%, transparent 70%);
  transform: rotate(14deg);
}

@media (prefers-reduced-motion: reduce) {
  .whats-new-page *,
  .whats-new-page *::before,
  .whats-new-page *::after {
    scroll-behavior: auto !important;
  }
}
</style>
