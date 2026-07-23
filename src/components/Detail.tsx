import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

export function Detail(props: any) {
  const pokemon = props.pokemon
  const [info, setInfo] = useState<any>(null)

  useEffect(() => {
    let cancelled = false
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setInfo(d)
      })
    return () => {
      cancelled = true
    }
  }, [pokemon])

  const total = pokemon.stats.reduce((acc: number, s: any) => acc + s.base_stat, 0)

  return (
    <Dialog open onOpenChange={props.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize text-2xl">{pokemon.name}</DialogTitle>
          <DialogDescription>
            #{pokemon.id} · {pokemon.height / 10} m · {pokemon.weight / 10} kg
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center">
          <img src={pokemon.sprite} alt={pokemon.name} className="w-40 h-40 object-contain" />
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Stats (total {total})</h4>
          {pokemon.stats.map((s: any, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs w-28 text-muted-foreground capitalize">{s.stat.name}</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${(s.base_stat / 255) * 100}%` }}
                />
              </div>
              <span className="text-xs w-8 text-right">{s.base_stat}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Capacités</h4>
          <div className="flex flex-wrap gap-1">
            {info?.abilities?.map((a: any, i: number) => (
              <Badge key={i} variant="secondary" className="capitalize">
                {a.ability.name}
              </Badge>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
