import type { GameTheme } from '@/types/game'

const S = '/sounds/fruits'

export const fruitsTheme: GameTheme = {
  id: 'fruits',
  name: '水果乐园',
  icon: '🍎',
  bgColor: '#fef3c7',
  items: [
    { id: 'apple', name: '苹果', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f34e.svg', sound: `${S}/apple.mp3`, voiceIntro: `${S}/apple-intro.mp3`, voiceFind: `${S}/apple-find.mp3`, color: '#ef4444' },
    { id: 'banana', name: '香蕉', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f34c.svg', sound: `${S}/banana.mp3`, voiceIntro: `${S}/banana-intro.mp3`, voiceFind: `${S}/banana-find.mp3`, color: '#eab308' },
    { id: 'watermelon', name: '西瓜', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f349.svg', sound: `${S}/watermelon.mp3`, voiceIntro: `${S}/watermelon-intro.mp3`, voiceFind: `${S}/watermelon-find.mp3`, color: '#16a34a' },
    { id: 'strawberry', name: '草莓', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f353.svg', sound: `${S}/strawberry.mp3`, voiceIntro: `${S}/strawberry-intro.mp3`, voiceFind: `${S}/strawberry-find.mp3`, color: '#e11d48' },
    { id: 'orange', name: '橙子', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f34a.svg', sound: `${S}/orange.mp3`, voiceIntro: `${S}/orange-intro.mp3`, voiceFind: `${S}/orange-find.mp3`, color: '#f97316' },
    { id: 'grape', name: '葡萄', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f347.svg', sound: `${S}/grape.mp3`, voiceIntro: `${S}/grape-intro.mp3`, voiceFind: `${S}/grape-find.mp3`, color: '#7c3aed' },
    { id: 'peach', name: '桃子', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f351.svg', sound: `${S}/peach.mp3`, voiceIntro: `${S}/peach-intro.mp3`, voiceFind: `${S}/peach-find.mp3`, color: '#fb923c' },
    { id: 'pear', name: '梨子', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f350.svg', sound: `${S}/pear.mp3`, voiceIntro: `${S}/pear-intro.mp3`, voiceFind: `${S}/pear-find.mp3`, color: '#a3e635' },
    { id: 'cherry', name: '樱桃', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f352.svg', sound: `${S}/cherry.mp3`, voiceIntro: `${S}/cherry-intro.mp3`, voiceFind: `${S}/cherry-find.mp3`, color: '#dc2626' },
    { id: 'pineapple', name: '菠萝', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f34d.svg', sound: `${S}/pineapple.mp3`, voiceIntro: `${S}/pineapple-intro.mp3`, voiceFind: `${S}/pineapple-find.mp3`, color: '#ca8a04' },
    { id: 'mango', name: '芒果', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f96d.svg', sound: `${S}/mango.mp3`, voiceIntro: `${S}/mango-intro.mp3`, voiceFind: `${S}/mango-find.mp3`, color: '#f59e0b' },
    { id: 'lemon', name: '柠檬', image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f34b.svg', sound: `${S}/lemon.mp3`, voiceIntro: `${S}/lemon-intro.mp3`, voiceFind: `${S}/lemon-find.mp3`, color: '#fde047' },
  ],
}
