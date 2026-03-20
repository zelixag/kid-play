import type { GameTheme } from '@/types/game'
import { animalsTheme } from './animals'
import { fruitsTheme } from './fruits'
import { vehiclesTheme } from './vehicles'
import { shapesTheme } from './shapes'

export const themes: GameTheme[] = [
  animalsTheme,
  fruitsTheme,
  vehiclesTheme,
  shapesTheme,
]

export function getTheme(id: string): GameTheme | undefined {
  return themes.find((t) => t.id === id)
}
