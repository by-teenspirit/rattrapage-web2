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

## C1 — AWS

### Fichiers concernés
`c1-aws/DOSSIER.md` : structure, tableaux, schéma Mermaid et réécriture des textes ainsi que complétiton de certains quand ils étaient trop vagues. 

L'estimation des coûts (`preuves/c1-estimation.pdf`) a été faite par moi dans AWS Pricing Calculator.

### Requêtes représentatives
- Je lui ai demandé de me réécrire certains paragraphes que j'ai fait ou de les compléter quand j'étais trop vague. 
- Il a aussi fait la structure du document et le mermaid. 
- Je lui ai demandé à quoi servait certains des outils et s'ils étaient pertinents de les rajouter dans l'estimation ou non. 

### Ce que j'ai adapté
- J'ai saisi moi-même tous les services dans le calculateur AWS.
- J'ai repéré avec l'aide de l'IA un coût RDS anormal (66,17 $). J'ai trouvé dans le calculateur les trois options activées par défaut (RDS Proxy, Database Insights, Extended Support) et je les ai désactivées.
- J'ai ajouté l'IPv4 publique qui manquait dans la première estimation.
- J'ai nettoyé des valeurs par défaut inutiles dans CloudWatch (module RUM).
- J'ai reformulé ou changé aussi certaines choses où il parlait trop ou n'était pas pertinent. 

### Ce que j'ai vérifié moi-même
- Tous les prix proviennent du calculateur AWS officiel, exporté le 06/10/2026 (lien et PDF fournis).
- Les calculs de volumes (requêtes, trafic, logs) ont été refaits à la main.
- Les pages de documentation AWS

### Autres sources
- AWS Pricing Calculator : https://calculator.aws/ (06/10/2026)
- Tarifs EC2 : https://aws.amazon.com/ec2/pricing/on-demand/
- Tarifs RDS PostgreSQL : https://aws.amazon.com/rds/postgresql/pricing/
- Tarifs CloudWatch : https://aws.amazon.com/cloudwatch/pricing/
- Tarifs VPC (IPv4 publique) : https://aws.amazon.com/vpc/pricing/
- Sauvegardes RDS : https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html

## C2 — CI/CD

### Fichiers concernés
`.github/workflows/ci-cd.yml` et `c2-cicd/NOTE.md` : structure proposée par l'IA. 

### Requêtes représentatives
- Je lui ai demandé de l'aide sur certaines erreurs quand les checks ne passaient pas 
- Ou quand je ne savais plus où chercher pour faire certaines modifications afin de ne pas perdre de temps. 

### Ce que j'ai adapté
- Réglages GitHub faits par moi : permissions en lecture seule, environnement `production` avec approbation, règle de branche sur `main`.
- J'ai corrigé une règle de branche qui ne ciblait aucune branche.

### Ce que j'ai vérifié moi-même
- Exécutions réelles sur GitHub : validation sur PR, livraison après fusion, PR bloquée par un test cassé, retour arrière vers une version précédente.
- Vérification de l'empreinte SHA-256 dans les logs du retour arrière.

### Autres sources
- Documentation GitHub Actions : https://docs.github.com/actions
- Permissions du GITHUB_TOKEN : https://docs.github.com/actions/security-for-github-actions/security-guides/automatic-token-authentication
- Environnements de déploiement : https://docs.github.com/actions/managing-workflow-runs-and-deployments/managing-deployments/managing-environments-for-deployment
- Règles de branche (rulesets) : https://docs.github.com/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets