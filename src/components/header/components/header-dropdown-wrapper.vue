<template>
  <div
    class="invisible absolute left-0 top-full z-20 w-xl max-w-[calc(100vw-2rem)] translate-y-1 pt-3 opacity-0 transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
  >
    <div
      class="rounded-3xl bg-background p-6 text-foreground shadow-[0_2em_5em_rgba(0,0,0,0.1)]"
    >
      <slot />
    </div>
  </div>
</template>
