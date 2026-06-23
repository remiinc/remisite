<script setup>
import { PhCaretDown, PhCheck } from '@phosphor-icons/vue'
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import Button from '../global/button.vue'
import GlobalHeader from '../header/global-header.vue'
import UiInput from '../ui/input.vue'
import UiLabel from '../ui/label.vue'
import UiSelect from '../ui/select.vue'

const props = defineProps({
  email: {
    type: String,
    default: '',
  },
})

const form = reactive({
  email: props.email,
  firstName: '',
  lastName: '',
  companyName: '',
  companySize: '',
  phoneCountry: 'US',
  phoneNumber: '',
  referralSource: '',
})

const isEmailLocked = computed(() => props.email.trim().length > 0)

const companySizeOptions = [
  { value: '1-10', label: '1-10' },
  { value: '11-50', label: '11-50' },
  { value: '51-200', label: '51-200' },
  { value: '201-500', label: '201-500' },
  { value: '501-1000', label: '501-1000' },
  { value: '1001+', label: '1001+' },
]

const countryCodes = [
  { value: 'US', label: 'United States', dial: '+1', flag: '🇺🇸' },
  { value: 'CA', label: 'Canada', dial: '+1', flag: '🇨🇦' },
  { value: 'GB', label: 'United Kingdom', dial: '+44', flag: '🇬🇧' },
  { value: 'AU', label: 'Australia', dial: '+61', flag: '🇦🇺' },
  { value: 'DE', label: 'Germany', dial: '+49', flag: '🇩🇪' },
  { value: 'FR', label: 'France', dial: '+33', flag: '🇫🇷' },
  { value: 'NL', label: 'Netherlands', dial: '+31', flag: '🇳🇱' },
  { value: 'ES', label: 'Spain', dial: '+34', flag: '🇪🇸' },
  { value: 'IT', label: 'Italy', dial: '+39', flag: '🇮🇹' },
  { value: 'IE', label: 'Ireland', dial: '+353', flag: '🇮🇪' },
  { value: 'SE', label: 'Sweden', dial: '+46', flag: '🇸🇪' },
  { value: 'NO', label: 'Norway', dial: '+47', flag: '🇳🇴' },
  { value: 'DK', label: 'Denmark', dial: '+45', flag: '🇩🇰' },
  { value: 'FI', label: 'Finland', dial: '+358', flag: '🇫🇮' },
  { value: 'CH', label: 'Switzerland', dial: '+41', flag: '🇨🇭' },
  { value: 'AT', label: 'Austria', dial: '+43', flag: '🇦🇹' },
  { value: 'BE', label: 'Belgium', dial: '+32', flag: '🇧🇪' },
  { value: 'PT', label: 'Portugal', dial: '+351', flag: '🇵🇹' },
  { value: 'PL', label: 'Poland', dial: '+48', flag: '🇵🇱' },
  { value: 'CZ', label: 'Czech Republic', dial: '+420', flag: '🇨🇿' },
  { value: 'JP', label: 'Japan', dial: '+81', flag: '🇯🇵' },
  { value: 'SG', label: 'Singapore', dial: '+65', flag: '🇸🇬' },
  { value: 'IN', label: 'India', dial: '+91', flag: '🇮🇳' },
  { value: 'BR', label: 'Brazil', dial: '+55', flag: '🇧🇷' },
  { value: 'MX', label: 'Mexico', dial: '+52', flag: '🇲🇽' },
]

const selectedCountry = computed(() =>
  countryCodes.find((c) => c.value === form.phoneCountry) || countryCodes[0],
)

const countryRoot = ref(null)
const countryTrigger = ref(null)
const countryListbox = ref(null)
const isCountryFocused = ref(false)
const isCountryOpen = ref(false)
const countryMenuPlacement = ref('bottom')
const countryMenuStyle = ref({})

const menuGap = 8
const menuMaxHeight = 264
const viewportPadding = 8

const updateCountryMenuPosition = () => {
  const triggerRect = countryTrigger.value?.getBoundingClientRect()
  if (!triggerRect) return

  const desiredWidth = 280
  const spaceAbove = Math.max(0, triggerRect.top - viewportPadding - menuGap)
  const spaceBelow = Math.max(0, window.innerHeight - triggerRect.bottom - viewportPadding - menuGap)
  const estimatedHeight = Math.min(menuMaxHeight, countryCodes.length * 36 + 8)
  const shouldOpenTop = spaceBelow < estimatedHeight && spaceAbove > spaceBelow
  const availableSpace = shouldOpenTop ? spaceAbove : spaceBelow
  const maxHeight = Math.min(menuMaxHeight, Math.max(120, availableSpace))
  const listboxHeight = countryListbox.value?.getBoundingClientRect().height || Math.min(estimatedHeight, maxHeight)
  const width = Math.min(desiredWidth, window.innerWidth - viewportPadding * 2)
  const top = shouldOpenTop
    ? Math.max(viewportPadding, triggerRect.top - menuGap - listboxHeight)
    : triggerRect.bottom + menuGap
  const maxLeft = Math.max(viewportPadding, window.innerWidth - viewportPadding - width)
  const left = Math.min(Math.max(viewportPadding, triggerRect.left), maxLeft)

  countryMenuPlacement.value = shouldOpenTop ? 'top' : 'bottom'
  countryMenuStyle.value = {
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    maxHeight: `${maxHeight}px`,
  }
}

const openCountryMenu = () => {
  isCountryOpen.value = true
  isCountryFocused.value = true
  nextTick(() => {
    updateCountryMenuPosition()
    window.requestAnimationFrame(updateCountryMenuPosition)
  })
}

const closeCountryMenu = () => {
  isCountryOpen.value = false
}

const closeAndBlurCountry = () => {
  closeCountryMenu()
  isCountryFocused.value = false
}

const toggleCountryMenu = () => {
  if (isCountryOpen.value) {
    closeCountryMenu()
    return
  }
  openCountryMenu()
}

const selectCountry = (country) => {
  form.phoneCountry = country.value
  closeCountryMenu()
  nextTick(() => {
    countryTrigger.value?.focus()
  })
}

const onDocumentPointerDown = (event) => {
  const isInsideTrigger = countryRoot.value?.contains(event.target)
  const isInsideMenu = countryListbox.value?.contains(event.target)
  if (!isInsideTrigger && !isInsideMenu) {
    closeAndBlurCountry()
  }
}

const onCountryViewportChange = () => {
  if (isCountryOpen.value) updateCountryMenuPosition()
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown)
  window.addEventListener('resize', onCountryViewportChange)
  window.addEventListener('scroll', onCountryViewportChange, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  window.removeEventListener('resize', onCountryViewportChange)
  window.removeEventListener('scroll', onCountryViewportChange, true)
})
</script>

<template>
  <div class="relative min-h-svh bg-background text-foreground">
    <GlobalHeader />

    <main class="mx-auto flex w-full max-w-xl flex-col px-6 pt-28 pb-24 sm:pt-32">
      <div class="flex flex-col gap-3 text-left">
        <h1 class="text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
          You might be a great fit for Remi!
        </h1>
        <p class="text-base leading-relaxed text-muted-foreground">
          Let us know how to get in touch with you.
        </p>
      </div>

      <form
        class="mt-10 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2"
        @submit.prevent
      >
        <div class="col-span-full space-y-2 text-left">
          <UiLabel for="qualify-email">Email address</UiLabel>
          <UiInput
            id="qualify-email"
            v-model="form.email"
            name="email"
            type="email"
            placeholder="alex@company.com"
            autocomplete="email"
            required
            :disabled="isEmailLocked"
          />
        </div>

        <div class="space-y-2 text-left">
          <UiLabel for="qualify-first-name">First name</UiLabel>
          <UiInput
            id="qualify-first-name"
            v-model="form.firstName"
            name="firstName"
            placeholder="Alex"
            autocomplete="given-name"
            required
          />
        </div>

        <div class="space-y-2 text-left">
          <UiLabel for="qualify-last-name">Last name</UiLabel>
          <UiInput
            id="qualify-last-name"
            v-model="form.lastName"
            name="lastName"
            placeholder="Morgan"
            autocomplete="family-name"
            required
          />
        </div>

        <div class="col-span-full space-y-2 text-left">
          <UiLabel for="qualify-company">Company name</UiLabel>
          <UiInput
            id="qualify-company"
            v-model="form.companyName"
            name="companyName"
            placeholder="Acme Operations"
            autocomplete="organization"
            required
          />
        </div>

        <div class="col-span-full space-y-2 text-left">
          <UiLabel for="qualify-company-size">Company size</UiLabel>
          <UiSelect
            id="qualify-company-size"
            v-model="form.companySize"
            name="companySize"
            placeholder="Select company size"
            :options="companySizeOptions"
            required
          />
        </div>

        <div class="col-span-full space-y-2 text-left">
          <UiLabel for="qualify-phone">
            Phone number
            <span class="font-normal text-muted-foreground">(optional)</span>
          </UiLabel>
          <div class="flex items-stretch gap-2">
            <div ref="countryRoot" class="relative shrink-0">
              <input
                type="hidden"
                name="phoneCountry"
                :value="form.phoneCountry"
              >
              <button
                ref="countryTrigger"
                type="button"
                data-slot="select-trigger"
                role="combobox"
                aria-haspopup="listbox"
                aria-controls="qualify-phone-country-listbox"
                :aria-expanded="isCountryOpen"
                :data-focused="isCountryFocused ? 'true' : undefined"
                class="flex h-9 items-center justify-between gap-2 rounded-full bg-transparent px-3 py-2 text-sm shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--color-foreground)_10%,transparent),0_0_0_0_color-mix(in_oklch,var(--color-foreground)_0%,transparent)] transition-[box-shadow,color]"
                @pointerdown="isCountryFocused = true"
                @mousedown="isCountryFocused = true"
                @click="toggleCountryMenu"
                @focus="isCountryFocused = true"
                @focusin="isCountryFocused = true"
                @keydown.down.prevent="openCountryMenu"
                @keydown.enter.prevent="toggleCountryMenu"
                @keydown.space.prevent="toggleCountryMenu"
                @keydown.esc.prevent="closeAndBlurCountry"
              >
                <span class="inline-flex items-center gap-1.5">
                  <span aria-hidden="true" class="text-base leading-none">{{ selectedCountry.flag }}</span>
                  <span class="text-foreground">{{ selectedCountry.dial }}</span>
                </span>
                <PhCaretDown
                  class="size-3.5 shrink-0 text-muted-foreground opacity-50 transition-transform"
                  :class="isCountryOpen ? 'rotate-180' : ''"
                  weight="bold"
                  aria-hidden="true"
                />
              </button>

              <Teleport to="body">
                <div
                  v-if="isCountryOpen"
                  id="qualify-phone-country-listbox"
                  ref="countryListbox"
                  role="listbox"
                  :data-placement="countryMenuPlacement"
                  :style="countryMenuStyle"
                  class="fixed z-[120] overflow-y-auto rounded-xl bg-background p-1 shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--color-foreground)_10%,transparent),0_0_0_3px_color-mix(in_oklch,var(--color-foreground)_4%,transparent)]"
                >
                  <button
                    v-for="country in countryCodes"
                    :key="country.value"
                    type="button"
                    data-slot="select-option"
                    role="option"
                    :aria-selected="country.value === form.phoneCountry"
                    class="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-foreground/5"
                    :class="country.value === form.phoneCountry ? 'bg-foreground/5' : ''"
                    @mousedown.prevent
                    @click="selectCountry(country)"
                  >
                    <span class="inline-flex items-center gap-2 truncate">
                      <span aria-hidden="true" class="text-base leading-none">{{ country.flag }}</span>
                      <span class="truncate">{{ country.label }}</span>
                      <span class="text-muted-foreground">{{ country.dial }}</span>
                    </span>
                    <PhCheck
                      v-if="country.value === form.phoneCountry"
                      class="size-4 shrink-0"
                      weight="bold"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Teleport>
            </div>

            <UiInput
              id="qualify-phone"
              v-model="form.phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="(555) 123-4567"
              autocomplete="tel-national"
              inputmode="tel"
            />
          </div>
        </div>

        <div class="col-span-full space-y-2 text-left">
          <UiLabel for="qualify-referral">
            How did you hear about us?
            <span class="font-normal text-muted-foreground">(optional)</span>
          </UiLabel>
          <UiInput
            id="qualify-referral"
            v-model="form.referralSource"
            name="referralSource"
            placeholder="A friend, search, social, podcast..."
          />
        </div>

        <div class="col-span-full pt-2">
          <Button type="submit" class="w-full">Get Started</Button>
        </div>
      </form>
    </main>
  </div>
</template>

<style scoped>
button[data-slot='select-trigger'] {
  outline: none;
}

button[data-slot='select-trigger']:hover {
  box-shadow:
    inset 0 0 0 1px color-mix(in oklch, var(--color-foreground) 16%, transparent),
    0 0 0 0 color-mix(in oklch, var(--color-foreground) 0%, transparent);
}

button[data-slot='select-trigger'][data-focused='true'] {
  box-shadow:
    inset 0 0 0 1px color-mix(in oklch, var(--color-foreground) 24%, transparent),
    0 0 0 3px color-mix(in oklch, var(--color-foreground) 10%, transparent);
}

button[data-slot='select-option']:focus {
  background: color-mix(in oklch, var(--color-foreground) 5%, transparent);
}
</style>
