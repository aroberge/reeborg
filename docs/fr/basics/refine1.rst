Améliorations: partie 1
=======================

Dans cette leçon en plusieurs parties, nous allons écrire un programme
complet pour résoudre des problèmes de plus en plus complexes. À chaque
leçon, je vais présenter une solution incomplète, comprenant une erreur.
Essayez à chaque fois de trouver l'erreur avant de passer à la leçon
suivante.

Un problème tout simple
-----------------------

Commençons par un problème tout simple: celui de faire en sorte que
Reeborg fasse le tour de son monde une seule fois, et qu'il s'arrête
lorsqu'il revient à son point de départ. Sélectionnez le monde **Autour 1**.
Nous avons vu quelque chose de très semblable lorsque nous avons
présenté le test ``rien_devant()`` test. Voici l'esquisse d'une solution
qui présuppose que Reeborg ait avec lui au moins un jeton.

#. Déposer un jeton pour marquer le point de départ ainsi que celui
   d'arrivée.
#. Avancer jusqu'à être bloqué par un mur.
#. Tourner à gauche lorsqu'un mur bloque le chemin.
#. Répéter les deux étapes précédentes jusqu'à ce qu'on retrouve le
   jeton déposé au début pour indiquer le point d'arrivée.


Prenez le temps de réfléchir à l'algorithme ci-dessus et de déterminer
s'il est suffisant pour permettre à Reeborg d'accomplir sa tâche. Puis,
considérer la solution suivante.

.. code:: py3

    depose()
    while not objet_ici():
        if rien_devant():
            avance()
        else
            tourne_a_gauche()

.. topic:: À votre tour !

    Quel est le problème avec la solution proposée? Pouvez-vous le trouver
    sans avoir à exécuter le code? Pouvez-vous corriger ce problème avant de
    passer à la leçon suivante.

