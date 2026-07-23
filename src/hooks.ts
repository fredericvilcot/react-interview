import { useMemo } from 'react'
import { Pokemon } from './types'

export function useSortById(list: Pokemon[]) {
  return useMemo(() => [...list].sort((a, b) => (a.id > b.id ? 1 : -1)), [list])
}

export function useSortByName(list: Pokemon[]) {
  return useMemo(() => [...list].sort((a, b) => (a.name > b.name ? 1 : -1)), [list])
}
