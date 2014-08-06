`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Comment penser à ``function``
=============================

Vous venez tout juste d'apprendre comment définir des fonctions en
Javascript. Au cas où ce ne serait pas très clair pour vous, voici façon
de comprendre les fonctions.

Supposons que vous ayez le programme suivant

.. code:: jscode

    function tourne_à_droite () {  // début du bloc de code
        tourne_à_gauche();
        tourne_à_gauche();
        tourne_à_gauche();
    }  // fin du bloc de code

    avance();
    tourne_à_droite();
    avance();

Ceci est équivalent à

.. code:: jscode

    avance();
    // début du bloc de code pour tourne_à_droite
    tourne_à_gauche();
    tourne_à_gauche();
    tourne_à_gauche();
    // fin du bloc de code
    avance();

En d'autres mots, ``function`` définit un nom que l'on peut utiliser
comme synonyme pour représenter un bloc de code; à chaque fois que l'on
voit le synonyme être *invoqué* [c'est-à-dire que le nom apparaît suivi
de parenthèses ``()``], on peut penser à ceci comme étant équivalent à
insérer à la place du synonyme le bloc de code constituant le corps de
la fonction tel quel à cet endroit.

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
