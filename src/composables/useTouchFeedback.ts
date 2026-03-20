import { ref } from 'vue'

export function useTouchFeedback() {
  const activeId = ref<string | null>(null)

  function trigger(id: string, durationMs = 400) {
    activeId.value = id

    // 触觉反馈（支持的设备）
    if (navigator.vibrate) {
      navigator.vibrate(30)
    }

    setTimeout(() => {
      if (activeId.value === id) {
        activeId.value = null
      }
    }, durationMs)
  }

  function isActive(id: string): boolean {
    return activeId.value === id
  }

  return { activeId, trigger, isActive }
}
