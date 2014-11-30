Droit au but
============

Bien que le programme que vous venez d'écrire permette à Reeborg
d'accomplir sa tâche pour les mondes **Jetons 1** et **Jetons 2**, il n'en sera
pas de même pour **Jetons 3** et **Jetons 4**.

.. topic:: Vérifiez ceci!

   Essayez votre programme avec ces quatre mondes différents.

Une autre condition
-------------------

En plus d'être capable de déterminer si des jetons se trouvent là où il
est, Reeborg peut aussi déterminer s'il se trouve sur le carré coloré
que nous avons décrit précédemment comme indiquant qu'il est à sa
maison. Dans plusieurs cas, il est plus logique de considérer ce carré
comme étant la destination ou le but ultime de Reeborg, plutôt que
simplement sa maison. Reeborg peut donc déterminer s'il a atteint son
but par la condition ``au_but()``. Voici l'esquisse d'un programme
unique qui devrait permettre à Reeborg d'accomplir sa tâche pour chacun
des quatre mondes mentionnés ci-dessus.

.. code:: py3

    def avance_jusque_tâche_terminée():
        if au_but():
            # quelque chose

        avance()
        if jeton_ici():
            # quelque chose
            # quelque chose d'autre
            # autre chose encore

    repete(avance_jusque_tâche_terminée, 42)

Utilisant l'esquisse ci-dessus, écrivez dans l'éditeur de code le
programme requis et vérifiez qu'il fonctionne bel et bien dans chacun
des quatre mondes mentionnés.

Quelque chose de complètement différent ...
-------------------------------------------

Vous avez bel et bien complété l'exercice ci-dessus, n'est-ce pas? ...

.. topic:: Un autre exercice!

    Sélectionnez soit **Maison 1** ou **Maison 2**. En analysant le programme
    que vous venez d'écrire, sans l'exécuter, est-ce que vous croyez qu'il
    est une solution pour ces deux mondes? Vérifiez votre compréhension en
    exécutant le programme.

Encore les haies!
-----------------

Examinez les mondes **Haies 1** et **Haies 2**. Ignorez pour l'instant le but à
atteindre (la maison de Reeborg). Un programme qui permettrait à Reeborg
de terminer la course pourrait être constitué d'une alternance des deux
instructions suivantes:

-  ``avance()``
-  ``saute()``

en autant qu'on ait une définition appropriée pour ``saute()``. Si vous
pouviez inclure une condition (énoncé ``if``) à quelque part pour
vérifier que vous avez atteint le but, vous pourriez alors définir une
fonction que nous pourrions appeler ``avance_et_saut_jusqu_au_but()`` de
telle sorte qu'un programme unique suffirait pour les mondes Haies 1 et
Haies 2::

    repete(avance_et_saute_jusqu_au_but, 42)

.. topic:: Faites-le !

    Écrivez un tel programme et assurez-vous qu'il permette à Reeborg de
    terminer la course.

.. hint::

    Votre programme devrait ressembler à ceci::

        from biblio import *  # ou spécifiez le nom des fonctions
        def saute():
            # quelques lignes de code

        def avance_et_saut_jusqu_au_but():
            # quelque chose
            if au_but():
                termine()
            # quelque chose

        repete(avance_et_saut_jusqu_au_but, 42)

Une question pour vous
~~~~~~~~~~~~~~~~~~~~~~


Est-ce que ce programme pourrait permettre à Reeborg de terminer la
course **Haies 4**?
