<script setup lang="ts">
type Props = {
  open?: boolean;
  ariaLabel?: string;
  width?: string | number;
};
withDefaults(defineProps<Props>(), {
  open: false,
  ariaLabel: "toggle menu",
  width: 80,
});
const emit = defineEmits(["toggle"]);
</script>

<template>
  <button @click="emit('toggle')" :aria-expanded="open" :aria-label="ariaLabel">
    <svg
      :class="{ open }"
      class="w-6 h-6"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      stroke-width="5"
      :width="width"
    >
      <path
        class="top"
        d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
      />
      <path class="middle" d="m 30,50 h 40" />
      <path
        class="bottom"
        d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
      />
    </svg>
  </button>
</template>

<style scoped>
button {
  cursor: pointer;
  display: flex;
  align-items: center;
  overflow: hidden;
}

svg {
  transition: transform 400ms;
}

.top {
  stroke-dasharray: 40 160;
  transition: stroke-dashoffset 400ms;
}

.middle {
  transform-origin: 50%;
  transition: transform 400ms;
}

.bottom {
  stroke-dasharray: 40 85;
  transition: stroke-dashoffset 400ms;
}

.open {
  transform: rotate(45deg);
}

.open .top,
.open .bottom {
  stroke-dashoffset: -64px;
}

.open .middle {
  transform: rotate(90deg);
}
</style>
