## F2 — Tests front

### Fichiers concernés

- PlanningList.tsx 
- adapter.js
- sessions.js 
- PlanningList.test.tsx

### Requêtes représentatives

Je lui ai donné le sujet pour qu'il ait le contexte complet. Je lui ai dit ce que je souhaitais faire après avoir réfléchi à la façon de procéder. 

### Ce que j'ai adapté
- Les paquets de test s'étaient installés dans mon dossier personnel au lieu du projet ; j'ai réinstallé dans le projet et supprimé l'installation en trop.
- J'ai revérifié les tests pour être sûre de tout couvrir. 

### Ce que j'ai vérifié moi-même
- Tous les documents. 
- Lancement des tests sur la version initiale : 3 échecs (vide, erreur, désordre).
- Lancement sur la version corrigée : 7 réussites.
- Test de l'interface dans le navigateur avec `npm run dev` : changement de groupe et affichage du chargement.


### Autres sources
- Documentation Vitest : https://vitest.dev
- Documentation Testing Library : https://testing-library.com/docs/react-testing-library/intro
- Documentation React sur le nettoyage des effets : https://react.dev/reference/react/useEffect

## F3 - UI

### Fichiers concernés

Tous les fichiers dans src/components

### Requêtes représentatives

Après avoir réfléchi à la structure, je lui ai expliqué à l'écrit précisément chaque bloc afin qu'il me donne un rendu exact de la maquette. Je lui ai demandé notamment de le faire en flexbox pour un responsive plus rapide (et parce que c'est une convention en code aujourd'hui). 

### Ce que j'ai adapté
- J'ai défini la maquette : en-tête, statistiques, barre de calendrier, filtres, bandeau de semaine, colonnes de jours.
- J'ai demandé le passage de JavaScript à TypeScript.
- Tailwind n'était pas installé dans le bon dossier au départ ; j'ai corrigé l'installation.
- J'ai supprimé puis recréé `App` par erreur ; je l'ai reconstruit.

### Ce que j'ai vérifié moi-même
- Tous les documents. 
- Rendu à 360 px et 1280 px dans les outils de développement, avec captures.
- Protocole clavier
- Contrastes
- `npm run build` sans erreur TypeScript.


### Autres sources
- Tailwind CSS : https://tailwindcss.com/docs
- Material Symbols : https://fonts.google.com/icons
- Contraste WCAG : https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html