<script>
import { defineComponent, h } from 'vue'

export const BentoMessageRow = defineComponent({
  props: {
    author: {
      type: String,
      default: 'Anna',
    },
    time: {
      type: String,
      default: '4:20 PM',
    },
    avatarSrc: {
      type: String,
      default: '',
    },
    avatarAlt: {
      type: String,
      default: '',
    },
    avatarEnabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const getInitials = () =>
      props.author
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()

    return () =>
      h('div', { class: 'flex items-start gap-[1em]' }, [
        props.avatarSrc
          ? h('img', {
            class: 'size-[2.5em] shrink-0 rounded-[0.5em] object-cover',
            src: props.avatarSrc,
            alt: props.avatarAlt || `${props.author} avatar`,
            loading: 'lazy',
            decoding: 'async',
          })
          : props.avatarEnabled
            ? h(
              'span',
              {
                class:
                  'flex size-[2.5em] shrink-0 items-center justify-center rounded-[0.5em] bg-foreground/8 font-medium text-foreground',
                'aria-hidden': 'true',
              },
              getInitials()
            )
            : null,
        h('div', { class: 'flex min-w-0 flex-col gap-[0.3em]' }, [
          h('span', { class: 'text-[0.875em] font-medium text-foreground leading-none' }, [
            props.author,
            ' ',
            h('span', { class: 'text-foreground/40' }, props.time),
          ]),
          h('div', { class: 'flex items-center gap-[1em] text-[1em]' }, [
            h('span', null, slots.default?.()),
          ]),
        ]),
      ])
  },
})

export const FloatingCursor = defineComponent({
  setup() {
    return () =>
      h(
        'div',
        {
          class: [
            'floating-cursor flex items-start gap-1.5',
            // Default to red, so no green modifier
          ],
        },
        [
          h(
            'svg',
            {
              class: ['floating-cursor-mark'],
              viewBox: '0 0 24 24',
              fill: 'none',
              'aria-hidden': 'true',
            },
            [
              h('path', {
                d: 'M7.92098 2.29951C6.93571 1.5331 5.5 2.23523 5.5 3.48349V20.4923C5.5 21.9145 7.2945 22.5382 8.17661 21.4226L12.3676 16.1224C12.6806 15.7267 13.1574 15.4958 13.6619 15.4958H20.5143C21.9425 15.4958 22.5626 13.6887 21.4353 12.8119L7.92098 2.29951Z',
                fill: 'currentColor',
              }),
            ]
          ),
        ]
      )
  },
})

export default defineComponent({
  setup(_props, { slots }) {
    return () => slots.default?.()
  },
})
</script>

<style>
.floating-cursor-mark {
  width: 1.25rem;
  height: 1.25rem;
}

.floating-cursor {
  animation: floating-cursor-hover-red 4.8s ease-in-out infinite;
  will-change: transform;
}

.floating-cursor.is-green {
  animation: floating-cursor-hover-green 5.4s ease-in-out infinite;
  animation-delay: -1.1s;
}

@keyframes floating-cursor-hover-red {
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(-5deg);
  }

  45% {
    transform: translate3d(0.85rem, -0.7rem, 0) rotate(-1deg);
  }

  72% {
    transform: translate3d(0.25rem, -1rem, 0) rotate(-3deg);
  }
}

@keyframes floating-cursor-hover-green {
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(4deg);
  }

  38% {
    transform: translate3d(-0.9rem, 0.45rem, 0) rotate(1deg);
  }

  70% {
    transform: translate3d(-0.35rem, -0.65rem, 0) rotate(3deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .floating-cursor {
    animation: none;
  }
}
</style>
