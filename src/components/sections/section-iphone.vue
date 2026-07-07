<script setup>
import cn from '../../lib/cn';
import { PhCaretRight, PhCaretLeft, PhPlus, PhMicrophone } from '@phosphor-icons/vue';
import { defineComponent, h } from 'vue';

const timeFormatterOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
const currentTime = new Date().toLocaleTimeString([], timeFormatterOptions);

const IphoneShell = defineComponent({
  name: 'IphoneShell',
  setup(_, { slots }) {
    return () => h(
      'div',
      {
        'data-iphone-frame': '',
        class: 'w-full relative p-(--frame-inset) rounded-(--frame-radius) bg-neutral-100 shadow-[0_0_var(--frame-inset)_0_inset_rgba(0,0,0,0.8)]',
      },
      [
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
    contactImage: {
      type: String,
      default: '',
    },
    contactImageAlt: {
      type: String,
      default: '',
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
                class: 'w-[4em] overflow-hidden relative z-2 aspect-square rounded-full bg-linear-to-b from-neutral-200 to-neutral-300 shadow-[0_0.15em_0.2em_0_rgba(0,0,0,0.1)]',
              },
              props.contactImage
                ? [
                    h('img', {
                      src: props.contactImage,
                      alt: props.contactImageAlt || props.contactName,
                      class: 'size-full object-cover',
                    }),
                  ]
                : undefined,
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
      'div',
      {
        'data-message-bubble': 'incoming',
        class: 'w-full flex justify-start px-[1em] mt-[0.35em]',
      },
      [
        h(
          'div',
          {
            class: [
              'ios-message-bubble ios-message-bubble--incoming',
              props.last && 'ios-message-bubble--last',
            ],
          },
          slots.default?.() || props.text,
        ),
      ],
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
      'div',
      {
        'data-message-bubble': 'outgoing',
        class: 'w-full flex justify-end px-[1em] mt-[0.35em]',
      },
      [
        h(
          'div',
          {
            class: [
              'ios-message-bubble ios-message-bubble--outgoing',
              props.last && 'ios-message-bubble--last',
            ],
          },
          slots.default?.() || props.text,
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
        class: 'w-full flex px-[1.5em] py-[2em] items-stretch gap-[0.5em]',
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
  <section :class="cn(
    'min-h-screen w-full px-6',
    '[--screen-radius:3.75em]',
    '[--bezel-inset:0.5em] [--bezel-radius:calc(var(--screen-radius)+var(--bezel-inset))]',
    '[--frame-inset:0.35em] [--frame-radius:calc(var(--screen-radius)+var(--bezel-inset)+var(--frame-inset))]'
  )" data-section-iphone>
    <div class="mx-auto flex min-h-screen max-w-sm items-center justify-center">
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
            class="w-full h-[2em] shrink-0 rounded-full self-center justify-self-center bg-neutral-900 flex justify-end p-[5%]">
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

        <IosMessageHeader contact-name="Remi" />

        <!-- Main Content -->
        <div data-message-thread class="w-full flex-1 flex flex-col py-[1em]">
          <IosMessageDate label="Today" :time="currentTime" />
          <IosIncomingMessageBubble text="I found three open loops from today. Want the short version?" />
          <IosUserMessageBubble text="Yes, send the quick summary." />
        </div>

        <IosInputBar placeholder="iMessage" />
      </IphoneShell>
    </div>
  </section>
</template>

<style scoped>
:deep(.ios-message-bubble) {
  position: relative;
  display: inline-block;
  max-width: 78%;
  border-radius: 1.25em;
  padding: 0.45em 0.85em;
  font-size: 0.78em;
  line-height: 1.18;
  letter-spacing: -0.01em;
}

:deep(.ios-message-bubble--incoming) {
  margin-right: 25%;
  color: var(--color-neutral-900);
  background: #e9e9eb;
}

:deep(.ios-message-bubble--outgoing) {
  margin-left: 25%;
  color: white;
  background: linear-gradient(to bottom, #00d0ea 0%, #0085d1 100%);
  background-attachment: fixed;
}

:deep(.ios-message-bubble--last)::before,
:deep(.ios-message-bubble--last)::after {
  content: '';
  position: absolute;
  bottom: 0;
  height: 1.25em;
}

:deep(.ios-message-bubble--incoming.ios-message-bubble--last)::before {
  z-index: 0;
  left: -0.45em;
  width: 1.25em;
  background: #e9e9eb;
  border-bottom-right-radius: 0.95em;
}

:deep(.ios-message-bubble--incoming.ios-message-bubble--last)::after {
  z-index: 1;
  left: -0.7em;
  width: 0.7em;
  background: white;
  border-bottom-right-radius: 0.7em;
}

:deep(.ios-message-bubble--outgoing.ios-message-bubble--last)::before {
  z-index: 0;
  right: -0.5em;
  width: 1.25em;
  background: linear-gradient(to bottom, #00d0ea 0%, #0085d1 100%);
  background-attachment: fixed;
  border-bottom-left-radius: 0.95em;
}

:deep(.ios-message-bubble--outgoing.ios-message-bubble--last)::after {
  z-index: 1;
  right: -0.7em;
  width: 0.7em;
  background: white;
  border-bottom-left-radius: 0.7em;
}
</style>
