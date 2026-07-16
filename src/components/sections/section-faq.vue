<script setup>
import { computed, ref, watch } from 'vue'
import { PhPlus } from '@phosphor-icons/vue'
import { getFaqGroup, isFaqType } from '../../lib/faqs'
import { cn } from '../../lib/cn'

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: isFaqType,
  },
})

const faqGroup = computed(() => getFaqGroup(props.type))

const openFaqIndex = ref(null)

const isFaqOpen = (index) => openFaqIndex.value === index

const toggleFaq = (index) => {
  openFaqIndex.value = isFaqOpen(index) ? null : index
}

watch(() => props.type, () => {
  openFaqIndex.value = null
})
</script>

<template>
  <section id="faq" class="mx-auto scroll-mt-24 px-6 py-24" data-faq-section :data-faq-type="type">
    <div class="w-full mx-auto max-w-(--content-width) grid md:grid-cols-[1fr_3fr] gap-x-24 gap-y-12">
      <h2 class="text-4xl font-normal tracking-tight text-foreground text-balance">{{ faqGroup.title }}</h2>

      <div class="border-t border-border md:[&:has(button:hover)_button:not(:hover)]:opacity-50">
        <div v-for="(faq, index) in faqGroup.items" :key="faq.question" class="border-b border-border last:border-b-0">
          <button type="button"
            :class="cn('group/faq flex w-full cursor-pointer items-start justify-between gap-6 py-4',
            'text-left text-lg font-[450] tracking-tight',
            'text-foreground transition-[opacity,color] hover:text-foreground hover:opacity-100',
            'focus-visible:outline-none',
            isFaqOpen(index) && 'text-foreground')"
            :aria-expanded="isFaqOpen(index)" :aria-controls="`faq-${type}-answer-${index}`" @click="toggleFaq(index)">
            <span>{{ faq.question }}</span>
            <span
              class="faq-icon flex h-lh px-2.5 shrink-0 items-center justify-center rounded-full bg-foreground/5 group-hover/faq:bg-foreground/10 group-focus-visible/faq:bg-foreground/20 text-foreground transition-colors duration-300 ease-out"
              :class="{ 'is-open': isFaqOpen(index) }" aria-hidden="true">
              <PhPlus class="size-4" weight="bold" :class="cn('transition-all duration-300 ease-out', isFaqOpen(index) && 'rotate-45')" />
            </span>
          </button>

          <div :id="`faq-${type}-answer-${index}`"
            class="faq-answer grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
            :class="cn('grid-rows-[0fr]', isFaqOpen(index) && 'grid-rows-[1fr]')" :aria-hidden="!isFaqOpen(index)" data-faq-answer>
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
