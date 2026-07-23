import { DeepReadonly } from './types'

export const TYPE_COLORS: DeepReadonly<Map<string, string>> = new Map([
  ['fire', 'bg-orange-500'],
  ['water', 'bg-blue-500'],
  ['grass', 'bg-green-600'],
  ['electric', 'bg-yellow-500'],
  ['psychic', 'bg-pink-500'],
  ['ice', 'bg-cyan-400'],
  ['dragon', 'bg-indigo-600'],
  ['dark', 'bg-neutral-700'],
  ['fairy', 'bg-rose-400'],
  ['poison', 'bg-purple-600'],
  ['ground', 'bg-amber-700'],
  ['rock', 'bg-stone-500'],
  ['bug', 'bg-lime-600'],
  ['ghost', 'bg-violet-700'],
  ['fighting', 'bg-red-700'],
  ['flying', 'bg-sky-400'],
  ['steel', 'bg-slate-500'],
  ['normal', 'bg-gray-500'],
])

export const LEGENDARIES: DeepReadonly<Set<string>> = new Set([
  'articuno',
  'zapdos',
  'moltres',
  'mewtwo',
  'mew',
])
