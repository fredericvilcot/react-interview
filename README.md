# Exercice technique — Full stack TypeScript

## Le contexte

Cette petite application affiche une **liste de Pokémon** et un **dashboard** de
statistiques, à partir de la [PokéAPI](https://pokeapi.co/). Les **favoris** sont
sauvegardés par une petite **API Node / Express**.

Elle **fonctionne**, mais elle a été écrite rapidement : il y a des choses à corriger
et beaucoup à améliorer.

## Lancer le projet

```bash
npm install
npm run dev      # lance l'API (port 3001) et le front (port 5173)
```

Vérifier les types :

```bash
npm run typecheck
```

Stack : Vite · React 18 · TypeScript · Tailwind · shadcn/ui · Express.

```
src/       → front React
server/    → API Express (favoris stockés dans server/favorites.json)
```

| Méthode  | Route                 | Rôle                |
| -------- | --------------------- | ------------------- |
| `GET`    | `/api/favorites`      | Liste des favoris   |
| `POST`   | `/api/favorites/:id`  | Ajoute un favori    |
| `DELETE` | `/api/favorites/:id`  | Retire un favori    |

---

## Ta mission

Reprends ce code comme s'il devait **vivre et grandir dans une équipe** :

1. **Comprends l'app** (front et back) et repère ce qui cloche.
2. **Corrige** les problèmes qui te semblent prioritaires.
3. **Propose une architecture** propre et maintenable — tu peux en refactorer une
   partie, ou simplement la décrire.
4. Tu **expliqueras tes choix à l'oral** au moment du debrief (rien à rédiger).

## Ce qu'on évalue

> Tu n'es pas obligé de tout traiter. On veut voir comment tu **couvres ces
> dimensions** et comment tu **priorises**.

- **Architecture** — découpage front / back, responsabilités, contrat d'API.
- **Qualité du TypeScript** — des deux côtés.
- **Fiabilité** — est-ce que tout se comporte comme attendu ?
- **React** — les bases et les bonnes pratiques.
- **Ta capacité à justifier tes décisions.**

## Ce qu'on ne demande PAS

- Pas de travail sur le **design / CSS** (le style est secondaire).
- Pas besoin de **tout finir** : **priorise** et assume tes arbitrages.

---

⏱️ Tu as **45 minutes**. On n'attend pas que tout soit fait : **priorise**, et ce qui
nous intéresse c'est ta **façon de raisonner**. Bon courage 🚀
