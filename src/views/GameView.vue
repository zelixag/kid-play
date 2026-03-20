<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getTheme } from '@/data'
import { useAudio } from '@/composables/useAudio'
import { useTouchFeedback } from '@/composables/useTouchFeedback'
import GameCard from '@/components/GameCard.vue'
import CelebrationOverlay from '@/components/CelebrationOverlay.vue'
import TopBar from '@/components/TopBar.vue'
import type { GameItem } from '@/types/game'

const props = defineProps<{ themeId: string }>()

const theme = computed(() => getTheme(props.themeId))
const { trigger, isActive } = useTouchFeedback()
const audio = useAudio()
const celebrating = ref(false)

onMounted(() => {
  if (!theme.value) return
  // 预加载所有音效
  const srcs = theme.value.items.flatMap((i) => [i.sound, i.voiceIntro])
  audio.preload(srcs)
})

function onTap(item: GameItem) {
  trigger(item.id, 600)
  audio.play(item.sound)

  // 延迟播放语音介绍
  setTimeout(() => {
    audio.play(item.voiceIntro)
  }, 800)

  // 随机触发庆祝（约 30% 概率）
  if (Math.random() < 0.3) {
    setTimeout(() => {
      celebrating.value = true
      setTimeout(() => { celebrating.value = false }, 1500)
    }, 500)
  }
}
</script>

<template>
  <div
    v-if="theme"
    class="h-full flex flex-col"
    :style="{ backgroundColor: theme.bgColor }"
  >
    <TopBar :title="theme.name" />

    <div class="flex-1 grid grid-cols-2 gap-4 px-4 pb-6 content-start overflow-y-auto">
      <GameCard
        v-for="item in theme.items"
        :key="item.id"
        :item="item"
        :active="isActive(item.id)"
        @tap="onTap"
      />
    </div>

    <CelebrationOverlay :show="celebrating" />
  </div>

  <div v-else class="h-full flex items-center justify-center bg-amber-50">
    <p class="text-xl text-gray-400">主题不存在</p>
  </div>
</template>
