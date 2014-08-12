Améliorations: partie 4
=======================

Comme vous l'avez probablement trouvé, nous avons demandé à Reeborg de
se déplacer trop tôt après avoir marqué sa position de départ. Reeborg
doit d'abord trouver une direction dans laquelle il doit se déplacer
avant de le faire. Voici une solution possible.

.. code:: py3

    depose("jeton")
    if not rien_devant():
        tourne_a_gauche()
    avance()

    while not jeton_ici():
        if rien_a_droite():
            tourne_a_droite()
            avance()
        elif rien_devant():
            avance()
        else:
            tourne_a_gauche()

.. topic:: À votre tour!

    Vérifiez que ceci fonctionne correctement. Pouvez-vous imaginer des
    situations où ce programme ne permettrait pas à Reeborg de faire le tour
    de son monde?


Améliorations: partie 5
=======================

Sélectionnez le monde **Autour 4**

.. topic:: Essayez!

    Est-ce que le programme précédent permet à Reeborg de faire le tour de
    ce monde?

Essayez ensuite de remplacer l'énoncé ``if`` que nous avons écrit par un énoncé
``while`` et vérifiez la solution.

