<script>
import { gsap } from 'gsap'
import { computed, defineComponent, h, onBeforeUnmount, onMounted, ref } from 'vue'

export const DocumentCard = defineComponent({
  name: 'DocumentCard',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          class:
            'bg-background rounded-[2em] p-[1.5em] aspect-[3/4] shadow-[0_0_0_1px_color-mix(in_oklch,var(--color-foreground)_5%,transparent),0_20px_20px_-15px_color-mix(in_oklch,var(--color-foreground)_10%,transparent)] text-[0.875em]',
        },
        slots.default ? slots.default() : props.title
      )
  },
})

export default defineComponent({
  name: 'ArtifactsWheel',
  components: {
    DocumentCard,
  },
  setup() {
    const wheelRef = ref(null)
    const cardRefs = ref([])
    const cards = [
      'Proposal',
      'SOW',
      'Project brief',
      'Status report',
      'Meeting notes',
      'Playbook',
      'Review packet',
      'Change order',
    ]
    const stepAngle = 360 / cards.length
    let wheelTimeline
    let lastWheelRotation = 0
    let smoothedWheelVelocity = 0
    let updateCardRotation

    const cardStyles = computed(() =>
      cards.map((_card, index) => {
        const angle = (360 / cards.length) * index - 90
        const radians = (angle * Math.PI) / 180
        const radius = 32
        const x = 50 + Math.cos(radians) * radius
        const y = 50 + Math.sin(radians) * radius

        return {
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)',
        }
      })
    )

    const setCardRef = (element, index) => {
      if (element) {
        cardRefs.value[index] = element
      }
    }

    onMounted(() => {
      if (!wheelRef.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }

      gsap.set(wheelRef.value, {
        rotation: 0,
        transformOrigin: '50% 50%',
      })
      gsap.set(cardRefs.value, {
        rotation: 0,
        transformOrigin: '50% 50%',
      })

      lastWheelRotation = 0
      updateCardRotation = (_time, deltaTime) => {
        const wheelRotation = Number(gsap.getProperty(wheelRef.value, 'rotation')) || 0
        const deltaSeconds = Math.max(deltaTime / 1000, 1 / 120)
        let rotationDelta = wheelRotation - lastWheelRotation

        if (rotationDelta > 180) rotationDelta -= 360
        if (rotationDelta < -180) rotationDelta += 360

        const wheelVelocity = rotationDelta / deltaSeconds

        smoothedWheelVelocity += (wheelVelocity - smoothedWheelVelocity) * 0.2

        gsap.set(cardRefs.value, {
          rotation: -wheelRotation + smoothedWheelVelocity * 0.018,
        })

        lastWheelRotation = wheelRotation
      }

      gsap.ticker.add(updateCardRotation)

      wheelTimeline = gsap.timeline({
        repeat: -1,
      })

      cards.forEach(() => {
        wheelTimeline
          .to(wheelRef.value, {
            rotation: `-=${stepAngle}`,
            duration: 0.9,
            ease: 'back.inOut(1.25)',
          },  '>')
          .to({}, { duration: 0.85 })
      })
    })

    onBeforeUnmount(() => {
      if (updateCardRotation) {
        gsap.ticker.remove(updateCardRotation)
      }

      wheelTimeline?.kill()
      wheelTimeline = undefined
      updateCardRotation = undefined
    })

    return {
      cards,
      cardStyles,
      setCardRef,
      wheelRef,
    }
  },
})
</script>

<template>
  <div class="artifacts-wheel relative min-w-[480px] aspect-square pointer-events-none">
    <div ref="wheelRef" class="absolute inset-0">
      <div
        v-for="(card, index) in cards"
        :key="card"
        class="absolute w-[42%] max-w-[15em] origin-center"
        :style="cardStyles[index]"
      >
        <div :ref="(element) => setCardRef(element, index)" class="origin-center">
          <DocumentCard :title="card" />
        </div>
      </div>
    </div>
  </div>
</template>
