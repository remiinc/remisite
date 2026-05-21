<script setup>
import { computed, ref } from 'vue'
import { PhArrowLeft, PhArrowRight } from '@phosphor-icons/vue'
import { cn } from '../../lib/cn'
import RemiLogo from '../global/site-logo.vue'
import LogoChatgpt from '../logos/logo-chatgpt.vue'
import LogoClaude from '../logos/logo-claude.vue'
import LogoCopilot from '../logos/logo-copilot.vue'
import LogoPerplexity from '../logos/logo-perplexity.vue'
import LogoZapier from '../logos/logo-zapier.vue'
import { Shader, FilmGrain, Swirl } from 'shaders/vue'

const comparisons = [
  {
    useCase: 'Meeting follow-ups',
    competitor: 'Copilot',
    competitorLogo: LogoCopilot,
    tools: 'Copilot summarizes your meeting. ChatGPT or Claude can turn notes into a cleaner recap.',
    remi: 'Remi creates the tasks, sends the follow-ups, updates CRM, and keeps tracking what is still open.',
  },
  {
    useCase: 'Client status updates',
    competitor: 'ChatGPT',
    competitorLogo: LogoChatgpt,
    tools: 'ChatGPT can draft an update if you paste in the context and explain what changed.',
    remi: 'Remi pulls the latest project context, identifies blockers, drafts the update, and routes it to the right people.',
  },
  {
    useCase: 'Recurring operations',
    competitor: 'Zapier',
    competitorLogo: LogoZapier,
    tools: 'Zapier can trigger workflows you manually define and maintain step by step.',
    remi: 'Remi understands the recurring obligation, gathers the inputs, prepares the work, and follows through.',
  },
  {
    useCase: 'Finding business context',
    competitor: 'Perplexity',
    competitorLogo: LogoPerplexity,
    tools: 'Perplexity can find public answers and summarize sources, but it does not know your internal business context.',
    remi: 'Remi searches across Slack, email, docs, CRM, and project tools with memory of how it all connects.',
  },
  {
    useCase: 'Support ticket triage',
    competitor: 'ChatGPT',
    competitorLogo: LogoChatgpt,
    tools: 'ChatGPT can help rewrite a support reply once you paste the customer issue and policy context.',
    remi: 'Remi reads the ticket, checks account history, drafts the reply, routes the task, and keeps the SLA visible.',
  },
  {
    useCase: 'Proposal prep',
    competitor: 'Claude',
    competitorLogo: LogoClaude,
    tools: 'Claude can help write proposal sections after you paste the client context and tell it what to include.',
    remi: 'Remi pulls client history, scope, pricing, and past decisions into a proposal your team can actually send.',
  },
]

const activeComparisonIndex = ref(0)
const canScrollMobilePrev = computed(() => activeComparisonIndex.value > 0)
const canScrollMobileNext = computed(() => activeComparisonIndex.value < comparisons.length - 1)
const activeComparison = computed(() => comparisons[activeComparisonIndex.value] || comparisons[0])

const setActiveComparison = (index) => {
  activeComparisonIndex.value = Math.min(Math.max(index, 0), comparisons.length - 1)
}

const scrollMobilePrev = () => {
  setActiveComparison(activeComparisonIndex.value - 1)
}

const scrollMobileNext = () => {
  setActiveComparison(activeComparisonIndex.value + 1)
}
</script>

<template>
  <section :class="cn('relative mx-auto max-w-[1400px] px-6 py-24')" data-remi-vs-tools>
    <div :class="cn('mb-12 max-w-4xl')">
      <h2 :class="cn('text-4xl font-normal leading-none tracking-tight text-balance text-foreground')">
        AI tools answer questions.<br />
        <span :class="cn('text-foreground/50')">
          Operations need follow-through.
        </span>
      </h2>
    </div>

    <div :class="cn('grid gap-2 lg:grid-cols-[0.45fr_1fr]')">
      <div :class="cn('flex items-center justify-center gap-4 py-2 lg:hidden')" aria-label="Use case comparison">
        <button
          type="button"
          aria-label="Previous comparison"
          :disabled="!canScrollMobilePrev"
          :class="cn('flex size-11 cursor-pointer items-center justify-center rounded-full bg-foreground/5 text-foreground transition-colors hover:bg-foreground/10 disabled:pointer-events-none disabled:opacity-30')"
          @click="scrollMobilePrev"
        >
          <PhArrowLeft class="size-4" aria-hidden="true" weight="bold" />
        </button>
        <div :class="cn('flex min-h-14 flex-1 items-center justify-center text-center')" aria-live="polite">
          <Transition
            mode="out-in"
            enter-active-class="origin-center transition duration-200 ease-out"
            enter-from-class="scale-[0.98] opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-active-class="origin-center transition duration-150 ease-in"
            leave-from-class="scale-100 opacity-100"
            leave-to-class="scale-[0.98] opacity-0"
          >
            <p :key="activeComparison.useCase" :class="cn('text-base font-medium leading-tight tracking-tight text-foreground')">
              {{ activeComparison.useCase }}
            </p>
          </Transition>
        </div>
        <button
          type="button"
          aria-label="Next comparison"
          :disabled="!canScrollMobileNext"
          :class="cn('flex size-11 cursor-pointer items-center justify-center rounded-full bg-foreground text-background transition-colors hover:bg-foreground/80 disabled:pointer-events-none disabled:opacity-30')"
          @click="scrollMobileNext"
        >
          <PhArrowRight class="size-4" aria-hidden="true" weight="bold" />
        </button>
      </div>

      <div :class="cn(
        'relative hidden flex-col gap-2 lg:flex',
      )" role="tablist" aria-label="Use case comparison">
        <button v-for="(comparison, index) in comparisons" :key="comparison.useCase" type="button" role="tab"
          :aria-selected="activeComparisonIndex === index" :class="cn(
            'relative z-1 flex w-full cursor-pointer items-start justify-start gap-4 rounded-2xl p-5 text-left transition-all duration-300 ease-out',
            activeComparisonIndex === index ? 'bg-foreground text-background flex-1' : 'text-foreground/50 bg-foreground/5 hover:bg-foreground/10 hover:text-foreground',
          )" @click="setActiveComparison(index)">
          <span :class="cn('text-xl font-normal leading-tight tracking-tight')">
            {{ comparison.useCase }}
          </span>
        </button>
      </div>

      <article :class="cn(
        'relative overflow-hidden',
      )">
        <Transition
          name="comparison-set"
          mode="out-in"
          :duration="{ enter: 380, leave: 260 }"
        >
          <div :key="activeComparison.useCase" :class="cn('grid gap-2 md:grid-cols-2')">
            <div
              :class="cn('comparison-panel rounded-2xl bg-foreground/5 p-6 min-h-80 md:min-h-124 flex flex-col items-start justify-between')">
              <div :class="cn('flex items-center gap-3 text-foreground')">
                <component :is="activeComparison.competitorLogo" :class="cn('size-10 shrink-0')" />
                <p :class="cn('text-sm font-normal leading-none text-foreground/50')">
                  {{ activeComparison.competitor }}
                </p>
              </div>
              <p :class="cn('text-2xl font-normal leading-tight tracking-tight text-foreground text-pretty')">
                {{ activeComparison.tools }}
              </p>
            </div>

            <div
              :class="cn('comparison-panel relative rounded-2xl overflow-hidden bg-cyan-100 p-6 text-foreground min-h-80 md:min-h-120 flex flex-col items-start justify-between')">
              <p :class="cn('relative z-1 text-sm font-normal leading-non')">
                <RemiLogo />
              </p>
              <p :class="cn('relative z-1 text-2xl font-normal leading-tight tracking-tight text-pretty')">
                {{ activeComparison.remi }}
              </p>
              <div :class="cn('absolute inset-0')">
                <Shader class="absolute inset-0 h-full w-full" disable-telemetry>
                  <FilmGrain :strength="0.5" :bias="0.4" :animated="true">
                    <Swirl color-a="oklch(0.98 0.024 259.597)" color-b="oklch(0.858 0.07 259.597)" color-space="oklch"
                      :speed="0.5" :detail="1.35" :blend="50" />
                  </FilmGrain>
                </Shader>
              </div>
            </div>
          </div>
        </Transition>
      </article>
    </div>
  </section>
</template>

<style scoped>
.comparison-set-enter-active .comparison-panel,
.comparison-set-leave-active .comparison-panel {
  transform-origin: center;
  transition-property: opacity, transform;
}

.comparison-set-enter-active .comparison-panel {
  transition-duration: 300ms;
  transition-timing-function: ease-out;
}

.comparison-set-leave-active .comparison-panel {
  transition-duration: 200ms;
  transition-timing-function: ease-in;
}

.comparison-set-enter-active .comparison-panel:nth-child(2) {
  transition-delay: 80ms;
}

.comparison-set-leave-active .comparison-panel:nth-child(2) {
  transition-delay: 60ms;
}

.comparison-set-enter-from .comparison-panel,
.comparison-set-leave-to .comparison-panel {
  opacity: 0;
  transform: scale(0.98);
}

.comparison-set-enter-to .comparison-panel,
.comparison-set-leave-from .comparison-panel {
  opacity: 1;
  transform: scale(1);
}

@media (prefers-reduced-motion: reduce) {
  .comparison-set-enter-active .comparison-panel,
  .comparison-set-leave-active .comparison-panel {
    transition-duration: 1ms;
    transition-delay: 0ms;
  }
}
</style>
