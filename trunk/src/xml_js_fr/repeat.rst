`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Répète
======

Comme nous l'avons vu, il arrive souvent que l'on doive répéter une
instruction donnée un certains nombre de fois. Il y a une façon standard
de faire ceci en Javascript ... mais ceci requiert de comprendre trop de
nouveaux concepts à la fois. Je vais juste vous montrer le code requis
pour ceci puis présenter une fonction plus simple à comprendre,
``répète()``, fonction unique au monde de Reeborg. Plus tard je vous
expliquerai comment ``répète()`` est définie à l'aide du code utilisé
habituellement.

La façon standard s'appelle une *boucle ``for``* et est écrite de la
façon suivante

.. code:: jscode

    for (var i = 0; i < n; i++){
        // instructions à répéter ici
    }

Maintenant que vous avez entrevu le code cryptique incluant deux
mots-clés ``for`` et ``var``, nous présentons plutôt la fonction
``répète()``. Nous allons utiliser la fonction ``prend_argent()`` de la
tâche de livraison de journaux que nous avons tout juste vue:

.. code:: jscode

    function prend_argent() {
        prend("jeton");
        prend("jeton");
        prend("jeton");
        prend("jeton");
        prend("jeton");
    }

Le corps de ``prend_argent()`` est constitué de 5 répétitions de
``prend("jeton")``. Utilisant ``répète()``, nous pouvons récrire ceci de
la façon suivante:

.. code:: jscode

    function prend_argent() {
        répète(prend_jeton, 5);
    }

Notez que les parenthèses ``()`` ne sont **pas** incluse pour
``prend_jeton`` comme *argument* de ``répète()``. Donc, en utilisant
``répète()``, nous avons une autre façon d'éliminer les répétitions dans
nos programmes. Si vous avez toujours dans l'éditeur de code une copie
du programme permettant à Reeborg de livrer le journal, modifiez-le de
façon à utiliser ``répète()`` à toutes les fois que ceci permet de
raccourcir le code. Si vous n'avez pas une copie du programme, retourner
à la leçon précédente et refaites-le en utilisant ``répète()``.

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
