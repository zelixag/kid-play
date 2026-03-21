<script setup lang="ts">
import { ref, onMounted } from 'vue'

const logs = ref<string[]>([])
const show = ref(false)

onMounted(() => {
  const origLog = console.log
  const origError = console.error
  const origWarn = console.warn

  const addLog = (prefix: string, ...args: unknown[]) => {
    const msg = prefix + args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
    logs.value.push(msg)
    if (logs.value.length > 50) logs.value.shift()
  }

  console.log = (...args) => { origLog(...args); addLog('', ...args) }
  console.error = (...args) => { origError(...args); addLog('[ERR] ', ...args) }
  console.warn = (...args) => { origWarn(...args); addLog('[WARN] ', ...args) }
})
</script>

<template>
  <button
    class="fixed bottom-2 right-2 z-[999] w-8 h-8 rounded-full bg-black/50 text-white text-xs flex items-center justify-center"
    @click="show = !show"
  >
    🐛
  </button>
  <div
    v-if="show"
    class="fixed bottom-12 right-2 left-2 z-[999] max-h-[40vh] overflow-y-auto bg-black/90 text-green-400 text-[10px] font-mono p-2 rounded-lg"
  >
    <div v-for="(log, i) in logs" :key="i" class="break-all">{{ log }}</div>
    <div v-if="logs.length === 0" class="text-gray-500">暂无日志</div>
  </div>
</template>
