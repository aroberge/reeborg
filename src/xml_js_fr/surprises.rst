`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Surprises!
==========

Changez le programme que nous venons tout juste d'écrire de telle sorte
que

.. code:: jscode

    marque_point_départ_et_avance();

    while ( !trouve_point_départ() ){
        suis_le_mur_à_droite();
    }

soit remplacé par

.. code:: jscode

    while ( !au_but() ){
        suis_le_mur_à_droite();
    }

et exécutez ce programme modifié avec les course de haies Haies 1,
Haies 2 et Haies 3. Vous verrez que ce programme, qui est très différent
des solutions que vous aviez avant pour ces courses, fonctionne tout
aussi bien.

Essayez avec Haies 4. Surprise! Ça fonctionne alors que nos programmes
précédents ne pouvaient pas permettre à Reeborg de compléter cette
course.

Essayez également le programme modifié avec soit Labyrinthe 1 ou
Labyrinthe 2.

Comme vous pourrez le constater, ce simple programme permet de trouver
la sortie du labyrinthe.

Étonnant, non?!

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
