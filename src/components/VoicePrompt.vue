<script setup lang="ts">
defineProps<{
  text: string
  show: boolean
}>()
</script>

<template>
  <Transition name="slide">
    <div
      v-if="show"
      class="flex items-center justify-center gap-2 py-3 px-6 mx-4 rounded-2xl bg-white/80 shadow-lg"
    >
      <span class="text-2xl">🔍</span>
      <span class="text-lg font-bold text-gray-700">{{ text }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.slide-enter-active {
  transition: all 0.3s ease-out;
}
.slide-leave-active {
  transition: all 0.2s ease-in;
}
.slide-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}
.slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
