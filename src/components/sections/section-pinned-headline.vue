<template>
  <section class="pinned-headline-wrapper relative w-full bg-background overflow-clip">
    <div aria-hidden="true" class="[background-image:var(--gradient-fade-top)] w-full h-1/8 absolute top-0 left-0 z-1 pointer-events-none" />
    <div aria-hidden="true" class="[background-image:var(--gradient-fade-bottom)] w-full h-1/8 absolute bottom-0 left-0 z-1 pointer-events-none" />
    <div class="pinned-headline-spacer" aria-hidden="true" />

    <div class="grid grid-cols-1 grid-rows-1 h-[275vh]">
      <!-- Images sticky (z-0, below the gradient) -->
      <div class="pinned-headline-sticky sticky top-1/2 -translate-y-1/2 z-0 col-start-1 row-start-1 self-start flex items-center justify-center px-6 py-20">
        <div class="pinned-headline relative w-full mx-auto min-h-[clamp(32rem,60vh,42rem)] grid grid-cols-1 grid-rows-1">
          <ul aria-hidden="true" class="image-grid absolute col-start-1 row-start-1 col-end-1 row-end-1 w-full max-w-7xl min-w-xl justify-self-center self-center h-auto aspect-square list-none m-0 p-0 *:bg-foreground/6">
            <li class="image-tile absolute block w-1/5 aspect-3/4 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <img src="/images/intro-canvas/img-0001.webp" alt="Remi AI for construction businesses" class="w-full h-full object-cover" />
            </li>
            <li class="image-tile absolute block w-1/5 aspect-4/3 top-0 right-0">
              <img src="/images/intro-canvas/img-0003.webp" alt="Remi AI for meeting prep" class="w-full h-full object-cover" />
            </li>
            <li class="image-tile absolute block w-1/5 aspect-3/4 top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
              <img src="/images/intro-canvas/img-0005.webp" alt="Remi AI for marketing research" class="w-full h-full object-cover" />
            </li>
            <li class="image-tile absolute block w-1/5 aspect-4/3 bottom-0 right-0">
              <img src="/images/intro-canvas/img-0004.webp" alt="Remi AI for presentation research" class="w-full h-full object-cover" />
            </li>
            <li class="image-tile absolute block w-1/5 aspect-3/4 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
              <img src="/images/intro-canvas/img-0002.webp" alt="Remi AI for fashion designers" class="w-full h-full object-cover" />
            </li>
            <li class="image-tile absolute block w-1/5 aspect-4/3 bottom-0 left-0">
              <img src="/images/intro-canvas/img-0006.webp" alt="Remi AI for sales teams" class="w-full h-full object-cover" />
            </li>
            <li class="image-tile absolute block w-1/5 aspect-3/4 top-1/2 left-0 -translate-y-1/2 -translate-x-1/2">
              <img src="/images/intro-canvas/img-0007.webp" alt="Remi AI for small businesses" class="w-full h-full object-cover" />
            </li>
            <li class="image-tile absolute block w-1/5 aspect-4/3 top-0 left-0">
              <img src="/images/intro-canvas/img-0008.webp" alt="Remi AI for accounting teams" class="w-full h-full object-cover" />
            </li>
          </ul>
        </div>
      </div>

      <!-- Text sticky (z-10, above the gradient) -->
      <div class="pinned-headline-sticky sticky top-1/2 -translate-y-1/2 z-10 col-start-1 row-start-1 self-start flex items-center justify-center px-6 py-20">
        <div class="pinned-headline relative w-full mx-auto min-h-[clamp(34rem,60vh,42rem)] grid grid-cols-1 grid-rows-1">
          <div class="pinned-headline-content relative z-1 w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center gap-4 col-start-1 row-start-1 col-end-1 row-end-1">
            <p class="relative z-1 block text-base">
              Meet Remi
            </p>
            <h2
              class="relative z-1 block max-w-[20ch] text-center text-4xl md:text-[clamp(3.5rem,8vw,5rem)] leading-[1em] font-normal tracking-[-0.03em] text-balance text-foreground select-none mb-4">
              Remi takes care of the work that follows you home.
            </h2>
            <ul class="relative z-1 tasks-list text-base tracking-tight text-foreground/50 select-none">
              <li class="task-item">Meeting follow-ups</li>
              <li class="task-item">Client status updates</li>
              <li class="task-item">CRM cleanup</li>
              <li class="task-item">Proposal drafts</li>
              <li class="task-item">Support triage</li>
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
  will-change: transform, scale, translate;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
}

@supports (animation-timeline: view()) {
  .pinned-headline-content {
    animation: pinned-headline-scale linear both;
    animation-timeline: --pinned-headline-scroll;
    animation-range: cover 0% cover 100%;
  }
}

@supports (animation-timeline: view()) {
  .pinned-headline-sticky {
    animation: pin-tail linear both;
    animation-timeline: --pinned-headline-scroll;
    animation-range: cover 0% cover 100%;
  }
}

@keyframes pin-tail {
  0%, 70% {
    translate: 0 -50%;
  }
  100% {
    translate: 0 0%;
  }
}

@keyframes pinned-headline-scale {
  0% {
    scale: 0.92;
    translate: 0 1rem;
  }

  25% {
    scale: 0.92;
    translate: 0 1rem;
  }

  40% {
    scale: 1;
    translate: 0 0;
  }

  70% {
    scale: 1.045;
    translate: 0 0;
  }

  100% {
    scale: 1.07;
    translate: 0 -0.75rem;
  }
}

.image-grid {
  transform-origin: center center;
  will-change: rotate;
}

@property --tile-index {
  syntax: '<integer>';
  initial-value: 0;
  inherits: false;
}

.image-tile {
  --tile-index: 0;
  transform-origin: center center;
  will-change: rotate, clip-path, opacity;
  clip-path: inset(0% round 1em);
}

.image-grid > :nth-child(1) {
  --tile-index: 0;
}
.image-grid > :nth-child(2) {
  --tile-index: 1;
}
.image-grid > :nth-child(3) {
  --tile-index: 2;
}
.image-grid > :nth-child(4) {
  --tile-index: 3;
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
      image-tile-stagger linear both;
    animation-timeline: --pinned-headline-scroll, --pinned-headline-scroll;
    animation-range:
      cover 0% cover 100%,
      cover calc(var(--tile-index) * 10%) cover calc(var(--tile-index) * 10% + 70%);
  }
}

@keyframes image-grid-rotate {
  from {
    rotate: 0deg;
  }
  to {
    rotate: -360deg;
  }
}

@keyframes image-tile-counter-rotate {
  from {
    rotate: 0deg;
  }
  to {
    rotate: 360deg;
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
    gap: 0.25rem;
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
  0%, 60% {
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
  .image-tile {
    animation: none;
    rotate: 0deg;
  }

  .image-tile {
    clip-path: inset(0 round 1em);
    opacity: 1;
  }

  .tasks-list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
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
