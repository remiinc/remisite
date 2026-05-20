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
          h('span', { class: 'text-[0.875em] text-foreground leading-none' }, [
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

export default defineComponent({
  setup(_props, { slots }) {
    return () => slots.default?.()
  },
})
</script>
