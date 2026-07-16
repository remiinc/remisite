<script setup>
import { cn } from '../../lib/cn'
import Button from '../global/button.vue'

const comparisonRows = [
  {
    label: 'Late invoices',
    usual: 'You become the bad guy when a customer still owes money and the day has already moved on.',
    remi: 'Remi finds the stale invoice, drafts the chase, and shows the invoice and thread behind it.',
  },
  {
    label: 'Quiet quotes',
    usual: 'The estimate sits in a text thread while the customer hires whoever answers first.',
    remi: 'Remi brings the quote back, writes the follow-up, and waits for your yes before it goes out.',
  },
  {
    label: 'Client promises',
    usual: 'Approvals, photos, receipts, and scope changes live across apps and your memory.',
    remi: 'Remi remembers what was agreed and ties the next step back to the source.',
  },
  {
    label: 'What needs doing',
    usual: 'You open every app to figure out what changed, what is due, and who is waiting.',
    remi: 'Remi watches the business side and speaks first when there is useful work to move.',
  },
  {
    label: 'Control',
    usual: 'Handing work off feels risky because the details are scattered and the stakes are yours.',
    remi: 'Remi prepares the work with proof. You approve what customers see.',
  },
]

const rowBaseClasses = cn(
  'border-b border-border last:border-b-0',
  'transition-colors duration-150 hover:bg-foreground/[0.025]',
)
</script>

<template>
  <section id="why-remi" :class="cn('w-full scroll-mt-24 px-6 py-24')" data-section-why-remi>
    <div :class="cn('mx-auto flex w-full max-w-(--content-width) flex-col items-center gap-12')">
      <div :class="cn('flex w-full max-w-3xl flex-col items-start gap-4 self-start text-left')">
        <h2 :class="cn('w-full text-4xl font-normal leading-none tracking-tight text-balance text-foreground')">
         Run your business from your phone
        </h2>
        <p :class="cn('w-full max-w-2xl text-base leading-normal text-pretty text-foreground/50')">
          Running a small business comes with a second job: remembering, chasing, sorting, and cleaning up
          everything that piles up behind the real work. Remi does it for you.
        </p>
      </div>

      <div :class="cn('hidden w-full overflow-hidden rounded-3xl border border-border bg-background md:block')">
        <div :class="cn('grid grid-cols-[1.15fr_1fr_1fr] border-b border-border')">
          <div :class="cn('px-6 py-5')" />
          <div :class="cn('flex min-w-0 items-start px-6 py-5')">
            <span :class="cn('text-base font-medium leading-tight text-foreground')">
              Without Remi
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

      <div :class="cn('flex w-full flex-col overflow-hidden rounded-3xl border border-border bg-background md:hidden')">
        <div :class="cn('grid grid-cols-2 border-b border-border')">
          <div :class="cn('flex min-w-0 items-start px-5 py-4')">
            <span :class="cn('text-sm font-medium leading-tight text-foreground')">
              Without Remi
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

      <Button href="https://remi.new/login">Get Started</Button>
    </div>
  </section>
</template>
