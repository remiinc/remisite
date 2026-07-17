<script setup>
import { defineComponent, h } from 'vue'
import {
  PhCalendarCheck,
  PhChatTeardropText,
  PhClipboardText,
  PhInvoice,
  PhReceipt,
} from '@phosphor-icons/vue'

const NotificationTile = defineComponent({
  name: 'NotificationTile',
  props: {
    tile: { type: Object, required: true },
  },
  setup(props) {
    return () => h('div', {
      class: 'image-tile-card bg-background rounded-[1.25em] p-[0.9em] inline-flex items-start gap-[0.75em] border text-[clamp(0.75rem,0.5395rem+0.4386vw,1rem)]',
    }, [
      h('img', {
        src: props.tile.logo,
        alt: `${props.tile.app} logo`,
        class: 'size-[2em] rounded-[0.5em] shrink-0 object-contain',
        loading: 'lazy',
        decoding: 'async',
      }),
      h('div', { class: 'flex flex-col gap-[0.15em]' }, [
        h('div', {
          class: 'flex items-baseline justify-between gap-4 text-[0.7em] text-foreground/50 leading-tight',
        }, [
          h('span', {}, props.tile.app),
          h('span', { class: 'shrink-0' }, props.tile.time),
        ]),
        h('p', {
          class: 'text-[0.95em] font-medium text-foreground leading-tight min-w-[20ch]',
        }, props.tile.title),
        h('p', {
          class: 'text-[0.75em] text-foreground/55 leading-tight',
        }, props.tile.subtitle),
      ]),
    ])
  },
})

const tasks = [
  { label: 'Chasing late invoices', icon: PhInvoice },
  { label: 'Following up quiet quotes', icon: PhChatTeardropText },
  { label: 'Saving what got agreed', icon: PhClipboardText },
  { label: 'Filing receipts to the job', icon: PhReceipt },
  { label: 'Confirming the next step', icon: PhCalendarCheck },
]

const composioLogo = (slug) => `https://logos.composio.dev/api/${slug}`

const notificationTiles = [
  { app: 'QuickBooks', logo: composioLogo('quickbooks'), title: 'Invoice #482 is 9 days late', subtitle: 'Final payment needs a nudge', time: 'now' },
  { app: 'Gmail', logo: composioLogo('gmail'), title: 'Wilson wants an estimate', subtitle: 'Asked at 10:14am, no reply yet', time: '2m' },
  { app: 'iMessage', logo: '/images/app-logos/ios-messages-icon.svg', title: 'Sarah: can you fit us in?', subtitle: 'Reply before she books someone else', time: '4m' },
  { app: 'Jobber', logo: composioLogo('jobber'), title: 'Quote viewed twice', subtitle: 'No answer since Friday', time: '12m' },
  { app: 'Google Calendar', logo: composioLogo('googlecalendar'), title: 'Tomorrow 2:30 is open', subtitle: 'Estimate visit needs confirming', time: '18m' },
  { app: 'Notes', logo: '/images/app-logos/ios-notes-icon.png', title: 'Fixture approval note', subtitle: 'Better fixtures approved by text', time: '37m' },
  { app: 'Square', logo: composioLogo('square'), title: 'Deposit not paid', subtitle: 'Job start is still on the calendar', time: '1h' },
  { app: 'Reminders', logo: '/images/app-logos/ios-reminders-icon.png', title: 'Receipt still missing', subtitle: "Lowe's run needs filing", time: '2h' },
]

const notificationTilesOuter = [
  { app: 'Gmail', logo: composioLogo('gmail'), title: '3 customer threads waiting', subtitle: 'Two estimates, one invoice question', time: 'now' },
  { app: 'Housecall Pro', logo: composioLogo('housecallpro'), title: 'New request: window repair', subtitle: 'Confirm availability before noon', time: '3m' },
  { app: 'QuickBooks', logo: composioLogo('quickbooks'), title: 'Bank feed has 6 matches', subtitle: 'Receipts need attaching to jobs', time: '8m' },
  { app: 'Google Drive', logo: composioLogo('googledrive'), title: 'Completion photo uploaded', subtitle: 'Needs to go with final invoice', time: '15m' },
  { app: 'Stripe', logo: composioLogo('stripe'), title: 'Payment link expired', subtitle: 'Resend before the weekend', time: '24m' },
  { app: 'iMessage', logo: '/images/app-logos/ios-messages-icon.svg', title: 'Marta: any update?', subtitle: 'Client asked yesterday too', time: '41m' },
  { app: 'Google Calendar', logo: composioLogo('googlecalendar'), title: 'Crew delayed 35 min', subtitle: 'Customer arrival text needs changing', time: '1h' },
  { app: 'Jobber', logo: composioLogo('jobber'), title: 'Estimate follow-up overdue', subtitle: 'Garage repair quote went quiet', time: '2h' },
  { app: 'Reminders', logo: '/images/app-logos/ios-reminders-icon.png', title: 'Call supply house', subtitle: 'Door handle lead time is slipping', time: '3h' },
  { app: 'Notes', logo: '/images/app-logos/ios-notes-icon.png', title: 'Scope change from Friday', subtitle: 'Extra trim approved in writing', time: '4h' },
  { app: 'Dropbox', logo: composioLogo('dropbox'), title: '12 job photos synced', subtitle: 'Pick the ones for invoice proof', time: '5h' },
  { app: 'Google Docs', logo: composioLogo('googledocs'), title: 'Contract comment unresolved', subtitle: 'Change order needs an answer', time: '6h' },
]
</script>

<template>
  <section class="pinned-headline-wrapper relative w-full bg-background overflow-clip">
    <div aria-hidden="true"
      class="[background-image:var(--gradient-fade-top)] w-full h-1/8 absolute top-0 left-0 z-1 pointer-events-none" />
    <div aria-hidden="true"
      class="[background-image:var(--gradient-fade-bottom)] w-full h-1/24 absolute bottom-0 left-0 z-1 pointer-events-none" />
    <div class="pinned-headline-spacer" aria-hidden="true" />

    <div class="grid grid-cols-1 grid-rows-1 h-[350vh]">
      <!-- Images sticky (z-0, below the gradient) -->
      <div
        class="pinned-headline-sticky pinned-headline-images-sticky sticky top-1/2 -translate-y-1/2 z-0 col-start-1 row-start-1 self-start flex items-center justify-center px-6 py-20">
        <div
          class="pinned-headline relative w-full mx-auto min-h-[clamp(32rem,60vh,42rem)] grid grid-cols-1 grid-rows-1">
          <ul aria-hidden="true"
            class="image-grid-outer absolute col-start-1 row-start-1 col-end-1 row-end-1 w-full max-w-6xl min-w-xl justify-self-center self-center h-auto aspect-square list-none m-0 p-0">
            <li v-for="tile in notificationTilesOuter" :key="tile.app + tile.title"
              class="image-tile-outer absolute w-auto block">
              <NotificationTile :tile="tile" />
            </li>
          </ul>
          <ul aria-hidden="true"
            class="image-grid absolute col-start-1 row-start-1 col-end-1 row-end-1 w-full max-w-4xl min-w-xl justify-self-center self-center h-auto aspect-square list-none m-0 p-0">
            <li v-for="tile in notificationTiles" :key="tile.app + tile.title"
              class="image-tile absolute w-auto block">
              <NotificationTile :tile="tile" />
            </li>
          </ul>
        </div>
      </div>

      <!-- Text sticky (z-10, above the gradient) -->
      <div
        class="pinned-headline-sticky pinned-headline-text-sticky sticky top-1/2 -translate-y-1/2 z-10 col-start-1 row-start-1 self-start flex items-center justify-center px-6 py-20">
        <div
          class="pinned-headline relative w-full mx-auto min-h-[clamp(34rem,60vh,42rem)] grid grid-cols-1 grid-rows-1">
          <div
            class="pinned-headline-content relative z-1 w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center gap-6 col-start-1 row-start-1 col-end-1 row-end-1">
            <h2
              class="relative z-1 block max-w-[16ch] text-center text-[clamp(2.5rem,0.8158rem+3.5088vw,4rem)] leading-[1em] font-normal tracking-[-0.03em] text-balance text-foreground select-none mb-4">
              You didn't start your business to sweat paperwork at 9pm.
            </h2>
            <ul class="relative z-1 tasks-list text-[1.2em] tracking-tight text-foreground/50 select-none">
              <li v-for="task in tasks" :key="task.label" class="task-item py-[0.25em]">
                <component :is="task.icon" class="size-[1em] shrink-0" weight="regular" aria-hidden="true" />
                <span class="leading-none">{{ task.label }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pinned-headline-wrapper {
  height: 300vh;
  width: 100vw;
  max-width: 100%;
  view-timeline-name: --pinned-headline-scroll;
  view-timeline-axis: block;
}

.pinned-headline-spacer {
  height: 25vh;
}

.pinned-headline-content {
  transform-origin: center center;
  will-change: opacity, transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
}

@supports (animation-timeline: view()) {
  .pinned-headline-content {
    animation: pinned-headline-content-motion linear both;
    animation-timeline: --pinned-headline-scroll;
    animation-range: cover 0% cover 100%;
  }
}

@supports (animation-timeline: view()) {
  .pinned-headline-text-sticky {
    animation: pin-tail linear both;
    animation-timeline: --pinned-headline-scroll;
    animation-range: cover 0% cover 100%;
  }

}

@keyframes pin-tail {

  0%,
  70% {
    translate: 0 -50%;
  }

  100% {
    translate: 0 0%;
  }
}

@keyframes pinned-headline-content-motion {
  0% {
    opacity: 1;
    scale: 0.92;
    translate: 0 1rem;
  }

  25% {
    opacity: 1;
    scale: 0.92;
    translate: 0 1rem;
  }

  40% {
    opacity: 1;
    scale: 1;
    translate: 0 0;
  }

  64% {
    opacity: 1;
    scale: 1.045;
    translate: 0 0;
  }

  70% {
    opacity: 0;
    scale: 0.92;
    translate: 0 -0.35rem;
  }

  100% {
    opacity: 0;
    scale: 0.92;
    translate: 0 -0.75rem;
  }
}

.image-grid {
  container-type: inline-size;
  transform-origin: center center;
  will-change: rotate;
}

@property --tile-index {
  syntax: '<integer>';
  initial-value: 0;
  inherits: true;
}

.image-tile {
  --tile-index: 0;
  --tile-origin-x: 0cqw;
  --tile-origin-y: 0cqw;
  --tile-collapse-x: 0cqw;
  --tile-collapse-y: 0cqw;
  top: 50%;
  left: 50%;
  translate: calc(-50% + var(--tile-origin-x)) calc(-50% + var(--tile-origin-y));
  transform-origin: center center;
  transform: translateZ(0);
  will-change: rotate, translate, transform;
}

.image-grid> :nth-child(1) {
  --tile-index: 0;
  --tile-origin-x: 0cqw;
  --tile-origin-y: -50cqw;
  --tile-collapse-x: 0cqw;
  --tile-collapse-y: 0cqw;
}

.image-grid> :nth-child(2) {
  --tile-index: 1;
  --tile-origin-x: 40cqw;
  --tile-origin-y: -42.5cqw;
  --tile-collapse-x: 2cqw;
  --tile-collapse-y: -2.125cqw;
}

.image-grid> :nth-child(3) {
  --tile-index: 2;
  --tile-origin-x: 50cqw;
  --tile-origin-y: 0cqw;
  --tile-collapse-x: 2.5cqw;
  --tile-collapse-y: 0cqw;
}

.image-grid> :nth-child(4) {
  --tile-index: 3;
  --tile-origin-x: 40cqw;
  --tile-origin-y: 42.5cqw;
  --tile-collapse-x: 2cqw;
  --tile-collapse-y: 2.125cqw;
}

.image-grid> :nth-child(5) {
  --tile-index: 4;
  --tile-origin-x: 0cqw;
  --tile-origin-y: 50cqw;
  --tile-collapse-x: 0cqw;
  --tile-collapse-y: 2.5cqw;
}

.image-grid> :nth-child(6) {
  --tile-index: 5;
  --tile-origin-x: -40cqw;
  --tile-origin-y: 42.5cqw;
  --tile-collapse-x: -2cqw;
  --tile-collapse-y: 2.125cqw;
}

.image-grid> :nth-child(7) {
  --tile-index: 6;
  --tile-origin-x: -50cqw;
  --tile-origin-y: 0cqw;
  --tile-collapse-x: -2.5cqw;
  --tile-collapse-y: 0cqw;
}

.image-grid> :nth-child(8) {
  --tile-index: 7;
  --tile-origin-x: -40cqw;
  --tile-origin-y: -42.5cqw;
  --tile-collapse-x: -2cqw;
  --tile-collapse-y: -2.125cqw;
}

.image-grid-outer {
  container-type: inline-size;
  transform-origin: center center;
  will-change: rotate;
}

.image-tile-outer {
  --tile-index: 0;
  --tile-origin-x: 0cqw;
  --tile-origin-y: 0cqw;
  --tile-collapse-x: 0cqw;
  --tile-collapse-y: 0cqw;
  top: 50%;
  left: 50%;
  translate: calc(-50% + var(--tile-origin-x)) calc(-50% + var(--tile-origin-y));
  transform-origin: center center;
  transform: translateZ(0);
  will-change: rotate, translate, transform;
}

.image-grid-outer> :nth-child(1) {
  --tile-index: 0;
  --tile-origin-x: 27cqw;
  --tile-origin-y: -65cqw;
  --tile-collapse-x: 1.1cqw;
  --tile-collapse-y: -2.6cqw;
}

.image-grid-outer> :nth-child(2) {
  --tile-index: 1;
  --tile-origin-x: 56cqw;
  --tile-origin-y: -43cqw;
  --tile-collapse-x: 2.25cqw;
  --tile-collapse-y: -1.7cqw;
}

.image-grid-outer> :nth-child(3) {
  --tile-index: 2;
  --tile-origin-x: 69cqw;
  --tile-origin-y: -9cqw;
  --tile-collapse-x: 2.75cqw;
  --tile-collapse-y: -0.35cqw;
}

.image-grid-outer> :nth-child(4) {
  --tile-index: 3;
  --tile-origin-x: 65cqw;
  --tile-origin-y: 27cqw;
  --tile-collapse-x: 2.6cqw;
  --tile-collapse-y: 1.1cqw;
}

.image-grid-outer> :nth-child(5) {
  --tile-index: 4;
  --tile-origin-x: 43cqw;
  --tile-origin-y: 56cqw;
  --tile-collapse-x: 1.7cqw;
  --tile-collapse-y: 2.25cqw;
}

.image-grid-outer> :nth-child(6) {
  --tile-index: 5;
  --tile-origin-x: 9cqw;
  --tile-origin-y: 69cqw;
  --tile-collapse-x: 0.35cqw;
  --tile-collapse-y: 2.75cqw;
}

.image-grid-outer> :nth-child(7) {
  --tile-index: 6;
  --tile-origin-x: -27cqw;
  --tile-origin-y: 65cqw;
  --tile-collapse-x: -1.1cqw;
  --tile-collapse-y: 2.6cqw;
}

.image-grid-outer> :nth-child(8) {
  --tile-index: 7;
  --tile-origin-x: -56cqw;
  --tile-origin-y: 43cqw;
  --tile-collapse-x: -2.25cqw;
  --tile-collapse-y: 1.7cqw;
}

.image-grid-outer> :nth-child(9) {
  --tile-index: 8;
  --tile-origin-x: -69cqw;
  --tile-origin-y: 9cqw;
  --tile-collapse-x: -2.75cqw;
  --tile-collapse-y: 0.35cqw;
}

.image-grid-outer> :nth-child(10) {
  --tile-index: 9;
  --tile-origin-x: -65cqw;
  --tile-origin-y: -27cqw;
  --tile-collapse-x: -2.6cqw;
  --tile-collapse-y: -1.1cqw;
}

.image-grid-outer> :nth-child(11) {
  --tile-index: 10;
  --tile-origin-x: -43cqw;
  --tile-origin-y: -56cqw;
  --tile-collapse-x: -1.7cqw;
  --tile-collapse-y: -2.25cqw;
}

.image-grid-outer> :nth-child(12) {
  --tile-index: 11;
  --tile-origin-x: -9cqw;
  --tile-origin-y: -69cqw;
  --tile-collapse-x: -0.35cqw;
  --tile-collapse-y: -2.75cqw;
}

@supports (animation-timeline: view()) {
  .image-grid {
    animation: image-grid-rotate linear both;
    animation-timeline: --pinned-headline-scroll;
    animation-range: cover 0% cover 100%;
  }

  .image-tile {
    animation:
      image-tile-counter-rotate linear both,
      image-tile-collapse linear both,
      image-tile-pushdown linear both;
    animation-timeline: --pinned-headline-scroll, --pinned-headline-scroll, --pinned-headline-scroll;
    animation-range:
      cover 0% cover 100%,
      cover 0% cover 100%,
      cover 78% cover 100%;
    animation-composition: replace, replace, add;
  }

  .image-grid-outer {
    animation: image-grid-rotate-outer linear both;
    animation-timeline: --pinned-headline-scroll;
    animation-range: cover 0% cover 100%;
  }

  .image-tile-outer {
    animation:
      image-tile-counter-rotate-outer linear both,
      image-tile-collapse linear both,
      image-tile-pushdown linear both;
    animation-timeline: --pinned-headline-scroll, --pinned-headline-scroll, --pinned-headline-scroll;
    animation-range:
      cover 0% cover 100%,
      cover 0% cover 100%,
      cover 78% cover 100%;
    animation-composition: replace, replace, add;
  }
}

@keyframes image-grid-rotate {
  0% {
    rotate: 0deg;
  }

  78%,
  100% {
    rotate: -280.8deg;
  }
}

@keyframes image-tile-counter-rotate {
  0% {
    rotate: 0deg;
  }

  78%,
  100% {
    rotate: 280.8deg;
  }
}

@keyframes image-grid-rotate-outer {
  0% {
    rotate: 0deg;
  }

  78%,
  100% {
    rotate: -216deg;
  }
}

@keyframes image-tile-counter-rotate-outer {
  0% {
    rotate: 0deg;
  }

  78%,
  100% {
    rotate: 216deg;
  }
}

@keyframes image-tile-collapse {

  0%,
  68% {
    translate: calc(-50% + var(--tile-origin-x)) calc(-50% + var(--tile-origin-y));
  }

  78%,
  100% {
    translate: calc(-50% + var(--tile-collapse-x)) calc(-50% + var(--tile-collapse-y));
  }
}

@keyframes image-tile-pushdown {
  from {
    transform: translateY(0) scale(1);
  }

  to {
    transform: translateY(calc(calc(var(--tile-index) + 1 * 1.5) * 20cqw)) scale(calc(calc(var(--tile-index) + 1 * 1.5) * 0.1));
  }
}

.tasks-list {
  display: grid;
  grid-template-areas: 'stack';
  align-items: center;
  justify-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  line-height: 1.5;
}

.task-item {
  grid-area: stack;
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  text-align: center;
  white-space: nowrap;
}

@supports (animation-timeline: view()) {
  .tasks-list {
    height: 1.5em;
    overflow: hidden;
  }

  .task-item {
    opacity: 0;
    translate: 0 100%;
    animation: task-roll linear both;
    animation-timeline: --pinned-headline-scroll;
  }

  .task-item:nth-child(1) {
    opacity: 1;
    translate: 0 0;
    animation-name: task-roll-first;
    animation-range: cover 0% cover 18%;
  }

  .task-item:nth-child(2) {
    animation-range: cover 13% cover 31%;
  }

  .task-item:nth-child(3) {
    animation-range: cover 26% cover 44%;
  }

  .task-item:nth-child(4) {
    animation-range: cover 39% cover 57%;
  }

  .task-item:nth-child(5) {
    animation-range: cover 52% cover 70%;
  }
}

@supports not (animation-timeline: view()) {
  .tasks-list {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .task-item {
    grid-area: unset;
  }
}

@keyframes task-roll {
  0% {
    opacity: 0;
    translate: 0 100%;
  }

  25% {
    opacity: 1;
    translate: 0 0;
  }

  75% {
    opacity: 1;
    translate: 0 0;
  }

  100% {
    opacity: 0;
    translate: 0 -100%;
  }
}

@keyframes task-roll-first {

  0%,
  60% {
    opacity: 1;
    translate: 0 0;
  }

  100% {
    opacity: 0;
    translate: 0 -100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pinned-headline-sticky {
    animation: none;
  }

  .pinned-headline-content {
    animation: none;
  }

  .image-grid,
  .image-grid-outer,
  .image-tile,
  .image-tile-outer {
    animation: none;
    rotate: 0deg;
  }

  .tasks-list {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    height: auto;
    overflow: visible;
  }

  .task-item {
    opacity: 1;
    translate: 0 0;
    animation: none;
    grid-area: unset;
  }
}
</style>
