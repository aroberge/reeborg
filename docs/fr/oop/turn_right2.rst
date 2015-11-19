Virage à droite ??
===================

À la fin d'une section précédente, je vous ai menti.  J'ai écrit que
le code suivant permettait de **réparer** Reeborg::

    class RobotRéparé(RobotUsage):
        def tourne_a_droite(self):
            for _ in range(3):
                self.tourne_a_gauche()

Ce n'est pas vrai.  Reeborg n'est **pas** réparé: il a encore besoin
de faire trois virages à gauche et ne peut pas virer directement vers
sa droite.   Pour véritablement le réparer, nous allons avoir besoin
d'examiner le code secret qui permet à Reeborg de fonctionner.
Ceci va prend un peu de temps, mais ça va valoir la peine.
En cours de route, on va en apprendre davantage sur Python ...
et nous apprendrons des rudiments de code Javascript!


.. sidebar:: Pourquoi utiliser ``dir()``?

  J'ai parfois besoin de changer certaines parties de mes programmes
  [bien sûr, ce n'est **jamais** en raison de bogues puisque mes
  programmes n'ont **jamais** de bogues ;-)].
  Il pourrait donc arriver que le code que je décrit ici est légèrement
  différent de celui qui fait fonctionner le monde de Reeborg lorsque
  vous lirez ce tutoriel.  En utilisant ``dir``, vous pourrez
  voir le code qui permet à Reeborg de fonctionner **maintenant** (et
  pas celui qui existait au moment où j'ai écrit ce tutoriel).
  Si le code que vous voyez en utilisant ``dir`` est différent
  de celui qui est décrit dans ce tutoriel, et que **ceci vous empêche
  de comprendre ce qui se passe, svp, contactez-moi.**


Explorons le code de Reeborg
----------------------------

Exécutez le programme suivant::

    reeborg = RobotUsage()
    print(dir(reeborg))

``dir`` est une fonction Python qui permet d'obtenir une liste des attributs d'un
objet ainsi que de ses méthodes.
Le résultat de l'exécution du programme du programme peut sembler
intimidant; voici ce que j'observe
dans le journal de Reeborg lorsque j'exécute ce programme::

    ['__bases__', '__class__', '__delattr__', '__dict__' ...


On ne sais pas à ce moment-ci si ces noms représentes des méthodes ou
des attributs.  ``__bases__``, comme plusieurs autres noms,
débute et termine avec deux caractères de
soulignement: il s'agit d'une convention en Python pour dénoter des
commandes internes à Python qui sont **principalement** réservées
pour des programmeurs avancés.  Pour mieux voir ce qui se passe,
nous allons imprimer un seul nom d'attribut par ligne,
en omettant ceux qui commencent avec deux
caractères de soulignement.  Pour ce faire, nous allons
utiliser la méthode ``starts with`` des chaînes
(*startswith* pouvant être traduit par *commence avec*) comme
ceci::

  reeborg = RobotUsage()
  for attr in dir(reeborg):
      if not attr.startswith("__"):
          print(attr)

Assurez-vous d'exécuter ce code et de comparer avec le résultat que je vois::

  au_but
  avance
  body
  construit_un_mur
  couleur_de_trace
  depose
  face_au_nord
  modèle
  mur_a_droite
  mur_devant
  objet_ici
  prend
  rien_a_droite
  rien_devant
  style_de_trace
  tourne_a_gauche
  transporte

On retrouve le nom de plusieurs méthodes qu'on a vu auparavant ... mais
il y a un mot anglais, ``body``, signifiant "corps", qui est définitivement
nouveau.
Exécutons donc le programme suivant pour voir si ``reeborg.body`` a d'autres
attributs::

  reeborg = RobotUsage()
  for attr in dir(reeborg.body):
      print(attr)

.. note::

    Les programmeurs Python utilisent souvent une convention où les noms
    de variables qui débutent avec un simple caractère de soulignement, comme
    ``_prev_x``, indiquent que ces variables sont "privées" et ne devraient
    normalement pas être changées par un autre programmeur.

Vous devriez voir quelque chose qui ressemble à ceci, sans les commentaires
que j'ai rajoutés et qui donnent un guide de traduction française::

    _is_leaky          # "a une fuite"
    _prev_orientation  # prev == previous,
                       # signifiant précédent
    _prev_x
    _prev_y
    objects            # objets
    orientation
    x
    y


Vous avez déjà vu des rétroactions du genre **Reeborg est à la bonne
coordonnée x** et la même chose pour **y**; ceci suggère que
``x`` et ``y`` font probablement référence à la position de Reeborg.
En tant que programmeur, vous devriez avoir le réflexe d'écrire immédiatement
un programme pour vérifier

.. |no_highlight| image:: ../../../src/images/no_highlight.png


.. topic:: Faites ceci!

   Avec le monde **Vide**, exécutez le programme suivant::

      pas_de_surlignement()   # voir note
      sauteur = RobotUsage()
      sauteur.body.x = 8
      sauteur.body.y = 10

   .. note::

       J'ai inclus une fonction pour annuler le surlignement des
       lignes de code pendant l'exécution,

       |no_highlight|

       autrement le résultat souhaité ne serait pas observé.
       J'expliquerai par la suite pourquoi le résultat obtenu est différent
       si on n'annule pas le surlignement des lignes de code.

Le résultat que vous devriez voir est simplement un robot créé aux
coordonnées ``x=1, y=1`` ... ce qui n'est probablement pas ce à quoi
vous vous attendiez ....

.. topic:: Faites ceci!

    Ajoutez l'instruction suivante::

        sauteur.tourne_a_gauche()

    à la fin de votre programme, et exécutez-le à nouveau.


Qu'est-ce qui s'est passé?
--------------------------

Lorsqu'un programme est exécuté dans le monde de Reeborg,
il est enregistré secrètement en coulisses,
puis le résultat est démontré comme une animation dans un film.
Ceci se fait en deux étapes:

#. Le code Python est exécuté en entier.  Chaque instruction qui a comme
   résultat un changement dans l'état du  monde (par exemple, la position
   ou l'orientation de Reeborg change) fait en sorte que l'état du monde
   est enregistré pour être recréé dans un "tableau".

#. Le résultat du programme est par la suite montré, un "tableau" à la fois
   avec un certain délai (qui peut être modifié par la fonction ``pense()``),
   ce qui donne l'apparence de mouvement.

Les instructions

.. code-block:: py3

      sauteur.body.x = 8
      sauteur.body.y = 10

ne sont pas des instructions identifiées comme étant des instructions qui
doivent faire en sorte qu'il y ait un enregistrement de l'état du monde.
Par contre, l'instruction ``sauteur.tourne_a_gauche`` est reconnue et
fait en sorte que l'état du monde soit enregistré.

.. note::

    **L'effet du surlignement de code**

    Avant que votre programme ne soit exécuté, si le surlignement de code
    est activé, votre programme est modifié pour faire en sorte que
    chaque ligne qui apparait dans l'éditeur soit accompagnée par une
    autre ligne de code qui note le numéro de la ligne de code à exécuter
    et fait un enregistrement de l'état du monde.

Ce qu'on aimerait savoir est comment faire en sorte qu'on enregistre l'état
du monde lorsqu'on utilise une instruction non-reconnue par
Reeborg comme étant une instruction
qui change l'état du monde.   Pour ce faire, nous allons devoir examiner
le code Javascript utilisé par le Monde de Reeborg.



Javascript !?
-------------

Puisque nous allons examiner du code Javascript, et que vous lisez
ce tutoriel presque certainement parce que vous êtes un débutant
en programmation et que Python est votre tout premier langage, vous
vous demandez peut-être si vous avez fait erreur en choisissant
Python plutôt que Javascript...

Ne vous inquiétez pas, vous aviez fait le bon choix.

Vous avez déjà appris qu'il existe des bibliothèques qui peuvent
être utilisées dans vos programmes.  Pour ceux qui font des
calculs numériques, les bibliothèques qu'ils utilisent sont
souvent écrites dans le langage Fortran.  En fait, plusieurs
programmeurs Python utilisent de telles bibliothèques.

Pour le web, le langage de choix est habituellement Javascript.
Puisque le Monde de Reeborg vit sur le web, il n'est pas étonnant
qu'une grande partie de son code soit écrit en Javascript.

La prochaine section débutera avec une brève comparaison entre
Python et Javascript, ce qui devrait être assez pour vous permettre de déchiffrer
et comprendre le code Javascript que vous verrez.
