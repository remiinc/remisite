<script setup>
import { PhBrain, PhChatsCircle, PhInvoice, PhListChecks } from '@phosphor-icons/vue'
import { computed, ref } from 'vue'
import cn from '../../lib/cn'
import ComponentIphone from './component-iphone.vue'

const incoming = (text) => ({ variant: 'incoming', text })
const outgoing = (text) => ({ variant: 'outgoing', text })
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
      incoming('Ready for review. It asks for payment this week and includes the invoice, approval, and completion note. 📎'),
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
      incoming('You have 2:30 open. The address is 12 minutes from your last stop. 📍'),
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
      incoming('June 18, 7:41pm. Their text says “go ahead with the better fixtures.” Receipt is from Lowe’s the next morning. 🧾'),
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
      incoming('Prepared. I will wait for your approval before anything goes out. 👍'),
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
  <section class="w-full px-6 py-20" data-section-iphone>
    <div
      class="mx-auto grid w-full max-w-(--content-width) grid-cols-1 items-center justify-center gap-x-12 gap-y-2 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)_minmax(0,1fr)]">

      <div
        class="md:h-full md:pt-12 lg:py-12 order-3 flex flex-col gap-2 lg:gap-12 lg:order-0  md:col-start-1 md:row-start-1 lg:col-start-1 lg:row-start-2 lg:self-center lg:*:first:rotate-5 lg:*:last:-rotate-5">
        <button v-for="scenario in leftScenarios" :key="scenario.id" type="button" :class="tabClass(scenario)"
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

      <ComponentIphone
        class="order-2 mx-auto w-full lg:order-0 md:col-start-2 md:row-start-1 md:row-end-3 lg:col-start-2 lg:row-start-2"
        :messages="activeScenario.messages" :draft-widget="activeScenario.draftWidget" contact-name="Remi"
        input-placeholder="iMessage" />

      <div
        class="md:h-full md:pb-12 lg:py-12 order-4 flex flex-col gap-2 lg:gap-12 lg:order-0 md:col-start-1 md:row-start-2 lg:col-start-3 lg:row-start-2 lg:self-center lg:*:first:-rotate-5 lg:*:last:rotate-5">
        <button v-for="scenario in rightScenarios" :key="scenario.id" type="button" :class="tabClass(scenario)"
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
  </section>
</template>
