<script setup>
import { PhCheck } from '@phosphor-icons/vue'
import Button from '../../global/button.vue'

</script>

<template>
  <div class="dialog-container flex flex-col gap-8 w-full">
    <div class="dialog-header flex flex-col gap-8">
      <h2 class="pr-10 text-3xl font-normal leading-[1.125em] tracking-tight text-foreground text-balance max-w-[32ch]">
        Sync knowledge from any tool
      </h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div class="flex flex-col gap-8 items-start">
          <p class="text-base font-normal leading-normal text-foreground/50 max-w-[40ch]">
            Meetings from Zoom, conversations from Slack, notes from Granola — all flow in, automatically. No new tool
            to open, no new habit to build.
          </p>
          <div class="flex items-center justify-start gap-2">
            <Button href="/start">Text Remi</Button>
            <Button variant="secondary">Pricing</Button>
          </div>

        </div>
        <ul
          class="list-none flex flex-col gap-2 [&>li]:flex [&>li]:items-start [&>li]:gap-2 [&>li]:text-sm [&_svg]:size-[1lh] [&_svg]:scale-80">
          <li>
            <PhCheck />
            Meetings from Zoom
          </li>
          <li>
            <PhCheck />
            Conversations from Slack
          </li>
          <li>
            <PhCheck />
            Notes from Granola
          </li>
          <li>
            <PhCheck />
            All flow in, automatically. No new tool to open, no new habit to build.
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="dialog-content mt-12">
    <div class="flex flex-col gap-8">
      <h3 class="text-2xl font-normal leading-[1.125em] tracking-tight text-foreground text-balance max-w-[32ch]">Not a
        copy. A living picture.</h3>
      <ul
        class="grid grid-cols-2 gap-8 text-base text-foreground/80 list-none [&>li]:flex [&>li]:flex-col [&>li]:gap-6 [&>li>p]:max-w-[40ch]">
        <li>
          <div class="rounded-2xl bg-foreground/5 aspect-video"></div>
          <p>
            <span class="font-medium text-foreground">Remi reads from where truth actually lives.</span>
            <span class="text-foreground/50">
              Remi goes to the source — not a copy, not a cached snapshot. Project status comes from the tracker. Client
              context comes from the thread. Remi doesn't work from a stale export.
            </span>
          </p>
        </li>
        <li>
          <div class="rounded-2xl bg-foreground/5 aspect-video"></div>
          <p>
            <span class="font-medium text-foreground">Remi synthesizes across surfaces.</span>
            <span class="text-foreground/50">
              A status update in Slack, a due date in Linear, a decision buried in an email thread — Remi connects these
              into one coherent picture instead of three disconnected facts.
            </span>
          </p>
        </li>
        <li>
          <div class="rounded-2xl bg-foreground/5 aspect-video"></div>
          <p>
            <span class="font-medium text-foreground">Remi updates when things change.</span>
            <span class="text-foreground/50">
              Remi notices when a project goes quiet, when a deadline passes without delivery, when a client signal
              shifts.
              The model stays current because the sources stay live.
            </span>
          </p>
        </li>
        <li>
          <div class="rounded-2xl bg-foreground/5 aspect-video"></div>
          <p>
            <span class="font-medium text-foreground">Remi carries context across time.</span>
            <span class="text-foreground/50">
              Conversations don't reset. What you discussed last week shapes how Remi understands this week. Remi builds
              an
              accumulating model of your work — not just today's updates, but the history that makes today make sense.
            </span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
