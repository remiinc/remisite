<script setup>
import { PhArrowUp, PhPlus } from '@phosphor-icons/vue'
import { ref } from 'vue'

const emit = defineEmits(['send'])

const message = ref('')

const send = () => {
  emit('send', message.value.trim())
}

const onKeydown = (event) => {
  if (event.key !== 'Enter' || event.shiftKey) return

  event.preventDefault()
  send()
}
</script>

<template>
  <form class="group/input relative w-full max-w-md mx-auto" @submit.prevent="send">
    <div class="relative z-1 grid grid-cols-[auto_1fr_auto] grid-rows-1">
      <div class="flex flex-col justify-start p-2">
        <button
          type="button"
          class="inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/8 hover:text-foreground"
          aria-label="Open chat attachments menu"
        >
          <PhPlus :size="18" weight="regular" aria-hidden="true" />
        </button>
      </div>

      <div class="peer/input relative overflow-hidden">
        <label for="hero-input-textarea" class="sr-only">
          Ask Remi a question...
        </label>
        <textarea
          id="hero-input-textarea"
          v-model="message"
          name="hero-input-textarea"
          rows="1"
          autofocus
          placeholder="Ask Remi a question..."
          class="m-0 block w-full resize-none bg-transparent px-1 py-4 text-sm leading-[20px] text-foreground field-sizing-content placeholder:text-muted-foreground disabled:cursor-not-allowed"
          @keydown="onKeydown"
        />
      </div>

      <button
        type="submit"
        class="m-2 inline-flex size-9 cursor-pointer items-center justify-center self-end rounded-full bg-foreground text-background transition-colors hover:bg-foreground peer-has-placeholder-shown/input:bg-foreground/50"
        aria-label="Send message"
      >
        <PhArrowUp :size="18" weight="regular" aria-hidden="true" />
      </button>
    </div>

    <div class="absolute inset-0 rounded-4xl bg-foreground/5 transition-all duration-200 ease-in-out group-focus-within/input:bg-foreground/8" />
  </form>
</template>

<style scoped>
button,
textarea {
  outline: none;
}
</style>
