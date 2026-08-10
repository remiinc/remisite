<script setup>
import { PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import cn from '../../lib/cn'
import StaticIphone from '../global/static-iphone.vue'

const incoming = (id, text, delay = 1600) => ({ id, direction: 'incoming', text, delay })
const outgoing = (id, text, delay = 1600) => ({ id, direction: 'outgoing', text, delay })

const scenarios = [
  {
    id: 'money',
    title: 'Get invoices paid faster',
    iconSrc: '/images/icons/section-iphone-invoice.svg',
    color: '#694AFF',
    description: 'Let Remi track & chase invoices to recover late payments.',
    messages: [
      incoming('remi-henderson-late', "henderson's final hit 7 days late. deposit + progress are paid, walkthrough signed, no open questions from sam. first nudge + payment link are ready 💸", 350),
      outgoing('owner-review-it', 'nice. lemme see it', 1800),
      {
        id: 'henderson-invoice-review',
        direction: 'incoming',
        delay: 1400,
        component: 'invoice-review',
        demo: true,
        card: {
          customerName: 'Sam Henderson',
          daysOverdue: 7,
          dueDate: 'August 2',
          invoiceNumber: '#INV-2084',
          originalTotal: '$28,200',
          outstandingBalance: '$9,400',
          paymentHistory: [
            { title: 'Deposit', amount: '$9,400', detail: 'Paid June 12' },
            { title: 'Progress payment', amount: '$9,400', detail: 'Paid July 10' },
            { title: 'Final payment', amount: '$9,400', detail: '7 days overdue' },
          ],
          projectName: 'Kitchen remodel',
          reminderDraft: "Hi Sam, quick reminder that the final $9,400 balance for your kitchen remodel is now 7 days past due. I've attached the invoice and payment link again. Let me know if you need anything from me.",
          verifiedDetails: [
            { label: 'Invoice', value: 'Attached' },
            { label: 'Payments', value: 'Up to date through July 10' },
            { label: 'Dispute', value: 'None recorded' },
          ],
        },
      },
      incoming('remi-invoice-sent', "sent 👍 i'll watch for his reply", 5200),
      incoming('remi-henderson-replied', "sam replied. says he'll pay it this afternoon 👍", 1900),
    ],
  },
  {
    id: 'follow-up',
    title: 'Respond to customers in minutes',
    iconSrc: '/images/icons/section-iphone-flash.svg',
    color: '#FF80EE',
    description: 'Remi manages customer messages and drafts replies for your approval.',
    messages: [
      incoming('remi-drywall-check', "how's the drywall hang going at davis? still wrapping today?", 350),
      outgoing('owner-drywall-update', 'yep. should be done by 3', 1500),
      incoming('remi-inbox-brief', "nice. two new leads came in + mike at ellis asked about the paint start. one lead's a 3,200 sq ft office in franklin 👀", 1600),
      outgoing('owner-prioritize-lead', 'hit the big lead first', 1500),
      incoming('remi-draft-ready', "already pulled the plans + your thursday opening. draft's ready", 1400),
      {
        id: 'bennett-email-review',
        direction: 'incoming',
        delay: 1200,
        component: 'email-review',
        demo: true,
        card: {
          attachments: ['Bennett-office-plans.pdf'],
          ccEmail: 'mark@bennettbuild.com',
          ccName: 'Mark Bennett',
          customerName: 'Lauren Bennett',
          draftParagraphs: [
            'Hi Lauren,',
            'Thanks for reaching out. I looked over the plans and this is the kind of project we handle.',
            'I can walk the space Thursday at 2:30 PM. If that works, send over the site address and I’ll get it on the calendar.',
            'Adam',
          ],
          evidence: ['Incoming email', 'Calendar', 'Service area'],
          incomingMessage: "Hi Adam, we're renovating a 3,200 sq ft office in Franklin and need drywall hung, finished, and painted. Plans are attached. Could you walk it this week?",
          incomingTimestamp: 'Today, 10:18 AM',
          jobName: 'Bennett office',
          recipientEmail: 'lauren@bennettbuild.com',
          senderEmail: 'adam@hallconstruction.com',
          senderName: 'Adam',
          subject: 'Re: Franklin office buildout',
        },
      },
      incoming('remi-lead-reply-sent', "sent 👍 thursday at 2:30 is held till lauren confirms", 5200),
    ],
  },
  {
    id: 'proof',
    title: 'Remember everything',
    iconSrc: '/images/icons/section-iphone-folders.svg',
    color: '#FF5600',
    description: 'Remi keeps track of everything across your business.',
    messages: [
      incoming('remi-dana-dispute', "dana says the fixture upgrade was never approved. she's holding the $6,200 draw", 350),
      outgoing('owner-remembers-approval', "nah she approved it over text before the lowe's run", 1500),
      incoming('remi-links-proof', "found it. june 18 at 7:41pm: “go ahead with the better fixtures.” matched it to the $1,842 lowe's receipt the next morning + the change order 👍", 1700),
      {
        id: 'davis-job-update',
        direction: 'incoming',
        delay: 1300,
        component: 'job-update',
        card: {
          address: '611 Davis Avenue',
          collectedAmount: '$18,600',
          contractAmount: '$34,800',
          customerLabel: 'Dana Reeves',
          dayContext: 'Draw blocked',
          nextMilestone: 'Release $6,200 draw',
          phase: 'Fixture approval + receipt matched',
          progress: 72,
          recentActivity: [
            { id: 'approval', symbol: 'approval', title: 'Dana approved upgrade by text', timestamp: 'Jun 18' },
            { id: 'receipt', symbol: 'receipt', title: "Lowe's receipt matched", timestamp: 'Jun 19' },
            { id: 'record', symbol: 'record', title: 'Change order attached', timestamp: 'Just now' },
          ],
          status: 'Evidence ready',
          title: 'Davis kitchen remodel',
          todayDetail: "Lowe's receipt matched the next morning",
          todayMeta: 'Customer text · June 18, 7:41 PM',
        },
      },
      outgoing('owner-send-dana-proof', 'send her the proof and add it to the job', 1700),
      incoming('remi-dana-draft-ready', 'done. text + receipt are on the job. drafted the reply for dana', 1500),
      {
        id: 'dana-proof-email-review',
        direction: 'incoming',
        delay: 1200,
        component: 'email-review',
        demo: true,
        card: {
          attachments: ['Dana-approval.png', 'Lowes-fixtures-receipt.pdf', 'CO-07-fixture-upgrade.pdf'],
          ccEmail: 'mason@hallconstruction.com',
          ccName: 'Mason Cole',
          customerName: 'Dana Reeves',
          draftParagraphs: [
            'Hi Dana,',
            'I found the approval for the fixture upgrade. Your June 18 text confirms “go ahead with the better fixtures.”',
            "I've attached the approval, the $1,842 Lowe's receipt, and the updated change order. The $6,200 draw remains due.",
            'Adam',
          ],
          evidence: ['Customer text', 'Receipt', 'Job record'],
          incomingMessage: "I never approved the fixture upgrade. I'm not releasing the $6,200 draw until this is sorted out.",
          incomingTimestamp: 'Today, 11:06 AM',
          jobName: 'Davis kitchen',
          recipientEmail: 'dana@reeveshome.com',
          senderEmail: 'adam@hallconstruction.com',
          senderName: 'Adam',
          subject: 'Re: Fixture upgrade approval',
        },
      },
      incoming('remi-dana-proof-sent', "sent. i'll watch the thread + the draw", 5200),
    ],
  },
  {
    id: 'control',
    title: 'Nothing happens without your approval',
    iconSrc: '/images/icons/section-iphone-approval.svg',
    color: '#00DF72',
    description: 'Remi can never take actions in the outside world without your approval.',
    messages: [
      incoming('remi-quote-ready', "caudill bathroom quote is ready. came to $21,800", 350),
      {
        id: 'caudill-quote-review',
        direction: 'incoming',
        delay: 1300,
        component: 'quote-review',
        card: {
          allowances: [
            { title: 'Finish tile', amount: '$2,400', detail: 'Selections above the allowance are added at cost.' },
            { title: 'Plumbing fixtures', amount: '$1,800', detail: 'Unused allowance is credited on the final invoice.' },
          ],
          customerName: 'Bill Caudill',
          exclusions: [
            'Structural repairs discovered after demolition',
            'Painting outside the primary bathroom',
            'Owner-requested changes after approval',
          ],
          paymentSchedule: [
            { title: 'Deposit', amount: '$6,540', detail: 'Due when the quote is approved' },
            { title: 'Rough-in complete', amount: '$8,720', detail: 'After plumbing and inspection' },
            { title: 'Final payment', amount: '$6,540', detail: 'Due after walkthrough' },
          ],
          projectName: 'Bathroom remodel',
          quoteNumber: '2026-1043',
          schedulingBasis: 'Allow about 3 weeks once selections are confirmed.',
          scopeItems: [
            { title: 'Demolition & disposal', amount: '$2,800', detail: 'Remove existing finishes' },
            { title: 'Plumbing rough-in', amount: '$4,200', detail: 'Relocate shower and vanity' },
            { title: 'Waterproofing & tile labor', amount: '$6,100', detail: 'Shower surround and floor' },
            { title: 'Vanity, fixtures & finish', amount: '$5,500', detail: 'Install customer selections' },
            { title: 'Project management', amount: '$3,200', detail: 'Permits, coordination, cleanup' },
          ],
          title: 'Caudill bathroom quote',
          total: '$21,800',
          validityDays: 14,
        },
      },
      outgoing('owner-revise-quote', 'hold up. tile allowance should be 2400', 1800),
      incoming('remi-hold-quote', 'good catch. updating it. nothing sent', 1400),
    ],
  },
]

const activeScenarioId = ref(scenarios[0].id)
const phoneMockup = ref(null)
const hasStartedPlayback = ref(false)
let playbackObserver = null
let autoAdvanceTimer = null
const activeScenario = computed(
  () => scenarios.find((scenario) => scenario.id === activeScenarioId.value) || scenarios[0],
)
const activeScenarioIndex = computed(() => {
  const index = scenarios.findIndex((scenario) => scenario.id === activeScenarioId.value)

  return index === -1 ? 0 : index
})
const scenarioMidpoint = Math.ceil(scenarios.length / 2)
const leftScenarios = computed(() => scenarios.slice(0, scenarioMidpoint))
const rightScenarios = computed(() => scenarios.slice(scenarioMidpoint))

const setScenarioByOffset = (offset) => {
  const nextIndex = (activeScenarioIndex.value + offset + scenarios.length) % scenarios.length

  activeScenarioId.value = scenarios[nextIndex].id
}

const selectScenario = (scenarioId) => {
  if (autoAdvanceTimer) {
    window.clearTimeout(autoAdvanceTimer)
    autoAdvanceTimer = null
  }

  activeScenarioId.value = scenarioId
}

const handlePlaybackComplete = () => {
  if (!hasStartedPlayback.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  autoAdvanceTimer = window.setTimeout(() => {
    autoAdvanceTimer = null
    setScenarioByOffset(1)
  }, 350)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  if (!('IntersectionObserver' in window) || !phoneMockup.value) {
    hasStartedPlayback.value = true
    return
  }

  playbackObserver = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return

    hasStartedPlayback.value = true
    playbackObserver.disconnect()
    playbackObserver = null
  }, { threshold: 0.3 })

  playbackObserver.observe(phoneMockup.value)
})

onBeforeUnmount(() => {
  playbackObserver?.disconnect()
  if (autoAdvanceTimer) window.clearTimeout(autoAdvanceTimer)
})

const tabClass = (scenario) =>
  cn(
    'group flex w-full flex-col items-start text-left justify-between p-5 md:p-6 lg:p-8 rounded-2xl lg:rounded-3xl text-pretty transition-all duration-300 cursor-pointer',
    'focus-visible:outline-none focus-visible:outline-offset-none',
    'focus-visible:ring-0 focus-visible:ring-offset-0',
    'headline-h5 flex-1',
    activeScenarioId.value === scenario.id
      ? 'bg-foreground text-background'
      : 'bg-muted text-foreground',
  )
</script>

<template>
  <section class="iphone-scroll-section w-full px-6 py-20 lg:py-0 mt-[-10vh]" data-section-iphone>
    <div class="iphone-scroll-sticky lg:sticky lg:grid lg:place-items-center">
      <div
        class="mx-auto grid w-full max-w-(--content-width) grid-cols-1 items-center justify-center sm:gap-x-8 md:gap-x-10 lg:gap-x-12 gap-y-2 sm:grid-cols-[minmax(0,1fr)_minmax(50vw,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)_minmax(0,1fr)]">

        <div
          class="relative z-0 sm:h-full sm:pt-12 lg:pl-12 lg:py-12 order-3 hidden flex-col gap-2 lg:gap-12 lg:order-0 sm:flex sm:col-start-1 sm:row-start-1 lg:col-start-1 lg:row-start-2 lg:self-center lg:*:first:rotate-5 lg:*:last:-rotate-5">
          <button v-for="scenario in leftScenarios" :key="scenario.id" type="button" class="iphone-tab iphone-tab-left"
            data-iphone-tab-left :class="tabClass(scenario)"
            :style="{ '--scenario-color': scenario.color, '--scenario-icon': `url(${scenario.iconSrc})` }"
            @click="selectScenario(scenario.id)">
            <span class="flex flex-col items-start gap-3">
              <span
                class="hidden aspect-3/4 w-[1em] shrink-0 bg-current text-(--scenario-color) mask-(--scenario-icon) mask-center mask-contain mask-no-repeat lg:block"
                aria-hidden="true"></span>
              <span class="leading-tight tracking-tight">
                {{ scenario.title }}
              </span>
            </span>
            <span class="text-sm leading-tight opacity-60">
              {{ scenario.description }}
            </span>
          </button>
        </div>

        <div ref="phoneMockup"
          class="iphone-mockup relative shrink-0 z-10 order-2 mx-auto w-full lg:order-0 sm:col-start-2 sm:row-start-1 sm:row-end-3 lg:col-start-2 lg:row-start-2">
          <StaticIphone :key="`${activeScenarioId}-${hasStartedPlayback ? 'playing' : 'waiting'}`"
            :autoplay="hasStartedPlayback" class="mx-auto w-full" :completion-delay="2200" :font-size="1.075"
            :loop-delay="0" :messages="activeScenario.messages" @playback-complete="handlePlaybackComplete" />
          <div class="mx-auto mt-16 flex w-full max-w-sm flex-col items-center gap-8 sm:hidden">
            <div data-mobile-scenario-card
              class="flex sm:min-h-40 w-full flex-col items-center sm:items-start sm:justify-between rounded-2xl sm:bg-foreground sm:p-5 text-center sm:text-left text-foreground sm:text-background"
              aria-live="polite">
              <span class="flex flex-col items-center sm:items-start gap-3">
                <img :src="activeScenario.iconSrc" alt="" class="hidden h-auto w-[1em] shrink-0 lg:block" aria-hidden="true">
                <span class="headline-h5 mb-2">
                  {{ activeScenario.title }}
                </span>
              </span>
              <span class="text-base sm:text-sm leading-tighter tracking-tight opacity-60">
                {{ activeScenario.description }}
              </span>
            </div>
            <div data-mobile-scenario-controls class="flex items-center justify-center gap-3">
              <button type="button"
                class="flex px-3 py-2 items-center justify-center rounded-full bg-foreground/30 hover:bg-foreground/50 text-background backdrop-blur-sm transition active:scale-95"
                aria-label="Previous message scenario" @click="setScenarioByOffset(-1)">
                <PhCaretLeft class="size-5" weight="bold" aria-hidden="true" />
              </button>
              <button type="button"
                class="flex px-3 py-2 items-center justify-center rounded-full bg-foreground/30 hover:bg-foreground/50 text-background backdrop-blur-sm transition active:scale-95"
                aria-label="Next message scenario" @click="setScenarioByOffset(1)">
                <PhCaretRight class="size-5" weight="bold" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div
          class="relative z-0 sm:h-full sm:pb-12 lg:pr-12 lg:py-12 order-4 hidden flex-col gap-2 lg:gap-12 lg:order-0 sm:flex sm:col-start-1 sm:row-start-2 lg:col-start-3 lg:row-start-2 lg:self-center lg:*:first:-rotate-5 lg:*:last:rotate-5">
          <button v-for="scenario in rightScenarios" :key="scenario.id" type="button"
            class="iphone-tab iphone-tab-right" data-iphone-tab-right :class="tabClass(scenario)"
            :style="{ '--scenario-color': scenario.color, '--scenario-icon': `url(${scenario.iconSrc})` }"
            @click="selectScenario(scenario.id)">
            <span class="flex flex-col items-start gap-4">
              <span
                class="hidden aspect-3/4 w-[1em] shrink-0 bg-current text-(--scenario-color) mask-(--scenario-icon) mask-center mask-contain mask-no-repeat lg:block"
                aria-hidden="true"></span>
              <span>
                {{ scenario.title }}
              </span>
            </span>
            <span class="text-sm leading-tighter tracking-tight opacity-60">
              {{ scenario.description }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (min-width: 1024px) {
  .iphone-scroll-section {
    height: 240vh;
    view-timeline-name: --iphone-section-scroll;
    view-timeline-axis: block;
  }

  .iphone-scroll-sticky {
    top: calc(var(--header-height) - 2em);
    height: calc(100svh - var(--header-height) + 2em);
    min-height: calc(100svh - var(--header-height) + 2em);
  }

  .iphone-tab {
    --iphone-tab-offset: clamp(18rem, 30.5vw, 31rem);
    --iphone-tab-offset-negative: clamp(-31rem, -30.5vw, -18rem);
    transform-origin: center center;
    backface-visibility: hidden;
    will-change: transform;
  }

  .iphone-tab-left:nth-child(1) {
    --iphone-tab-rotate: 5deg;
  }

  .iphone-tab-left:nth-child(2) {
    --iphone-tab-rotate: -5deg;
  }

  .iphone-tab-right:nth-child(1) {
    --iphone-tab-rotate: -5deg;
  }

  .iphone-tab-right:nth-child(2) {
    --iphone-tab-rotate: 5deg;
  }
}

@supports (animation-timeline: view()) {
  @media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
    .iphone-tab {
      animation-duration: 1ms;
      animation-fill-mode: both;
      animation-timing-function: linear(0, 0.024 1%, 0.099 2.2%, 0.591 7.4%, 0.796 10.2%, 0.935 13.3%, 0.981 15.1%, 1.009 17%, 1.022 18.9%, 1.025 21.1%, 1 37.4%, 1);
      animation-timeline: --iphone-section-scroll;
      animation-range: cover 20% cover 75%;
    }

    .iphone-tab-left {
      animation-name: iphone-tab-left-radiate;
    }

    .iphone-tab-right {
      animation-name: iphone-tab-right-radiate;
    }

    .iphone-mockup {
      animation-name: iphone-mockup-pushup;
      animation-timeline: --iphone-section-scroll;
      animation-range: cover 0% cover 100%;
      animation-timing-function: linear;
    }
  }
}

@keyframes iphone-mockup-pushup {
  0% {
    transform: translateY(4cqw);
  }

  100% {
    transform: translateY(-4cqw);
  }
}

@keyframes iphone-tab-left-radiate {
  0% {
    translate: var(--iphone-tab-offset) 0;
    scale: 0.5;
    filter: blur(10px);
    opacity: 0;
    rotate: 0deg;
  }

  100% {
    translate: 0 0;
    scale: 1;
    filter: blur(0px);
    opacity: 1;
    rotate: var(--iphone-tab-rotate);
  }
}

@keyframes iphone-tab-right-radiate {
  0% {
    translate: var(--iphone-tab-offset-negative) 0;
    scale: 0.5;
    filter: blur(10px);
    opacity: 0;
    rotate: 0deg;
  }

  100% {
    translate: 0 0;
    scale: 1;
    filter: blur(0px);
    opacity: 1;
    rotate: var(--iphone-tab-rotate);
  }
}
</style>
