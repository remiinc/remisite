<script setup>
defineProps({
  photos: {
    type: Array,
    required: true,
    validator: photos => photos.length >= 4 && photos.every(photo => typeof photo?.src === 'string'),
  },
})
</script>

<template>
  <div class="photo-stack relative mb-[0.15em] h-[8.35em] w-[11.7em]" aria-label="4 bathroom photos from Bill Caudill">
    <figure v-for="(photo, index) in photos.slice(0, 4)" :key="photo.src"
      class="photo-stack__photo absolute overflow-hidden rounded-[0.82em] bg-neutral-800"
      :class="[`photo-stack__photo--${index + 1}`]">
      <img :src="photo.src" :alt="photo.alt ?? ''" width="800" height="600" decoding="async" fetchpriority="low"
        class="h-full w-full object-cover" :style="photo.position ? { objectPosition: photo.position } : undefined">
    </figure>
    <span class="absolute bottom-[0.95em] right-[0.75em] z-5 rounded-full bg-black/65 px-[0.55em] py-[0.32em] text-[0.62em] font-semibold leading-none text-white backdrop-blur-sm">
      4 Photos
    </span>
  </div>
</template>

<style scoped>
.photo-stack__photo {
  height: 7.35em;
  width: 10.45em;
}

.photo-stack__photo--1 {
  left: 0;
  top: 0;
  z-index: 4;
  box-shadow: 0 0.22em 0.7em rgba(0, 0, 0, 0.24);
}

.photo-stack__photo--2 {
  left: 0.38em;
  top: 0.34em;
  z-index: 3;
  filter: brightness(0.86);
}

.photo-stack__photo--3 {
  left: 0.76em;
  top: 0.68em;
  z-index: 2;
  filter: brightness(0.72);
}

.photo-stack__photo--4 {
  left: 1.14em;
  top: 1.02em;
  z-index: 1;
  filter: brightness(0.58);
}
</style>
