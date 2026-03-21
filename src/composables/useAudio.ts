import { Howl, Howler } from 'howler'
import { useGameStore } from '@/stores/game'

const cache = new Map<string, Howl>()
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

/** 给 /sounds/... 路径加上 vite base 前缀 */
function resolveUrl(src: string): string {
  if (src.startsWith('http') || src.startsWith('data:')) return src
  if (src.startsWith(BASE)) return src
  return BASE + src
}

function getOrCreate(src: string): Howl {
  const url = resolveUrl(src)
  let howl = cache.get(url)
  if (!howl) {
    howl = new Howl({ src: [url], preload: true, html5: false })
    cache.set(url, howl)
  }
  return howl
}

export function useAudio() {
  const store = useGameStore()

  /** 预加载一组音效 */
  function preload(srcs: string[]) {
    srcs.forEach(getOrCreate)
  }

  /** 播放音效 */
  function play(src: string) {
    const howl = getOrCreate(src)
    howl.volume(store.volume)
    console.log('[Audio] play:', resolveUrl(src), 'vol:', store.volume, 'ctx:', Howler.ctx?.state)
    howl.play()
  }

  /** 停止所有音效 */
  function stopAll() {
    Howler.stop()
  }

  /** 解锁 iOS/Android AudioContext（必须在用户交互事件中调用） */
  function unlock() {
    if (store.audioUnlocked) return

    // 1. 恢复被挂起的 AudioContext
    const ctx = Howler.ctx
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }

    // 2. 创建一个新的 AudioContext 确保初始化（某些安卓需要）
    if (!ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtx) {
        const tempCtx = new AudioCtx()
        tempCtx.resume().then(() => tempCtx.close()).catch(() => {})
      }
    }

    // 3. 播放一个真实的短音频（静音 base64 在某些浏览器不够）
    const silentHowl = new Howl({
      src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA='],
      volume: 0.01,
      onend: () => {
        store.unlockAudio()
        console.log('[Audio] unlocked')
      },
      onplayerror: () => {
        // 如果播放失败，尝试再次 resume 后重试
        if (Howler.ctx?.state === 'suspended') {
          Howler.ctx.resume().then(() => silentHowl.play())
        }
      },
    })
    silentHowl.play()

    // 即使 onend 没触发也标记解锁（兜底）
    setTimeout(() => {
      if (!store.audioUnlocked) {
        store.unlockAudio()
        console.log('[Audio] unlocked (timeout fallback)')
      }
    }, 500)
  }

  return { preload, play, stopAll, unlock }
}
