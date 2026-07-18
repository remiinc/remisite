<script setup>
import { computed, ref, watch } from 'vue'
import { PhPlus } from '@phosphor-icons/vue'
import { getFaqGroup, isFaqType } from '../../lib/faqs'
import { cn } from '../../lib/cn'
import Button from '../global/button.vue'

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: isFaqType,
  },
})

const faqGroup = computed(() => getFaqGroup(props.type))

const getDefaultOpenIndex = () => faqGroup.value?.defaultOpenIndex ?? null

const openFaqIndex = ref(getDefaultOpenIndex())

const isFaqOpen = (index) => openFaqIndex.value === index

const toggleFaq = (index) => {
  openFaqIndex.value = isFaqOpen(index) ? null : index
}

watch(() => props.type, () => {
  openFaqIndex.value = getDefaultOpenIndex()
})
</script>

<template>
  <section id="faq" class="mx-auto scroll-mt-24 px-6 py-24" data-faq-section :data-faq-type="type">
    <div class="w-full mx-auto max-w-(--content-width) grid md:grid-cols-[1fr_3fr] gap-x-24 gap-y-12">
      <div class="flex flex-col items-start gap-6">
        <h2 class="text-4xl font-normal tracking-tight text-foreground text-balance">{{ faqGroup.title }}</h2>
        <Button v-if="faqGroup.cta" :href="faqGroup.cta.href" size="sm"
          data-marketing-cta="faq_text_remi" data-marketing-destination="linq">
          <span class="flex items-center gap-2">
            <img src="/images/app-logos/ios-messages-icon.svg" alt="" class="size-4 shrink-0" aria-hidden="true">
            <span>{{ faqGroup.cta.label }}</span>
          </span>
        </Button>
      </div>

      <div>
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
        <nav v-if="faqGroup.links?.length" class="flex flex-wrap gap-x-6 gap-y-2 pt-6 text-sm text-muted-foreground"
          aria-label="More answers">
          <a v-for="link in faqGroup.links" :key="link.href" :href="link.href"
            class="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-foreground">
            {{ link.label }} →
          </a>
        </nav>
      </div>
    </div>
  </section>
</template>
