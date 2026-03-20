import { ref } from 'vue'

/**
 * 家长锁：需要连续快速点击 5 次才能触发操作
 * 防止小孩误触退出游戏
 */
export function useParentLock(requiredClicks = 5, timeWindowMs = 2000) {
  const clicks = ref(0)
  let timer: ReturnType<typeof setTimeout> | null = null

  function tap(onUnlock: () => void) {
    clicks.value++

    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      clicks.value = 0
    }, timeWindowMs)

    if (clicks.value >= requiredClicks) {
      clicks.value = 0
      if (timer) clearTimeout(timer)
      onUnlock()
    }
  }

  return { clicks, tap, requiredClicks }
}
