Améliorations: partie 3
=======================

Comme vous l'avez sans doute observé, le programme précédent ne
fonctionne pas correctement: Reeborg se retrouve dans une boucle infinie
lorsqu'il n'y a pas de mur près de lui. Pour résoudre le problème, il
faut que Reeborg ``avance()`` aussitôt après avoir fait un virage à
droite::

    depose()
    avance()
    while not objet_ici():
        if rien_a_droite():
            tourne_a_droite()
            avance()
        elif rien_devant():
            avance()
        else:
            tourne_a_gauche()


.. topic:: Encore plus complexe!

    Sélectionnez le monde **Autour 3**; est-ce que le programme fonctionne?

Comme vous l'avez sans doute deviné, la réponse est malheureusement non.
Essayez de déterminer pourquoi et possiblement de trouver la solution de
vous-même avant de passer à la leçon suivante. Assurez-vous de faire en
sorte que votre programme fonctionne pour les trois mondes.

