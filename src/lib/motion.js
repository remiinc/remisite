import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MOTION_SELECTOR = '[data-motion-fade], [data-motion-moveup]'
const MOTION_ATTRIBUTES = [
  'data-motion-fade',
  'data-motion-moveup',
  'data-motion-duration',
  'data-motion-delay',
  'data-motion-distance',
  'data-motion-ease',
  'data-motion-scrub',
]

const DEFAULT_DURATION = 0.8
const DEFAULT_DISTANCE = 32
const DEFAULT_EASE = 'power3.out'

const getNumber = (value, fallback, minimum = 0) => {
  if (value === undefined || value === '') return fallback

  const number = Number(value)
  return Number.isFinite(number) ? Math.max(number, minimum) : fallback
}

const getScrub = (value) => {
  if (value === undefined || value === 'false') return false
  if (value === '' || value === 'true') return true

  return getNumber(value, true)
}

/**
 * Creates ScrollTrigger motion effects for elements using data-motion attributes.
 * Returns a cleanup function that restores the elements' original inline styles.
 */
export const initializeMotionEffects = (root = document) => {
  const animations = new Map()
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  let refreshFrame = null

  const scheduleRefresh = () => {
    if (refreshFrame !== null) return

    refreshFrame = window.requestAnimationFrame(() => {
      refreshFrame = null
      ScrollTrigger.refresh()
    })
  }

  const removeAnimation = (element) => {
    const animation = animations.get(element)
    if (!animation) return

    animation.scrollTrigger?.kill()
    animation.revert()
    animations.delete(element)
  }

  const createAnimation = (element) => {
    if (animations.has(element) || reducedMotionQuery.matches) return

    const from = {}
    const to = {}

    if (element.hasAttribute('data-motion-fade')) {
      from.autoAlpha = 0
      to.autoAlpha = 1
    }

    if (element.hasAttribute('data-motion-moveup')) {
      from.y = getNumber(element.dataset.motionDistance, DEFAULT_DISTANCE)
      to.y = 0
    }

    const scrub = getScrub(element.dataset.motionScrub)
    const animation = gsap.fromTo(element, from, {
      ...to,
      delay: getNumber(element.dataset.motionDelay, 0),
      duration: getNumber(element.dataset.motionDuration, DEFAULT_DURATION),
      ease: element.dataset.motionEase || DEFAULT_EASE,
      scrollTrigger: {
        end: 'top center',
        scrub,
        start: 'top bottom',
        toggleActions: scrub ? undefined : 'play none none reset',
        trigger: element,
      },
    })

    animations.set(element, animation)
  }

  const findMotionElements = (node) => {
    if (!(node instanceof Element) && node !== document) return []

    const elements = [...node.querySelectorAll(MOTION_SELECTOR)]
    if (node instanceof Element && node.matches(MOTION_SELECTOR)) elements.unshift(node)
    return elements
  }

  const initializeTree = (node) => {
    findMotionElements(node).forEach(createAnimation)
  }

  const removeTree = (node) => {
    findMotionElements(node).forEach(removeAnimation)
  }

  const handleReducedMotionChange = () => {
    if (reducedMotionQuery.matches) {
      ;[...animations.keys()].forEach(removeAnimation)
      return
    }

    initializeTree(root)
    scheduleRefresh()
  }

  initializeTree(root)

  const observerTarget = root === document ? document.documentElement : root
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes') {
        removeAnimation(mutation.target)
        if (mutation.target.matches(MOTION_SELECTOR)) createAnimation(mutation.target)
        return
      }

      mutation.removedNodes.forEach(removeTree)
      mutation.addedNodes.forEach(initializeTree)
    })

    scheduleRefresh()
  })

  observer.observe(observerTarget, {
    attributeFilter: MOTION_ATTRIBUTES,
    attributes: true,
    childList: true,
    subtree: true,
  })

  reducedMotionQuery.addEventListener('change', handleReducedMotionChange)
  scheduleRefresh()

  return () => {
    observer.disconnect()
    reducedMotionQuery.removeEventListener('change', handleReducedMotionChange)
    if (refreshFrame !== null) window.cancelAnimationFrame(refreshFrame)
    ;[...animations.keys()].forEach(removeAnimation)
  }
}
