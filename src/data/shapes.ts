import type { GameTheme } from '@/types/game'

export const shapesTheme: GameTheme = {
  id: 'shapes',
  name: '颜色形状',
  icon: '🔵',
  bgColor: '#f3e8ff',
  items: [
    {
      id: 'red-circle',
      name: '红色圆形',
      image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f534.svg',
      sound: '/sounds/shapes/red-circle.mp3',
      voiceIntro: '/sounds/shapes/red-circle-intro.mp3',
      color: '#ef4444',
    },
    {
      id: 'blue-square',
      name: '蓝色方块',
      image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f7e6.svg',
      sound: '/sounds/shapes/blue-square.mp3',
      voiceIntro: '/sounds/shapes/blue-square-intro.mp3',
      color: '#3b82f6',
    },
    {
      id: 'yellow-star',
      name: '黄色星星',
      image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/2b50.svg',
      sound: '/sounds/shapes/yellow-star.mp3',
      voiceIntro: '/sounds/shapes/yellow-star-intro.mp3',
      color: '#eab308',
    },
    {
      id: 'green-diamond',
      name: '绿色菱形',
      image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f7e2.svg',
      sound: '/sounds/shapes/green-diamond.mp3',
      voiceIntro: '/sounds/shapes/green-diamond-intro.mp3',
      color: '#22c55e',
    },
    {
      id: 'purple-heart',
      name: '紫色爱心',
      image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f49c.svg',
      sound: '/sounds/shapes/purple-heart.mp3',
      voiceIntro: '/sounds/shapes/purple-heart-intro.mp3',
      color: '#a855f7',
    },
    {
      id: 'orange-triangle',
      name: '橙色三角',
      image: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f536.svg',
      sound: '/sounds/shapes/orange-triangle.mp3',
      voiceIntro: '/sounds/shapes/orange-triangle-intro.mp3',
      color: '#f97316',
    },
  ],
}
