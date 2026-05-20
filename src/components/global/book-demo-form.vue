<script setup>
import { reactive, ref } from 'vue'
import UiInput from '../ui/input.vue'
import UiLabel from '../ui/label.vue'
import UiSelect from '../ui/select.vue'

const form = reactive({
  fullName: '',
  email: '',
  companyName: '',
  role: '',
  companySize: '',
})

const isSubmitFocused = ref(false)

const roleOptions = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'design', label: 'Design' },
  { value: 'product', label: 'Product Management' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'customer-success', label: 'Customer Success' },
  { value: 'operations', label: 'Operations' },
  { value: 'hr', label: 'HR & People' },
  { value: 'finance', label: 'Finance' },
  { value: 'legal', label: 'Legal' },
  { value: 'executive', label: 'Executive' },
  { value: 'other', label: 'Other' },
]

const companySizeOptions = [
  { value: '1-10', label: '1-10' },
  { value: '11-50', label: '11-50' },
  { value: '51-200', label: '51-200' },
  { value: '201-500', label: '201-500' },
  { value: '501+', label: '501+' },
]
</script>

<template>
  <div data-slot="dialog-header" class="flex flex-col gap-1.5 text-left">
    <h2 data-slot="dialog-title" class="text-lg font-normal text-foreground">
      Book a Demo
    </h2>
    <p data-slot="dialog-description" class="text-sm leading-normal text-muted-foreground">
      Tell us a bit about your team so we can tailor the demo around your workflows, tools, and operations.
    </p>
  </div>

  <form class="mt-8 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2" @submit.prevent>
    <div class="space-y-2 text-left">
      <UiLabel for="beta-access-full-name">Full name</UiLabel>
      <UiInput
        id="beta-access-full-name"
        v-model="form.fullName"
        name="fullName"
        placeholder="Alex Morgan"
        autocomplete="name"
        required
      />
    </div>

    <div class="space-y-2 text-left">
      <UiLabel for="beta-access-email">Email address</UiLabel>
      <UiInput
        id="beta-access-email"
        v-model="form.email"
        name="email"
        type="email"
        placeholder="alex@company.com"
        autocomplete="email"
        required
      />
    </div>

    <div class="col-span-full space-y-2 text-left">
      <UiLabel for="beta-access-company">Company name</UiLabel>
      <UiInput
        id="beta-access-company"
        v-model="form.companyName"
        name="companyName"
        placeholder="Acme Operations"
        autocomplete="organization"
        required
      />
    </div>

    <div class="col-span-full space-y-2 text-left">
      <UiLabel for="beta-access-role">Role at company</UiLabel>
      <UiSelect
        id="beta-access-role"
        v-model="form.role"
        name="role"
        placeholder="Select your role"
        :options="roleOptions"
        required
      />
    </div>

    <div class="col-span-full space-y-2 text-left">
      <UiLabel for="beta-access-company-size">Company size</UiLabel>
      <UiSelect
        id="beta-access-company-size"
        v-model="form.companySize"
        name="companySize"
        placeholder="Select company size"
        :options="companySizeOptions"
        required
      />
    </div>

    <div data-slot="dialog-footer" class="col-span-full flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
      <button
        type="submit"
        data-slot="button"
        :data-focused="isSubmitFocused ? 'true' : undefined"
        class="inline-flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_0_0_0_color-mix(in_oklch,var(--color-foreground)_0%,transparent)] transition-[background-color,box-shadow,color] hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
        @pointerdown="isSubmitFocused = true"
        @mousedown="isSubmitFocused = true"
        @click="isSubmitFocused = true"
        @focus="isSubmitFocused = true"
        @focusin="isSubmitFocused = true"
        @blur="isSubmitFocused = false"
        @focusout="isSubmitFocused = false"
      >
        Book a Demo
      </button>
    </div>
  </form>
</template>

<style scoped>
button[data-slot='button'] {
  outline: none;
}

button[data-slot='button'][data-focused='true'] {
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--color-foreground) 12%, transparent);
}
</style>
