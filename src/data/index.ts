import type { GameTheme } from '@/types/game'
import { animalsTheme } from './animals'

export const themes: GameTheme[] = [animalsTheme]

export function getTheme(id: string): GameTheme | undefined {
  return themes.find((t) => t.id === id)
}
