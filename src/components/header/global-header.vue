<script setup>
import { PhArrowLeft, PhCaretDown, PhCaretRight, PhList, PhX } from '@phosphor-icons/vue'
import { gsap } from 'gsap'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Button from '../global/button.vue'
import SiteLogo from '../global/site-logo.vue'
import HeaderLink from './components/header-link.vue'
import HeaderLogo from './components/header-logo.vue'
import cn from '../../lib/cn'
import { portalLink } from '../../lib/portal-link'

const portalLoginHref = computed(() => portalLink('https://remi.new/login'))

const sizeLinks = [
  { label: 'Startups', href: '/solutions/startups' },
  { label: 'Small Businesses', href: '/solutions/small-businesses' },
  { label: 'Mid-Market', href: '/solutions/mid-market' },
]

const industryLinks = [
  { label: 'Architecture & Engineering', href: '#solutions' },
  { label: 'Construction', href: '#solutions' },
  { label: 'Consulting', href: '#solutions' },
  { label: 'Healthcare', href: '#solutions' },
  { label: 'Legal', href: '#solutions' },
  { label: 'Real Estate', href: '#solutions' },
  { label: 'Retail', href: '#solutions' },
  { label: 'Home Services', href: '#solutions' },
]

const solutionColumns = [
  { label: 'By Size', links: sizeLinks, variant: 'featured' },
  { label: 'By Industry', links: industryLinks, variant: 'compact' },
]

const menuLinks = [
  { label: 'Features', href: '#features' },
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Security', href: '/security' },
  {
    label: 'Solutions',
    href: '#solutions',
    panel: 'solutions',
    columns: solutionColumns,
    hidden: true,
  },
]

const visibleMenuLinks = computed(() => menuLinks.filter((link) => !link.hidden))

const props = defineProps({
  theme: {
    type: String,
    default: 'inverse',
    validator: (value) => ['inverse', 'light'].includes(value),
  },
})

const headerRef = ref(null)
const isCondensed = ref(false)
const isMobileMenuOpen = ref(false)
const isMobileMenuVisible = ref(false)
const activeMobilePanel = ref(null)
let headerIntroContext = null
let onScroll = null
let onKeydown = null
let onResize = null
let mobileMenuCloseTimer = null
let previousBodyOverflow = ''

const isHeaderInverted = computed(() => props.theme === 'inverse')
const headerThemeClass = computed(() => isHeaderInverted.value ? 'text-white' : 'text-foreground')
const headerButtonVariant = computed(() => isHeaderInverted.value ? 'white' : 'primary')

const openMobileMenu = () => {
  if (mobileMenuCloseTimer) {
    window.clearTimeout(mobileMenuCloseTimer)
    mobileMenuCloseTimer = null
  }

  isMobileMenuVisible.value = true
  activeMobilePanel.value = null
  window.requestAnimationFrame(() => {
    isMobileMenuOpen.value = true
  })
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false

  if (mobileMenuCloseTimer) {
    window.clearTimeout(mobileMenuCloseTimer)
  }

  const animationDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 320
  mobileMenuCloseTimer = window.setTimeout(() => {
    isMobileMenuVisible.value = false
    activeMobilePanel.value = null
    mobileMenuCloseTimer = null
  }, animationDuration)
}

const openMobilePanel = (panel) => {
  if (window.matchMedia('(min-width: 768px)').matches) {
    return
  }
  activeMobilePanel.value = panel
}

const closeMobilePanel = () => {
  activeMobilePanel.value = null
}

watch(isMobileMenuVisible, (isVisible) => {
  if (isVisible) {
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return
  }

  document.body.style.overflow = previousBodyOverflow
})

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  onScroll = () => {
    isCondensed.value = window.scrollY > 80
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  onKeydown = (event) => {
    if (event.key === 'Escape') {
      closeMobileMenu()
    }
  }
  window.addEventListener('keydown', onKeydown)

  onResize = () => {
    if (window.matchMedia('(min-width: 768px)').matches) {
      closeMobileMenu()
    }
  }
  window.addEventListener('resize', onResize)

  if (prefersReducedMotion) {
    gsap.set(headerRef.value, {
      autoAlpha: 1,
      yPercent: 0,
    })
    return
  }

  headerIntroContext = gsap.context(() => {
    gsap.fromTo(headerRef.value, {
      autoAlpha: 1,
      yPercent: -140,
    }, {
      duration: 0.9,
      ease: 'power3.out',
      yPercent: 0,
    })
  }, headerRef.value)
})

onBeforeUnmount(() => {
  if (onScroll) {
    window.removeEventListener('scroll', onScroll)
  }
  if (onKeydown) {
    window.removeEventListener('keydown', onKeydown)
  }
  if (onResize) {
    window.removeEventListener('resize', onResize)
  }
  if (mobileMenuCloseTimer) {
    window.clearTimeout(mobileMenuCloseTimer)
  }
  document.body.style.overflow = previousBodyOverflow
  if (headerIntroContext) {
    headerIntroContext.revert()
  }
})
</script>

<template>
  <header ref="headerRef"
    :data-theme="props.theme"
    :class="cn(
      'header-container sticky top-0 h-0 z-50 w-full opacity-0 will-change-transform flex flex-col justify-start transition-colors duration-300',
      headerThemeClass
    )">
    <div :class="cn(
      'header-wrap',
      'w-full h-full px-3 md:px-6',
      'flex flex-col items-center justify-center',
      'min-h-(--header-height)',
      isCondensed && 'is-condensed'
    )">
      <nav :class="cn(
        'header-bar',
        '[--padding:0.25em]',
        'relative w-full mx-auto max-w-[calc(var(--content-width))]',
        'flex gap-4 items-center p-(--padding)',
      )">
        <div class="flex items-center justify-start">
          <div :class="cn('flex items-center justify-center transition-padding', isCondensed ? 'pl-2' : 'pl-2 md:pl-0')">
            <HeaderLogo />
          </div>
        </div>

        <Teleport to="body" :disabled="!isMobileMenuVisible">
          <div
            id="site-navigation"
            :class="cn(
              isMobileMenuVisible
                ? 'fixed inset-0 z-999 flex h-dvh min-h-dvh origin-top flex-col overflow-hidden bg-background text-foreground opacity-0 shadow-[0_-1rem_4rem_rgba(0,0,0,0.08)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none md:hidden'
                : 'hidden items-center gap-0 md:flex',
              isMobileMenuVisible && (isMobileMenuOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-3 scale-[0.985] pointer-events-none')
            )"
            :role="isMobileMenuVisible ? 'dialog' : undefined"
            :aria-modal="isMobileMenuVisible ? 'true' : undefined"
            :aria-label="isMobileMenuVisible ? 'Mobile navigation' : undefined"
          >
            <div class="flex shrink-0 items-center justify-between px-6 pb-4 pt-[max(1rem,env(safe-area-inset-top))] md:hidden">
              <a
                v-if="!activeMobilePanel"
                href="/"
                class="inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                aria-label="Remi home"
                @click="closeMobileMenu"
              >
                <SiteLogo class="size-8" />
              </a>

              <button
                v-else
                type="button"
                class="inline-flex h-10 items-center gap-2 rounded-full text-lg font-medium tracking-[-0.03em] text-foreground"
                @click="closeMobilePanel"
              >
                <PhArrowLeft aria-hidden="true" class="size-4" weight="bold" />
                Back
              </button>

              <button
                type="button"
                class="inline-flex size-10 items-center justify-center rounded-full bg-foreground/5 text-foreground transition-colors hover:bg-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                aria-label="Close menu"
                @click="closeMobileMenu"
              >
                <PhX aria-hidden="true" class="size-4" weight="bold" />
              </button>
            </div>

            <nav
              class="relative min-h-0 flex-1 overflow-hidden md:static md:flex md:min-h-0 md:flex-none md:overflow-visible"
              aria-label="Site navigation"
            >
              <div class="h-full divide-y divide-foreground/5 overflow-y-auto px-6 md:flex md:h-auto md:items-center md:gap-0 md:divide-y-0 md:overflow-visible md:border-y-0 md:p-0">
                <template v-for="link in visibleMenuLinks" :key="link.label">
                  <a
                    v-if="!link.columns"
                    :href="link.href"
                    class="relative flex min-h-15 items-center py-2 text-2xl font-medium tracking-[-0.04em] text-foreground transition-colors hover:text-foreground/70 focus-visible:outline-none md:min-h-0 md:select-none md:rounded-full md:px-3 md:py-2 md:text-sm md:font-normal md:tracking-[-0.02em] md:text-current md:hover:text-current md:before:absolute md:before:inset-1 md:before:z-0 md:before:rounded-full md:before:bg-foreground/20 md:before:opacity-0 md:before:transition-all md:before:duration-200 md:before:ease-in-out md:before:content-[''] md:hover:before:inset-0 md:hover:before:opacity-100"
                    @click="closeMobileMenu"
                  >
                    <span class="relative z-1">
                      {{ link.label }}
                    </span>
                  </a>

                  <div
                    v-else
                    class="group md:relative"
                  >
                    <button
                      type="button"
                      class="relative flex min-h-15 w-full select-none items-center justify-between py-2 text-left text-2xl font-medium tracking-[-0.04em] text-foreground transition-colors hover:text-foreground/70 focus-visible:outline-none md:min-h-0 md:w-auto md:items-center md:gap-1 md:rounded-full md:px-3 md:py-2 md:text-sm md:font-normal md:tracking-[-0.02em] md:text-current md:hover:text-current md:before:absolute md:before:inset-1 md:before:z-0 md:before:rounded-full md:before:bg-foreground/20 md:before:opacity-0 md:before:transition-all md:before:duration-200 md:before:ease-in-out md:before:content-[''] md:hover:before:inset-0 md:hover:before:opacity-100 md:group-hover:before:inset-0 md:group-hover:before:opacity-100 md:group-focus-within:before:inset-0 md:group-focus-within:before:opacity-100"
                      :aria-expanded="activeMobilePanel === link.panel"
                      @click="openMobilePanel(link.panel)"
                    >
                      <span class="relative z-1">
                        {{ link.label }}
                      </span>
                      <PhCaretRight aria-hidden="true" class="size-5 md:hidden" />
                      <PhCaretDown
                        aria-hidden="true"
                        weight="bold"
                        class="relative z-1 hidden size-3 transition-transform duration-200 md:block md:group-hover:rotate-180 md:group-focus-within:rotate-180"
                      />
                    </button>

                    <div
                      :class="cn(
                        'absolute inset-0 z-10 overflow-y-auto bg-background px-6 py-8 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:invisible md:left-0 md:top-full md:inset-auto md:z-20 md:w-xl md:max-w-[calc(100vw-2rem)] md:translate-y-1 md:overflow-visible md:bg-transparent md:p-0 md:pt-3 md:opacity-0 md:transition-all md:duration-200 md:ease-out md:group-hover:visible md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:visible md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100',
                        activeMobilePanel === link.panel ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
                      )"
                    >
                      <div class="md:rounded-3xl md:bg-background md:p-6 md:text-foreground md:shadow-[0_2em_5em_rgba(0,0,0,0.1)]">
                        <div class="flex flex-col gap-10 md:grid md:grid-cols-[0.9fr_1.2fr] md:gap-4">
                          <div
                            v-for="column in link.columns"
                            :key="column.label"
                            class="flex flex-col md:[&:has(a:hover)_a:not(:hover)]:text-muted-foreground/50!"
                          >
                            <span class="mb-5 text-xs text-muted-foreground/50 md:mb-4">
                              {{ column.label }}
                            </span>

                            <a
                              v-for="item in column.links"
                              :key="item.label"
                              :href="item.href"
                              :class="cn(
                                'border-b border-border py-3 text-xl font-medium leading-tight tracking-[-0.04em] text-foreground transition-colors hover:text-foreground/70 focus-visible:outline-none md:border-b-0 md:tracking-normal md:hover:text-foreground md:focus-visible:text-foreground',
                                column.variant === 'featured' && 'md:pb-[0.25em] md:pt-0 md:text-xl md:font-medium md:text-foreground',
                                column.variant === 'compact' && 'md:py-[0.2em] md:text-sm md:font-normal md:leading-tight md:text-muted-foreground'
                              )"
                              @click="closeMobileMenu"
                            >
                              {{ item.label }}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </nav>

            <div class="grid shrink-0 grid-cols-2 gap-3 px-6 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:hidden">
              <Button
                :href="portalLoginHref"
                target="_blank"
                variant="primary"
                class="h-12 w-full"
                @click="closeMobileMenu"
              >
                Login
              </Button>
              <Button
                href="/qualify"
                variant="secondary"
                class="h-12 w-full"
                @click="closeMobileMenu"
              >
                Try for free
              </Button>
            </div>
          </div>
        </Teleport>

        <div class="hidden flex-1 items-center justify-end gap-1 md:flex">
          <HeaderLink :href="portalLoginHref" target="_blank">Login</HeaderLink>
          <Button href="/qualify" :variant="headerButtonVariant" size="sm">Try for free</Button>
        </div>

        <div class="flex flex-1 items-center justify-end md:hidden">
          <button
            type="button"
            class="relative inline-flex size-10 items-center justify-center rounded-full text-current transition-colors before:absolute before:inset-1 before:z-0 before:rounded-full before:bg-foreground/20 before:opacity-0 before:transition-all before:duration-200 before:ease-in-out before:content-[''] hover:before:inset-0 hover:before:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            :aria-expanded="isMobileMenuOpen"
            aria-controls="site-navigation"
            aria-label="Open menu"
            @click="openMobileMenu"
          >
            <PhList aria-hidden="true" weight="regular" class="relative z-1 size-6" />
          </button>
        </div>

        <div class="scroll-progress">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="rgba(0, 0, 0, 0.1)"
              stroke-width="var(--scroll-progress-line)" pathLength="1" stroke-linecap="butt" />
          </svg>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header-bar {
  transition: max-width 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.header-bar::before {
  content: '';
  position: absolute;
  z-index: -1;
  border-radius: 9999px;
  opacity: 0;
  inset: 1em;
  filter: blur(0.5em);
  transition: opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), inset 600ms cubic-bezier(0.22, 1, 0.36, 1), filter 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.header-bar .scroll-progress {
  position: absolute;
  z-index: -1;
  border-radius: 9999px;
  opacity: 0;
  inset: calc(-1 * var(--header-bg-inset) - calc(var(--scroll-progress-line) * 0.5));
  filter: blur(0.5em);
  transition: opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), inset 600ms cubic-bezier(0.22, 1, 0.36, 1), filter 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.header-bar::before {
  background-color: rgba(0, 0, 0, 0.40);
  backdrop-filter: blur(0.5em);
}

.header-container[data-theme='light'] .header-bar::before {
  background-color: rgba(255, 255, 255, 0.82);
  box-shadow: 0 1em 3em rgba(0, 0, 0, 0.08);
}

.header-wrap.is-condensed .header-bar {
  max-width: 800px;
}

.header-wrap.is-condensed .header-bar::before {
  opacity: 1;
  inset: calc(-1 * var(--header-bg-inset));
  filter: blur(0em);
}

.header-wrap.is-condensed .header-bar .scroll-progress {
  opacity: 1;
  filter: blur(0em);
}

@media (prefers-reduced-motion: reduce) {
  .header-bar {
    transition: none;
  }
}

.scroll-progress svg {
  overflow: visible;
  width: 100%;
  height: 100%;
  display: block;
}

.scroll-progress rect {
  rx: calc(var(--header-bar-radius) + calc(var(--header-bg-inset) * 0.5) + calc(var(--scroll-progress-line) * 0.5));
  ry: calc(var(--header-bar-radius) + calc(var(--header-bg-inset) * 0.5) + calc(var(--scroll-progress-line) * 0.5));
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}

.header-wrap.is-condensed .scroll-progress {
  opacity: 1;
}

@supports (animation-timeline: scroll()) {
  .scroll-progress rect {
    animation: scroll-progress-fill linear both;
    animation-timeline: scroll(root block);
    animation-range: 0 100%;
  }
}

@keyframes scroll-progress-fill {
  to {
    stroke-dashoffset: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-progress {
    transition: none;
  }

  .scroll-progress rect {
    animation: none;
  }
}

</style>
