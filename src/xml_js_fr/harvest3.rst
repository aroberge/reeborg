`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

D'autres récoltes
=================

La tante de Reeborg a une ferme fruitière. Dans ses champs on retrouve
plusieurs sortes de fruits. À chaque jour, un fruit différent doit être
récolté. Jetez un coup d'oeil sur les mondes Récolte 5a, Récolte 5b,
Récolte 5c et Récolte 5d. Lorsqu'il entre dans les champs, Reeborg voit
le type de fruit qui doit être récolté car sa tante en a déposé un à
l'entrée. Il ramasse ce fruit et récolte tous les fruits semblables dans
les champs..

Reeborg utilise la fonction ``objet_ici()`` qui retourne l'une des
valeurs ``"étoile", "triangle", "carré"`` s'il s'agit d'un de ces
"fruits", ou retourne ``0`` s'il s'agit d'un fruit indiqué par un jeton.
À noter qu'il existe également une fonction, ``jeton_ici()``, qui
retourne le nombre de jetons qui se trouvent à un endroit donné. En
utilisant ces deux fonctions, et les autres instructions que vous
connaissez, complétez le programme suivant pour qu'il puisse permettre à
Reeborg de récolter les bons fruits dans les 4 mondes mentionnés.

.. code:: jscode

    var sélection;
    pense(10);  // optionnel; pour faire le travail plus vite

    function récolte (fruit) {
      // décider quoi récolter
    }

    function récolte_un_rang (fruit) {
        while (rien_devant()) {
            if (objet_ici() === fruit) {
                récolte(fruit);
            }
            avance();
        }
    }

    function retourne_au_début_du_rang() {
        ...
    }

    function va_au_prochain_rang() {
        ....
    }

    function va_au_premier_rang() {
        ....
    }

    function complète_un_rang(fruit) {
        récolte_un_rang(fruit);
        retourne_au_début_du_rang();
        va_au_prochain_rang();
    }

    avance();
    sélection = objet_ici();
    récolte(sélection);
    va_au_premier_rang();
    for (var i = 0; i < 6; i++ ) {
        complète_un_rang(sélection);
    }

Rappel: ``prend("jeton")`` et ``prend("étoile")``, etc.

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
