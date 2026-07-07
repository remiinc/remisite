<script setup>
import cn from '../../lib/cn';
import { PhCaretRight, PhCaretLeft, PhPlus, PhMicrophone } from '@phosphor-icons/vue';
import { gsap } from 'gsap';
import SiteLogo from '../global/site-logo.vue';
import { computed, defineComponent, h, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps({
  contactName: {
    type: String,
    default: 'Remi',
  },
  dateLabel: {
    type: String,
    default: 'Today',
  },
  draftWidget: {
    type: Object,
    default: null,
  },
  inputPlaceholder: {
    type: String,
    default: 'iMessage',
  },
  messages: {
    type: Array,
    default: () => [],
  },
  time: {
    type: String,
    default: '',
  },
})

const timeFormatterOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
const fallbackTime = new Date().toLocaleTimeString([], timeFormatterOptions);
const currentTime = computed(() => props.time || fallbackTime);
const phoneRef = ref(null);
const messageThreadRef = ref(null);

let messageTimeline = null;
let phoneTimeline = null;

const phoneWiggleEasePoints = [
  [0, 0],
  [0.039, 0.432],
  [0.074, 0.723],
  [0.108, 0.893],
  [0.125, 0.935],
  [0.142, 0.948],
  [0.157, 0.938],
  [0.173, 0.907],
  [0.208, 0.774],
  [0.359, -0.095],
  [0.395, -0.221],
  [0.431, -0.289],
  [0.463, -0.305],
  [0.498, -0.282],
  [0.636, -0.049],
  [0.673, -0.004],
  [0.709, 0.022],
  [0.772, 0.033],
  [0.907, 0.005],
  [1, 0],
];

const phoneWiggleEase = (progress) => {
  for (let index = 1; index < phoneWiggleEasePoints.length; index += 1) {
    const [pointProgress, pointValue] = phoneWiggleEasePoints[index];

    if (progress <= pointProgress) {
      const [previousProgress, previousValue] = phoneWiggleEasePoints[index - 1];
      const localProgress = (progress - previousProgress) / (pointProgress - previousProgress);

      return previousValue + (pointValue - previousValue) * localProgress;
    }
  }

  return 0;
};

const animateMessages = async () => {
  await nextTick();

  const messageItems = Array.from(messageThreadRef.value?.querySelectorAll('[data-message-item]') || []);
  const phone = phoneRef.value;

  if (!messageItems.length) {
    return;
  }

  if (messageTimeline) {
    messageTimeline.kill();
  }
  if (phoneTimeline) {
    phoneTimeline.kill();
  }

  gsap.killTweensOf(messageItems);
  if (phone) {
    gsap.killTweensOf(phone);
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(messageItems, { autoAlpha: 1, filter: 'blur(0em)', y: 0, scale: 1 });
    if (phone) {
      gsap.set(phone, { rotation: 0, y: 0 });
    }
    return;
  }

  if (phone) {
    gsap.set(phone, { rotation: 0, y: 0, willChange: 'transform', transformOrigin: '50% 60%' });
    phoneTimeline = gsap.timeline({
      onComplete: () => {
        gsap.set(phone, { clearProps: 'rotation,y,willChange,transformOrigin' });
      },
    });
    phoneTimeline.to(phone, {
      rotation: -1.25,
      y: -3,
      duration: 0.375,
      ease: phoneWiggleEase,
    });
  }

  gsap.set(messageItems, {
    autoAlpha: 0,
    filter: 'blur(0.35em)',
    scale: 0.98,
    y: 8,
    willChange: 'opacity, transform, filter',
  });

  messageTimeline = gsap.timeline();

  messageItems.forEach((messageItem, index) => {
    const nextMessageItem = messageItems[index + 1];
    const isLastMessageItem = index === messageItems.length - 1;
    const pauseAfter = nextMessageItem?.dataset.messageSide === messageItem.dataset.messageSide ? 0.42 : 0.72;

    messageTimeline.to(messageItem, {
      autoAlpha: 1,
      filter: 'blur(0em)',
      y: 0,
      scale: 1,
      duration: 0.38,
      ease: 'power2.out',
      clearProps: 'opacity,transform,filter,visibility,willChange',
    });

    if (!isLastMessageItem) {
      messageTimeline.to({}, { duration: pauseAfter });
    }
  });
};

watch(
  () => [props.messages, props.draftWidget],
  animateMessages,
  { flush: 'post' },
);

onMounted(animateMessages);

onBeforeUnmount(() => {
  if (messageTimeline) {
    messageTimeline.kill();
  }
  if (phoneTimeline) {
    phoneTimeline.kill();
  }
});

const IphoneShell = defineComponent({
  name: 'IphoneShell',
  setup(_, { slots }) {
    return () => h(
      'div',
      {
        'data-iphone-frame': '',
        class: 'w-full relative text-[clamp(0.75em,3.5vw,0.875em)] sm:text-[clamp(0.875em,2vw,0.925em)] md:text-[clamp(0.925em,1.925vw,1em)] p-(--frame-inset) rounded-(--frame-radius) bg-neutral-100 shadow-[0_0_var(--frame-inset)_0_inset_rgba(0,0,0,0.8)]',
      },
      [
        h('div', {
          'data-iphone-buttons': '',
          class: 'w-full h-full absolute top-0 left-0 *:bg-linear-[180deg,var(--color-neutral-400)_0%,var(--color-neutral-100)_20%,var(--color-neutral-400)_70%,var(--color-neutral-200)_90%,var(--color-neutral-400)_100%] *:shadow-[0.125em_0_0.15em_-0.05em_inset_rgba(255,255,255,0.75),-0.05em_0_0.1em_-0.05em_inset_rgba(0,0,0,05)]',
        },
          [
            h(
              'div',
              {
                class: 'absolute top-[20%] left-0 -translate-x-full w-[0.25em] h-[4%]',
              },
            ),
            h(
              'div',
              {
                class: 'absolute top-[calc(30%)] left-0 -translate-x-full w-[0.25em] h-[8%]',
              },
            ),
            h(
              'div',
              {
                class: 'absolute top-[calc(40%)] left-0 -translate-x-full w-[0.25em] h-[8%]',
              },
            ),
            h(
              'div',
              {
                class: 'absolute top-[calc(32%)] right-0 translate-x-full rotate-180 w-[0.25em] h-[12%]',
              },
            ),
          ],
        ),
        h('div', {
          class: 'w-full z-0 h-[calc(var(--frame-inset)*1.5)] absolute top-(--frame-radius) left-0 bg-linear-to-b from-neutral-900/20 to-neutral-900/10',
        }),
        h('div', {
          class: 'w-full z-0 h-[calc(var(--frame-inset)*1.5)] absolute bottom-(--frame-radius) left-0 bg-linear-to-b from-neutral-900/20 to-neutral-900/10',
        }),
        h(
          'div',
          {
            'data-iphone-bezel': '',
            class: 'w-full z-1 relative p-(--bezel-inset) rounded-(--bezel-radius) bg-neutral-900 shadow-[0_0_calc(var(--frame-inset)/4)_0_rgba(0,0,0,1)]',
          },
          [
            h(
              'div',
              {
                'data-iphone-screen-wrap': '',
                class: 'w-full z-1 relative overflow-hidden rounded-(--screen-radius) aspect-1/2 bg-white shadow-[0_0_0.125em_0_inset_rgba(0,0,0,0.5)]',
              },
              [
                h(
                  'div',
                  {
                    'data-iphone-screen': '',
                    class: 'w-full h-full flex flex-col',
                  },
                  slots.default?.(),
                ),
              ],
            ),
          ],
        ),
      ],
    );
  },
});

const IosMessageHeader = defineComponent({
  name: 'IosMessageHeader',
  props: {
    backCount: {
      type: [Number, String],
      default: 12,
    },
    contactName: {
      type: String,
      default: 'Remi',
    },
  },
  setup(props) {
    return () => h(
      'div',
      {
        'data-message-thread-header': '',
        class: 'w-full grid grid-cols-3 px-[1em] py-[0.5em]',
      },
      [
        h(
          'div',
          {
            class: 'flex items-center justify-center pl-[0.5em] pr-[0.5em] py-[0.5em] gap-[0.25em] self-start justify-self-start rounded-full bg-neutral-500/10 backdrop-blur-md shadow-[0_0_2em_0_rgba(0,0,0,0.15),1px_1px_1px_0_inset_rgba(255,255,255,0.8),-1px_-1px_1px_0_inset_rgba(255,255,255,0.8)]',
          },
          [
            h(PhCaretLeft, { class: 'size-[1em] text-neutral-900', weight: 'bold' }),
            h(
              'span',
              {
                class: 'text-[0.75em] font-medium text-white px-[0.5em] py-[0.25em] leading-none rounded-full bg-neutral-900',
              },
              String(props.backCount),
            ),
          ],
        ),
        h(
          'div',
          { class: 'flex flex-col items-center justify-center' },
          [
            h(
              'div',
              {
                'data-message-thread-header-avatar': '',
                class: 'w-[4em] overflow-hidden relative z-2 aspect-square rounded-full bg-linear-to-b from-neutral-900 to-neutral-800 shadow-[0_0.15em_0.2em_0_rgba(0,0,0,0.1)]',
              },
              [
                h(SiteLogo, {
                  class: 'absolute inset-0 m-auto size-[2em] text-white',
                }),
              ],
            ),
            h(
              'div',
              {
                'data-message-thread-header-name': '',
                class: 'text-[1em] relative z-1 mt-[-0.2em] font-medium text-neutral-900 flex gap-[0.25em] items-center rounded-full pl-[0.6em] py-[0.1em] pr-[0.4em] bg-neutral-500/10 backdrop-blur-md shadow-[0_0_2em_0_rgba(0,0,0,0.15),1px_1px_1px_0_inset_rgba(255,255,255,0.8),-1px_-1px_1px_0_inset_rgba(255,255,255,0.8)]',
              },
              [
                h('span', { class: 'text-[1em] font-semibold m-0 p-0' }, props.contactName),
                h(PhCaretRight, {
                  class: 'size-[0.75em] translate-y-[0.05em] text-neutral-900/40',
                  weight: 'bold',
                }),
              ],
            ),
          ],
        ),
        h('div'),
      ],
    );
  },
});

const IosMessageDate = defineComponent({
  name: 'IosMessageDate',
  props: {
    label: {
      type: String,
      default: 'Today',
    },
    time: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () => h(
      'div',
      {
        'data-message-date': '',
        class: 'w-full flex items-center justify-center text-[0.675em] text-neutral-900/40 gap-[0.25em]',
      },
      [
        h('span', { class: 'font-medium' }, props.label),
        h('span', { class: 'font-normal' }, props.time),
      ],
    );
  },
});

const IosMessageBubble = defineComponent({
  name: 'IosMessageBubble',
  props: {
    variant: {
      type: String,
      default: 'incoming',
      validator: (value) => ['incoming', 'outgoing'].includes(value),
    },
    text: {
      type: String,
      default: '',
    },
    last: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
    return () => h(
      'div',
      {
        'data-message-bubble': props.variant,
        'data-message-item': '',
        'data-message-side': props.variant,
        class: cn(
          'w-full flex px-[1em] mt-[0.65em] will-change-[opacity,transform,filter]',
          props.variant === 'incoming' ? 'justify-start' : 'justify-end',
        ),
      },
      [
        h(
          'div',
          {
            class: cn(
              'relative inline-block max-w-[78%] rounded-[1.25em] px-[0.875em] text-[0.9em] leading-tight tracking-tight',
              props.variant === 'incoming'
                ? 'mr-[25%] bg-neutral-200 py-[0.75em] text-neutral-900'
                : 'ml-[25%] bg-blue-400 bg-fixed py-[0.5em] text-white',
              props.last && "before:content-[''] before:absolute before:bottom-0 before:z-0 before:h-[1.25em] before:w-[1.25em] after:content-[''] after:absolute after:bottom-0 after:z-1 after:h-[1.25em] after:w-[0.7em] after:bg-white",
              props.last && (
                props.variant === 'incoming'
                  ? 'before:left-[-0.45em] before:rounded-br-[0.95em] before:bg-neutral-200 after:left-[-0.7em] after:rounded-br-[0.7em]'
                  : 'before:right-[-0.5em] before:rounded-bl-[0.95em] before:bg-blue-400 before:bg-fixed after:right-[-0.7em] after:rounded-bl-[0.7em]'
              ),
            ),
          },
          slots.default?.() || props.text,
        ),
      ],
    );
  },
});

const IosIncomingMessageBubble = defineComponent({
  name: 'IosIncomingMessageBubble',
  props: {
    text: {
      type: String,
      default: '',
    },
    last: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
    return () => h(
      IosMessageBubble,
      {
        variant: 'incoming',
        text: props.text,
        last: props.last,
      },
      slots,
    );
  },
});

const IosUserMessageBubble = defineComponent({
  name: 'IosUserMessageBubble',
  props: {
    text: {
      type: String,
      default: '',
    },
    last: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
    return () => h(
      IosMessageBubble,
      {
        variant: 'outgoing',
        text: props.text,
        last: props.last,
      },
      slots,
    );
  },
});

const IosDraftWidget = defineComponent({
  name: 'IosDraftWidget',
  props: {
    widget: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    return () => props.widget && h(
      'div',
      {
        'data-message-item': '',
        'data-message-side': 'widget',
        'data-message-widget': 'draft',
        class: 'w-full flex justify-start px-[1em] mt-[0.35em] will-change-[opacity,transform,filter]',
      },
      [
        h(
          'div',
          {
            class: 'mr-[18%] w-[85%] overflow-hidden rounded-[1em] shadow-[0_0_1px_0_rgba(0,0,0,0.15),0_0_2em_-1.5em_rgba(0,0,0,0.5)]',
          },
          [
            h(
              'div',
              {
                class: 'px-[0.9em] py-[0.75em]',
              },
              [
                h('p', { class: 'line-clamp-4 text-[0.75em] leading-tight tracking-tight text-muted-foreground' }, props.widget.preview || ''),
                h(
                  'div',
                  {
                    class: 'mt-[0.6em] flex items-center gap-[0.25em]',
                  },
                  [
                    h(
                      'button',
                      {
                        type: 'button',
                        class: 'rounded-full bg-neutral-900 px-[1em] py-[0.5em] text-[0.875em] font-medium leading-none tracking-tight text-white',
                      },
                      'Approve',
                    ),
                    h(
                      'button',
                      {
                        type: 'button',
                        class: 'rounded-full bg-neutral-500/10 px-[1em] py-[0.5em] text-[0.875em] font-medium leading-none tracking-tight text-muted-foreground',
                      },
                      'Dismiss',
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ],
    );
  },
});

const IosInputBar = defineComponent({
  name: 'IosInputBar',
  props: {
    placeholder: {
      type: String,
      default: 'iMessage',
    },
  },
  setup(props) {
    return () => h(
      'div',
      {
        'data-input-bar': '',
        class: 'w-full flex px-[1.5em] pb-[2em] items-stretch gap-[0.5em]',
      },
      [
        h(
          'div',
          {
            class: 'size-[2.5em] flex items-center justify-center rounded-full bg-neutral-500/10 backdrop-blur-md shadow-[0_0_2em_0_rgba(0,0,0,0.1),1px_1px_1px_0_inset_rgba(255,255,255,0.8),-1px_-1px_1px_0_inset_rgba(255,255,255,0.8)]',
          },
          [
            h(PhPlus, { class: 'size-[1em] text-neutral-900', weight: 'bold' }),
          ],
        ),
        h(
          'div',
          {
            class: 'flex-1 rounded-full bg-neutral-500/10 backdrop-blur-md shadow-[0_0_2em_0_rgba(0,0,0,0.1),1px_1px_1px_0_inset_rgba(255,255,255,0.8),-1px_-1px_1px_0_inset_rgba(255,255,255,0.8)] text-[0.8em] tracking-tight font-normal text-neutral-900/40 pl-[1.25em] pr-[1em] py-[0.5em] flex items-center justify-center',
          },
          [
            h('span', { class: 'flex-1' }, props.placeholder),
            h(PhMicrophone, { class: 'size-[1.4em] text-neutral-900/40', weight: 'regular' }),
          ],
        ),
      ],
    );
  },
});
</script>

<template>
  <div :class="cn(
    'w-full',
    '[--screen-radius:3.75em]',
    '[--bezel-inset:0.5em] [--bezel-radius:calc(var(--screen-radius)+var(--bezel-inset))]',
    '[--frame-inset:0.35em] [--frame-radius:calc(var(--screen-radius)+var(--bezel-inset)+var(--frame-inset))]'
  )" data-component-iphone>
    <div ref="phoneRef" class="mx-auto flex w-full max-w-sm items-center justify-center">
      <IphoneShell>
        <div data-iphone-screen-header class="w-full h-auto p-[0.6em] grid grid-cols-3">
          <!-- Time -->
          <div class="w-full h-full flex items-center justify-center">
            <div class="text-[0.9em] font-medium text-neutral-900">
              {{ currentTime }}
            </div>
          </div>

          <!-- Notch -->
          <div
            class="w-full h-[2em] shrink-0 rounded-full self-center justify-self-center bg-neutral-900 flex justify-end p-[5%] will-change-transform">
            <div class="h-full aspect-square rounded-full bg-white/5 flex items-center justify-center">
              <div
                class="flex items-center justify-center size-2/3 rounded-full bg-linear-to-b from-blue-500/10 to-blue-500/0 shadow-[0_0_0.25em_0_inset_color-mix(in_srgb,var(--color-blue-500)_20%,transparent)]">
                <div
                  class="flex items-center justify-center size-2/3 rounded-full bg-linear-to-t from-blue-500/10 to-neutral-900 shadow-[0_0_0.25em_0_inset_color-mix(in_srgb,var(--color-blue-500)_20%,transparent)]">
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-1"></div>
        </div>

        <IosMessageHeader :contact-name="contactName" />

        <!-- Main Content -->
        <div ref="messageThreadRef" data-message-thread class="w-full flex-1 flex flex-col py-[1em] overflow-y-auto scrollbar-none">
          <IosMessageDate :label="dateLabel" :time="currentTime" />
          <component :is="message.variant === 'outgoing' ? IosUserMessageBubble : IosIncomingMessageBubble"
            v-for="(message, index) in messages" :key="`${message.variant || 'incoming'}-${index}-${message.text}`"
            :text="message.text" :last="message.last ?? true" />
          <IosDraftWidget v-if="draftWidget" :widget="draftWidget" />
        </div>

        <IosInputBar :placeholder="inputPlaceholder" />
      </IphoneShell>
    </div>
  </div>
</template>
