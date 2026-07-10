<script setup>
import { ref } from 'vue'
import { PhPlus } from '@phosphor-icons/vue'

const faqs = [
  {
    question: 'How secure is Remi?',
    answers: [
      'Remi is designed for secure workspaces with encrypted connections, controlled access, and clear boundaries between your internal data and member-facing experiences. Enterprise customers can layer in SSO, admin controls, permission-aware integrations, and custom security review requirements.',
    ],
  },
  {
    question: 'Which integrations does Remi have?',
    answers: [
      'Remi can connect to the tools your team already uses for files, calendars, meetings, messages, support, CRM, project work, and community operations. Common setups include Google Workspace, Slack, Notion, Zoom, Linear, GitHub, and other workflow tools.',
    ],
  },
  {
    question: 'Can Remi browse the web?',
    answers: [
      'Remi can combine your own workspace context with approved public information when web access is enabled. Teams can decide where browsing is useful and keep sensitive workflows grounded in connected tools and uploaded knowledge.',
    ],
  },
  {
    question: 'Which types of data can Remi handle?',
    answers: [
      'Remi can work with documents, PDFs, spreadsheets, meeting recordings, event details, member records, support notes, course materials, and structured data from connected systems. Additional sources can be added through integrations or custom workflows.',
    ],
  },
  {
    question: 'How does Remi store my data?',
    answers: [
      'Data added through uploads or integrations is indexed so Remi can retrieve the right context when helping with tasks, answers, and automations. Workspace data is kept logically separated, and enterprise deployments can be configured around stricter storage and retention needs.',
    ],
  },
  {
    question: 'How are data permissions handled?',
    answers: [
      'Permissions depend on how the data is added. Direct uploads can be managed inside Remi. Private integrations can respect the access scope of the connected user. Shared integrations can be configured by admins for workspace-wide or collection-specific access.',
      'The goal is simple: Remi should only use the context a person or workflow is allowed to access.',
    ],
  },
  {
    question: 'Which LLMs does Remi use? Are third-party models trained on my data?',
    answers: [
      'Remi is built to work across model providers and can be configured around the needs of the workspace. For enterprise use cases, model selection, data retention, and provider requirements can be reviewed as part of onboarding.',
    ],
  },
  {
    question: 'Which languages does Remi support?',
    answers: [
      'Remi can help across many common languages for member support, summaries, drafts, and operational work. For a specific language or localization requirement, the workspace can be tested during setup.',
    ],
  },
]

const openFaqIndex = ref(null)

const isFaqOpen = (index) => openFaqIndex.value === index

const toggleFaq = (index) => {
  openFaqIndex.value = isFaqOpen(index) ? null : index
}
</script>

<template>
  <section id="faq" class="mx-auto scroll-mt-24 px-6 py-24" data-faq-section>
    <div class="w-full mx-auto max-w-(--content-width)">
      <h2 class="text-4xl font-normal tracking-tight text-foreground">Questions we hear a lot.</h2>

      <div class="mt-8 border-t border-border">
        <div v-for="(faq, index) in faqs" :key="faq.question" class="border-b border-border last:border-b-0">
          <button type="button"
            class="flex w-full cursor-pointer items-center justify-between gap-6 py-4 text-left text-xl font-medium tracking-tight text-foreground transition-colors hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            :aria-expanded="isFaqOpen(index)" :aria-controls="`faq-answer-${index}`" @click="toggleFaq(index)">
            <span>{{ faq.question }}</span>
            <span
              class="faq-icon flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-300 ease-out"
              :class="{ 'is-open': isFaqOpen(index) }" aria-hidden="true">
              <PhPlus class="size-4" weight="bold" />
            </span>
          </button>

          <div :id="`faq-answer-${index}`"
            class="faq-answer grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
            :class="{ 'is-open': isFaqOpen(index) }" :aria-hidden="!isFaqOpen(index)" data-faq-answer>
            <div class="faq-answer-inner overflow-hidden">
              <div class="flex max-w-3xl flex-col gap-4 pb-8 text-base leading-normal text-muted-foreground">
                <p v-for="answer in faq.answers" :key="answer">
                  {{ answer }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-answer {
  grid-template-rows: 0fr;
}

.faq-answer-inner {
  min-height: 0;
}

.faq-answer.is-open {
  grid-template-rows: 1fr;
}

.faq-answer.is-open .faq-answer-inner {
  min-height: min-content;
}

.faq-icon.is-open {
  transform: rotate(45deg);
}

@media (prefers-reduced-motion: reduce) {

  [data-faq-answer],
  .faq-icon {
    transition: none;
  }
}
</style>
