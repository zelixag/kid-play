<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useParentLock } from '@/composables/useParentLock'
import { useGameStore } from '@/stores/game'

defineProps<{ title?: string }>()

const router = useRouter()
const store = useGameStore()
const { clicks, tap, requiredClicks } = useParentLock(3, 3000)

function onBackTap() {
  tap(() => router.push('/'))
}

function toggleVolume() {
  store.setVolume(store.volume > 0 ? 0 : 1)
}
</script>

<template>
  <div class="flex items-center justify-between px-4 py-3">
    <!-- 返回按钮：需点 5 次 -->
    <button
      class="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center text-lg relative"
      @click="onBackTap"
    >
      ◀
      <span
        v-if="clicks > 0"
        class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-xs font-bold flex items-center justify-center text-gray-600"
      >
        {{ requiredClicks - clicks }}
      </span>
    </button>

    <span v-if="title" class="text-xl font-bold text-white drop-shadow">
      {{ title }}
    </span>

    <!-- 音量 -->
    <button
      class="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center text-lg"
      @click="toggleVolume"
    >
      {{ store.volume > 0 ? '🔊' : '🔇' }}
    </button>
  </div>
</template>
