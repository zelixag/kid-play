import type { GameTheme } from '@/types/game'

const S = '/sounds/carbrands'

// 车标用文字 SVG 占位，后续可替换为真实 logo
// 使用 simple-icons CDN
const ICON = (slug: string) => `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`

export const carbrandsTheme: GameTheme = {
  id: 'carbrands',
  name: '认车标',
  icon: '🏎️',
  bgColor: '#e0e7ff',
  items: [
    { id: 'bmw', name: '宝马', image: ICON('bmw'), sound: `${S}/bmw.mp3`, voiceIntro: `${S}/bmw-intro.mp3`, voiceFind: `${S}/bmw-find.mp3`, color: '#0066b1' },
    { id: 'mercedes', name: '奔驰', image: ICON('mercedes'), sound: `${S}/mercedes.mp3`, voiceIntro: `${S}/mercedes-intro.mp3`, voiceFind: `${S}/mercedes-find.mp3`, color: '#242424' },
    { id: 'audi', name: '奥迪', image: ICON('audi'), sound: `${S}/audi.mp3`, voiceIntro: `${S}/audi-intro.mp3`, voiceFind: `${S}/audi-find.mp3`, color: '#bb0a30' },
    { id: 'toyota', name: '丰田', image: ICON('toyota'), sound: `${S}/toyota.mp3`, voiceIntro: `${S}/toyota-intro.mp3`, voiceFind: `${S}/toyota-find.mp3`, color: '#eb0a1e' },
    { id: 'volkswagen', name: '大众', image: ICON('volkswagen'), sound: `${S}/volkswagen.mp3`, voiceIntro: `${S}/volkswagen-intro.mp3`, voiceFind: `${S}/volkswagen-find.mp3`, color: '#151f5d' },
    { id: 'tesla', name: '特斯拉', image: ICON('tesla'), sound: `${S}/tesla.mp3`, voiceIntro: `${S}/tesla-intro.mp3`, voiceFind: `${S}/tesla-find.mp3`, color: '#cc0000' },
    { id: 'porsche', name: '保时捷', image: ICON('porsche'), sound: `${S}/porsche.mp3`, voiceIntro: `${S}/porsche-intro.mp3`, voiceFind: `${S}/porsche-find.mp3`, color: '#b12b28' },
    { id: 'ferrari', name: '法拉利', image: ICON('ferrari'), sound: `${S}/ferrari.mp3`, voiceIntro: `${S}/ferrari-intro.mp3`, voiceFind: `${S}/ferrari-find.mp3`, color: '#d40000' },
    { id: 'lamborghini', name: '兰博基尼', image: ICON('lamborghini'), sound: `${S}/lamborghini.mp3`, voiceIntro: `${S}/lamborghini-intro.mp3`, voiceFind: `${S}/lamborghini-find.mp3`, color: '#ddb321' },
    { id: 'honda', name: '本田', image: ICON('honda'), sound: `${S}/honda.mp3`, voiceIntro: `${S}/honda-intro.mp3`, voiceFind: `${S}/honda-find.mp3`, color: '#cc0000' },
    { id: 'nissan', name: '日产', image: ICON('nissan'), sound: `${S}/nissan.mp3`, voiceIntro: `${S}/nissan-intro.mp3`, voiceFind: `${S}/nissan-find.mp3`, color: '#c3002f' },
    { id: 'ford', name: '福特', image: ICON('ford'), sound: `${S}/ford.mp3`, voiceIntro: `${S}/ford-intro.mp3`, voiceFind: `${S}/ford-find.mp3`, color: '#003399' },
  ],
}
