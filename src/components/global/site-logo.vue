<script setup>
import { computed, useAttrs } from 'vue'
import { cn } from '../../lib/cn'

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()

const logoClass = computed(() =>
  cn(
    'size-8 shrink-0 text-foreground',
    attrs.class,
  ),
)
</script>

<template>
  <svg
    v-bind="{ ...attrs, class: undefined }"
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="logoClass"
    aria-hidden="true"
    shape-rendering="optimizeQuality"
  >
    <defs>
      <filter id="invert-eye-color" color-interpolation-filters="sRGB">
        <feColorMatrix
          type="matrix"
          values="-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0"
        />
      </filter>
    </defs>
    <path
      class="logo-body"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M52.3036 0.778809C65.8844 0.778809 76.8938 11.7882 76.8938 25.369C76.8938 30.554 75.2891 35.3644 72.5492 39.3301C68.3305 45.4362 61.4203 49.5405 53.5333 49.9289C52.8551 49.9623 52.3036 50.5096 52.3036 51.1886C52.3036 51.8677 52.8544 52.4193 53.5334 52.4075C60.5127 52.287 67.2425 51.1427 73.5791 49.1182C75.2359 48.5888 77.0379 49.5112 77.4194 51.2082C78.8924 57.7593 79.4952 64.3187 79.3007 70.7602C79.1974 74.1815 76.6448 76.9896 73.2662 77.5381C66.4424 78.6457 59.4403 79.2214 52.3036 79.2214C38.8635 79.2214 27.8924 68.6503 27.2513 55.3691C27.2185 54.6908 26.6712 54.1395 25.9921 54.1395C25.3129 54.1395 24.7617 54.69 24.7694 55.3691C24.851 62.56 25.6486 69.7562 27.1598 76.789C27.427 78.0326 26.49 79.2214 25.218 79.2214H4.59849C2.42556 79.2214 0.664062 77.4599 0.664062 75.287V4.71323C0.664062 2.54031 2.42557 0.778809 4.59849 0.778809H52.3036Z"
      fill="currentColor"
      shape-rendering="optimizeQuality"
    />
    <g filter="url(#invert-eye-color)">
      <path
        class="eye-left"
        d="M25.9502 27.75C25.9502 23.3318 28.1888 19.7501 30.9502 19.75C33.7116 19.75 35.9502 23.3317 35.9502 27.75C35.9502 32.1683 33.7116 35.75 30.9502 35.75C28.1888 35.7499 25.9502 32.1682 25.9502 27.75Z"
        fill="currentColor"
        shape-rendering="optimizeQuality"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          additive="sum"
          values="31.1722,27.8443;31.1722,27.8443"
          keyTimes="0;1"
          begin="0s"
          dur="8s"
          repeatCount="indefinite"
          calcMode="discrete"
        />
        <animateTransform
          attributeName="transform"
          type="scale"
          additive="sum"
          values="1 1;1 0;1 1;1 0;1 1;1 1"
          keyTimes="0;0.025;0.05;0.075;0.1;1"
          keySplines="0.4 0 1 1;0 0 0.2 1;0.4 0 1 1;0 0 0.2 1;0 0 1 1"
          begin="0s"
          dur="8s"
          repeatCount="indefinite"
          calcMode="spline"
        />
        <animateTransform
          attributeName="transform"
          type="translate"
          additive="sum"
          values="-31.1722,-27.8443;-31.1722,-27.8443"
          keyTimes="0;1"
          begin="0s"
          dur="8s"
          repeatCount="indefinite"
          calcMode="discrete"
        />
        <animateTransform
          attributeName="transform"
          type="translate"
          additive="sum"
          values="0 0;0 0;6 -5;6 -5;6 5;6 5;0 0;0 0"
          keyTimes="0;0.6;0.625;0.675;0.725;0.775;0.8125;1"
          keySplines="0 0 1 1;0.2 0 0.4 1;0 0 1 1;0.2 0 0.4 1;0 0 1 1;0.2 0 0.4 1;0 0 1 1"
          begin="0s"
          dur="8s"
          repeatCount="indefinite"
          calcMode="spline"
        />
      </path>
    </g>
    <g filter="url(#invert-eye-color)">
      <path
        class="eye-right"
        d="M45.9502 27.75C45.9502 23.3318 48.1888 19.7501 50.9502 19.75C53.7116 19.75 55.9502 23.3317 55.9502 27.75C55.9502 32.1683 53.7116 35.75 50.9502 35.75C48.1888 35.7499 45.9502 32.1682 45.9502 27.75Z"
        fill="currentColor"
        shape-rendering="optimizeQuality"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          additive="sum"
          values="50.8443,27.8443;50.8443,27.8443"
          keyTimes="0;1"
          begin="0s"
          dur="8s"
          repeatCount="indefinite"
          calcMode="discrete"
        />
        <animateTransform
          attributeName="transform"
          type="scale"
          additive="sum"
          values="1 1;1 0;1 1;1 0;1 1;1 1"
          keyTimes="0;0.025;0.05;0.075;0.1;1"
          keySplines="0.4 0 1 1;0 0 0.2 1;0.4 0 1 1;0 0 0.2 1;0 0 1 1"
          begin="0s"
          dur="8s"
          repeatCount="indefinite"
          calcMode="spline"
        />
        <animateTransform
          attributeName="transform"
          type="translate"
          additive="sum"
          values="-50.8443,-27.8443;-50.8443,-27.8443"
          keyTimes="0;1"
          begin="0s"
          dur="8s"
          repeatCount="indefinite"
          calcMode="discrete"
        />
        <animateTransform
          attributeName="transform"
          type="translate"
          additive="sum"
          values="0 0;0 0;6 -5;6 -5;6 5;6 5;0 0;0 0"
          keyTimes="0;0.6;0.625;0.675;0.725;0.775;0.8125;1"
          keySplines="0 0 1 1;0.2 0 0.4 1;0 0 1 1;0.2 0 0.4 1;0 0 1 1;0.2 0 0.4 1;0 0 1 1"
          begin="0s"
          dur="8s"
          repeatCount="indefinite"
          calcMode="spline"
        />
      </path>
    </g>
  </svg>
</template>
