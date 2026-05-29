<script setup>
import { computed, markRaw } from 'vue'
import { cn } from '../../lib/cn'
import SurfaceVisualImessage from './components/surface-visual-imessage.vue'
import SurfaceVisualSlack from './components/surface-visual-slack.vue'
import SurfaceVisualWeb from './components/surface-visual-web.vue'

const surfaceVisuals = {
  imessage: markRaw(SurfaceVisualImessage),
  slack: markRaw(SurfaceVisualSlack),
  web: markRaw(SurfaceVisualWeb),
}

const props = defineProps({
  headline: {
    type: String,
    default: 'Wherever you are,<br />Remi is too.',
  },
  tabs: {
    type: Array,
    default: () => [
      {
        id: 'slack',
        label: 'Slack',
        description: 'Tag Remi in a thread, let teammates add context, and she turns the conversation into the work that needs to happen.',
      },
      {
        id: 'imessage',
        label: 'iMessage',
        description: 'Get quick operational check-ins: who should own the meeting, what changed, and when you actually need to step in.',
      },
      {
        id: 'web',
        label: 'Web',
        description: 'Open the full workspace for briefs, docs, approvals, and the context Remi keeps organized across every tool.',
      },
    ],
  },
})

const headlineParts = computed(() =>
  props.headline
    .split(/<br\s*\/?>/i)
    .map((part) => part.trim())
    .filter(Boolean),
)

const cards = computed(() =>
  props.tabs.map((tab, index) => ({
    id: tab.id || `channel-${index + 1}`,
    title: tab.label || `Channel ${index + 1}`,
    body: tab.description || '',
    visualClass: tab.visualClass || '',
    visualComponent: tab.visualComponent || surfaceVisuals[tab.id],
  })),
)
</script>

<template>
  <section id="channels" :class="cn('relative mx-auto max-w-[1400px] scroll-mt-24 px-6 py-12 md:py-16')"
    data-section-surfaces>
    <div :class="cn('mb-12 max-w-3xl')">
      <h2 :class="cn('text-4xl font-normal leading-none tracking-tight text-balance text-foreground')">
        <template v-for="(part, index) in headlineParts" :key="`${part}-${index}`">
          <br v-if="index > 0">
          <span :class="cn(index > 0 && 'text-foreground/50')">
            {{ part }}
          </span>
        </template>
      </h2>
    </div>

    <div :class="cn(
      'grid grid-cols-1 gap-4 xl:grid-cols-3',
      '[&>article]:relative [&>article]:overflow-hidden [&>article]:rounded-4xl [&>article]:bg-background',
      '[&>article]:after:content-[\'\'] [&>article]:after:absolute [&>article]:after:inset-0 [&>article]:after:pointer-events-none [&>article]:after:rounded-[inherit]',
      '[&>article]:after:shadow-[0_0_0_1px_color-mix(in_oklch,var(--color-foreground)_5%,transparent)_inset] [&>article]:after:mix-blend-plus-darker',
    )">
      <article v-for="card in cards" :key="card.id">
        <div
          :class="cn('flex h-full flex-col justify-between gap-y-8 gap-x-8 p-2 md:flex-row md:items-center xl:flex-col xl:items-stretch')">
          <div
            :class="cn('surface-card-visual order-1 relative grid h-full flex-1 items-stretch justify-items-stretch md:order-2 max-h-100 min-h-100 md:h-120 md:max-h-120 xl:order-1 w-full mx-auto overflow-hidden xl:max-h-100 rounded-3xl', card.visualClass)">
            <slot :name="`${card.id}-visual`" :card="card">
              <component :is="card.visualComponent" v-if="card.visualComponent" />
            </slot>
          </div>
          <div :class="cn('order-2 flex flex-col gap-2 md:h-full md:justify-between md:order-1 md:w-[40%] xl:h-auto xl:order-2 xl:w-full p-4')">
            <h3 :class="cn('text-xl font-normal leading-tight tracking-tight text-balance text-foreground')">
              {{ card.title }}
            </h3>
            <p :class="cn('text-lg leading-tight text-foreground/40')">
              {{ card.body }}
            </p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
