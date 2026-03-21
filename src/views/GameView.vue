<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { getTheme } from '@/data'
import { useAudio } from '@/composables/useAudio'
import { useTouchFeedback } from '@/composables/useTouchFeedback'
import GameCard from '@/components/GameCard.vue'
import CelebrationOverlay from '@/components/CelebrationOverlay.vue'
import VoicePrompt from '@/components/VoicePrompt.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import TopBar from '@/components/TopBar.vue'
import type { GameItem, GameMode } from '@/types/game'
import confetti from 'canvas-confetti'

const props = defineProps<{ themeId: string }>()

const theme = computed(() => getTheme(props.themeId))
const { trigger, isActive } = useTouchFeedback()
const audio = useAudio()
const loading = ref(true)

// 模式
const mode = ref<GameMode>('explore')

// 闯关状态
const level = ref(1)
const score = ref(0)
const targetItem = ref<GameItem | null>(null)
const levelItems = ref<GameItem[]>([])
const promptText = ref('')
const wrongId = ref<string | null>(null)
const showLevelUp = ref(false)
const showLevelStart = ref(false)
const celebrating = ref(false)

onMounted(() => {
  if (!theme.value) return
  const srcs = theme.value.items.flatMap((i) => [i.sound, i.voiceIntro, i.voiceFind])
  audio.preload(srcs)
  setTimeout(() => { loading.value = false }, 600)
})

// 闯关模式：level N 显示 N 个 item，从中找一个
function startLevel(lvl: number) {
  if (!theme.value) return
  level.value = lvl
  showLevelUp.value = false

  const allItems = [...theme.value.items]
  // 随机打乱
  for (let i = allItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allItems[i], allItems[j]] = [allItems[j], allItems[i]]
  }

  // 取 level 个（最少 1，最多全部）
  const count = Math.min(lvl, allItems.length)
  levelItems.value = allItems.slice(0, count)

  // 随机选一个作为目标
  const pick = levelItems.value[Math.floor(Math.random() * levelItems.value.length)]
  targetItem.value = pick
  promptText.value = `找到「${pick.name}」`

  // 显示关卡开始提示
  showLevelStart.value = true
  setTimeout(() => {
    showLevelStart.value = false
    audio.play(pick.voiceFind)
  }, 800)
}

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
  setTimeout(() => audio.play(item.voiceIntro), 1200)
}

function handleFind(item: GameItem) {
  if (showLevelUp.value || showLevelStart.value) return
  trigger(item.id, 400)

  if (item.id === targetItem.value?.id) {
    score.value++
    audio.play('/sounds/ui/success.mp3')

    // 丰富的庆祝效果
    celebrating.value = true
    fireCelebration()

    setTimeout(() => {
      celebrating.value = false
      showLevelUp.value = true
    }, 1500)
  } else {
    wrongId.value = item.id
    audio.play('/sounds/ui/try-again.mp3')
    setTimeout(() => { wrongId.value = null }, 600)
  }
}

function fireCelebration() {
  // 多波烟花
  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA']
  confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 }, colors })
  setTimeout(() => confetti({ particleCount: 40, spread: 90, origin: { x: 0.3, y: 0.6 }, colors }), 300)
  setTimeout(() => confetti({ particleCount: 40, spread: 90, origin: { x: 0.7, y: 0.6 }, colors }), 600)
}

function nextLevel() {
  startLevel(level.value + 1)
}

function switchMode(m: GameMode) {
  mode.value = m
  if (m === 'find') {
    score.value = 0
    startLevel(1)
  } else {
    targetItem.value = null
    promptText.value = ''
    showLevelUp.value = false
  }
}

// 探索模式显示所有 items
const displayItems = computed(() => {
  if (mode.value === 'find') return levelItems.value
  return theme.value?.items || []
})
</script>

<template>
  <div
    v-if="theme"
    class="h-full flex flex-col"
    :style="{ backgroundColor: theme.bgColor }"
  >
    <TopBar :title="theme.name" />

    <!-- 模式切换 + 闯关信息 -->
    <div class="flex items-center justify-center gap-2 mb-2 px-4">
      <button
        class="px-4 py-1.5 rounded-full text-sm font-bold transition-all"
        :class="mode === 'explore' ? 'bg-white shadow-md text-gray-800 scale-105' : 'bg-white/40 text-gray-600'"
        @click="switchMode('explore')"
      >
        🎵 自由玩
      </button>
      <button
        class="px-4 py-1.5 rounded-full text-sm font-bold transition-all"
        :class="mode === 'find' ? 'bg-white shadow-md text-gray-800 scale-105' : 'bg-white/40 text-gray-600'"
        @click="switchMode('find')"
      >
        🏆 闯关
      </button>
      <div v-if="mode === 'find'" class="flex items-center gap-2 ml-2">
        <span class="text-sm font-bold text-amber-700 bg-white/60 px-2 py-0.5 rounded-full">
          第 {{ level }} 关
        </span>
        <span class="text-sm font-bold text-emerald-700 bg-white/60 px-2 py-0.5 rounded-full">
          ⭐ {{ score }}
        </span>
      </div>
    </div>

    <!-- 找一找提示 -->
    <VoicePrompt :text="promptText" :show="mode === 'find' && !!promptText && !showLevelUp" />

    <!-- 关卡开始提示 -->
    <Transition name="fade">
      <div v-if="showLevelStart" class="flex justify-center my-2">
        <div class="bg-white/90 px-6 py-3 rounded-2xl shadow-lg text-center">
          <div class="text-3xl mb-1">🎯</div>
          <div class="text-lg font-bold text-gray-700">第 {{ level }} 关</div>
          <div class="text-sm text-gray-500">找出 1 个目标</div>
        </div>
      </div>
    </Transition>

    <!-- 过关庆祝 + 下一关按钮 -->
    <Transition name="fade">
      <div v-if="showLevelUp" class="flex flex-col items-center gap-3 my-4">
        <div class="text-5xl animate-bounce">🎉</div>
        <div class="text-2xl font-bold text-amber-700">太棒了！</div>
        <div class="text-lg text-gray-600">第 {{ level }} 关通过！</div>
        <div class="flex gap-2">
          <span v-for="i in Math.min(level, 10)" :key="i" class="text-2xl">⭐</span>
        </div>
        <button
          class="mt-2 px-8 py-3 bg-emerald-500 text-white text-lg font-bold rounded-2xl shadow-lg active:scale-95 transition-transform"
          @click="nextLevel"
        >
          下一关 ➡️
        </button>
      </div>
    </Transition>

    <!-- 卡片网格 -->
    <div
      v-if="!showLevelUp"
      class="flex-1 grid gap-3 px-4 py-2 content-start overflow-y-auto"
      :class="displayItems.length <= 2 ? 'grid-cols-1 max-w-xs mx-auto' : displayItems.length <= 6 ? 'grid-cols-2' : 'grid-cols-3'"
    >
      <GameCard
        v-for="item in displayItems"
        :key="item.id"
        :item="item"
        :active="isActive(item.id)"
        :class="{
          'ring-4 ring-red-400 animate-pulse': wrongId === item.id,
          'ring-4 ring-emerald-400': celebrating && item.id === targetItem?.id,
        }"
        @tap="onTap"
      />
    </div>

    <CelebrationOverlay :show="celebrating" />
  </div>

  <div v-else class="h-full flex items-center justify-center bg-amber-50">
    <p class="text-xl text-gray-400">主题不存在</p>
  </div>

  <LoadingScreen :show="loading" />
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
