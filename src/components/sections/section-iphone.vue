<script setup>
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
    description: 'Find overdue invoices and draft the follow-up.',
    messages: [
      incoming('Henderson is 9 days late on the final invoice. They approved the extra work by text on Friday.'),
      outgoing('Is the job marked complete?'),
      incoming('Yes. I found the completion photo and your “all wrapped up” message from 4:12pm.'),
      outgoing('Draft a firm reminder.'),
      incoming('Ready for review. It asks for payment this week and includes the invoice, approval, and completion note.'),
    ],
  },
  {
    id: 'follow-up',
    title: 'Respond first',
    description: 'Catch missed requests before they go cold.',
    draftWidget: draft(
      'Hi Wilson, I can come by tomorrow at 2:30. Send a photo and I will confirm the scope before I head over.',
      'Approved. I’ll send this to Wilson and keep the estimate thread attached.',
    ),
    messages: [
      incoming('Wilson asked for an estimate at 10:14am. You missed it while you were on the McKay job.'),
      outgoing('Do we have room tomorrow?'),
      incoming('You have 2:30 open. The address is 12 minutes from your last stop.'),
      outgoing('Reply with that.'),
      incoming('Drafted. I offered 2:30 and asked for a photo so you can confirm the scope first.'),
    ],
  },
  {
    id: 'proof',
    title: 'Remember agreements',
    description: 'Keep approvals and receipts tied to the work.',
    draftWidget: draft(
      'Hi Dana, I found your June 18 approval for the better fixtures and attached the Lowe’s receipt for the materials.',
      'Approved. I’ll send it with the approval text and receipt attached.',
    ),
    messages: [
      incoming('Before you reply to Dana, they did approve the extra materials.'),
      outgoing('Where?'),
      incoming('June 18, 7:41pm. Their text says “go ahead with the better fixtures.” Receipt is from Lowe’s the next morning.'),
      outgoing('Put that in the reply.'),
      incoming('Drafted with the exact line and receipt attached, so it does not sound like memory.'),
    ],
  },
  {
    id: 'control',
    title: 'Approve the next step',
    description: 'Review what Remi found before anything goes out.',
    messages: [
      incoming('Three open loops are waiting: one overdue invoice, one unanswered quote, and one client approval.'),
      outgoing('Show me the money first.'),
      incoming('The overdue invoice is $1,460. The work was approved and delivered last week.'),
      outgoing('Prepare it, but do not send.'),
      incoming('Prepared. I will wait for your approval before anything goes out.'),
    ],
  },
]

const activeScenarioId = ref(scenarios[0].id)
const activeScenario = computed(
  () => scenarios.find((scenario) => scenario.id === activeScenarioId.value) || scenarios[0],
)

const tabClass = (scenario) =>
  cn(
    'group flex w-full flex-col items-start gap-0! py-4 border-t border-(--border-color) text-left text-pretty transition-all duration-300 max-w-sm mx-auto cursor-pointer',
    'focus-visible:outline-none focus-visible:outline-offset-none',
    'focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    activeScenarioId.value === scenario.id
      ? '[--primary-text:var(--color-foreground)] [--secondary-text:color-mix(in_srgb,_var(--color-foreground)_40%,_transparent)] [--reveal:1fr] [--border-color:var(--color-foreground)]'
      : 'opacity-50 [--primary-text:var(--color-muted-foreground)] hover:[--primary-text:var(--color-foreground)] [--secondary-text:var(--color-muted-foreground)] hover:opacity-100 [--reveal:0fr] [--border-color:color-mix(in_srgb,_var(--color-foreground)_20%,_transparent)]',
  )
</script>

<template>
  <section class="w-full px-6 py-20" data-section-iphone>
    <div
      class="mx-auto grid w-full max-w-(--content-width) grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,24rem)] justify-center">
      <div class="min-h-full order-2 flex flex-col gap-2 lg:order-1 justify-between lg:py-8">
        <h2 class="mx-auto mb-8 w-full max-w-sm text-left text-4xl lg:text-5xl leading-none tracking-tight text-foreground">
          The follow-through that keeps work moving.
        </h2>
        <div class="flex flex-col gap-0">
          <button v-for="scenario in scenarios" :key="scenario.id" type="button" :class="tabClass(scenario)"
            @click="activeScenarioId = scenario.id">
            <span class="text-2xl leading-tight tracking-tight text-(--primary-text)">
              {{ scenario.title }}
            </span>
            <span class="grid grid-cols-1 grid-rows-(--reveal) transition-[grid-template-rows] duration-300">
              <span class="overflow-hidden text-xl leading-tight text-(--secondary-text)">
                <span class="block pt-2">{{ scenario.description }}</span>
              </span>
            </span>
          </button>
        </div>
      </div>

      <ComponentIphone class="order-1 mx-auto w-full lg:order-2" :messages="activeScenario.messages"
        :draft-widget="activeScenario.draftWidget" contact-name="Remi" input-placeholder="Message Remi" />

      <div class="hidden lg:order-3 lg:block" aria-hidden="true"></div>
    </div>
  </section>
</template>
