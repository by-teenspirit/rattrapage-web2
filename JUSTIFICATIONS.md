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