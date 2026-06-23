<script setup>
import { cn } from '../../lib/cn'
import Button from '../global/button.vue'

const comparisonRows = [
  {
    label: 'Follow-ups',
    usual: 'You remember who needs a reply after the job, the call, or the rush.',
    remi: 'Remi catches the open loops and helps move the next step before it piles up.',
  },
  {
    label: 'Customer details',
    usual: 'You dig through texts, emails, notes, and docs to remember what was promised.',
    remi: 'Remi keeps the context together, so every customer picks up where you left off.',
  },
  {
    label: 'Paperwork',
    usual: 'Quotes, invoices, summaries, and checklists wait until after hours.',
    remi: 'Remi turns scattered notes into the useful stuff your day needs next.',
  },
  {
    label: 'Daily visibility',
    usual: 'You check every app yourself to see what changed, what is due, and who is waiting.',
    remi: 'Remi gives you the moving pieces in one place, without the morning scavenger hunt.',
  },
  {
    label: 'Mental load',
    usual: 'The business runs on your memory, your reminders, and your late-night cleanup.',
    remi: 'Remi keeps track in the background, so fewer things have to live in your head.',
  },
]

const rowBaseClasses = cn(
  'border-b border-foreground/10 last:border-b-0',
  'transition-colors duration-150 hover:bg-foreground/[0.025]',
)
</script>

<template>
  <section id="why-remi" :class="cn('mx-auto max-w-(--content-width) scroll-mt-24 px-6 py-24')" data-section-why-remi>
    <div :class="cn('mx-auto flex w-full max-w-(--content-width) flex-col items-center gap-12')">
      <div :class="cn('flex w-full max-w-3xl flex-col items-start gap-4 self-start text-left')">
        <h2 :class="cn('w-full text-4xl font-normal leading-none tracking-tight text-balance text-foreground')">
          Why Remi?
        </h2>
        <p :class="cn('w-full max-w-2xl text-base leading-normal text-pretty text-foreground/50')">
          Because running a small business comes with a second job: remembering, chasing, sorting, and cleaning up
          everything that piles up behind the real work.
        </p>
      </div>

      <div :class="cn('hidden w-full overflow-hidden rounded-3xl border border-foreground/10 bg-background md:block')">
        <div :class="cn('grid grid-cols-[1.15fr_1fr_1fr] border-b border-foreground/10')">
          <div :class="cn('px-6 py-5')" />
          <div :class="cn('flex min-w-0 items-start px-6 py-5')">
            <span :class="cn('text-base font-medium leading-tight text-foreground')">
              The usual way
            </span>
          </div>
          <div :class="cn('flex min-w-0 items-start px-6 py-5')">
            <span :class="cn('text-base font-medium leading-tight text-foreground')">
              With Remi
            </span>
          </div>
        </div>

        <div>
          <div
            v-for="row in comparisonRows"
            :key="row.label"
            :class="cn(rowBaseClasses, 'grid min-h-22 grid-cols-[1.15fr_1fr_1fr]')"
          >
            <div :class="cn('flex min-w-0 items-start px-6 py-5')">
              <span :class="cn('text-base font-medium leading-tight text-foreground')">
                {{ row.label }}
              </span>
            </div>
            <div :class="cn('flex min-w-0 items-start px-6 py-5')">
              <span :class="cn('text-base leading-snug text-pretty text-foreground/45')">
                {{ row.usual }}
              </span>
            </div>
            <div :class="cn('flex min-w-0 items-start px-6 py-5')">
              <span :class="cn('text-base leading-snug text-pretty text-foreground/70')">
                {{ row.remi }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div :class="cn('flex w-full flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-background md:hidden')">
        <div :class="cn('grid grid-cols-2 border-b border-foreground/10')">
          <div :class="cn('flex min-w-0 items-start px-5 py-4')">
            <span :class="cn('text-sm font-medium leading-tight text-foreground')">
              Usual way
            </span>
          </div>
          <div :class="cn('flex min-w-0 items-start px-5 py-4')">
            <span :class="cn('text-sm font-medium leading-tight text-foreground')">
              Remi
            </span>
          </div>
        </div>

        <div
          v-for="row in comparisonRows"
          :key="row.label"
          :class="cn(rowBaseClasses, 'flex flex-col')"
        >
          <div :class="cn('flex w-full items-start px-5 pb-0 pt-5')">
            <span :class="cn('text-base font-medium leading-tight text-foreground')">
              {{ row.label }}
            </span>
          </div>
          <div :class="cn('grid w-full grid-cols-2')">
            <div :class="cn('flex min-w-0 items-start px-5 py-5')">
              <span :class="cn('text-sm leading-snug text-pretty text-foreground/45')">
                {{ row.usual }}
              </span>
            </div>
            <div :class="cn('flex min-w-0 items-start px-5 py-5')">
              <span :class="cn('text-sm leading-snug text-pretty text-foreground/70')">
                {{ row.remi }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Button href="/qualify">Get Started</Button>
    </div>
  </section>
</template>
