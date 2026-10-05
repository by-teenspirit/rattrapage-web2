# Rattrapage WEB2 — Callista Loré

## F2 — Tests front

Prérequis : Node 20 ou plus.

    cd f2-tests-front
    npm ci
    npm run dev
    npm test
    npm run test:initial


- `npm run dev` lance l'interface de planning sur http://localhost:5173.
- `npm test` lance les 7 tests sur le composant corrigé.
- `npm run test:initial` lance les mêmes tests sur le composant d'origine pour montrer les échecs.

Structure :
- `src/components/PlanningListInitial.jsx` : composant fourni dans le sujet, non modifié
- `src/components/PlanningList.jsx` : composant corrigé.
- `src/data/sessions.js` : jeu de données du sujet.
- `src/data/adapter.js` : faux backend qui filtre les séances et simule un délai réseau.
- `tests/PlanningList.test.jsx` : les tests.
- `../preuves/f2-avant.txt` et `../preuves/f2-apres.txt` : traces d'exécution.

## F3 — Bibliothèques UI

Prérequis : Node 20 ou plus.

    cd f3-ui
    npm ci
    npm run dev
    npm run build

- `npm run dev` lance le planning sur http://localhost:5173.
- `npm run build` vérifie les types TypeScript puis construit le projet.

Stack : React + TypeScript, Vite, Tailwind CSS v4, icônes Material Symbols.

Structure :
- `src/types.ts` : types des données (séance, filtres, domaine…).
- `src/data/sessions.ts` : jeu de données du sujet et libellés affichés.
- `src/utils.ts` : filtres, calculs de dates, export CSV.
- `src/ui.ts` : classes communes (boutons, champs, focus).
- `src/components/` : en-tête, statistiques, barre de calendrier, filtres, semaine, jour, bloc de séance, badge de statut, détail.
- `../preuves/f3-360.png` et `../preuves/f3-1280.png` : captures du rendu.