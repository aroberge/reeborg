Améliorations: partie 2
=======================

Je suis certain que vous avez trouvé la source du problème de la
solution présentée lors de la dernière leçon: Reeborg déposait un jeton
et, avant même de se déplacer, il vérifiait s'il était arrivé à son but
en cherchant pour un jeton qui, évidemment, se trouvait là où il était.
Donc, la boucle ``while`` n'était jamais exécutée. Voici un programme
modifié qui devrait fonctionner::

    depose()
    avance()
    while not objet_ici():
        if rien_devant():
            avance()
        else:
            tourne_a_gauche()

.. topic:: À votre tour!

   Assurez-vous que votre programme fonctionne avant de poursuivre la lecture.

Un monde un peu plus complexe
-----------------------------

Essayons de modifier le programme pour qu'il puisse également être une
solution pour le monde **Autour 2**. Sélectionnez donc ce monde et exécuter
le programme que vous avez déjà sans le modifier pour voir ce qui
arrive.

Identifier le problème
----------------------

.. note::

    N'oubliez pas d'inclure

    .. code:: py3

        from biblio import tourne_a_droite

Comme vous avez pu le constater en exécutant le programme ci-dessus
dans le monde **Autour 2**, le
résultat n'était pas celui désiré: Reeborg prend un raccourci et ne fait
pas le tour du monde. Le problème est que nous avions supposé que
Reeborg n'ait que deux options: avancer ou tourner à gauche. Nous
n'avons pas tenu compte de situations où Reeborg devrait tourner à
droite. Donc, ce que Reeborg devrait faire est en premier de vérifier
s'il y a un mur à sa droite; si la réponse est non, alors il doit faire
un virage à droite pour suivre le mur.
La fonction requise pour ceci est ``rien_a_droite()``. Voici un programme modifié qui
est une tentative de résoudre le problème.

.. code:: py3

    depose()
    avance()
    while not objet_ici():
        if rien_a_droite():
            tourne_a_droite()
        elif rien_devant():
            avance()
        else:
            tourne_a_gauche()

.. topic:: À votre tour!

    Est-ce que ceci fonctionne? Lisez et analysez soigneusement ce programme
    puis confirmer votre opinion en l'exécutant. Si vous pouvez pensez à des
    améliorations à apporter au programme, faites-les avant de passer à la
    leçon suivante.
