import { useEffect, useState } from 'react'
import { DeepReadonly, Pokemon } from '../types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Dashboard(props: { pokemons: DeepReadonly<Pokemon[]> }) {
  const pokemons = props.pokemons

  const [avgHp, setAvgHp] = useState(0)

  useEffect(() => {
    let totalHp = 0
    for (let i = 0; i < pokemons.length; i++) {
      const hp = pokemons[i].stats.find((s: any) => s.stat.name === 'hp').base_stat
      totalHp += hp
    }
    setAvgHp(pokemons.length ? totalHp / pokemons.length : 0)
  }, [pokemons])

  const heaviest = pokemons.sort((a, b) => b.weight - a.weight)[0]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl">{avgHp.toFixed(1)}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">PV moyens</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl capitalize">{heaviest ? heaviest.name : '—'}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Le plus lourd {heaviest ? `(${heaviest.weight / 10} kg)` : ''}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
