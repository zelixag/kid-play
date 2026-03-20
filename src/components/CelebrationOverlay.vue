<script setup lang="ts">
import { onMounted } from 'vue'
import confetti from 'canvas-confetti'

const props = defineProps<{ show: boolean }>()

onMounted(() => {
  if (props.show) {
    fireConfetti()
  }
})

function fireConfetti() {
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181'],
  })
}

defineExpose({ fireConfetti })
</script>

<template>
  <Transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <div class="text-6xl animate-bounce">🎉</div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
