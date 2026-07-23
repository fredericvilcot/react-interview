export type Pokemon = {
  id: string
  name: string
  sprite: string
  types: any[]
  stats: any
  height: number
  weight: number
}

export type ApiListResponse = {
  count: number
  results: { name: string; url: string }[]
}

type Primitive = string | number | bigint | boolean | symbol | null | undefined

export type DeepReadonly<T> = T extends Primitive | ((...args: any[]) => unknown)
  ? T
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepReadonly<U>>
  : T extends Map<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends Set<infer M>
  ? ReadonlySet<DeepReadonly<M>>
  : { readonly [K in keyof T]: DeepReadonly<T[K]> }
