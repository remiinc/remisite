<script setup>
import {
  PhEye,
  PhFingerprint,
  PhKey,
  PhLockSimple,
  PhShieldCheck,
} from '@phosphor-icons/vue'

defineProps({
  id: {
    type: String,
    default: 'features-security',
  },
})

const trustPrinciples = [
  {
    title: 'You stay in control',
    description: 'Remi only uses the access you grant. Change, limit, or revoke any connection whenever you need.',
    icon: PhKey,
  },
  {
    title: 'Every action leaves a trail',
    description: 'Remi keeps the source close to every draft, answer, and next step, so you can see where the work came from.',
    icon: PhEye,
  },
  {
    title: 'Approval comes first',
    description: 'Remi starts by asking and earns more responsibility over time. You decide what Remi can do without approval.',
    icon: PhShieldCheck,
  },
  {
    title: 'Your data is not training data',
    description: 'Your business data is never sold, shared for advertising, or used to train AI models.',
    icon: PhLockSimple,
  },
]
</script>

<template>
  <section :id="id" class="scroll-mt-24 px-6 py-12" aria-labelledby="security-proof-title" data-security-proof>
    <div class="mx-auto grid w-full max-w-(--content-width) gap-4 lg:grid-cols-[0.82fr_1.18fr]">
      <div class="rounded-3xl bg-foreground p-8 text-background md:p-10">
        <div class="flex h-full min-h-120 flex-col justify-between gap-12">
          <div class="flex flex-col gap-5">
            <PhFingerprint class="size-6 text-background" weight="fill" aria-hidden="true" />
            <h2 id="security-proof-title" class="max-w-[12ch] text-4xl font-normal leading-none tracking-tight text-balance">
              Permission before power
            </h2>
          </div>
          <p class="max-w-md text-base leading-normal text-pretty text-background">
            Remi works best with enough context to help and clear boundaries on what happens next. Every connection is
            scoped, every draft can be checked, and important actions stay under your control.
          </p>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <article
          v-for="principle in trustPrinciples"
          :key="principle.title"
          class="flex min-h-72 flex-col justify-between rounded-3xl bg-muted p-6"
        >
          <component :is="principle.icon" class="size-5 text-foreground/40" weight="fill" aria-hidden="true" />
          <div class="mt-12 flex flex-col gap-3">
            <h3 class="text-xl leading-tight tracking-tight text-balance">
              {{ principle.title }}
            </h3>
            <p class="text-sm leading-normal text-pretty text-foreground/50">
              {{ principle.description }}
            </p>
          </div>
        </article>
      </div>
    </div>

  </section>
</template>
