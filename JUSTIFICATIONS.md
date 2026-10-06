## F2 — Tests front

### Outils choisis

- Vitest : pour les tests. Complète avec Vite déjà utilisé.
- jsdom : les tests tournent dans Node, qui n'a pas de DOM. jsdom simule le document pour pouvoir afficher le composant.
- Testing Library : on cherche les éléments par leur rôle, leur texte ou leur nom accessible, comme un utilisateur ou un lecteur d'écran. Si le filtre perd son nom accessible, le test échoue.
- user-event : simule un vrai enchaînement comme un user. 

### Scénarios testés

| Scénario | Entrée | Attente | Risque couvert |
|---|---|---|---|
| Chargement | promesse jamais résolue | « Chargement… » visible avec le rôle status | l'utilisateur ne sait pas que les données arrivent |
| Succès | les 6 séances | 6 éléments de liste, plus de message de chargement | liste non affichée ou chargement qui ne disparaît pas |
| Groupe A | sélection de A | 4 séances : celles de A + Promotion, pas celles de B | règle « A = A + Promotion » cassée |
| Résultat vide | liste vide | message « Aucune séance pour ce groupe. » | page blanche sans explication |
| Erreur puis reprise | 1er appel en échec, 2e en succès | message d'erreur, bouton Réessayer, puis la liste | chargement bloqué pour toujours, aucun moyen de réessayer |
| Réponses dans le désordre | « Tous » répond après « B » | la liste de B reste affichée | ancienne réponse qui écrase le bon filtre |
| Accessibilité du filtre | tabulation puis choix de B | le filtre s'appelle « Groupe », reçoit le focus, déclenche le chargement de B | filtre inutilisable au clavier ou au lecteur d'écran |


### Défauts trouvés et corrections

Les traces sont dans `preuves/f2-avant.txt` (3 échecs) et `preuves/f2-apres.txt` (7 réussites).
 
**1. Pas de gestion d'erreur**

Avant : 
- si `loadSessions` échoue, rien ne catch l'erreur. 
- `setLoading(false)` n'est jamais appelé, le composant reste sur « Chargement… ». 
Vitest signale une `Unhandled Rejection`.

Correction : 
- ajout d'un `.catch` qui passe un état `error` à vrai, 
- et d'un `.finally` qui arrête le chargement. 
- Un bouton « Réessayer » incrémente un compteur `attempt` présent dans les dépendances du `useEffect`, ce qui relance la requête.

**2. Réponse obsolète affichée**

Avant : 
- si on change de groupe pendant un chargement, l'ancienne réponse peut arriver après la nouvelle et l'écraser. 
- La liste affichée ne correspond plus au filtre.

Correction : 
- une variable `active` dans le `useEffect`. 
Quand le groupe change, React exécute la fonction de nettoyage qui la passe à `false`. 
- Les réponses arrivées ensuite sont ignorées.

**3. Pas d'état vide**

Avant : 
- une liste vide affiche un `<ul>` vide, l'utilisateur voit une page blanche.

Correction : 
- un message « Aucune séance pour ce groupe. » quand la liste est vide.
 
### Limites

- jsdom n'est pas un vrai navigateur : pas de rendu visuel
- Le backend est remplacé par un adaptateur ; les vrais codes d'erreur HTTP ou les délais réseau ne sont pas testés.
- Si l'utilisateur change de groupe très vite, plusieurs requêtes partent quand même ; elles sont ignorées mais pas annulées
- Le style et la mise en page ne sont pas testés.

## F3 — Bibliothèques UI

### Choix techniques
**Tailwind CSS**

Pour construire la hiérarchie visuelle directement à partir de la maquette, sans ajouter de composants lourds.
Accessibilité non fournie : je l'ai gérée moi-même (labels, focus, dialog).

**Material Symbols pour les icônes**
Bibliothèque d'icônes cohérente, installée en local (npm). 
Toutes les icônes sont décoratives (`aria-hidden`) : le sens est toujours porté par un texte visible ou un `aria-label`.

**TypeScript**
Les types (`Session`, `Status`, `Group`…) empêchent d'utiliser une valeur qui n'existe pas dans les données. `Record<Status, string>` oblige à prévoir un libellé pour chaque statut. Le build échoue si un type est faux.

### Hiérarchie SessionBlock / SessionDetail

SessionBlock : période et groupe en petites capitales, titre en gras, puis durée, domaine, formateur et statut. Le bloc entier est un bouton, ce qui donne une grande zone cliquable.

SessionDetail : il reprend toutes les informations avec un intitulé pour chacune (date, période, groupe, mode, formateur), et ajoute une phrase d'explication quand la séance est seulement proposée.

### Responsive

| | 360 px | 1280 px |
|---|---|---|
| Statistiques | grille 2 × 2 | 4 sur une ligne |
| Boutons d'en-tête | pleine largeur, côte à côte | à droite du titre |
| Bouton Filtres | icône seule, nom accessible conservé | icône + texte |
| Domaines | une ligne qui défile horizontalement | sur plusieurs lignes |
| Jours | empilés | 5 colonnes (à partir de 1024 px) |

Aucun défilement horizontal de la page à 360 px. Captures : `preuves/f3-360.png`, `preuves/f3-1280.png`.

Seuil WCAG AA : 4,5:1 pour le texte normal, 3:1 pour les éléments graphiques (contour de focus).
Protocole clavier conservé. 

### Limites

- « Affecter un bloc » est un bouton visuel
- Les titres et volumes des semaines S01 à S03 sont des exemples
- La vue Mois affiche les semaines du mois en liste
- Le chevron du sélecteur de mois est décoratif
- La police d'icônes pèse environ 4 Mo. Un sous-ensemble limité aux icônes utilisées serait plus léger.
- Pas de tests automatisés sur ce module : vérification manuelle.

## C1 — AWS

Le détail est dans `c1-aws/DOSSIER.md`. 

Résumé des choix :

### Architecture retenue
- API FastAPI en conteneur Docker sur une instance EC2 
- front servi par S3 + CloudFront 
- base RDS PostgreSQL en sous-réseau privé.

**Alternative étudiée** : API sur Lambda + API Gateway. Écartée parce que :
- charge faible et régulière, donc le principal avantage de Lambda (payer à l'appel) ne sert à rien
- le projet utilise déjà Docker

### Choix 
- **20 req/s en pointe** : une seule instance t4g.small suffit, sans load balancer.
- **RTO 4 h** : une restauration manuelle tient dans le délai demandé, donc pas de Multi-AZ (qui doublerait le coût de la base).
- **RPO 24 h** : la sauvegarde automatique RDS avec restauration répond à l'objectif
- **Logs 30 jours** : rétention CloudWatch réglée à 30 jours.

### Sécurité
- Base sans accès public ; seule l'API peut la joindre (Security Groups).
- Mot de passe de la base dans Secrets Manager, lu par l'API via son rôle IAM.
- Déploiement depuis GitHub Actions par OIDC, sans clé d'accès stockée.
- Moindre privilège pour chaque rôle.

### Coût
40,59 USD/mois (487,08 USD/an), estimé avec AWS Pricing Calculator, région Paris, le 06/10/2026, hors offre gratuite.
- La base et le serveur représentent 78 % du total.
- Trois options RDS activées par défaut dans le calculateur (RDS Proxy, Database Insights, Extended Support) ont été désactivées car inutiles, elles faisaient passer RDS de 15,80 dollars à 66,17 dollars.
- Piste d'économie : Savings Plan sur 1 an pour l'EC2.

### Méthode d'estimation des volumes
Trafic et logs calculés à partir d'une moyenne (≈ 2 req/s sur 10 h × 22 jours), pas de la pointe, avec une marge ×2. Les hypothèses (taille des réponses, des logs) sont à remplacer par des mesures réelles.

### Limites
Voir la section 8 du dossier : instance unique, base Single-AZ, pas de reprise inter-région, volumes estimés, prix datés, durée de restauration non testée, aucun déploiement réel.