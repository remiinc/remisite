<script setup>
import { PhCheck } from '@phosphor-icons/vue'
import Button from '../../global/button.vue'

</script>

<template>
  <div class="dialog-container flex flex-col gap-8 w-full">
    <div class="dialog-header flex flex-col gap-8">
      <h2 class="pr-10 text-3xl font-normal leading-[1.125em] tracking-tight text-foreground text-balance max-w-[32ch]">
        Shared memory system organized automatically
      </h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div class="flex flex-col gap-8 items-start">
          <p class="text-base font-normal leading-normal text-foreground/50 max-w-[40ch]">
            Remi does not keep one big pile of information. Remi organizes what happens across Slack, email, docs, and
            project tools into connected memory layers that stay useful over time.
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
            Today's active context, decisions, and commitments
          </li>
          <li>
            <PhCheck />
            Topic, project, relationship, and org memory layers
          </li>
          <li>
            <PhCheck />
            Automatic classification, routing, and cross-reference
          </li>
          <li>
            <PhCheck />
            Context that carries forward instead of resetting
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="dialog-content mt-12">
    <div class="flex flex-col gap-8">
      <h3 class="text-2xl font-normal leading-[1.125em] tracking-tight text-foreground text-balance max-w-[32ch]">
        Not storage. Organization.
      </h3>
      <ul
        class="grid grid-cols-2 gap-8 text-base text-foreground/80 list-none [&>li]:flex [&>li]:flex-col [&>li]:gap-6 [&>li>p]:max-w-[40ch]">
        <li>
          <div class="rounded-2xl bg-foreground/5 aspect-video"></div>
          <p>
            <span class="font-medium text-foreground">Layered memory keeps the right context findable.</span>
            <span class="text-foreground/50">
              Remi maintains today's layer, topic memory, project records, relationship context, and stable org facts so
              each kind of knowledge has a useful place to live.
            </span>
          </p>
        </li>
        <li>
          <div class="rounded-2xl bg-foreground/5 aspect-video"></div>
          <p>
            <span class="font-medium text-foreground">Automatic cross-reference turns facts into context.</span>
            <span class="text-foreground/50">
              When client feedback arrives, Remi connects it to the project record, the owner, and the open loop it was
              meant to close.
            </span>
          </p>
        </li>
        <li>
          <div class="rounded-2xl bg-foreground/5 aspect-video"></div>
          <p>
            <span class="font-medium text-foreground">Always organized, never manual.</span>
            <span class="text-foreground/50">
              As information comes in, Remi classifies it, routes it to the right layer, links it to existing records,
              and knows when it should surface again.
            </span>
          </p>
        </li>
        <li>
          <div class="rounded-2xl bg-foreground/5 aspect-video"></div>
          <p>
            <span class="font-medium text-foreground">Context carries forward across time.</span>
            <span class="text-foreground/50">
              What was discussed last week shapes how Remi understands this week, so projects reopen with status,
              blockers, and history already intact.
            </span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
