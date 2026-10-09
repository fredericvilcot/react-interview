# Exercice technique — Full stack TypeScript

## Le contexte

Cette petite application affiche une **liste de Pokémon** et un **dashboard** de
statistiques, à partir de la [PokéAPI](https://pokeapi.co/). Les **favoris** sont
sauvegardés par une petite **API Node / Express**.

Elle **fonctionne**, mais elle a été écrite rapidement : il y a des choses à corriger
et beaucoup à améliorer.

## Lancer le projet

Sur StackBlitz, tout démarre automatiquement. En local :

```bash
npm install
npm run dev      # lance le front et l'API sur http://localhost:5173
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

En dev, l'API Express est servie par le serveur Vite (voir `vite.config.ts`) : front et
API partagent le même port.

| Méthode  | Route                 | Rôle                |
| -------- | --------------------- | ------------------- |
| `GET`    | `/api/favorites`      | Liste des favoris   |
| `POST`   | `/api/favorites/:id`  | Ajoute un favori    |
| `DELETE` | `/api/favorites/:id`  | Retire un favori    |

---

## Comment ça se passe

On fait l'exercice **ensemble, en live**. Ce qui nous intéresse, c'est ta **façon de
raisonner** : pense à voix haute, pose des questions, modifie le code quand tu veux.

1. **Découvre** l'app et le code (front et back), dis-nous ce que tu remarques.
2. **Corrige** ce qui te semble prioritaire.
3. Explique comment tu **organiserais** ce code pour qu'il vive dans une équipe — et
   commence à le faire si tu as le temps.

## Ce qu'on regarde

- **Architecture** — découpage front / back, responsabilités, contrat d'API.
- **Qualité du TypeScript** — des deux côtés.
- **Fiabilité** — est-ce que tout se comporte comme attendu ?
- **React** — les bases et les bonnes pratiques.
- **Ta capacité à justifier tes décisions.**

## Ce qu'on ne demande PAS

- Pas de travail sur le **design / CSS**.
- Pas besoin de **tout finir** : on préfère te voir **prioriser** et expliquer tes choix.

Bon courage 🚀
