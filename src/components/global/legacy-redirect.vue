<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
})

onMounted(() => {
  window.location.replace(props.to)
})
</script>

<template>
  <main class="flex min-h-svh items-center justify-center bg-background px-6 text-foreground">
    <p class="text-sm text-muted-foreground">
      This page has moved. <a :href="to" class="text-foreground underline underline-offset-4">Continue to Solutions</a>.
    </p>
  </main>
</template>
