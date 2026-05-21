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
    skeletonWidths: {
      type: Array,
      default: () => ['100%', '86%', '72%', '92%', '64%', '96%', '78%', '88%', '58%'],
    },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          class:
            'group/document-card bg-background rounded-[2em] p-[1.5em] aspect-[3/4] shadow-[0_0_0_1px_color-mix(in_oklch,var(--color-foreground)_5%,transparent),0_20px_20px_-15px_color-mix(in_oklch,var(--color-foreground)_10%,transparent)] text-[0.875em] tracking-[-0.0333em] leading-tight',
        },
        [
          h('div', null, slots.default ? slots.default() : props.title),
          h(
            'div',
            {
              class:
                'mt-[1.25em] flex flex-col gap-[0.45em]',
              'aria-hidden': 'true',
            },
            props.skeletonWidths.map((width, index) =>
              h('div', {
                class:
                  'h-[0.45em] translate-y-[0.35em] rounded-full bg-foreground/10 opacity-0 transition-[opacity,transform] duration-200 ease-out group-[.active]/document-card:translate-y-0 group-[.active]/document-card:opacity-100',
                style: {
                  width,
                  transitionDelay: `${index * 35}ms`,
                },
              })
            )
          ),
        ]
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
    const activeCardIndices = ref([0])
    const cards = [
      {
        title: 'Proposal',
        skeletonWidths: ['96%', '84%', '72%', '90%', '68%', '100%', '76%', '86%', '58%'],
      },
      {
        title: 'SOW',
        skeletonWidths: ['82%', '94%', '66%', '88%', '74%', '91%', '62%', '79%', '70%'],
      },
      {
        title: 'Project brief',
        skeletonWidths: ['100%', '77%', '85%', '63%', '92%', '81%', '69%', '96%', '54%'],
      },
      {
        title: 'Status report',
        skeletonWidths: ['74%', '89%', '98%', '71%', '83%', '60%', '93%', '78%', '67%'],
      },
      {
        title: 'Meeting notes',
        skeletonWidths: ['91%', '68%', '79%', '95%', '73%', '87%', '64%', '82%', '56%'],
      },
      {
        title: 'Playbook',
        skeletonWidths: ['86%', '100%', '75%', '69%', '94%', '80%', '72%', '90%', '61%'],
      },
      {
        title: 'Review packet',
        skeletonWidths: ['97%', '81%', '59%', '84%', '93%', '76%', '88%', '70%', '65%'],
      },
      {
        title: 'Change order',
        skeletonWidths: ['78%', '92%', '71%', '99%', '65%', '83%', '74%', '89%', '57%'],
      },
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

      cards.forEach((_card, index) => {
        wheelTimeline
          .to(wheelRef.value, {
            rotation: `-=${stepAngle}`,
            duration: 0.9,
            ease: 'back.inOut(1.25)',
            onComplete: () => {
              activeCardIndices.value = [
                ...activeCardIndices.value,
                (index + 1) % cards.length,
              ].slice(-2)
            },
          }, '>')
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
      activeCardIndices,
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
        :key="card.title"
        class="absolute w-[42%] max-w-[15em] origin-center"
        :style="cardStyles[index]"
      >
        <div :ref="(element) => setCardRef(element, index)" class="origin-center">
          <DocumentCard
            :title="card.title"
            :skeleton-widths="card.skeletonWidths"
            :class="activeCardIndices.includes(index) ? 'active' : ''"
          />
        </div>
      </div>
    </div>
  </div>
</template>
