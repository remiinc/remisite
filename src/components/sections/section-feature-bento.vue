<script setup>
import { Dither, FilmGrain, Shader, Swirl } from 'shaders/vue'
import {
  PhPlus,
} from '@phosphor-icons/vue'
import { computed, defineComponent, h, ref } from 'vue'
import GlobalModal from '../global/global-modal.vue'
import { FloatingCursor } from '../global/visuals-library.vue'

import BentoDialogArtifactsDocuments from './components/bento-dialog-artifacts-documents.vue'
import BentoDialogSharedMemory from './components/bento-dialog-shared-memory.vue'
import BentoDialogSlackAgent from './components/bento-dialog-slack-agent.vue'
import BentoDialogToolSync from './components/bento-dialog-tool-sync.vue'
import BentoVisualSlackAgent from './components/bento-visual-slack-agent.vue'
import MemoryNetworkCanvas from './components/memory-network-canvas.vue'
import RadialNetworkCanvas from './components/radial-network-canvas.vue'
import ArtifactsWheel from './components/artifacts-wheel.vue'
import { cn } from '../../lib/cn'

const emit = defineEmits(['book-demo'])

const gridClasses = cn(
  'bento-grid',
  'grid grid-cols-1 gap-2 md:gap-4 lg:gap-6 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3',
  '[&>div]:relative [&>div]:overflow-hidden [&>div]:rounded-3xl md:[&>div]:rounded-4xl [&>div]:bg-background [&>div]:overflow-hidden',
  '[&>div]:after:content-[\'\'] [&>div]:after:absolute [&>div]:after:inset-0 [&>div]:after:pointer-events-none [&>div]:after:rounded-[inherit] [&>div]:after:shadow-[0_0_0_1px_color-mix(in_oklch,var(--color-foreground)_5%,transparent)_inset] [&>div]:after:mix-blend-plus-darker [&>div]:after:z-10',
  '[&_h3]:text-[clamp(1.25rem,2.25vw,1.75rem)] [&_h3]:select-none [&_h3]:font-normal [&_h3]:tracking-tight [&_h3]:leading-tight [&_h3]:text-balance [&_h3]:max-w-[32ch]',
  '[&_h4]:text-2xl [&_h4]:select-none [&_h4]:font-normal [&_h4]:tracking-tight [&_h4]:leading-tight [&_h4]:text-balance [&_h4]:max-w-[32ch]',
  '[&>div]:transition-transform [&>div]:duration-300 [&>div]:ease-in-out [&>div]:will-change-transform',
  'text-foreground [&>.light]:text-background'
)

const containerClasses = cn(
  'bento-container',
  'w-full h-full p-4 md:p-8 items-start',
)

const bentoDialogs = {
  'feature-bento-1': {
    title: 'Powerful Slack agent that works for anyone on your team',
    component: BentoDialogSlackAgent,
  },
  'feature-bento-2': {
    title: 'Sync knowledge from any tool',
    component: BentoDialogToolSync,
  },
  'feature-bento-4': {
    title: 'Shared memory system organized automatically',
    component: BentoDialogSharedMemory,
  },
  'feature-bento-5': {
    title: "Remi doesn't just answer. She delivers.",
    component: BentoDialogArtifactsDocuments,
  },
}

const activeBentoDialogId = ref('')

const activeBentoDialog = computed(() => bentoDialogs[activeBentoDialogId.value])
const activeBentoDialogComponent = computed(() => activeBentoDialog.value?.component)

const isBentoDialogOpen = computed({
  get: () => Boolean(activeBentoDialogId.value),
  set: (isOpen) => {
    if (!isOpen) {
      activeBentoDialogId.value = ''
    }
  },
})

const isBentoDialogClickable = (id) => Boolean(bentoDialogs[id])

const openBentoDialog = (id) => {
  if (!isBentoDialogClickable(id)) {
    return
  }

  activeBentoDialogId.value = id
}

const openBookDemo = () => {
  activeBentoDialogId.value = ''
  emit('book-demo')
}

const BentoExpandIcon = defineComponent({
  setup() {
    return () =>
      h(
        'span',
        {
          class:
            'pointer-events-none absolute right-5 bottom-5 z-20 flex h-9 min-w-9 p-2 items-center justify-center text-foreground *:z-1 before:content-[\'\'] before:absolute before:inset-0 before:rounded-full before:z-0 before:bg-background group-hover/bento-cell:before:bg-foreground/5 before:backdrop-blur-md before:shadow-[0_0_0_1px_color-mix(in_oklch,var(--color-foreground)_5%,transparent)] group-hover/bento-cell:before:shadow-[0_0_0_0px_color-mix(in_oklch,var(--color-foreground)_0%,transparent)] group-hover/bento-cell:before:-inset-1 before:transition-all before:duration-200 before:ease-in-out before:will-change-transform flex flex-nowrap items-center justify-end',
        },
        [
          h(
            'div',
            {
              class: 'min-w-0 grid grid-cols-[0fr] group-hover/bento-cell:grid-cols-[1fr] opacity-0 group-hover/bento-cell:opacity-100 grid-rows-1 overflow-hidden transition-[grid-template-columns,opacity] duration-200 ease-out place-items-start justify-items-center',
            },
            [
              h(
                'span',
                {
                  class:
                    'text-sm font-normal text-foreground leading-none overflow-hidden min-w-0 shrink-0 whitespace-nowrap',
                },
                [
                  h(
                    'span',
                    { class: 'shrink-0 px-2 self-end' },
                    'Learn more'
                  )
                ]
              )
            ]
          ),
          h(
            'div',
            { class: 'flex items-center justify-center size-5' },
            [
              h(PhPlus, { weight: 'regular', class: 'size-4' })
            ]
          ),
        ]
      )
  },
})

</script>

<template>
  <section :class="cn('relative mx-auto max-w-[1400px] px-6 py-24 z-1')" data-feature-bento>
    <div :class="cn('mb-12 max-w-3xl')">
      <h2 :class="cn('text-4xl font-normal leading-none tracking-tight text-balance text-foreground')">
        A full suite of operational tools<br />
        <span :class="cn('text-foreground/50')">
          Memory, documents, integrations, and delivery.
        </span>
      </h2>
    </div>
    <div :class="gridClasses">
      <div id="feature-bento-1"
        :class="cn('group/bento-cell min-h-104 xs:col-span-2', isBentoDialogClickable('feature-bento-1') && 'cursor-pointer hover:scale-99')"
        :role="isBentoDialogClickable('feature-bento-1') ? 'button' : undefined"
        :tabindex="isBentoDialogClickable('feature-bento-1') ? 0 : undefined"
        @click="openBentoDialog('feature-bento-1')" @keydown.enter="openBentoDialog('feature-bento-1')"
        @keydown.space.prevent="openBentoDialog('feature-bento-1')">
        <BentoExpandIcon v-if="isBentoDialogClickable('feature-bento-1')" />
        <Shader class="absolute inset-0 h-full w-full" disable-telemetry>
          <FilmGrain :strength="0.5" :bias="0.4" :displacement="0.3" :animated="true">
            <Swirl color-a="oklch(0.995 0.05 85)" color-b="oklch(0.925 0.2 100)" color-space="oklch" :speed="1"
              :detail="1.5" :blend="30" />
          </FilmGrain>
        </Shader>
        <div :class="cn(containerClasses, 'relative z-1')">
          <h3>Powerful Slack agent</h3>
        </div>
        <div
          :class="cn('text-[clamp(0.875rem,1.55vw,2rem)] xl:text-[1.25rem] absolute inset-0 size-full z-1 flex flex-col justify-end items-end text-foreground font-normal leading-normal text-pretty pl-[1em] md:pl-[2em]')">
          <BentoVisualSlackAgent />
        </div>
      </div>
      <div id="feature-bento-2"
        :class="cn('group/bento-cell w-full aspect-2/3 md:aspect-3/4 overflow-hidden col-span-1', isBentoDialogClickable('feature-bento-2') && 'cursor-pointer hover:scale-99')"
        data-radial-network-clip :role="isBentoDialogClickable('feature-bento-2') ? 'button' : undefined"
        :tabindex="isBentoDialogClickable('feature-bento-2') ? 0 : undefined"
        @click="openBentoDialog('feature-bento-2')" @keydown.enter="openBentoDialog('feature-bento-2')"
        @keydown.space.prevent="openBentoDialog('feature-bento-2')">
        <BentoExpandIcon v-if="isBentoDialogClickable('feature-bento-2')" />
        <div :class="cn(containerClasses, 'relative z-1')">
          <h3>Sync knowledge from any tool</h3>
        </div>
        <div :class="cn('absolute w-full aspect-square left-0 bottom-0 translate-y-[50%]')">
          <div :class="cn('absolute w-[250%] aspect-square top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2')">
            <RadialNetworkCanvas />
          </div>
        </div>
      </div>
      <div id="feature-bento-4"
        :class="cn('group/bento-cell aspect-2/3 md:aspect-3/4 overflow-hidden col-span-1', isBentoDialogClickable('feature-bento-4') && 'cursor-pointer hover:scale-99')"
        :role="isBentoDialogClickable('feature-bento-4') ? 'button' : undefined"
        :tabindex="isBentoDialogClickable('feature-bento-4') ? 0 : undefined"
        @click="openBentoDialog('feature-bento-4')" @keydown.enter="openBentoDialog('feature-bento-4')"
        @keydown.space.prevent="openBentoDialog('feature-bento-4')">
        <BentoExpandIcon v-if="isBentoDialogClickable('feature-bento-4')" />
        <div :class="cn(containerClasses, 'relative z-1')">
          <h3>Shared memory system</h3>
        </div>
        <div :class="cn('absolute inset-0 h-full w-full mask-t-from-60% mask-t-to-90%')">
          <div :class="cn('absolute w-[200%] h-full top-0 left-1/2 -translate-x-1/2 flex items-center justify-center')">
            <MemoryNetworkCanvas />
          </div>
        </div>
      </div>
      <div id="feature-bento-5"
        :class="cn('group/bento-cell aspect-2/3 md:aspect-3/4 overflow-hidden col-span-1', isBentoDialogClickable('feature-bento-5') && 'cursor-pointer hover:scale-99')"
        :role="isBentoDialogClickable('feature-bento-5') ? 'button' : undefined"
        :tabindex="isBentoDialogClickable('feature-bento-5') ? 0 : undefined"
        @click="openBentoDialog('feature-bento-5')" @keydown.enter="openBentoDialog('feature-bento-5')"
        @keydown.space.prevent="openBentoDialog('feature-bento-5')">
        <Shader class="absolute inset-0 h-full w-full" disable-telemetry>
          <FilmGrain :strength="0.5" :bias="0.4" :displacement="0.3" :animated="true">
            <Swirl color-a="oklch(0.98 0.024 259.597)" color-b="oklch(0.858 0.07 259.597)" color-space="oklch"
              :speed="0.5" :detail="1.35" :blend="50" />
          </FilmGrain>
        </Shader>
        <BentoExpandIcon v-if="isBentoDialogClickable('feature-bento-5')" />
        <div :class="cn(containerClasses, 'relative z-1')">
          <h3>Collaborative documents</h3>
        </div>
        <div class="absolute w-full aspect-square top-1/2 -translate-y-1/3 flex items-center justify-center z-1">
          <div
            class="text-[clamp(0.5rem,1.5vw,1rem)] xl:text-[1rem] absolute grid grid-cols-[1fr] grid-rows-[1fr] place-items-stretch w-[300%]! top-0">
            <ArtifactsWheel />
          </div>
        </div>
        <div class="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
          <FloatingCursor class="absolute left-[16%] top-[62%] text-foreground" />
          <FloatingCursor class="absolute right-[14%] top-[48%] text-foreground" />
        </div>
      </div>
      <div id="feature-bento-6" :class="cn('aspect-2/3 md:aspect-3/4 overflow-hidden col-span-1')">
        <Shader class="absolute inset-0 h-full w-full" disable-telemetry>
          <FilmGrain :strength="0.65" :bias="0.5" :displacement="0.25" :animated="true">
            <Swirl color-a="oklch(0.96 0.08 170)" color-b="oklch(0.9 0.05 215)" color-space="oklch" :speed="0.75"
              :detail="1.65" :blend="40" />
          </FilmGrain>
        </Shader>
      </div>
    </div>

    <GlobalModal v-model="isBentoDialogOpen" :label="activeBentoDialog?.title || 'Feature details'" size="large">
      <component :is="activeBentoDialogComponent" v-if="activeBentoDialogComponent" @book-demo="openBookDemo" />
    </GlobalModal>
  </section>
</template>
