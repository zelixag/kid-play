import type { GameTheme } from '@/types/game'

const S = '/sounds/animals'

export const animalsTheme: GameTheme = {
  id: 'animals',
  name: '认识动物',
  icon: '🐾',
  bgColor: '#d1fae5',
  items: [
    { id: 'cat', name: '小猫', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f431.svg', sound: `${S}/cat.mp3`, voiceIntro: `${S}/cat-intro.mp3`, voiceFind: `${S}/cat-find.mp3`, color: '#f97316' },
    { id: 'dog', name: '小狗', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f436.svg', sound: `${S}/dog.mp3`, voiceIntro: `${S}/dog-intro.mp3`, voiceFind: `${S}/dog-find.mp3`, color: '#a16207' },
    { id: 'chicken', name: '小鸡', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f425.svg', sound: `${S}/chicken.mp3`, voiceIntro: `${S}/chicken-intro.mp3`, voiceFind: `${S}/chicken-find.mp3`, color: '#eab308' },
    { id: 'cow', name: '奶牛', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f42e.svg', sound: `${S}/cow.mp3`, voiceIntro: `${S}/cow-intro.mp3`, voiceFind: `${S}/cow-find.mp3`, color: '#65a30d' },
    { id: 'duck', name: '小鸭', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f986.svg', sound: `${S}/duck.mp3`, voiceIntro: `${S}/duck-intro.mp3`, voiceFind: `${S}/duck-find.mp3`, color: '#0ea5e9' },
    { id: 'frog', name: '青蛙', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f438.svg', sound: `${S}/frog.mp3`, voiceIntro: `${S}/frog-intro.mp3`, voiceFind: `${S}/frog-find.mp3`, color: '#16a34a' },
    { id: 'pig', name: '小猪', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f437.svg', sound: `${S}/pig.mp3`, voiceIntro: `${S}/pig-intro.mp3`, voiceFind: `${S}/pig-find.mp3`, color: '#f472b6' },
    { id: 'rabbit', name: '小兔子', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f430.svg', sound: `${S}/rabbit.mp3`, voiceIntro: `${S}/rabbit-intro.mp3`, voiceFind: `${S}/rabbit-find.mp3`, color: '#e2e8f0' },
    { id: 'horse', name: '小马', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f434.svg', sound: `${S}/horse.mp3`, voiceIntro: `${S}/horse-intro.mp3`, voiceFind: `${S}/horse-find.mp3`, color: '#92400e' },
    { id: 'sheep', name: '小羊', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f411.svg', sound: `${S}/sheep.mp3`, voiceIntro: `${S}/sheep-intro.mp3`, voiceFind: `${S}/sheep-find.mp3`, color: '#f5f5f4' },
    { id: 'monkey', name: '小猴子', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f435.svg', sound: `${S}/monkey.mp3`, voiceIntro: `${S}/monkey-intro.mp3`, voiceFind: `${S}/monkey-find.mp3`, color: '#b45309' },
    { id: 'elephant', name: '大象', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f418.svg', sound: `${S}/elephant.mp3`, voiceIntro: `${S}/elephant-intro.mp3`, voiceFind: `${S}/elephant-find.mp3`, color: '#9ca3af' },
    { id: 'lion', name: '狮子', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f981.svg', sound: `${S}/lion.mp3`, voiceIntro: `${S}/lion-intro.mp3`, voiceFind: `${S}/lion-find.mp3`, color: '#d97706' },
    { id: 'panda', name: '熊猫', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f43c.svg', sound: `${S}/panda.mp3`, voiceIntro: `${S}/panda-intro.mp3`, voiceFind: `${S}/panda-find.mp3`, color: '#1f2937' },
    { id: 'fish', name: '小鱼', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f41f.svg', sound: `${S}/fish.mp3`, voiceIntro: `${S}/fish-intro.mp3`, voiceFind: `${S}/fish-find.mp3`, color: '#0ea5e9' },
    { id: 'butterfly', name: '蝴蝶', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f98b.svg', sound: `${S}/butterfly.mp3`, voiceIntro: `${S}/butterfly-intro.mp3`, voiceFind: `${S}/butterfly-find.mp3`, color: '#a855f7' },
  ],
}
