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

## C1 — AWS

Module documentaire : pas de code, pas de déploiement (hors périmètre du sujet).

- `c1-aws/DOSSIER.md` : dossier d'architecture (comparaison de deux architectures, schéma, sécurité, coûts, protocoles, RPO/RTO, limites).
- `preuves/c1-estimation.pdf` : export de l'estimation AWS Pricing Calculator du 06/10/2026.
- Estimation en ligne : https://calculator.aws/#/estimate?id=c528c2fe0dc6e282e1291d0a672aa8cd1316ab7f

Le schéma est écrit en Mermaid et s'affiche directement sur GitHub.

## I3 — Structuration de flux

Prérequis : Python 3.10 ou plus. Aucune dépendance à installer.

    cd i3-flux
    python3 pipeline.py seances.ndjson sortie
    python3 -m unittest discover -s tests -t . -v

- `pipeline.py` : pipeline en ligne de commande (lecture → validation → normalisation → déduplication → sortie).
- `seances.ndjson` : jeu de données du sujet (12 lignes, dont une malformée).
- `tests/test_pipeline.py` : 7 tests (valide, invalide, doublon, JSON malformé, fichier vide, invariant, reproductibilité).
- Sorties produites dans le dossier passé en argument : `acceptes.ndjson`, `rejets.ndjson`, `stats.json`.
- Preuves : `preuves/i3/` (sorties sur le jeu fourni) et `preuves/i3-tests.txt` (trace des tests).

Résultat attendu sur le jeu fourni : 12 lus = 6 acceptés + 4 rejets + 2 doublons.