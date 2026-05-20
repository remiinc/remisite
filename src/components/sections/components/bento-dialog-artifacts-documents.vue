<script setup>
import { PhCheck } from '@phosphor-icons/vue'
import Button from '../../global/button.vue'

const emit = defineEmits(['book-demo'])
</script>

<template>
  <div class="dialog-container flex flex-col gap-8 w-full">
    <div class="dialog-header flex flex-col gap-8">
      <h2 class="pr-10 text-3xl font-normal leading-[1.125em] tracking-tight text-foreground text-balance max-w-[32ch]">
        Remi doesn't just answer. She delivers.
      </h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div class="flex flex-col gap-8 items-start">
          <p class="text-base font-normal leading-normal text-foreground/50 max-w-[40ch]">
            Remi turns work into artifacts: structured, shareable, reusable documents that live in your workspace and
            stay connected to the work that created them.
          </p>
          <div class="flex items-center justify-start gap-2">
            <Button @click="emit('book-demo')">Book a Demo</Button>
            <Button variant="secondary">Pricing</Button>
          </div>
        </div>
        <ul
          class="list-none flex flex-col gap-2 [&>li]:flex [&>li]:items-start [&>li]:gap-2 [&>li]:text-sm [&_svg]:size-[1lh] [&_svg]:scale-80">
          <li>
            <PhCheck />
            Proposals, SOWs, briefs, and kickoff packets
          </li>
          <li>
            <PhCheck />
            Status reports, stakeholder updates, and meeting summaries
          </li>
          <li>
            <PhCheck />
            Playbooks, operating checklists, and review artifacts
          </li>
          <li>
            <PhCheck />
            Documents that stay connected to the project they came from
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="dialog-content mt-12">
    <div class="flex flex-col gap-8">
      <h3 class="text-2xl font-normal leading-[1.125em] tracking-tight text-foreground text-balance max-w-[32ch]">
        When output matters beyond chat, Remi builds it properly.
      </h3>
      <ul
        class="grid grid-cols-2 gap-8 text-base text-foreground/80 list-none [&>li]:flex [&>li]:flex-col [&>li]:gap-6 [&>li>p]:max-w-[40ch]">
        <li>
          <div class="rounded-2xl bg-foreground/5 aspect-video"></div>
          <p>
            <span class="font-medium text-foreground">Work that lives beyond chat.</span>
            <span class="text-foreground/50">
              Remi turns important outputs into proper documents: structured, formatted, and stored in your workspace.
            </span>
          </p>
        </li>
        <li>
          <div class="rounded-2xl bg-foreground/5 aspect-video"></div>
          <p>
            <span class="font-medium text-foreground">Built in real time.</span>
            <span class="text-foreground/50">
              When Remi creates a document, you watch it take shape so you can course-correct before the final handoff.
            </span>
          </p>
        </li>
        <li>
          <div class="rounded-2xl bg-foreground/5 aspect-video"></div>
          <p>
            <span class="font-medium text-foreground">Connected to the work that created it.</span>
            <span class="text-foreground/50">
              Every artifact is linked to the project, client, or topic it belongs to, so it becomes part of what Remi
              remembers.
            </span>
          </p>
        </li>
        <li>
          <div class="rounded-2xl bg-foreground/5 aspect-video"></div>
          <p>
            <span class="font-medium text-foreground">Ready to hand off.</span>
            <span class="text-foreground/50">
              Formatted, readable, and shareable, whether it is a client proposal, internal brief, or review artifact.
            </span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
