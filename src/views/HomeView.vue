<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAudio } from '@/composables/useAudio'
import { useGameStore } from '@/stores/game'
import { themes } from '@/data'

const router = useRouter()
const audio = useAudio()
const store = useGameStore()

function start(themeId: string) {
  audio.unlock()
  router.push({ name: 'game', params: { themeId } })
}
</script>

<template>
  <!-- iOS 音频解锁：首次需要用户点击 -->
  <div
    v-if="!store.audioUnlocked"
    class="h-full flex flex-col items-center justify-center bg-amber-50"
    @click="audio.unlock()"
  >
    <div class="text-8xl mb-6 animate-bounce">🎮</div>
    <p class="text-3xl font-bold text-amber-800">点击开始玩吧！</p>
  </div>

  <!-- 主页 -->
  <div v-else class="h-full flex flex-col bg-amber-50">
    <div class="pt-10 pb-6 text-center">
      <h1 class="text-3xl font-bold text-amber-800">🌟 选个游戏吧</h1>
    </div>

    <div class="flex-1 grid grid-cols-2 gap-5 px-6 pb-10 content-start">
      <button
        v-for="theme in themes"
        :key="theme.id"
        class="flex flex-col items-center justify-center gap-3 rounded-3xl p-6 shadow-lg active:scale-95 transition-transform"
        :style="{ backgroundColor: theme.bgColor }"
        @click="start(theme.id)"
      >
        <span class="text-5xl">{{ theme.icon }}</span>
        <span class="text-lg font-bold text-gray-700">{{ theme.name }}</span>
      </button>
    </div>
  </div>
</template>
