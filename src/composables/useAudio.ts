import { Howl, Howler } from 'howler'
import { useGameStore } from '@/stores/game'

const cache = new Map<string, Howl>()

function getOrCreate(src: string): Howl {
  let howl = cache.get(src)
  if (!howl) {
    howl = new Howl({ src: [src], preload: true })
    cache.set(src, howl)
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
