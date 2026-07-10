<script setup>
import {
  PhBookOpen,
  PhChatsCircle,
  PhInvoice,
  PhListChecks,
  PhUserCirclePlus,
} from '@phosphor-icons/vue'

const tasks = [
  { label: 'Meeting follow-ups', icon: PhChatsCircle },
  { label: 'Chases late invoices', icon: PhInvoice },
  { label: 'Keeps the books up-to-date', icon: PhBookOpen },
  { label: 'Follows up with leads', icon: PhUserCirclePlus },
  { label: 'Tracks your commitments', icon: PhListChecks },
]

const imageTiles = [
  {
    src: '/images/intro-canvas/img-0001.webp',
    alt: 'Remi AI for construction businesses',
    task: { label: 'Chases overdue invoices', icon: PhInvoice },
  },
  {
    src: '/images/intro-canvas/img-0003.webp',
    alt: 'Remi AI for meeting prep',
    task: { label: 'Writes meeting follow-ups', icon: PhChatsCircle },
  },
  {
    src: '/images/intro-canvas/img-0005.webp',
    alt: 'Remi AI for marketing research',
    task: { label: 'Finds warm leads', icon: PhUserCirclePlus },
  },
  {
    src: '/images/intro-canvas/img-0004.webp',
    alt: 'Remi AI for presentation research',
    task: { label: 'Preps project briefs', icon: PhBookOpen },
  },
  {
    src: '/images/intro-canvas/img-0002.webp',
    alt: 'Remi AI for fashion designers',
    task: { label: 'Remembers approvals', icon: PhListChecks },
  },
  {
    src: '/images/intro-canvas/img-0006.webp',
    alt: 'Remi AI for sales teams',
    task: { label: 'Drafts sales replies', icon: PhChatsCircle },
  },
  {
    src: '/images/intro-canvas/img-0007.webp',
    alt: 'Remi AI for small businesses',
    task: { label: 'Tracks open loops', icon: PhListChecks },
  },
  {
    src: '/images/intro-canvas/img-0008.webp',
    alt: 'Remi AI for accounting teams',
    task: { label: 'Files receipts', icon: PhBookOpen },
  },
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
            class="image-grid absolute col-start-1 row-start-1 col-end-1 row-end-1 w-full max-w-7xl min-w-xl justify-self-center self-center h-auto aspect-square list-none m-0 p-0">
            <li v-for="(tile, index) in imageTiles" :key="tile.src" class="image-tile absolute w-1/5 block"
              :class="index % 2 === 0 ? 'aspect-3/4' : 'aspect-4/3'">
              <div class="image-tile-card absolute w-full h-full bg-foreground/6">
                <img :src="tile.src" :alt="tile.alt" class="w-full h-full object-cover" />
              </div>
              <div
                class="image-tile-label absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 px-2 py-1 bg-foreground/40 backdrop-blur-sm text-background flex items-center gap-2 text-sm rounded-full font-medium">
                <component :is="tile.task.icon" class="size-[0.925em] shrink-0" weight="regular" aria-hidden="true" />
                <span class="whitespace-nowrap">{{ tile.task.label }}</span>
              </div>
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
            class="pinned-headline-content relative z-1 w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center gap-4 col-start-1 row-start-1 col-end-1 row-end-1">
            <p class="relative z-1 block text-base">
              Meet Remi
            </p>
            <h2
              class="relative z-1 block max-w-[20ch] text-center text-4xl md:text-[clamp(3.5rem,8vw,5rem)] leading-[1em] font-normal tracking-[-0.03em] text-balance text-foreground select-none mb-4">
              You didn't start your business to chase paperwork at 9pm
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
  --label-left: 50%;
  --label-top: 100%;
  --label-translate: -50% 0.7rem;
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

.image-tile-card {
  clip-path: inset(0% round 1em);
  overflow: hidden;
  will-change: clip-path, opacity;
}

.image-grid> :nth-child(1) {
  --tile-index: 0;
  --label-left: 50%;
  --label-top: 100%;
  --label-translate: -50% 0.7rem;
  --tile-origin-x: 0cqw;
  --tile-origin-y: -50cqw;
  --tile-collapse-x: 0cqw;
  --tile-collapse-y: 0cqw;
}

.image-grid> :nth-child(2) {
  --tile-index: 1;
  --label-left: 100%;
  --label-top: 100%;
  --label-translate: -85% 0.7rem;
  --tile-origin-x: 40cqw;
  --tile-origin-y: -42.5cqw;
  --tile-collapse-x: 2cqw;
  --tile-collapse-y: -2.125cqw;
}

.image-grid> :nth-child(3) {
  --tile-index: 2;
  --label-left: 100%;
  --label-top: 50%;
  --label-translate: 0.7rem -50%;
  --tile-origin-x: 50cqw;
  --tile-origin-y: 0cqw;
  --tile-collapse-x: 2.5cqw;
  --tile-collapse-y: 0cqw;
}

.image-grid> :nth-child(4) {
  --tile-index: 3;
  --label-left: 100%;
  --label-top: 0%;
  --label-translate: -85% -2.4rem;
  --tile-origin-x: 40cqw;
  --tile-origin-y: 42.5cqw;
  --tile-collapse-x: 2cqw;
  --tile-collapse-y: 2.125cqw;
}

.image-grid> :nth-child(5) {
  --tile-index: 4;
  --label-left: 50%;
  --label-top: 0%;
  --label-translate: -50% -2.4rem;
  --tile-origin-x: 0cqw;
  --tile-origin-y: 50cqw;
  --tile-collapse-x: 0cqw;
  --tile-collapse-y: 2.5cqw;
}

.image-grid> :nth-child(6) {
  --tile-index: 5;
  --label-left: 0%;
  --label-top: 0%;
  --label-translate: -15% -2.4rem;
  --tile-origin-x: -40cqw;
  --tile-origin-y: 42.5cqw;
  --tile-collapse-x: -2cqw;
  --tile-collapse-y: 2.125cqw;
}

.image-grid> :nth-child(7) {
  --tile-index: 6;
  --label-left: 0%;
  --label-top: 50%;
  --label-translate: calc(-100% - 0.7rem) -50%;
  --tile-origin-x: -50cqw;
  --tile-origin-y: 0cqw;
  --tile-collapse-x: -2.5cqw;
  --tile-collapse-y: 0cqw;
}

.image-grid> :nth-child(8) {
  --tile-index: 7;
  --label-left: 0%;
  --label-top: 100%;
  --label-translate: -15% 0.7rem;
  --tile-origin-x: -40cqw;
  --tile-origin-y: -42.5cqw;
  --tile-collapse-x: -2cqw;
  --tile-collapse-y: -2.125cqw;
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

  .image-tile-card {
    animation: image-tile-stagger linear both;
    animation-timeline: --pinned-headline-scroll;
    animation-range: cover var(--tile-index) cover calc(var(--tile-index) * 10% + 70%);
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

@keyframes image-tile-stagger {
  0% {
    opacity: 0;
    clip-path: inset(20% round 0.5em);
  }

  29% {
    opacity: 1;
    clip-path: inset(0em round 1em);
  }

  100% {
    opacity: 1;
    clip-path: inset(0em round 1em);
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

@keyframes image-label-middle {

  0%,
  34% {
    opacity: 0;
    scale: 0.96;
  }

  42%,
  62% {
    opacity: 1;
    scale: 1;
  }

  68%,
  100% {
    opacity: 0;
    scale: 0.98;
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
  .image-tile,
  .image-tile-label,
  .image-tile-card {
    animation: none;
    rotate: 0deg;
  }

  .image-tile-card {
    clip-path: inset(0 round 1em);
    opacity: 1;
    translate: 0 0;
  }

  .image-tile-label {
    opacity: 1;
    scale: 1;
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
