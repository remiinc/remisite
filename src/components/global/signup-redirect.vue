<script setup>
import {
  buildGuidedOnboardingRedirect,
  buildProductEntryLink,
} from '../../lib/acquisition.js'

const guidedEntry = buildProductEntryLink('guided')
const fallbackSearch = guidedEntry
  ? new URL(guidedEntry, 'https://hireremi.ai').search
  : ''
const currentDestination = buildGuidedOnboardingRedirect(
  typeof window === 'undefined' ? '' : window.location.search,
)
const destination = new URL(currentDestination).searchParams.size > 0
  ? currentDestination
  : buildGuidedOnboardingRedirect(fallbackSearch)

if (typeof window !== 'undefined') {
  window.location.replace(destination)
}
</script>

<template>
  <a :href="destination" class="sr-only">Continue to Remi onboarding</a>
</template>
