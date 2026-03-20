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
    howl = new Howl({ src: [url], preload: true })
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
    howl.play()
  }

  /** 停止所有音效 */
  function stopAll() {
    Howler.stop()
  }

  /** 解锁 iOS AudioContext（必须在用户交互事件中调用） */
  function unlock() {
    if (store.audioUnlocked) return
    const ctx = Howler.ctx
    if (ctx && ctx.state === 'suspended') {
      ctx.resume()
    }
    // 播放一个静音音频确保解锁
    const silentHowl = new Howl({
      src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA='],
      volume: 0,
    })
    silentHowl.play()
    store.unlockAudio()
  }

  return { preload, play, stopAll, unlock }
}
