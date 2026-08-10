<script setup>
import { PhCheckCircle, PhFileText, PhHammer, PhMapPin, PhReceipt } from '@phosphor-icons/vue'

// Mirrors ComponentJobDetailView.swift. The grabber doubles as the demo's dismiss target.
defineProps({
  address: { type: String, required: true },
  collectedAmount: { type: String, required: true },
  contractAmount: { type: String, required: true },
  customerLabel: { type: String, required: true },
  dayContext: { type: String, required: true },
  nextMilestone: { type: String, required: true },
  phase: { type: String, required: true },
  progress: { type: Number, required: true },
  recentActivity: { type: Array, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true },
  todayDetail: { type: String, required: true },
  todayMeta: { type: String, required: true },
})

defineEmits(['dismiss'])

const activityIcon = (symbol) => ({
  approval: PhCheckCircle,
  receipt: PhReceipt,
  record: PhFileText,
}[symbol] || PhFileText)
</script>

<template>
  <section class="job-update-sheet absolute inset-x-0 bottom-0 top-[3.2em] z-20 flex flex-col overflow-hidden rounded-t-[1.765em] bg-white text-[#100f0c]"
    aria-label="Job details">
    <button class="absolute left-1/2 top-[0.41em] z-10 h-[0.294em] w-[2.47em] -translate-x-1/2 rounded-full bg-black/20"
      type="button" aria-label="Close job update" @click="$emit('dismiss')" />

    <header class="flex min-h-[3.235em] shrink-0 items-center gap-[0.706em] border-b border-[#efedea] px-[1.412em]">
      <span class="rounded-full bg-[#0fa3b1] px-[0.94em] py-[0.47em] text-[0.824em] font-semibold text-white">{{ status }}</span>
      <span class="ml-auto text-[0.824em] font-medium text-black/58">{{ dayContext }}</span>
    </header>

    <div class="min-h-0 flex-1 overflow-y-auto px-[1.294em] py-[1.294em] scrollbar-none">
      <div class="space-y-[1.294em]">
        <section>
          <p class="text-[0.706em] font-bold uppercase tracking-[0.042em] text-[#0fa3b1]">{{ customerLabel }}</p>
          <h2 class="mt-[0.412em] text-[1.294em] font-bold leading-tight">{{ title }}</h2>
          <p class="mt-[0.412em] flex items-center gap-[0.35em] text-[0.882em] text-black/58">
            <PhMapPin class="size-[1em]" weight="bold" aria-hidden="true" />{{ address }}
          </p>
        </section>

        <section>
          <h3 class="text-[1.176em] font-semibold">Today</h3>
          <div class="mt-[0.765em] flex items-start gap-[0.765em] rounded-[0.94em] bg-[#f1eeea]/72 p-[0.94em]">
            <span class="flex size-[2.353em] shrink-0 items-center justify-center rounded-full bg-[#dff0f6] text-[#0fa3b1]">
              <PhHammer class="size-[1em]" weight="fill" aria-hidden="true" />
            </span>
            <div>
              <p class="text-[1em] font-semibold">{{ phase }}</p>
              <p class="mt-[0.235em] text-[0.882em] text-black/58">{{ todayMeta }}</p>
              <p class="mt-[0.235em] text-[0.765em] text-[#134611]">{{ todayDetail }}</p>
            </div>
          </div>
        </section>

        <section>
          <div class="flex items-baseline">
            <h3 class="text-[1.176em] font-semibold">Progress</h3>
            <span class="ml-auto text-[0.824em] font-medium text-black/58">{{ progress }}%</span>
          </div>
          <div class="mt-[0.706em] h-[0.294em] overflow-hidden rounded-full bg-black/8">
            <div class="h-full rounded-full bg-[#0fa3b1]" :style="{ width: `${Math.max(0, Math.min(100, progress))}%` }" />
          </div>
          <div class="mt-[0.47em] flex items-center text-[0.765em] font-medium">
            <span class="text-[#134611]">Approval recovered</span>
            <span class="ml-auto text-black/58">{{ nextMilestone }}</span>
          </div>
        </section>

        <section class="grid grid-cols-2 gap-[0.706em]">
          <div class="rounded-[0.882em] bg-[#f1eeea] p-[0.882em]">
            <p class="flex items-center gap-[0.35em] text-[0.765em] font-medium text-black/58"><PhFileText class="size-[1em]" aria-hidden="true" />Contract</p>
            <p class="mt-[0.47em] text-[1.176em] font-semibold tabular-nums">{{ contractAmount }}</p>
          </div>
          <div class="rounded-[0.882em] bg-[#f1eeea] p-[0.882em]">
            <p class="flex items-center gap-[0.35em] text-[0.765em] font-medium text-black/58"><PhCheckCircle class="size-[1em]" aria-hidden="true" />Collected</p>
            <p class="mt-[0.47em] text-[1.176em] font-semibold tabular-nums">{{ collectedAmount }}</p>
          </div>
        </section>

        <section>
          <h3 class="text-[1.176em] font-semibold">Recent activity</h3>
          <ul class="mt-[0.706em] space-y-[0.706em]">
            <li v-for="item in recentActivity" :key="item.id" class="flex items-center gap-[0.706em] text-[0.824em]">
              <component :is="activityIcon(item.symbol)" class="size-[1.412em] shrink-0 text-[#0fa3b1]" weight="fill" aria-hidden="true" />
              <span>{{ item.title }}</span>
              <span class="ml-auto shrink-0 text-[0.857em] text-black/58">{{ item.timestamp }}</span>
            </li>
          </ul>
        </section>

      </div>
    </div>
  </section>
</template>

<style scoped>
.job-update-sheet {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
}
</style>
