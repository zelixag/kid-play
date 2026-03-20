<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getTheme } from '@/data'
import { useAudio } from '@/composables/useAudio'
import { useTouchFeedback } from '@/composables/useTouchFeedback'
import GameCard from '@/components/GameCard.vue'
import CelebrationOverlay from '@/components/CelebrationOverlay.vue'
import VoicePrompt from '@/components/VoicePrompt.vue'
import TopBar from '@/components/TopBar.vue'
import type { GameItem, GameMode } from '@/types/game'

const props = defineProps<{ themeId: string }>()

const theme = computed(() => getTheme(props.themeId))
const { trigger, isActive } = useTouchFeedback()
const audio = useAudio()

const mode = ref<GameMode>('explore')
const celebrating = ref(false)
const targetItem = ref<GameItem | null>(null)
const promptText = ref('')
const wrongId = ref<string | null>(null)

onMounted(() => {
  if (!theme.value) return
  const srcs = theme.value.items.flatMap((i) => [i.sound, i.voiceIntro])
  audio.preload(srcs)
})

function onTap(item: GameItem) {
  if (mode.value === 'explore') {
    handleExplore(item)
  } else {
    handleFind(item)
  }
}

function handleExplore(item: GameItem) {
  trigger(item.id, 600)
  audio.play(item.sound)
  setTimeout(() => audio.play(item.voiceIntro), 800)

  if (Math.random() < 0.25) {
    setTimeout(() => {
      celebrating.value = true
      setTimeout(() => { celebrating.value = false }, 1500)
    }, 500)
  }
}

function handleFind(item: GameItem) {
  trigger(item.id, 400)

  if (item.id === targetItem.value?.id) {
    // 答对了！
    audio.play(item.sound)
    celebrating.value = true
    audio.play('/sounds/ui/success.mp3')

    setTimeout(() => {
      celebrating.value = false
      audio.play(item.voiceIntro)
    }, 1500)

    // 2 秒后出下一题
    setTimeout(() => nextFindQuestion(), 3000)
  } else {
    // 答错了，轻柔提示
    wrongId.value = item.id
    audio.play('/sounds/ui/try-again.mp3')
    setTimeout(() => { wrongId.value = null }, 600)
  }
}

function switchMode(m: GameMode) {
  mode.value = m
  if (m === 'find') {
    nextFindQuestion()
  } else {
    targetItem.value = null
    promptText.value = ''
  }
}

function nextFindQuestion() {
  if (!theme.value) return
  const items = theme.value.items
  const pick = items[Math.floor(Math.random() * items.length)]
  targetItem.value = pick
  promptText.value = `找到「${pick.name}」在哪里？`

  // 播放提示音
  setTimeout(() => {
    audio.play('/sounds/ui/find-prompt.mp3')
  }, 300)
}
</script>

<template>
  <div
    v-if="theme"
    class="h-full flex flex-col"
    :style="{ backgroundColor: theme.bgColor }"
  >
    <TopBar :title="theme.name" />

    <!-- 模式切换 -->
    <div class="flex gap-2 justify-center mb-3">
      <button
        class="px-5 py-2 rounded-full text-sm font-bold transition-all"
        :class="mode === 'explore' ? 'bg-white shadow-md text-gray-800 scale-105' : 'bg-white/40 text-gray-600'"
        @click="switchMode('explore')"
      >
        🎵 自由玩
      </button>
      <button
        class="px-5 py-2 rounded-full text-sm font-bold transition-all"
        :class="mode === 'find' ? 'bg-white shadow-md text-gray-800 scale-105' : 'bg-white/40 text-gray-600'"
        @click="switchMode('find')"
      >
        🔍 找一找
      </button>
    </div>

    <!-- 找一找提示 -->
    <VoicePrompt :text="promptText" :show="mode === 'find' && !!promptText" />

    <!-- 卡片网格 -->
    <div class="flex-1 grid grid-cols-2 gap-4 px-4 py-4 content-start overflow-y-auto">
      <GameCard
        v-for="item in theme.items"
        :key="item.id"
        :item="item"
        :active="isActive(item.id)"
        :class="{
          'ring-4 ring-red-400 animate-pulse': wrongId === item.id,
          'ring-4 ring-emerald-400': mode === 'find' && celebrating && item.id === targetItem?.id,
        }"
        @tap="onTap"
      />
    </div>

    <CelebrationOverlay :show="celebrating" />
  </div>

  <div v-else class="h-full flex items-center justify-center bg-amber-50">
    <p class="text-xl text-gray-400">主题不存在</p>
  </div>
</template>
