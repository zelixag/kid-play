<script setup lang="ts">
import type { GameItem } from '@/types/game'

defineProps<{
  item: GameItem
  active: boolean
}>()

defineEmits<{
  tap: [item: GameItem]
}>()
</script>

<template>
  <button
    class="game-card flex flex-col items-center justify-center gap-2 rounded-3xl p-4 transition-all duration-150"
    :class="[
      active ? 'scale-125 -rotate-3 shadow-2xl z-10' : 'scale-100 hover:scale-105',
      item.animationClass,
    ]"
    :style="{ backgroundColor: item.color + '22' }"
    @click="$emit('tap', item)"
  >
    <img
      :src="item.image"
      :alt="item.name"
      class="w-20 h-20 object-contain drop-shadow-md"
      :class="{ 'animate-bounce': active }"
      draggable="false"
    />
    <span
      class="text-lg font-bold"
      :style="{ color: item.color }"
    >
      {{ item.name }}
    </span>
  </button>
</template>

<style scoped>
.game-card {
  min-width: 120px;
  min-height: 120px;
  border: 3px solid transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.game-card:active {
  transform: scale(0.95);
}
</style>
