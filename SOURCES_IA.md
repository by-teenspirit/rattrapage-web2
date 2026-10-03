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