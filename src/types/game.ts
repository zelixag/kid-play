export interface GameItem {
  id: string
  name: string
  image: string
  sound: string
  voiceIntro: string
  voiceFind: string
  color: string
  animationClass?: string
}

export interface GameTheme {
  id: string
  name: string
  icon: string
  bgColor: string
  items: GameItem[]
}

export type GameMode = 'explore' | 'find'
