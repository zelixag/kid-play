import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameStore = defineStore('game', () => {
  const volume = ref(1.0)
  const audioUnlocked = ref(false)

  function setVolume(v: number) {
    volume.value = Math.max(0, Math.min(1, v))
  }

  function unlockAudio() {
    audioUnlocked.value = true
  }

  return { volume, audioUnlocked, setVolume, unlockAudio }
})
