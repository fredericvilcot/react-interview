import { useEffect, useState } from 'react'
import { Pokemon } from './types'
import { Dashboard } from './components/Dashboard'
import { Detail } from './components/Detail'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { TYPE_COLORS, LEGENDARIES } from './data'
import { useSortById, useSortByName } from './hooks'
import { Star } from 'lucide-react'

const LIMIT = 60

export default function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<'id' | 'name'>('id')
  const [selected, setSelected] = useState<Pokemon | null>(null)
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem('favorites') ?? '[]')
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })

  async function load() {
    setLoading(true)
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}`)
    const data: any = await res.json()

    const detailed = []
    for (let i = 0; i < data.results.length; i++) {
      const p = data.results[i]
      const d: any = await (await fetch(p.url)).json()
      detailed.push({
        id: d.url ? d.url.split('/')[6] : String(d.id),
        name: d.name,
        sprite: d.sprites.other['official-artwork'].front_default,
        types: d.types,
        stats: d.stats,
        height: d.height,
        weight: d.weight,
      } as Pokemon)
    }

    setPokemons(detailed)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = pokemons.filter((p) => p.name.includes(search.toLowerCase()))
  const visible = sort === 'id' ? useSortById(filtered) : useSortByName(filtered)

  function toggleFavorite(id: string) {
    if (favorites.includes(id)) {
      favorites.splice(favorites.indexOf(id), 1)
    } else {
      favorites.push(id)
    }
    setFavorites(favorites)
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Pokédex Dashboard</h1>
        <p className="text-muted-foreground">
          {pokemons.length} pokémons chargés · {favorites.length} favoris
        </p>
      </header>

      {pokemons.length > 0 && <Dashboard pokemons={visible} />}

      <div className="flex gap-3 items-center">
        <Input
          placeholder="Rechercher un pokémon..."
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button
          variant={sort === 'id' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSort('id')}
        >
          Tri #
        </Button>
        <Button
          variant={sort === 'name' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSort('name')}
        >
          Tri A-Z
        </Button>
      </div>

      {loading && <p className="text-muted-foreground">Chargement...</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {visible.map((p, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:border-primary transition-colors relative"
            onClick={() => setSelected(p)}
          >
            <button
              className="absolute top-2 right-2 z-10"
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(p.id)
              }}
            >
              <Star
                className={
                  favorites.includes(p.id)
                    ? 'h-5 w-5 fill-yellow-400 text-yellow-400'
                    : 'h-5 w-5 text-muted-foreground'
                }
              />
            </button>
            <CardContent className="p-4 flex flex-col items-center gap-2">
              <img src={p.sprite} alt={p.name} className="w-24 h-24 object-contain" />
              <span className="text-xs text-muted-foreground">#{p.id}</span>
              <div className="flex items-center gap-1">
                <span className="font-medium capitalize">{p.name}</span>
                {LEGENDARIES.has(p.name) && (
                  <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                    ★
                  </Badge>
                )}
              </div>
              <div className="flex gap-1 flex-wrap justify-center">
                {p.types.map((t: any, i: number) => (
                  <Badge
                    key={i}
                    className={cn('capitalize border-transparent text-white', TYPE_COLORS.get(t.type.name))}
                  >
                    {t.type.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selected && <Detail pokemon={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
