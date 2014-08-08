`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Droit au but
============

Bien que le programme que vous venez d'écrire permette à Reeborg
d'accomplir sa tâche pour les mondes Jetons 1 et Jetons 2, il n'en sera
pas de même pour Jetons 3 et Jetons 4.

**Vérifiez ceci!**

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

.. code:: jscode

        function avance_jusque_tâche_terminée() {
        if ( au_but() ) {
            // quelque chose
        }
        avance();
        if ( jeton_ici() ){
            // quelque chose
            // quelque chose d'autre
            // autre chose encore
        }
    }

    répète(avance_jusque_tâche_terminée, 42);

Utilisant l'esquisse ci-dessus, écrivez dans l'éditeur de code le
programme requis et vérifiez qu'il fonctionne bel et bien dans chacun
des quatre mondes mentionnés.

Quelque chose de complètement différent ...
-------------------------------------------

Vous avez bel et bien complété l'exercice ci-dessus, n'est-ce pas? ...
Alors, sélectionnez soit Maison 1 ou Maison 2. En analysant le programme
que vous venez d'écrire, sans l'exécuter, est-ce que vous croyez qu'il
est une solution pour ces deux mondes? Vérifiez votre compréhension en
exécutant le programme.

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
