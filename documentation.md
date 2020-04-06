# Comprendre et utiliser Poul-o-code
## A quoi que ça peut bien servir ?
Le but de Poul-o-code est d'apporter aux apprentis développeurs, un moyen de créer des programmes et des jeux :
* En français
* Avec une interface simple

## L'interface
L'interface est découpée en trois partie :
* L'écran (en haut à gauche) :<br/>
    Sur lequel sera affiché le programme que vous allez écrire. Cet écran est très vieux, il sait afficher 50 caractères en largeur et 30 en hauteur.<br/> *Il faudra faire avec*.
* Le code (en haut à droite) :<br/>
    C'est là que vous écrirez vos plus beaux programmes.<br/>
    Il y a deux onglets :
    - Début
    - Répétition<br/>

    Nous parlerons de cela plus loin
    Quand votre programme sera prêt, vous pourrez le démarrer en cliquant sur le bouton Démarrer
    Une fois le programme en fonctionnement, vous pourrez l'arrêter en cliquant sur le bouton Stop qui apparaît alors.
* Le Débug :<br/>
    C'est là que vous pourrez faire afficher du texte à votre programme que ce soit pour essayer de trouver un bug ou pour donner des informations au joueur
    L'affichage est un peu spécial puisque les informations les plus récentes sont en haut et plus on descend plus les informations sont anciennes.
    Si des erreurs se produisent, les informations les concernant s'afficheront aussi ici.

## Comment ça marche
Les programmes que vous allez écrire se décomposent en deux parties :
* Le début : C'est tout ce que fait votre programme pour démarrer, il n'est fait qu'une fois lorsque vous cliquez sur le bouton Démarrer
* La répétition : Cette partie va être traitée à intervalle régulier. Si vous ne modifier rien, cet intervalle est d'une seconde.
Donc une fois par seconde la répétition sera traitée et le vous pourrez donc changer l'affichage de l'écran ou parler au joueur

## Petits exemples
### Écrire dans la zone Débug
Je vous propose d'écrire "Bonjour !" aux joueurs lors du lancement de votre jeu. Écrivez le code suivant dans l'onglet Début, puis cliquez sur Démarrer

```
parler("Bonjour !")
```

On notera que, souhaitant afficher du texte, nous l'avons mis entre double guillemets. Pour afficher un nombre, on se passera de ces guillemets

```
parler(123456)
```

### Dessiner sur l'écran
Il est possible de changer un par un le contenu de chaque case de l'écran (On parle de pixel normalement). Pour cela, il faut connaître la position de la case à changer. La position est décrite par le numéro de la colonne et le numéro de la ligne.

Les colonnes vont de 1 à 50 et les lignes de 1 à 30.

Il faut aussi savoir ce que l'on veut mettre dans cette case. N'importe quel caractère peut être utilisé.

Nous allons écrire un A dans la case située sur la deuxième colonne et la première ligne de l'écran. Écrivez le code suivant dans l'onglet Début, puis cliquez sur Démarrer

```
changerAffichage(2,1,"A")
```

On notera encore une fois que les nombres sont notés tels quels alors que les textes sont placés entre double guillemets.

Pour afficher des caractères plus complexes (qui ne sont pas sur un clavier), une liste des caractères disponibles est présentes dans ce document mais voici déjà un exemple avec un bateau, un coeur ou un carré plein:

```
changerAffichage(6,10,DESSIN.bateau)
changerAffichage(10,15,DESSIN.coeur)
changerAffichage(20,20,DESSIN.plein)
```

Il est possible de choisir la couleur de ce qu'on veut afficher (Si on ne précise pas, tout sera noir). Par exemple ici, nous allons afficher un bateau rouge et un coeur bleu :

```
changerAffichage(6,10,DESSIN.bateau,COULEUR.rouge)
changerAffichage(10,15,DESSIN.coeur,COULEUR.bleu)
```

Pour effacer quelque chose de l'écran, il suffit d'utiliser le caractère DESSIN.vide comme on peut le voir ici. On affiche le bateau rouge et le coeur bleu puis on efface le coeur :

```
changerAffichage(6,10,DESSIN.bateau,COULEUR.rouge)
changerAffichage(10,15,DESSIN.coeur,COULEUR.bleu)
changerAffichage(10,15,DESSIN.vide)
```

La liste des couleurs utilisables est fournie plus loin dans ce document.

### Effacer l'écran

Pour effacer la totalité de l'écran, l'action effacerAffichage doit être utilisée.


Écrivez le code suivant dans l'onglet Début :

```
changerAffichage(6,10,DESSIN.bateau)
changerAffichage(10,15,DESSIN.coeur)
changerAffichage(20,20,DESSIN.plein)
```

Écrivez le code suivant dans l'onglet Répétition, puis cliquez sur Démarrer

```
effacerAffichage()
```
Les caractères affichés au début vont rester un peu puis disparaîtront.

### Demander une information au joueur
Il peut parfois être utile de demander des informations au joueur (son nom, sa taille, son nombre de doigts ...)

Nous allons lui demander son nom pour pouvoir lui dire bonjour correctement en utilisant l'action parler que nous avons vue plus haut.
Écrivez le code suivant dans l'onglet Début, puis cliquez sur Démarrer.

```
parler("Bonjour "+demander("Hola mon brave, quel est ton nom ?"))
```

Notre problème est que nous ne conservons pas le nom du joueur. Nous allons donc apprendre juste après à conserver une information.

On notera que pour attacher deux textes entre eux, on utilise le +.

Pour information, il est possible de demander un nombre au joueur, par exemple :

```
parler("Tu as "+demanderNombre("Hola mon brave, quel est ton age ?"))
```

### Stocker des informations
Pour conserver une information : un texte ou un nombre, nous devons la mettre dans une valeur. Une valeur est juste un nom que nous allons donner au lieu où sera stockée l'information dans le programme.

Nous allons redemander le nom et l'age du joueur mais nous allons le mettre dans deux valeurs pour pouvoir les réutiliser plus loin.

Écrivez le code suivant dans l'onglet Début, puis cliquez sur Démarrer.

```
creerValeur("nomJoueur",demander("Hola mon brave, quel est ton nom ?"))
creerValeur("ageJoueur",demanderNombre("Hola mon brave, quel est ton age ?"))
parler("Bonjour "+lireValeur("nomJoueur")+", tu as "+lireValeur("ageJoueur")+" ans")
```

On voit que nous avons utiliser l'action creerValeur pour créer une valeur et y mettre le résultat de l'action demander. Ensuite nous avons utiliser l'action lireValeur pour récupérer le contenu de la valeur.

Il est aussi possible de modifier une valeur en utilisant l'action modifierValeur. Par exemple, nous pouvons vieillir de 5 ans notre joueur :

```
creerValeur("nomJoueur",demander("Hola mon brave, quel est ton nom ?"))
creerValeur("ageJoueur",demanderNombre("Hola mon brave, quel est ton age ?"))

modifierValeur("ageJoueur",lireValeur("ageJoueur")+5)

parler("Bonjour "+lireValeur("nomJoueur")+", tu as "+lireValeur("ageJoueur")+" ans")
```

On notera qu'on peut utiliser les opérations classiques : + - * / sur les nombres

### Obtenir un nombre au hasard
Pour demander un nombre au hasard, entre 1 et 10 (compris), nous allons utiliser l'action aleatoire comme ceci :

```
aleatoire(1,10)
```

Et pour stocker ce nombre dans une valeur :

```
creerValeur("nombreMistere",aleatoire(1,10))
```

L'exemple #3 utilise cette action pour un petit jeu de devinette.

### Faire une action selon une condition
Un programme ou un jeu ne fait pas qu'agir sans tenir compte du joueur. Il peut aussi agir selon des cas qui se présente à lui.
Nous allons demander au joueur son age puis nous allons lui dire s'il est jeune ou vieux. Disons qu'au delà de 25 ans, on est vieux.

Écrivez le code suivant dans l'onglet Début, puis cliquez sur Démarrer.

```
creerValeur("ageJoueur",demanderNombre("Hola mon brave, quel est ton age ?"))
si(lireValeur("ageJoueur")>25)
.alors(()=>{
    parler("Tu es vieux")
})
.sinon(()=>{
    parler("Tu es jeune")
})
```

On peut utiliser les comparaisons suivantes :
* == : pour tester une égalité<br/>
    *Par exemple: * si(lireValeur("ageJoueur")==25)<br/>
    Pour tester si l'age du joueur est égal à 25<br/>
    On peut aussi tester son nom :<br/>
    si(lireValeur("nomJoueur")=="Billy")
* \>, >= : pour tester si un nombre est supérieur (ou égal) à un autre
* <, <= : pour tester si un nombre est inférieur (ou égal) à un autre

*Après un alors ou un sinon, on a toujours ces caractères un peu bizarres :*

```
.alors(()=>{
    // Faire les actions que l'on veut
})
```

c'est un peu compliqué mais obligatoire ici.

### faire une action pour une suite de nombre

Si on veut 
