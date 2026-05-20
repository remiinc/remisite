<script setup>
import { PhCheck } from '@phosphor-icons/vue'
import Button from '../../global/button.vue'

const emit = defineEmits(['book-demo'])
</script>

<template>
  <div class="dialog-container flex flex-col gap-8 w-full">
    <div class="dialog-header flex flex-col gap-8">
      <h2 class="pr-10 text-3xl font-normal leading-[1.125em] tracking-tight text-foreground text-balance max-w-[32ch]">
        Powerful Slack agent that works for anyone on your team
      </h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div class="flex flex-col gap-8 items-start">
          <p class="text-base font-normal leading-normal text-foreground/50 max-w-[40ch]">
            Remi lives where your team already talks. Ask a question, mention her in a thread, or hand off a task
            without pulling anyone into another dashboard.
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
            Works in channels, threads, and mentions
          </li>
          <li>
            <PhCheck />
            Answers with workspace context
          </li>
          <li>
            <PhCheck />
            Turns conversations into tasks and follow-ups
          </li>
          <li>
            <PhCheck />
            Gives everyone the same operator without adding another seat to manage
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="dialog-content mt-12">
    <div class="flex flex-col gap-8">
      <h3 class="text-2xl font-normal leading-[1.125em] tracking-tight text-foreground text-balance max-w-[32ch]">
        Operations help, right in the flow of work.
      </h3>
      <ul
        class="grid grid-cols-2 gap-8 text-base text-foreground/80 list-none [&>li]:flex [&>li]:flex-col [&>li]:gap-6 [&>li>p]:max-w-[40ch]">
        <li>
          <div class="rounded-2xl bg-foreground/5 aspect-video"></div>
          <p>
            <span class="font-medium text-foreground">Remi joins the conversation where it starts.</span>
            <span class="text-foreground/50">
              Teams can mention Remi in Slack to clarify ownership, summarize context, or move work forward without
              opening another tool.
            </span>
          </p>
        </li>
        <li>
          <div class="rounded-2xl bg-foreground/5 aspect-video"></div>
          <p>
            <span class="font-medium text-foreground">Remi understands the thread, not just the prompt.</span>
            <span class="text-foreground/50">
              Decisions, files, deadlines, and prior discussion become part of the response, so answers are grounded in
              what your team already said.
            </span>
          </p>
        </li>
        <li>
          <div class="rounded-2xl bg-foreground/5 aspect-video"></div>
          <p>
            <span class="font-medium text-foreground">Remi turns loose messages into clean handoffs.</span>
            <span class="text-foreground/50">
              Action items, follow-ups, briefs, and recaps can be drafted from the conversation so nothing depends on
              someone remembering to clean it up later.
            </span>
          </p>
        </li>
        <li>
          <div class="rounded-2xl bg-foreground/5 aspect-video"></div>
          <p>
            <span class="font-medium text-foreground">Remi stays useful for the whole team.</span>
            <span class="text-foreground/50">
              Anyone can ask for help in the shared workspace, while admins keep the underlying context, tools, and
              permissions organized.
            </span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
