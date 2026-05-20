<script setup>
import {
  PhCalendarCheck,
  PhCalendarX,
  PhChartLineUp,
  PhClipboardText,
  PhEnvelopeSimple,
  PhFileText,
  PhLifebuoy,
  PhMoney,
  PhPackage,
  PhPhoneCall,
  PhReceipt,
  PhRepeat,
  PhShoppingCart,
  PhStar,
  PhTruck,
  PhUserCirclePlus,
  PhUserPlus,
  PhUsersThree,
} from '@phosphor-icons/vue'
import TextLink from '../global/text-link.vue'

defineProps({
  headline: {
    type: String,
    default: 'Automations',
  },
  subheadline: {
    type: String,
    default: 'Set it up once and let it run.',
  },
  linkLabel: {
    type: String,
    default: 'Automations',
  },
  href: {
    type: String,
    default: '#automations',
  },
  description: {
    type: String,
    default:
      'Turn recurring handoffs, reminders, and follow-ups into quiet systems that run in the background.',
  },
})

const automations = [
  { title: 'Monday cash-flow snapshot', icon: PhChartLineUp },
  { title: 'Missed-call follow-up text', icon: PhPhoneCall },
  { title: 'New lead intake and routing', icon: PhUserPlus },
  { title: 'Quote approval reminder', icon: PhFileText },
  { title: 'Overdue invoice nudge', icon: PhReceipt },
  { title: 'Appointment no-show recovery', icon: PhCalendarX },
  { title: 'Review request after completed job', icon: PhStar },
  { title: 'Low-stock reorder alert', icon: PhPackage },
  { title: 'Abandoned cart follow-up', icon: PhShoppingCart },
  { title: 'VIP customer win-back list', icon: PhUsersThree },
  { title: 'Technician schedule recap', icon: PhTruck },
  { title: 'New hire first-week checklist', icon: PhClipboardText },
  { title: 'Weekly owner KPI email', icon: PhEnvelopeSimple },
  { title: 'Support queue triage', icon: PhLifebuoy },
  { title: 'Contract renewal reminder', icon: PhRepeat },
  { title: 'Post-event attendee follow-up', icon: PhCalendarCheck },
  { title: 'Payroll change approval', icon: PhMoney },
  { title: 'Vendor bill coding assistant', icon: PhUserCirclePlus },
]

const automationColorClasses = [
  'bg-emerald-400/10 text-emerald-500',
  'bg-cyan-400/10 text-cyan-500',
  'bg-indigo-400/10 text-indigo-500',
  'bg-amber-400/10 text-amber-500',
]
</script>

<template>
  <div id="automations" class="min-w-0" data-automations-view>
    <div class="space-y-0 text-3xl font-normal leading-none tracking-tight text-balance">
      <h2 class="text-foreground">
        {{ headline }}
      </h2>
      <p v-if="subheadline" class="text-foreground/40">
        {{ subheadline }}
      </p>
      <TextLink :href="href">{{ linkLabel }}</TextLink>
    </div>

    <div class="mt-14 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-4xl bg-foreground/3">
      <ul class="list-none flex flex-wrap justify-center items-center content-center gap-[0.25em] min-w-[200%] min-h-[150%] [&>li]:inline-flex [&>li]:items-center [&>li]:gap-[0.35em] [&>li]:text-[1.5em] [&>li]:font-medium [&>li]:leading-none [&>li]:tracking-tight [&>li]:px-[1em] [&>li]:py-[0.5em] [&>li]:rounded-full">
        <li
          v-for="(automation, index) in automations"
          :key="automation.title"
          :class="automationColorClasses[index % automationColorClasses.length]"
        >
          <component
            :is="automation.icon"
            class="size-[0.8em] shrink-0"
            weight="fill"
            aria-hidden="true"
          />
          <span>{{ automation.title }}</span>
        </li>
      </ul>
    </div>
    <p class="mt-5 max-w-sm text-sm font-normal leading-normal text-foreground/40">
      {{ description }}
    </p>
  </div>
</template>
