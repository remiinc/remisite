<script setup>
import { FilmGrain, Shader, Swirl } from 'shaders/vue'
import { PhPlus } from '@phosphor-icons/vue'
import { computed, defineComponent, h, ref } from 'vue'
import GlobalModal from '../global/global-modal.vue'

import BentoDialogSharedMemory from './components/bento-dialog-shared-memory.vue'
import BentoDialogSlackAgent from './components/bento-dialog-slack-agent.vue'
import BentoDialogToolSync from './components/bento-dialog-tool-sync.vue'
import RadialNetworkCanvas from './components/radial-network-canvas.vue'
import { cn } from '../../lib/cn'

const gridClasses = cn(
  'bento-grid',
  'grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12',
  '[&>div]:relative [&>div]:overflow-hidden [&>div]:rounded-4xl [&>div]:bg-background [&>div]:overflow-hidden',
  '[&>div]:after:content-[\'\'] [&>div]:after:absolute [&>div]:after:inset-0 [&>div]:after:pointer-events-none [&>div]:after:rounded-[inherit] [&>div]:after:shadow-[0_0_0_1px_color-mix(in_oklch,var(--color-foreground)_5%,transparent)_inset] [&>div]:after:mix-blend-plus-darker [&>div]:after:z-10',
  '[&_h3]:text-3xl [&_h3]:select-none [&_h3]:font-normal [&_h3]:tracking-tight [&_h3]:leading-tight [&_h3]:text-balance [&_h3]:max-w-[32ch]',
  '[&_h4]:text-2xl [&_h4]:select-none [&_h4]:font-normal [&_h4]:tracking-tight [&_h4]:leading-tight [&_h4]:text-balance [&_h4]:max-w-[32ch]',
  '[&>div]:transition-transform [&>div]:duration-300 [&>div]:ease-in-out [&>div]:will-change-transform',
  'text-foreground [&>.light]:text-background'
)

const containerClasses = cn(
  'bento-container',
  'w-full h-full p-8 items-start',
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

const BentoMessageRow = defineComponent({
  props: {
    author: {
      type: String,
      default: 'Anna',
    },
    time: {
      type: String,
      default: '4:20 PM',
    },
    avatarSrc: {
      type: String,
      default: '',
    },
    avatarAlt: {
      type: String,
      default: '',
    },
    avatarEnabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const getInitials = () =>
      props.author
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()

    return () =>
      h('div', { class: 'flex items-start gap-[1em]' }, [
        props.avatarSrc
          ? h('img', {
            class: 'size-[2.5em] shrink-0 rounded-[0.5em] object-cover',
            src: props.avatarSrc,
            alt: props.avatarAlt || `${props.author} avatar`,
            loading: 'lazy',
            decoding: 'async',
          })
          : props.avatarEnabled
            ? h(
              'span',
              {
                class:
                  'flex size-[2.5em] shrink-0 items-center justify-center rounded-[0.5em] bg-foreground/8 font-medium text-foreground',
                'aria-hidden': 'true',
              },
              getInitials()
            )
            : null,
        h('div', { class: 'flex min-w-0 flex-col gap-[0.3em]' }, [
          h('span', { class: 'text-[0.875em] text-foreground leading-none' }, [
            props.author,
            ' ',
            h('span', { class: 'text-foreground/40' }, props.time),
          ]),
          h('div', { class: 'flex items-center gap-[1em] text-[1em]' }, [
            h('span', null, slots.default?.()),
          ]),
        ]),
      ])
  },
})

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
  <section :class="cn('mx-auto max-w-7xl px-6 py-24')" data-feature-bento>
    <div :class="cn('mb-12 max-w-3xl')">
      <h2 :class="cn('text-4xl font-normal leading-tight tracking-tight text-balance text-foreground')">
        Everything you need to run your service business
      </h2>
    </div>
    <div :class="gridClasses">
      <div id="feature-bento-1"
        :class="cn('group/bento-cell min-h-160 col-span-8', isBentoDialogClickable('feature-bento-1') && 'cursor-pointer hover:scale-99')"
        :role="isBentoDialogClickable('feature-bento-1') ? 'button' : undefined"
        :tabindex="isBentoDialogClickable('feature-bento-1') ? 0 : undefined"
        @click="openBentoDialog('feature-bento-1')" @keydown.enter="openBentoDialog('feature-bento-1')"
        @keydown.space.prevent="openBentoDialog('feature-bento-1')">
        <BentoExpandIcon v-if="isBentoDialogClickable('feature-bento-1')" />
        <Shader class="absolute inset-0 h-full w-full" disable-telemetry>
          <FilmGrain :strength="0.5" :bias="0.4" :displacement="0.3" :animated="true">
            <Swirl color-a="oklch(0.95 0.2 457)" color-b="oklch(0.97 0.05 292.24)" color-space="oklch" :speed="0.5"
              :detail="1.35" :blend="50" />
          </FilmGrain>
        </Shader>
        <div :class="cn(containerClasses, 'relative z-1')">
          <h3>Powerful Slack agent that works for anyone on your team</h3>
        </div>
        <div
          :class="cn('absolute inset-0 size-full z-1 flex flex-col justify-end items-end text-foreground text-base font-normal leading-normal text-pretty pl-[2em]')">
          <div class="text-[1.25rem] max-w-[36em] flex flex-col gap-[1.5em] p-[3em] bg-background rounded-tl-3xl">
            <BentoMessageRow author="Lisa" time="4:21 PM" avatar-enabled>
              Thanks
              <span :class="cn(
                'relative px-1 font-medium text-blue-400',
                'before:content-[\'\'] before:absolute before:left-[0.05em] before:right-1 before:top-[-0.1em] before:bottom-[-0.2em]',
                'before:z-0 before:rounded-sm before:bg-blue-400 before:opacity-20'
              )">
                Remi
              </span>
              can you turn that into a shareable brief too?
            </BentoMessageRow>
            <BentoMessageRow author="Lisa" time="4:21 PM" avatar-enabled>
              Make it a PDF please!
            </BentoMessageRow>
            <BentoMessageRow author="Remi" time="4:21 PM" avatar-enabled avatar-src="/images/avatars/remi-black.jpg">
              You got it!
            </BentoMessageRow>
          </div>
        </div>
      </div>
      <div id="feature-bento-2"
        :class="cn('group/bento-cell min-h-160 overflow-hidden col-span-4', isBentoDialogClickable('feature-bento-2') && 'cursor-pointer hover:scale-99')"
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
        :class="cn('group/bento-cell min-h-160 col-span-4', isBentoDialogClickable('feature-bento-4') && 'cursor-pointer hover:scale-99')"
        :role="isBentoDialogClickable('feature-bento-4') ? 'button' : undefined"
        :tabindex="isBentoDialogClickable('feature-bento-4') ? 0 : undefined"
        @click="openBentoDialog('feature-bento-4')" @keydown.enter="openBentoDialog('feature-bento-4')"
        @keydown.space.prevent="openBentoDialog('feature-bento-4')">
        <BentoExpandIcon v-if="isBentoDialogClickable('feature-bento-4')" />
        <div :class="cn(containerClasses, 'relative z-1')">
          <h3>Shared memory system organized automatically</h3>
        </div>
      </div>
      <div id="feature-bento-5" :class="cn('min-h-160 col-span-4')"></div>
      <div id="feature-bento-6" :class="cn('min-h-160 col-span-4')"></div>
    </div>

    <GlobalModal v-model="isBentoDialogOpen" :label="activeBentoDialog?.title || 'Feature details'" size="large">
      <component :is="activeBentoDialogComponent" v-if="activeBentoDialogComponent" />
    </GlobalModal>
  </section>
</template>
