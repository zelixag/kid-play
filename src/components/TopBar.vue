<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{ title?: string }>()

const router = useRouter()

let pressTimer: ReturnType<typeof setTimeout> | null = null

function onPressStart() {
  pressTimer = setTimeout(() => {
    router.push('/')
  }, 2000)
}

function onPressEnd() {
  if (pressTimer) {
    clearTimeout(pressTimer)
    pressTimer = null
  }
}
</script>

<template>
  <div class="flex items-center justify-between px-4 py-3">
    <button
      class="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center text-xl"
      @touchstart.prevent="onPressStart"
      @touchend.prevent="onPressEnd"
      @mousedown="onPressStart"
      @mouseup="onPressEnd"
    >
      ◀
    </button>
    <span v-if="title" class="text-xl font-bold text-white drop-shadow">
      {{ title }}
    </span>
    <div class="w-10" />
  </div>
</template>
