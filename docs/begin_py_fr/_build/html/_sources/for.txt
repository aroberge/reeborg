Boucles ``for``
===============

Comme nous l'avons vu, les boucles ``while`` peuvent être utilisées avec
des nombres suivant le patron::

    n = 0                      # initialisation
    while n < valeur_maximale : # condition pour terminer
        ...
        n += 1  # incrément

Une autre façon d'écrire un bout de programme ayant **exactement le
même sens** est d'utilisé une boucle ``for``::

    for n in range(valeur_maximale):
       ...

La boucle ``for`` peut être utilisée pour plus de choses que simplement
compter des objets.  Cependant, nous ne verrons pas ces autres exemples
dans cette leçon.

En utilisant une boucle ``for``, on peut avoir une autre définition
pour la fonction ``repete``::

    def mon_repete(fonction_quelconque, valeur_maximale):
        for n in range(valeur_maximale):
            fonction quelconque()

    mon_repete(avance, 9)
    mon_repete(tourne_a_gauche, 4)


.. topic:: À votre tour!

   Essayez le programme ci-dessus avec le monde **Autour 1**.

Le ``repete()`` de Reeborg
--------------------------

Ouvrez le journal de Reeborg et exécutez l'instruction suivante::

    voir_source( repete )

Vous verrez une fonction complètement différente de celle ci-dessus;
cette fonction est celle utilisée dans le monde de Reeborg.  Cette fonction
utilise la boucle ``for`` du langage de programmation Javascript.
Si vous comparez le code Javascript avec le code Python, vous concluerez
probablement que Python est plus simple que Javascript car il y a moins
de caractères apparemment superflus tels que ``;`` ou ``}``.
