<script setup>
import { PhBrain, PhChatsCircle, PhInvoice, PhListChecks } from '@phosphor-icons/vue'
import { computed, ref } from 'vue'
import cn from '../../lib/cn'
import ComponentIphone from './component-iphone.vue'

const quickActions = {
  notes: {
    label: 'Add to Notes',
    iconSrc: '/images/app-logos/ios-notes-icon.png',
  },
  reminders: {
    label: 'Add to Reminders',
    iconSrc: '/images/app-logos/ios-reminders-icon.png',
  },
}

const incoming = (text, options = {}) => ({ variant: 'incoming', text, ...options })
const outgoing = (text, options = {}) => ({ variant: 'outgoing', text, ...options })
const draft = (preview, approvedReply) => ({ preview, approvedReply })

const scenarios = [
  {
    id: 'money',
    title: 'Get paid',
    icon: PhInvoice,
    description: 'Find overdue invoices and draft the follow-up.',
    messages: [
      incoming('Henderson is 9 days late on the final invoice. They approved the extra work by text on Friday. 💸'),
      outgoing('Is the job marked complete?'),
      incoming('Yes. I found the completion photo and your “all wrapped up” message from 4:12pm. ✅'),
      outgoing('Draft a firm reminder.'),
      incoming('Ready for review. It asks for payment this week and includes the invoice, approval, and completion note. 📎', {
        quickActions: [quickActions.reminders, quickActions.notes],
      }),
    ],
  },
  {
    id: 'follow-up',
    title: 'Respond first',
    icon: PhChatsCircle,
    description: 'Catch missed requests before they go cold.',
    draftWidget: draft(
      'Hi Wilson, I can come by tomorrow at 2:30. Send a photo and I will confirm the scope before I head over.',
      'Approved. I’ll send this to Wilson and keep the estimate thread attached. ✅',
    ),
    messages: [
      incoming('Wilson asked for an estimate at 10:14am. You missed it while you were on the McKay job. 👀'),
      outgoing('Do we have room tomorrow?'),
      incoming('You have 2:30 open. The address is 12 minutes from your last stop. 📍', {
        quickActions: [quickActions.reminders],
      }),
      outgoing('Reply with that.'),
      incoming('Drafted. I offered 2:30 and asked for a photo so you can confirm the scope first. ✍️'),
    ],
  },
  {
    id: 'proof',
    title: 'Remember everything',
    icon: PhBrain,
    description: 'Keep approvals and receipts tied to the work.',
    draftWidget: draft(
      'Hi Dana, I found your June 18 approval for the better fixtures and attached the Lowe’s receipt for the materials.',
      'Approved. I’ll send it with the approval text and receipt attached. ✅',
    ),
    messages: [
      incoming('Before you reply to Dana, they did approve the extra materials. 🧠'),
      outgoing('Where?'),
      incoming('June 18, 7:41pm. Their text says “go ahead with the better fixtures.” Receipt is from Lowe’s the next morning. 🧾', {
        quickActions: [quickActions.notes],
      }),
      outgoing('Put that in the reply.'),
      incoming('Drafted with the exact line and receipt attached, so it does not sound like memory. 📌'),
    ],
  },
  {
    id: 'control',
    title: 'Approve the next step',
    icon: PhListChecks,
    description: 'Review what Remi found before anything goes out.',
    messages: [
      incoming('Three open loops are waiting: one overdue invoice, one unanswered quote, and one client approval. 🔎'),
      outgoing('Show me the money first.'),
      incoming('The overdue invoice is $1,460. The work was approved and delivered last week. 💰'),
      outgoing('Prepare it, but do not send.'),
      incoming('Prepared. I will wait for your approval before anything goes out. 👍', {
        quickActions: [quickActions.reminders],
      }),
    ],
  },
]

const activeScenarioId = ref(scenarios[0].id)
const activeScenario = computed(
  () => scenarios.find((scenario) => scenario.id === activeScenarioId.value) || scenarios[0],
)
const scenarioMidpoint = Math.ceil(scenarios.length / 2)
const leftScenarios = computed(() => scenarios.slice(0, scenarioMidpoint))
const rightScenarios = computed(() => scenarios.slice(scenarioMidpoint))

const tabClass = (scenario) =>
  cn(
    'group flex w-full flex-col items-start text-left justify-between p-5 md:p-6 lg:p-8 rounded-2xl lg:rounded-3xl text-pretty transition-all duration-300 cursor-pointer',
    'focus-visible:outline-none focus-visible:outline-offset-none',
    'focus-visible:ring-0 focus-visible:ring-offset-0',
    'text-xl flex-1',
    activeScenarioId.value === scenario.id
      ? 'bg-foreground text-background'
      : 'bg-transparent shadow-[0_0_0_1px_var(--color-border)] text-muted-foreground',
  )
</script>

<template>
  <section class="iphone-scroll-section w-full px-6 py-20 lg:py-0" data-section-iphone>
    <div class="iphone-scroll-sticky lg:sticky lg:top-0 lg:grid lg:min-h-screen lg:place-items-center">
      <div
        class="mx-auto grid w-full max-w-(--content-width) grid-cols-1 items-center justify-center gap-x-12 gap-y-2 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)_minmax(0,1fr)]">

        <div
          class="relative z-0 md:h-full md:pt-12 lg:py-12 order-3 flex flex-col gap-2 lg:gap-12 lg:order-0  md:col-start-1 md:row-start-1 lg:col-start-1 lg:row-start-2 lg:self-center lg:*:first:rotate-5 lg:*:last:-rotate-5">
          <button v-for="scenario in leftScenarios" :key="scenario.id" type="button"
            class="iphone-tab iphone-tab-left" data-iphone-tab-left :class="tabClass(scenario)"
            @click="activeScenarioId = scenario.id">
            <span class="flex flex-col items-start gap-3">
              <component :is="scenario.icon" class="size-7" weight="regular" aria-hidden="true" />
              <span class="leading-tight tracking-tight text-(--primary-text)">
                {{ scenario.title }}
              </span>
            </span>
            <span class="text-sm leading-tight opacity-60">
              {{ scenario.description }}
            </span>
          </button>
        </div>

        <div
          class="relative z-10 order-2 mx-auto w-full lg:order-0 md:col-start-2 md:row-start-1 md:row-end-3 lg:col-start-2 lg:row-start-2">
          <ComponentIphone class="mx-auto w-full" :messages="activeScenario.messages"
            :draft-widget="activeScenario.draftWidget" contact-name="Remi" input-placeholder="iMessage" />
        </div>

        <div
          class="relative z-0 md:h-full md:pb-12 lg:py-12 order-4 flex flex-col gap-2 lg:gap-12 lg:order-0 md:col-start-1 md:row-start-2 lg:col-start-3 lg:row-start-2 lg:self-center lg:*:first:-rotate-5 lg:*:last:rotate-5">
          <button v-for="scenario in rightScenarios" :key="scenario.id" type="button"
            class="iphone-tab iphone-tab-right" data-iphone-tab-right :class="tabClass(scenario)"
            @click="activeScenarioId = scenario.id">
            <span class="flex flex-col items-start gap-3">
              <component :is="scenario.icon" class="size-7" weight="regular" aria-hidden="true" />
              <span class="leading-tight tracking-tight text-(--primary-text)">
                {{ scenario.title }}
              </span>
            </span>
            <span class="text-sm leading-tight opacity-60">
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
    height: 100vh;
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
      animation-timing-function: linear(0, 0.029 1.3%, 0.119 2.8%, 0.659 8.7%, 0.871 11.6%, 1.009 14.6%, 1.052 16.2%, 1.078 17.9%, 1.088 19.7%, 1.085 21.7%, 1.014 31.4%, 0.993 38%, 1.001 57.6%, 1);
      animation-timeline: --iphone-section-scroll;
      animation-range: cover 20% cover 70%;
    }

    .iphone-tab-left {
      animation-name: iphone-tab-left-radiate;
    }

    .iphone-tab-right {
      animation-name: iphone-tab-right-radiate;
    }
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
