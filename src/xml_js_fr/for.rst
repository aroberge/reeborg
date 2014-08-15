`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Boucles ``for``
===============

Comme nous l'avons vu, les boucles ``while`` peuvent être utilisées avec
des nombres suivant le patron:

.. code:: jscode

    var n = valeur_initiale;  // initialisation
    while (n < valeur_maximale) {  // condition pour terminer
        ...
        n++;  // incrément
    }

Une autre façon d'écrire un bout de programme ayant ***exactement le
même sens*** est d'utilisé une boucle ``for``:

.. code:: jscode

    for ( var n = valeur_initiale; n < valeur_maximale; n++ ) {
        ...
    }

Ainsi, au lieu d'avoir l'initialisation d'une variable, la condition
pour terminer la boucle et l'incrémentation d'une variable faites sur
trois lignes différentes, elles apparaissent sur la même ligne::

.. code:: jscode

    for (initialisation; condition; incrément) {...}

Les boucles ``for`` et ``while`` sont complètement équivalentes. La
décision de choisir l'une plutôt que l'autre est souvent décidée sur la
base de la lisibilité du code: pour des programmes qui utilisent des
valeurs numériques incrémentées à chaque passage de la boucle jusqu'à ce
qu'une valeur maximale connue soit atteinte, les boucles ``for`` sont
souvent préférées parce que les trois étapes (initialisation, condition,
incrément) peuvent être perçues en même temps. Notez que l'une ou
plusieurs (même les trois) de ces trois étapes peuvent être omises dans
une boucle ``for``. Par exemple, on pourrait écrire

.. code:: jscode

    for ( ; rien_devant(); ) {...}

plutôt que

.. code:: jscode

    while ( rien_devant() ) {...}

Cependant, dans ce dernier cas, l'utilisation d'une boucle ``while`` est
considérée comme étant plus facile à lire.

Si on utilise une boucle ``for``, on peut avoir une définition
différente pour une fonction comme ``répète()``:

.. code:: jscode

    function mon_répète(fonction_quelconque, valeur_maximale){
        for(var n = 0; n < valeur_maximale; n++) {
            fonction_quelconque();
        }
    }

    mon_répète(avance, 9);
    mon_répète(tourne_à_gauche, 4);

**Essayez** avec le monde Autour 1.

Le ``répète()`` de Reeborg
--------------------------

Ouvrez le journal de Reeborg et exécutez l'instruction suivante:

.. code:: jscode

    voir_source( répète );

pour voir quelle définition Reeborg utilise pour la fonction
``répète()``.

Notez que vous pourriez aussi utiliser

.. code:: jscode

    écrit( répète );

mais le code serait plus difficile à lire!

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
