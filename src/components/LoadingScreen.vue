<script setup lang="ts">
defineProps<{ show: boolean }>()
</script>

<template>
  <Transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-amber-50"
    >
      <div class="text-7xl animate-bounce mb-4">🐣</div>
      <p class="text-lg font-bold text-amber-700 animate-pulse">加载中...</p>
    </div>
  </Transition>
</template>

<style scoped>
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-leave-to {
  opacity: 0;
}
</style>
