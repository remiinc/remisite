<script setup>
import { computed, ref } from 'vue'
import cn from '../../lib/cn'
import ComponentIphone from './component-iphone.vue'

const scenarios = [
  {
    id: 'money',
    title: 'Get paid',
    description: 'Find overdue invoices and draft the follow-up.',
    messages: [
      {
        variant: 'incoming',
        text: 'Henderson is 9 days late on the final invoice. They approved the extra work by text on Friday.',
      },
      {
        variant: 'outgoing',
        text: 'Is the job marked complete?',
      },
      {
        variant: 'incoming',
        text: 'Yes. I found the completion photo and your “all wrapped up” message from 4:12pm.',
      },
      {
        variant: 'outgoing',
        text: 'Draft a firm reminder.',
      },
      {
        variant: 'incoming',
        text: 'Ready for review. It asks for payment this week and includes the invoice, approval, and completion note.',
      },
    ],
  },
  {
    id: 'follow-up',
    title: 'Respond first',
    description: 'Catch missed requests before they go cold.',
    draftWidget: {
      title: 'Remi draft',
      subtitle: 'Estimate follow-up',
      badge: 'Ready',
      preview: 'Hi Wilson, I can come by tomorrow at 2:30. Send a photo and I will confirm the scope before I head over.',
    },
    messages: [
      {
        variant: 'incoming',
        text: 'Wilson asked for an estimate at 10:14am. You missed it while you were on the McKay job.',
      },
      {
        variant: 'outgoing',
        text: 'Do we have room tomorrow?',
      },
      {
        variant: 'incoming',
        text: 'You have 2:30 open. The address is 12 minutes from your last stop.',
      },
      {
        variant: 'outgoing',
        text: 'Reply with that.',
      },
      {
        variant: 'incoming',
        text: 'Drafted. I offered 2:30 and asked for a photo so you can confirm the scope first.',
      },
    ],
  },
  {
    id: 'proof',
    title: 'Remember agreements',
    description: 'Keep approvals and receipts tied to the work.',
    messages: [
      {
        variant: 'incoming',
        text: 'Before you reply to Dana, they did approve the extra materials.',
      },
      {
        variant: 'outgoing',
        text: 'Where?',
      },
      {
        variant: 'incoming',
        text: 'June 18, 7:41pm. Their text says “go ahead with the better fixtures.” Receipt is from Lowe’s the next morning.',
      },
      {
        variant: 'outgoing',
        text: 'Put that in the reply.',
      },
      {
        variant: 'incoming',
        text: 'Drafted with the exact line and receipt attached, so it does not sound like memory.',
      },
    ],
  },
  {
    id: 'control',
    title: 'Approve the next step',
    description: 'Review what Remi found before anything goes out.',
    messages: [
      {
        variant: 'incoming',
        text: 'Three open loops are waiting: one overdue invoice, one unanswered quote, and one client approval.',
      },
      {
        variant: 'outgoing',
        text: 'Show me the money first.',
      },
      {
        variant: 'incoming',
        text: 'The overdue invoice is $1,460. The work was approved and delivered last week.',
      },
      {
        variant: 'outgoing',
        text: 'Prepare it, but do not send.',
      },
      {
        variant: 'incoming',
        text: 'Prepared. I will wait for your approval before anything goes out.',
      },
    ],
  },
]

const activeScenarioId = ref(scenarios[0].id)
const activeScenario = computed(
  () => scenarios.find((scenario) => scenario.id === activeScenarioId.value) || scenarios[0],
)
const leftScenarios = computed(() => scenarios.slice(0, 2))
const rightScenarios = computed(() => scenarios.slice(2))

const tabClass = (scenario) =>
  cn(
    'group flex w-full flex-col items-start gap-0 py-2 border-t border-(--border-color) text-left text-pretty transition-all duration-300 max-w-sm mx-auto cursor-pointer',
    'focus-visible:outline-none focus-visible:outline-offset-none',
    'focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    activeScenarioId.value === scenario.id
      ? '[--primary-text:var(--color-foreground)] [--secondary-text:color-mix(in_srgb,_var(--color-foreground)_40%,_transparent)] [--reveal:1fr] [--border-color:var(--color-foreground)]'
      : 'opacity-50 [--primary-text:var(--color-muted-foreground)] hover:[--primary-text:var(--color-foreground)] [--secondary-text:var(--color-muted-foreground)] hover:opacity-100 [--reveal:0fr] [--border-color:color-mix(in_srgb,_var(--color-foreground)_20%,_transparent)]',
  )
</script>

<template>
  <section class="min-h-screen w-full px-6 py-20" data-section-iphone>
    <div
      class="mx-auto grid min-h-screen w-full max-w-(--content-width) grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)_minmax(0,1fr)]">
      <div
        class="order-2 flex flex-col gap-2 lg:order-1 lg:items-end lg:gap-4 lg:*:first:[--rotation:5deg] lg:*:last:[--rotation:-5deg]">
        <button v-for="scenario in leftScenarios" :key="scenario.id" type="button" :class="tabClass(scenario)"
          @click="activeScenarioId = scenario.id">
          <span class="text-xl leading-tight tracking-tight text-(--primary-text)">
            {{ scenario.title }}
          </span>
          <span class="grid grid-cols-1 grid-rows-(--reveal) transition-[grid-template-rows] duration-300">
            <span class="overflow-hidden text-xl leading-tight text-(--secondary-text)">
              {{ scenario.description }}
            </span>
          </span>
        </button>
      </div>

      <ComponentIphone class="order-1 mx-auto w-full lg:order-2" :messages="activeScenario.messages"
        :draft-widget="activeScenario.draftWidget" contact-name="Remi" input-placeholder="Message Remi" />

      <div class="order-3 flex flex-col gap-2 lg:gap-4 lg:*:first:[--rotation:-5deg] lg:*:last:[--rotation:5deg]">
        <button v-for="scenario in rightScenarios" :key="scenario.id" type="button" :class="tabClass(scenario)"
          @click="activeScenarioId = scenario.id">
          <span class="text-xl leading-tight tracking-tight text-(--primary-text)">
            {{ scenario.title }}
          </span>
          <span class="grid grid-cols-1 grid-rows-(--reveal) transition-[grid-template-rows] duration-300">
            <span class="overflow-hidden text-base leading-tight text-(--secondary-text)">
              {{ scenario.description }}
            </span>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>
