Idées à explorer
-----------------

Ceci est simplement un aide-mémoire pour certaines idées à
explorer et à possiblement rajouter à ce tutoriel:

- Expliquer les méthodes dites magiques de Python en m'inspirant du billet
  que j'ai écrit en anglais à ce sujet
  http://aroberge.blogspot.ca/2015/10/cryptic-reeborg.html

- Créer une fonction qui retourne la carte du monde comme un dict

- Créer un objet ``Détecteur`` qui a une méthode permettant de détecter
  la boue (ce que Reeborg ne peut pas faire).  Puis, créer une nouvelle
  classe de robots en héritant de deux classes::

      class SuperRobot(RobotUsage, Détecteur):
          pass

- Faire la **Récolte 1** en créant une liste de robots, un par rangée,
  qui sont capables de récolter une seule rangée.

- Faire les récoltes 4a, 4b, 4c en créant des robots travailleurs qui
  reçoivent des instructions de Reeborg leur indiquant quel fruit
  doit être récolté; comme pour l'exemple précédent, chaque travailleur
  est responsable d'une seule rangée.

- Voir à implémenter une solution de labyrinthe utilisant "depth first" vs
  "breadth first"

- Créer un monde où Reeborg collecte des jetons, chaque jetons indiquant
  un virage à gauche, vers un but; retracer les pas sans l'aide des jetons.
  Utiliser divers moyens pour le faire (liste d'instructions inversées,
  dictionnaires, etc.)

- Faire une variation de Pluie 2 avec du pré-code qui ne permet pas
  de détecter l'eau.

- Documenter la fonction ``disparait`` qui enlève Reeborg d'un monde existant.

- Ajouter une note pour enseignants (à un endroit approprié) expliquant que
  les fonctions de base sont essentiellement de méthodes qui sont invoquées
  pour la première instance d'un robot dans un monde donné.

- Utilisez la classe ``Cartographe`` qui a la méthode ``imprime()``
  [``show`` en anglais] et la propriété ``monde`` [``world`` en anglais],
  cette dernière étant un dict Python contenant
  l'information au sujet du monde.  Une idée possible serait de débuter
  avec un monde où le but à atteindre et la position de départ sont
  choisis de façon aléatoire, et voir à ce que Reeborg retrouve son
  chemin le plus directement possible; exiger de modifier avance()
  pour compter le nombre de pas à faire et comparer avec le résultat attendu.
  Ceci peut être fait soit pour un objet carte indépendant, ou en
  utilisant l'héritage multiple.

- Memoization and decorators