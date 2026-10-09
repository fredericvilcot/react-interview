import express from 'express'
import fs from 'fs'
import path from 'path'

const app = express()
app.use(express.json())

const FILE = path.join(process.cwd(), 'server/favorites.json')

app.get('/api/favorites', (req: any, res: any) => {
  const favorites = JSON.parse(fs.readFileSync(FILE, 'utf-8'))
  res.json(favorites)
})

app.post('/api/favorites/:id', (req: any, res: any) => {
  const favorites = JSON.parse(fs.readFileSync(FILE, 'utf-8'))
  favorites.push(Number(req.params.id))
  fs.writeFileSync(FILE, JSON.stringify(favorites))
  res.json(favorites)
})

app.delete('/api/favorites/:id', (req: any, res: any) => {
  const favorites = JSON.parse(fs.readFileSync(FILE, 'utf-8'))
  const index = favorites.indexOf(Number(req.params.id))
  if (index === -1) {
    res.json({ error: 'not found' })
    return
  }
  favorites.splice(index, 1)
  fs.writeFileSync(FILE, JSON.stringify(favorites))
  res.json(favorites)
})

app.listen(3001, () => {
  console.log('API listening on http://localhost:3001')
})
